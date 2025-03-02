import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader } from './render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imageTemplate } from './render-functions';

export const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('#input'),
  button: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-box'),
  loadElem: document.querySelector('.js-loader'),
  btnLoadMore: document.querySelector('.js-btn-load'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export async function createImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '49003886-a24f9c3a0fd607f8ed8b1fc56';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: page,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    const data = response.data;
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: `No images found for your search.`,
        position: 'topRight',
      });
      hideLoader();
      refs.input.value = '';
      return null;
    }
    refs.input.value = '';
    const markup = data.hits.map(imageTemplate).join('');
    refs.gallery.innerHTML = markup;
    hideLoader();
    lightbox.refresh();
    return { images: data.hits, totalHits: data.totalHits };
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: `❌ Error fetching images. Please try again!`,
      position: 'topRight',
    });
    return null;
  }
}
