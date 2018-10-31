/**
 * Application entry point
 */
// Load application styles

import 'styles/index.scss';
import startNode from './start_node';

document.addEventListener("DOMContentLoaded", () => {
  // Starts the game
  const startButton = document.querySelector("#start");
  startButton.addEventListener("click", () => {
    const startInput = document.querySelector("#si").value;
    startNode(startInput);
  });
  
});