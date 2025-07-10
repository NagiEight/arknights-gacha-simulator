import {sidebarWrapper} from "sidebarDisplay.js";

const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const gallery = document.getElementById('gallery');

gridBtn.addEventListener('click', () => {
  gallery.classList.remove('flex', 'flex-col');
  gallery.classList.add('grid', 'grid-cols-2', 'md:grid-cols-4');
});

listBtn.addEventListener('click', () => {
  gallery.classList.remove('grid', 'grid-cols-2', 'md:grid-cols-4');
  gallery.classList.add('flex', 'flex-col');
});
