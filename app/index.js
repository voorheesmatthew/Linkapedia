/**
 * Application entry point
 */
// Load application styles

// import 'styles/index.scss';
// import 'styles/index.css';
// import startNode from './start_node';

document.addEventListener("DOMContentLoaded", () => {
  
  const startButton = document.querySelector("#start");
  const resetButton = document.querySelector("#reset");
  const topMiddle = document.querySelector("#middle");
  topMiddle.appendChild(document.createTextNode(`Welcome to Linkapedia!`));
  setTimeout(() => {
    if (document.querySelector("#si").value.length === 0) {
      topMiddle.removeChild(topMiddle.firstChild);
      topMiddle.appendChild(document.createTextNode(`Enter a Wikipage (input to the left) to explore. Add a goal page to play the game! Filter gives you only the most relavent links.`));
    }
  }, 30000);
  startButton.addEventListener("click", () => {
    let startInput = document.querySelector("#si").value.toLowerCase();
    // credit to https://stackoverflow.com/questions/2332811/capitalize-words-in-string
    startInput = startInput.replace(/\b\w/g, l => l.toUpperCase());
    let gameInput = document.querySelector("#gi").value.toLowerCase();
    gameInput = gameInput.replace(/\b\w/g, l => l.toUpperCase());
    
    if (startInput.length && gameInput.length) {
      startButton.setAttribute("class", "hide-btn")
      resetButton.removeAttribute("class")
      topMiddle.removeChild(topMiddle.firstChild);
      topMiddle.appendChild(document.createTextNode(`You're playing the Linkapedia Game! ${gameInput} Page, here we come!`));
      startNode(startInput, gameInput);
      
    } else if (startInput.length){
      startButton.setAttribute("class", "hide-btn")
      resetButton.removeAttribute("class")
      topMiddle.removeChild(topMiddle.firstChild);
      topMiddle.appendChild(document.createTextNode("You're exploring Linkapedia! Pop those links or click any key (to the left) to go to that page!"));
      startNode(startInput);
    } else {
      topMiddle.removeChild(topMiddle.firstChild);
      topMiddle.appendChild(document.createTextNode(`Enter a Wikipage (input to the left) to explore. Add a goal page to play the game! Filter gives you only the most relavent links.`));
    }
  });

  resetButton.addEventListener("click", () => {
    
    document.getElementById("svg").remove();
    topMiddle.removeChild(topMiddle.firstChild);
    topMiddle.appendChild(document.createTextNode(`Welcome to Linkapedia!`));
    let linkBtns = document.getElementsByClassName("link-btn");
    while (linkBtns[0]) {
      linkBtns[0].parentNode.removeChild(linkBtns[0]);
    }
    topMiddle.style.backgroundColor = "white";
    topMiddle.style.color = "black";
    resetButton.setAttribute("class", "hide-btn");
    startButton.removeAttribute("class");
  });

});