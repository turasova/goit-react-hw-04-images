import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({
  modalImage: { largeImageURL, tags },
  onCloseModal,
}) => {
  useEffect(() => {
    const handleEscClose = evt => {
      if (evt.code === 'Escape') onCloseModal();
      console.log('Press');
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onCloseModal]);

  const handleOverlayClose = evt => {
    if (evt.target === evt.currentTarget) onCloseModal();
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClose}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} className={css.modal} />
      </div>
    </div>
  );
};
