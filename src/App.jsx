import { Component } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './components/Searchbar';

import Loader from './components/Loader';

import { fetchImages } from './components/services/Api';

import ImageGallery from './components/ImageGallery';

import Modal from './components/Modal';

import { AppContainer } from './App.styles';

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    reqStatus: 'idle',
    page: 1,
    showModal: false,
    tags: '',
    selectedImage: '',
    loader: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;

    const shouldFetch = prevState.imageName !== imageName && imageName !== '';
    if (shouldFetch) {
      try {
        this.setState({ reqStatus: 'pending', images: [] });
        const images = await fetchImages(page, imageName);
        this.setState({
          images,
          reqStatus: 'resolved',
          page: prevState.page + 1,
        });
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
        toast.error('Ooops, there is no such image');
      }
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSelectedImage = data => {
    this.setState({ selectedImage: data });
    this.toggleModal();
  };

  render() {
    const { images, showModal, selectedImage, reqStatus } = this.state;
    return (
      <AppContainer>
        <Searchbar onSearch={this.handleFormSubmit} />
        {reqStatus === 'pending' && <Loader />}
        <ImageGallery onSelect={this.handleSelectedImage} images={images} />
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />
        )}
      </AppContainer>
    );
  }
}
