/**
 * Application entry point
 */
// Load application styles

import 'styles/index.scss';
import startNode from './start_node';

document.addEventListener("DOMContentLoaded", () => {
  
  const startButton = document.querySelector("#start");
  const resetButton = document.querySelector("#reset")
  
  
  startButton.addEventListener("click", () => {
    let startInput = document.querySelector("#si").value.toLowerCase();
    startInput = startInput.replace(/\b\w/g, l => l.toUpperCase());
    if (startInput.length) {
      startButton.setAttribute("class", "hide-btn")
      resetButton.removeAttribute("class")
      // credit to https://stackoverflow.com/questions/2332811/capitalize-words-in-string
      startNode(startInput);
    }
  });

  resetButton.addEventListener("click", () => {
    
    document.getElementById("svg").remove();
    let linkBtns = document.getElementsByClassName("link-btn");
    while (linkBtns[0]) {
      linkBtns[0].parentNode.removeChild(linkBtns[0]);
    }
    let startInput = document.querySelector("#si").value.toLowerCase();
    startInput = startInput.replace(/\b\w/g, l => l.toUpperCase());
    if (startInput.length) {
      startNode(startInput);
    } else {
      resetButton.setAttribute("class", "hide-btn");
      startButton.removeAttribute("class");
    }
  });

});