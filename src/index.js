// import './styles.css';
import imagesTemplate from './templates/imagesTemplate.hbs';

const debounce = require('lodash.debounce');

const formRef = document.querySelector('#search-form input');
const galleryRef = document.querySelector('.gallery');
const loadMoreButtonRef = document.querySelector('#load-more');

let loadMoreButton = (loadMoreButtonRef.disabled = true);

formRef.addEventListener(
  'input',
  debounce(e => {
    firstPageImages();
    handleLoadMoreButton.enable();
  }, 500),
);

loadMoreButtonRef.addEventListener('click', () => {
  fetchData();
});

const handleImageLoad = {
  searchQuery: '',
  page: 1,
  apiKey: '20744853-e6e709f705befc52cb2e1c259',

  fetchData() {
    const options = {
      headers: {},
    };
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`;

    return fetch(url, options)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage;
        return hits;
      })
      .then(updateMarkup);
  },

  incrementPage() {
    this.page++;
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};

const handleLoadMoreButton = {
  enable() {
    loadMoreButton = loadMoreButtonRef.disabled = false;
  },

  disable() {
    loadMoreButton = loadMoreButtonRef.disabled = true;
  },
};

function firstPageImages(event) {
  handleImageLoad.query = formRef.value;
  clearMarkup();
  handleImageLoad.resetPage();
  fetchData();

  if (!formRef.value) {
    return;
  }
}

function fetchData() {
  handleImageLoad.fetchData().then(updateMarkup);
}

function updateMarkup(data) {
  console.log(data);
  const markup = imagesTemplate(data);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  galleryRef.innerHTML = '';
}
