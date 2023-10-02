import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');

container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
container.addEventListener('click', handlerClick);

function createMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => `
      <li class="gallery__item js-image-item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}" />
        </a>
      </li>
    `).join('');
}


function handlerClick(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
        return;
   }

  const originalImageURL = event.target.dataset.source;
  const imageDescription = event.target.getAttribute('alt');

  const instance = basicLightbox.create(`
      <div class="modal">
        <img src="${originalImageURL}" alt="${imageDescription}" width="1000" heigth="auto"/>
      </div>
    `, {
    onShow: (instance) => {
        instance.element().querySelector('img').onclick = instance.close;
    },
      
    onClose: (instance) => {
    window.removeEventListener('keydown', handlerClose);
  }
    });
  instance.show(); 
  
  window.addEventListener('keydown', handlerClose);

function handlerClose(evt) {
  if (evt.keyCode === 27) {
    instance.close();
  };
  };
}