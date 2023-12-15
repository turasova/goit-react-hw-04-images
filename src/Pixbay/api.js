import axios from "axios";
import Notiflix from "notiflix";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40265694-60baf223b251f2954a37b9862';


export async function fetchImages(q, page) {
    const url = `${BASE_URL}?q=${q}&page=${page}&key=${API_KEY}&
    image_type=photo&orientation=horizontal&per_page=12`;
    const { data} = await axios.get(url);
     return data
    
}
export function onFetchError() {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!');
};


