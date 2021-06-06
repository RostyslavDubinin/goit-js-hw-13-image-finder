import imgCardTpl from './templates/img-card.hbs';
import ApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';

import getRefs from './js/get-refs.js';
const refs = getRefs();




const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

console.log(loadMoreBtn);


const imgApiService = new ApiService();



refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImg);

function onSearch(e) {
  e.preventDefault();

  imgApiService.query = e.currentTarget.elements.query.value;

  if (imgApiService.query === '' ||  imgApiService.query === ' ') {
    return alert('Too many matches found. Please enter a more specific query!');
  }

  loadMoreBtn.show();
  imgApiService.resetPage();
  clearImgContainer();
  fetchImg();
}

function fetchImg() {
  loadMoreBtn.disable();
  imgApiService.fetchImg().then(hits => {
    appendImgMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendImgMarkup(hits) {
  refs.imgContainer.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}

function clearImgContainer() {
  refs.imgContainer.innerHTML = '';
}