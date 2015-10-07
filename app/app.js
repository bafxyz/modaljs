// Stylesheet entrypoint
require('_stylesheets/app.styl');

// Modules
import Modal from '_modules/modal';

// Assign modal dialog to given selector
const modalContainer = document.querySelector('.c-modal-container');

// Modal dialog instance
const modal = new Modal(modalContainer, {
  title: 'Delete image',
  text: 'Are you sure you want to delete iPhone5S.jpg?',
  cancelBtnText: 'Cancel',
  submitBtnText: 'Delete',
  onSubmit: function onSubmitFunc() {
    console.log('Item deleted!');
    this.hide();
  },
});

// Document ready
document.addEventListener('DOMContentLoaded', function ready() {

  document.querySelector('.c-modal-btn--show').onclick = function modalFunc() {
    modal.show();
  };

  document.querySelector('.c-modal-btn--hide').onclick = function modalFunc() {
    modal.hide();
  };
});
