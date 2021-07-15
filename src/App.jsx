import { Component } from 'react';

import Searchbar from './components/Searchbar';

import { fetchImages } from './components/services/Api';

import ImageGallery from './components/ImageGallery';

import Modal from './components/Modal';

import { AppContainer } from './App.styles';

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: '',
    page: 1,
    showModal: false,
    tags: '',
    selectedImage: '',
    loader: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      const images = await fetchImages(page, imageName);
      this.setState({ images });
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
    const { images, showModal, selectedImage } = this.state;
    return (
      <AppContainer>
        <Searchbar onSearch={this.handleFormSubmit} />
        <ImageGallery onSelect={this.handleSelectedImage} images={images} />
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />
        )}
      </AppContainer>
    );
  }
}
