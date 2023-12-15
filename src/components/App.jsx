import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages, onFetchError } from 'Pixbay/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { Modal } from './Modal/Modal';
import { useEffect, useState } from 'react';

const perPage = 12;

export const App = () => {
  const [q, setQ] = useState('');
  const [images, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (!q) {
      return;
    }
    const getImages = async () => {
      try {
        setLoading(true);
        setBtnLoadMore(false);

        const images = await fetchImages(q, page);
        console.log(images);

        const arrPhotos = images.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        const totalPage = Math.ceil(images.totalHits / perPage);
        console.log(totalPage);

        if (images.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.!'
          );
          setBtnLoadMore(false);
          return;
        }

        setImage(prev => [...prev, ...arrPhotos]);

        if (totalPage > page) {
          setBtnLoadMore(true);
        } else {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results"
          );
          setBtnLoadMore(false);
        }
      } catch (error) {
        onFetchError();
      } finally {
        setLoading(false);
      }
    };
    getImages(q, page);
  }, [page, q]);

  const onSubmitSearchBar = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchValue = form.search.value;

    if (searchValue === '') {
      Notiflix.Notify.info('Enter your request, please!');
      setBtnLoadMore(false);
      return;
    }

    if (searchValue === q) {
      Notiflix.Notify.info('Enter new request, please!');
      setBtnLoadMore(false);
      return;
    }

    setQ(searchValue);
    setImage([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prev => prev.page + 1);
  };

  const onOpenModal = modalData => {
    setIsShowModal(true);
    setModalImage(modalData);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
    setModalImage(null);
  };

  return (
    <>
      <Searchbar onSubmitSearchBar={onSubmitSearchBar} />
      {loading && <Loader />}
      <ImageGallery images={images} onOpenModal={onOpenModal} />
      {btnLoadMore && <Button onLoadMore={onLoadMore} />}
      {isShowModal && (
        <Modal modalImage={modalImage} onCloseModal={onCloseModal} />
      )}
    </>
  );
};
