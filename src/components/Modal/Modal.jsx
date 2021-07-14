import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styles';

const Modal = ({ largeImageURL, tags }) => {
  return (
    <Overlay>
      <ModalContainer>
        <img src={largeImageURL} alt={tags} />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Modal;
