// @ts-check
import { selectElement } from './utils/helpers.js';

window.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------
  //                GLOBAL VARIABLES
  // -----------------------------------------------
  const allSlidesNodeList = document.querySelectorAll('.carousel__slide');
  const allSlidesArray = [...allSlidesNodeList];
  const nextButton = /** @type {HTMLButtonElement} */ (
    selectElement('.btn--next', 'button')
  );
  const previousButton = /** @type {HTMLButtonElement} */ (
    selectElement('.btn--previous', 'button')
  );

  const slidePickers = document.querySelectorAll(
    '.carousel__controls-pagination'
  );

  let index = 0; // the current slides index

  // -----------------------------------------------
  //                    SCRIPT
  // -----------------------------------------------
  // change slide on previous/next button click
  nextButton.addEventListener('click', () => {
    handleSlideChange(allSlidesArray, 'next');
  });

  previousButton.addEventListener('click', () => {
    handleSlideChange(allSlidesArray, 'previous');
  });

  // change slide based on pagination click
  slidePickers.forEach((slidePicker, pickerIndex) => {
    slidePicker.addEventListener('click', () => {
      handleSlideChange(allSlidesArray, 'direct', pickerIndex);
    });
  });

  // auto-rotate slide

  // pause auto-rotation

  // allow for manual scrolling of slides

  // -----------------------------------------------
  //                   FUNCTIONS
  // -----------------------------------------------

  /**
   * Will update the current index on an array of carousel items and return the next sequential carousel item
   * @param carouselArray {Element[]}
   * @param currentIndex {number}
   */
  function nextSlide(carouselArray, currentIndex) {
    let nextIndex = currentIndex + 1; // Move to the next index

    // Check if we've gone past the last item
    if (nextIndex >= carouselArray.length) {
      nextIndex = 0; // Wrap around to the first item
    }

    return { slide: carouselArray[nextIndex], newIndex: nextIndex };
  }

  /**
   * Will update the current index on an array of carousel items and return the previous sequential carousel item
   * @param carouselArray {Element[]}
   * @param currentIndex {number}
   */
  function previousSlide(carouselArray, currentIndex) {
    let previousIndex = currentIndex - 1; // Move to the previous index

    // Check if we've gone before the first item
    if (previousIndex < 0) {
      previousIndex = carouselArray.length - 1; // Wrap around to the last item
    }

    return { slide: carouselArray[previousIndex], newIndex: previousIndex };
  }

  /**
   * Handles the showing and hiding of the carousel slides on next/previous button click
   * @param slides {Element[]} - The array of carousel slides
   * @param direction {"next" | "previous" | "direct"} - Display either the next slide or the previous one
   * @param indexToSkipTo {number | undefined} - This will be the index number of the slide to skip directly to
   */
  function handleSlideChange(slides, direction, indexToSkipTo = undefined) {
    if (direction === 'direct' && typeof indexToSkipTo === 'number') {
      allSlidesArray[index].classList.remove('carousel__slide--active'); // Hide current
      allSlidesArray[indexToSkipTo].classList.add('carousel__slide--active'); // Show new
      index = indexToSkipTo; // Update index
      updatePaginationActiveState(index); // Update pagination
      return;
    }

    let transitionSlide;

    if (direction === 'next') transitionSlide = nextSlide;
    if (direction === 'previous') transitionSlide = previousSlide;

    if (transitionSlide === undefined) return;

    const slideObj = transitionSlide(slides, index);

    // hide current slide
    const currentSlide = allSlidesArray[index];
    currentSlide.classList.toggle('carousel__slide--active');

    // show next slide
    index = slideObj.newIndex;
    slideObj.slide.classList.toggle('carousel__slide--active');

    // update pagination
    updatePaginationActiveState(index);

    // skip directly to chosen slide and hide the others
    if (indexToSkipTo !== undefined) {
      // hide current slide
      const currentSlide = allSlidesArray[index];
      currentSlide.classList.toggle('carousel__slide--active');

      // show chosen slide
      index = indexToSkipTo;
      slideObj.slide.classList.toggle('carousel__slide--active');
    }
  }

  /**
   * Updates the active state of pagination buttons based on the current active slide.
   *
   * @param newIndex {number} - The index of the currently active slide.
   */
  function updatePaginationActiveState(newIndex) {
    // Iterate over each pagination button
    slidePickers.forEach((picker, index) => {
      if (index === newIndex) {
        // If the picker's index matches the new index, activate this pagination button
        picker.classList.add('carousel__controls-pagination--active');
        picker.setAttribute('aria-disabled', 'true'); // Mark it as disabled for accessibility
      } else {
        // Otherwise, deactivate this pagination button
        picker.classList.remove('carousel__controls-pagination--active');
        picker.removeAttribute('aria-disabled'); // Ensure it's enabled for accessibility
      }
    });
  }
});
