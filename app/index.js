/**
 * Application entry point
 */
// Load application styles

import 'styles/index.scss';
import links from './link'

document.addEventListener("DOMContentLoaded", () => {

  const startButton = document.querySelector("#start");

  startButton.addEventListener("click", () => {
    const startInput = document.querySelector("#si").value;
    links(startInput);
  });
});