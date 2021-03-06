import 'es6-object-assign/auto';
import 'es6-promise/auto';

import '../styles/index.scss';

import ListGallery from './util/ListGallery';

const THUMBNAIL_ID = 'thumbnails';
const GALLERY_ID = 'gallery';

function start(sizes, photos, activeId) {
  const galleryContainer = document.getElementById(THUMBNAIL_ID);
  const galleryViewer = document.getElementById(GALLERY_ID);
  // eslint-disable-next-line no-new
  new ListGallery(galleryContainer, galleryViewer, sizes, photos, { activeId });
}

window.start = start;
