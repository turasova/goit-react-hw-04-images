import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatUR, tags, onOpenModal, largeImageURL }) => {
    
    return <li key={id} className={css.imageGalleryItem} onClick={evt => {
        evt.preventDefault();
        onOpenModal({ largeImageURL, tags })
    }}
    >
        <img src={webformatUR} alt={tags} className={css.imageGalleryItemImage} />
            </li>
  
}