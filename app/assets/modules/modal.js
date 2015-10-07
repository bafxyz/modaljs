// Stylesheet entrypoint
require('./modal.styl');

/**
 * @file
 * Modal module
 */

const Modal = class Modal {
  constructor(el, props) {
    this.el = el;
    this.title = props.title || 'Modal dialog';
    this.text = props.text || '';
    this.cancelBtnText = props.cancelBtnText || 'Cancel';
    this.submitBtnText = props.submitBtnText || 'Ok';
    this.onSubmit = props.onSubmit || function onSubmitFunc() {
      console.log('Dialog submited');
      this.hide();
    };
    this.onCancel = props.onCancel || function onCancelFunc() {
      console.log('Dialog canceled');
      this.hide();
    };
    this.init();
  }

  init() {
    const self = this;

    this.el.innerHTML =
    '<div class="Modal" style="display: none;">' +
    '  <div class="Modal-inner">' +
    '    <div class="Modal-header">' +
    '      <div class="Modal-title">' + this.title + '</div>' +
    '      <button class="Modal-btn Modal-btn--close"></button>' +
    '    </div>' +
    '    <div class="Modal-main">' + this.text + '</div>' +
    '    <div class="Modal-footer">' +
    '      <button class="Modal-btn Modal-btn--cancel">' + this.cancelBtnText + '</button>' +
    '      <button class="Modal-btn Modal-btn--submit">' + this.submitBtnText + '</button>' +
    '    </div>' +
    '  </div>' +
    '</div>';

    this.el.querySelector('.Modal-btn--submit').onclick = function modalSubmitFunc() {
      return self.onSubmit();
    };

    this.el.querySelector('.Modal-btn--cancel').onclick = function modalCancelFunc() {
      return self.onCancel();
    };

    this.el.querySelector('.Modal-btn--close').onclick = function modalCancelFunc() {
      return self.hide();
    };
  }

  show() {
    this.el.querySelector('.Modal').style.display = '';
  }

  hide() {
    this.el.querySelector('.Modal').style.display = 'none';
  }
};

export default Modal;
