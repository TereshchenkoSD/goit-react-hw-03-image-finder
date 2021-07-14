import { Component } from 'react';

import Searchbar from './components/Searchbar';

import { fetchImages } from './components/services/Api';

import ImageGallery from './components/ImageGallery/';

export default class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: '',
    page: 1,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      const images = await fetchImages(page, imageName);
      this.setState({ images });
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSearch={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
