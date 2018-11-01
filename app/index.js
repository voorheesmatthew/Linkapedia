/**
 * Application entry point
 */
// Load application styles

import 'styles/index.scss';
import startNode from './start_node';

document.addEventListener("DOMContentLoaded", () => {
  // let width = 700;
  // let height = 700;

  // let svg = d3
  //     .select("#wikiverse")
  //     .append("svg").attr("id", "svg")
  //     .attr("height", height)
  //     .attr("width", width)
  //     .append("g")
  //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  // Starts the game
  const startButton = document.querySelector("#start");
  startButton.addEventListener("click", () => {
    const startInput = document.querySelector("#si").value;
    startNode(startInput);

  });

});