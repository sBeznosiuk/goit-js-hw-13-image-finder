import imagesTemplate from './templates/imagesTemplate.hbs'

const debounce = require('lodash.debounce');
const apiKey = '20744853-e6e709f705befc52cb2e1c259';

const formRef = document.querySelector('#search-form')
const galleryRef = document.querySelector('.gallery')

formRef.addEventListener('input', debounce(e => fet(e.target.value), 500),)

function fet(query) {
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=1&per_page=12&key=${apiKey}`)
      .then(res => res.json())
      .then(updateMarkup);
  }
  
  function updateMarkup(data) {
    const markup = imagesTemplate(data)
    galleryRef.innerHTML = markup
  }