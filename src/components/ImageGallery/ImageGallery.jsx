import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({images, onOpenModal}) => {
    return (
        <ul className={css.imageGallery}>
        {images && images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
                key={id}
                tags={tags}
                webformatUR={webformatURL}
                onOpenModal={onOpenModal}
                largeImageURL={largeImageURL}
            />  
        ))
            
       }
        </ul>
    )
}
