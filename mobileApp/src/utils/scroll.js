/**
 * Determines if the scroll position is at the top within a given threshold
 * @param {number} scrollPosition - Current vertical scroll position
 * @param {number} [threshold=1] - Threshold value to consider as "at top"
 * @returns {boolean} indicating if scroll is at top
 */
export const isScrollAtTop = (scrollPosition, threshold = 1) => {
  return scrollPosition <= threshold;
};
