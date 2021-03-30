// import './styles.css';
import imagesTemplate from './templates/imagesTemplate.hbs';

const debounce = require('lodash.debounce');

const formRef = document.querySelector('#search-form input');
const galleryRef = document.querySelector('.gallery');
const bodyRef = document.querySelector('body');

formRef.addEventListener(
  'input',
  debounce(e => {
    firstPageImages();
    buttonRender();
    console.log(handleImageLoad);
  }, 500),
);

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
        this.incrementPage();
        return hits;
      })
      .then(updateMarkup)
      .then(console.log(url));
  },

  incrementPage() {
    this.page += 1;
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

function firstPageImages(event) {
  handleImageLoad.query = formRef.value;
  clearMarkup();
  handleImageLoad.resetPage();
  handleImageLoad.fetchData();

  if (!formRef.value) {
    return;
  }
}

function updateMarkup(data) {
  console.log(data);
  const markup = imagesTemplate(data);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  galleryRef.innerHTML = '';
}

function buttonRender() {
  const buttonRef = document.createElement('button');
  buttonRef.textContent = 'Load more...';
  buttonRef.setAttribute('id', 'load-more');

  if (bodyRef.querySelector('#load-more')) {
    bodyRef.appendChild(buttonRef);
    bodyRef.removeChild(buttonRef);
  } else {
    bodyRef.appendChild(buttonRef);
  }
  console.log(bodyRef.children.prototype);

  buttonRef.addEventListener('click', () => {
    handleImageLoad.fetchData();
  });
}
