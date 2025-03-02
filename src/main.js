import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createImages } from './js/pixabay-api';
import { hideLoader, showLoader } from './js/render-functions';
import { refs } from './js/pixabay-api';
import { imageTemplate } from './js/render-functions';

const params = { query: '', page: 1, total: 0 };

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  params.query = e.target.elements.input.value.trim();
  params.page = 1;
  showLoader();
  if (!params.query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    hideLoader();
    return;
  }
  const result = await createImages(params.query, params.page);
  if (!result) return;
  params.total = result.totalHits;
  checkBtnStatus();
});

refs.btnLoadMore.addEventListener('click', async () => {
  hideLoadMoreBtn();
  showLoader2();
  params.page += 1;
  const result = await createImages(params.query, params.page);
  const markup = result.images.map(imageTemplate).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  checkBtnStatus();
  hideLoader2();
  scrollPage();
});

function checkBtnStatus() {
  const perPage = 40;
  const maxPage = Math.ceil(params.total / perPage);
  if (params.page >= maxPage) {
    hideLoadMoreBtn();
    iziToast.info({
      title: 'Info',
      message: 'We are sorry, but you have reached the end of search results',
      position: 'topRight',
    });
  } else {
    showLoadMoreBtn();
  }
}
function showLoadMoreBtn() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hideLoadMoreBtn() {
  refs.btnLoadMore.classList.add('hidden');
}

function showLoader2() {
  refs.loadElem.classList.remove('hidden');
}
function hideLoader2() {
  refs.loadElem.classList.add('hidden');
}

function scrollPage() {
  const info = refs.gallery.firstElementChild.getBoundingClientRect();
  const height = info.height;
  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}
