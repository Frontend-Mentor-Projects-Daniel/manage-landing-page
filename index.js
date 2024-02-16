// @ts-check

import { selectElement } from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = selectElement('#js--menu-btn', 'button');
  const menuIcon = menuButton.firstElementChild;

  menuButton.addEventListener('click', (e) => {
    const isExpanded = menuButton.getAttribute('aria-expanded');

    if (isExpanded != null) {
      if (isExpanded === 'false') {
        menuButton.setAttribute('aria-expanded', 'true');
        menuIcon?.setAttribute('src', './images/icon-close.svg');
      }

      if (isExpanded === 'true') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuIcon?.setAttribute('src', './images/icon-hamburger.svg');
      }
    } else {
      throw new Error(
        "This Menu button doesn't have the aria-expanded attribute"
      );
    }
  });
});
