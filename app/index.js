/**
 * Application entry point
 */
// Load application styles

import 'styles/index.scss';
import startNode from './start_node';

document.addEventListener("DOMContentLoaded", () => {
  
  const startButton = document.querySelector("#start");
  startButton.addEventListener("click", () => {
    if (document.getElementById("svg")) {
        document.getElementById("svg").remove();
    }
    const startInput = document.querySelector("#si").value;
    // debugger
    startNode(startInput, [], 150, 150);
  });

});