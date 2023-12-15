import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImages, onFetchError } from "Pixbay/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Notiflix from "notiflix";
import { Modal } from "./Modal/Modal";


const perPage = 12;

export class App extends Component {
  state = {
    q: '',
    images: [],
    page: 1,
    loading: false,
    btnLoadMore: false,
    error: null,
    modal:{
       isShowModal: false,
       modalImage: null,
    }
  }

  componentDidMount() {
    fetchImages();
  }
  

  getImages = async () => {
    const { q, page } = this.state;
    try {

      this.setState({ loading: true, btnLoadMore: false,});

      const images = await fetchImages(q, page)
      console.log(images)

      const arrPhotos = images.hits.map(({ id, webformatURL,largeImageURL, tags }) => (
          { id, webformatURL,largeImageURL , tags}
      ));
      const totalPage = Math.ceil(images.totalHits / perPage)
      console.log(totalPage)

      if (images.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.!')
        this.setState({ btnLoadMore: false });
        return;
      }

      if (q === '') {
        Notiflix.Notify.info('Enter your request, please!')
        this.setState({ btnLoadMore: false });
        return;
      }

        this.setState(prevState => ({
          images:[ ...prevState.images , ...arrPhotos],
        }))
      
       if (totalPage > page) {
        this.setState({btnLoadMore: true})
      } else {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results"); 
        this.setState({ btnLoadMore: false });
      }
       
      } catch (error) {
      onFetchError();
      
      } finally {
      this.setState({ loading: false });
      
      }
    }
  
  componentDidUpdate(_, prevState) {
    const { q, page } = this.state;
    
    if (prevState.q !== q || prevState.page !== page) {
      this.getImages()
    }
  }

  onSubmitSearchBar = newQ => {
    this.setState({
      q: newQ,
      images: [],
      page: 1,
      error: null,
    })
   
      if (this.state.q === newQ) {
        Notiflix.Notify.info('Enter new request, please!')
        this.setState({ btnLoadMore: false });
        return;
    }
    

  }

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      }
    })
  }

  

  onOpenModal = (modalData) => {
    this.setState({
      modal:{
       isShowModal: true,
       modalImage: modalData,
    }
    })
  }
 
  onCloseModal = () => {
    this.setState({
      modal:{
       isShowModal: false,
       modalImage: null,
    }
    })
  }
  
  render() {
    const { images, btnLoadMore, loading, modal:{modalImage}} = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitSearchBar} />
        {loading && <Loader />}
        <ImageGallery images={images} onOpenModal={ this.onOpenModal} />
        {btnLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {this.state.modal.isShowModal &&
        <Modal modalImage={modalImage}
               onCloseModal={this.onCloseModal} />}
  
    </>)
}
};
