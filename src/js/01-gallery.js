import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const refs = {
  divGallery: document.querySelector('.gallery'),
  galleryImg: document.querySelector('.gallery__image'),
  galleryLink: document.querySelector('.gallery__item'),
};

const previewMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<div>
              <a class="gallery__item" href="${original}">
                <img
                  class="gallery__image"
                  src="${preview}"
                  alt="${description}"
                />
              </a>
            </div>`;
  })
  .join('');
refs.divGallery.insertAdjacentHTML('afterbegin', previewMarkup);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
