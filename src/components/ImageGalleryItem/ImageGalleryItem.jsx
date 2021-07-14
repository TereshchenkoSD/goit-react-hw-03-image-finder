import PropTypes from 'prop-types';

import {
  GalleryItem,
  GalleryItemImage,
} from '../ImageGalleryItem/ImageGalleryItem.styles';

const imageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <GalleryItem key={id}>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </GalleryItem>
  );
};

imageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default imageGalleryItem;
