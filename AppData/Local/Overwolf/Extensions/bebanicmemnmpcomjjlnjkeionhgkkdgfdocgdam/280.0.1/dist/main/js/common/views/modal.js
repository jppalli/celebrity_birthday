// config:
//
// {
//   text: {
//     title: String,
//     description: String,
//     leftButton: String,
//     rightButton: String
//   },
//   buttons: {
//     exit: {
//       action: () => void
//     },
//     left: {
//       close: boolean, // close modal after button click?
//       action: () => void
//     },
//     right: {
//       close: boolean, // close modal after button click?
//       action: () => void
//     }
//   }
// }
"use strict";

let settings_modal = {
  show: (config) => {
    const modal = document.createElement('section');
    modal.hide = () => {
      modal.classList.remove('active');
      modal.parentNode.removeChild(modal);
    }
    modal.classList.add('overlay-popup');

    modal.innerHTML =
      `<div class="overlay-popup__overlay"/>` +
      `<div class="overlay-popup__popup">` +
      `  <button class="button--icon button--icon--old window-control window-control--close">` +
      `    <svg class="svg-icon-fill">` +
      `      <use xlink:href="/assets/svg/sprite.svg#window-control--close--old"/>` +
      `    </svg>` +
      `  </button>` +
      `  <h2>${config.text.title}</h2>` +
      `  <p>${config.text.description}</p>` +
      `  <div class="overlay-popup__popup__buttons">` +
      `    <button id="modal-left-button" class="button--text button--text--small button--text--invisible">` +
      `      ${config.text.leftButton}` +
      `    </button>` +
      `    <button class="button--text button--text--cta">` +
      `      ${config.text.rightButton}` +
      `    </button>` +
      `  </div>` +
      `</div>`;

    const closeButton = modal.querySelector('.window-control--close');
    closeButton.addEventListener('click', () => {
      config.buttons.exit.action();
      modal.hide();
    });

    const leftButton = modal.querySelector('.button--text--small');
    leftButton.addEventListener('click', () => {
      config.buttons.left.action();
      if (config.buttons.left.close) {
        modal.hide();
      }
    });

    const rightButton = modal.querySelector('.button--text--cta');
    rightButton.addEventListener('click', () => {
      config.buttons.right.action();
      if (config.buttons.right.close) {
        modal.hide();
      }
    });

    const root = document.querySelector('.root');
    root.append(modal);
    modal.classList.add('active');
  }
}