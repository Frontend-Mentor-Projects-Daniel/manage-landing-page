// @ts-check
import { selectElement } from './utils/helpers.js';

/**
 * Initializes carousel functionality once the DOM is fully loaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  // Query all slides and control elements
  const slides = [...document.querySelectorAll('.carousel__slide')];
  const nextButton = /** @type {HTMLButtonElement} */ (
    selectElement('.btn--next', 'button')
  );
  const previousButton = /** @type {HTMLButtonElement} */ (
    selectElement('.btn--previous', 'button')
  );
  const paginationButtons = document.querySelectorAll(
    '.carousel__controls-pagination'
  );

  let currentIndex = 0; // Tracks the current slide index

  // Event listeners for navigating slides
  nextButton.addEventListener('click', () => changeSlide('next'));
  previousButton.addEventListener('click', () => changeSlide('previous'));

  // Direct navigation to a slide through pagination buttons
  paginationButtons.forEach((button, index) => {
    button.addEventListener('click', () => changeSlide('direct', index));
  });

  /**
   * Changes the current slide based on navigation input.
   * @param direction {"next" | "previous" | "direct"} - The navigation direction or mode.
   * @param newIndex {number | null} - The specific index to navigate to for direct navigation. Defaults to null.
   */
  function changeSlide(direction, newIndex = null) {
    // Deactivate current slide and pagination button
    slides[currentIndex].classList.remove('carousel__slide--active');
    paginationButtons[currentIndex].classList.remove(
      'carousel__controls-pagination--active'
    );
    paginationButtons[currentIndex].removeAttribute('aria-disabled');

    // Determine new index based on direction
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % slides.length;
    } else if (direction === 'previous') {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    } else if (direction === 'direct' && newIndex !== null) {
      currentIndex = newIndex;
    }

    // Activate new slide and pagination button
    slides[currentIndex].classList.add('carousel__slide--active');
    paginationButtons[currentIndex].classList.add(
      'carousel__controls-pagination--active'
    );
    paginationButtons[currentIndex].setAttribute('aria-disabled', 'true');
  }
});
