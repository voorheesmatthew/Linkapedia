// import wikiLinks from './wiki_links';
const colors = ["#fd1790","#8df84d","#c33dd6","#cbe211","#f37ef6","#28de66","#fc3b39","#45facb","#c85286","#1b8f43","#7f8c10","#4eb5f8","#5c82a9","#fa9942","#93e3f4","#d25244","#aff1a3","#f7c6eb","#ac6e52","#f8d9a1","#845c00"];

async function startNode(startName, gameInput = "xzc", prevNodes = [], xStart = 100, yStart = 100) {
  
  let doc = await wtf.fetch(startName, "en");
  let gameDoc = await wtf.fetch(gameInput, "en");
  if (gameInput === "xzc") {
    gameInput = null;
  }
  let middleSection = document.getElementById("middle");
  //Error checking
  if (gameInput && !gameDoc && prevNodes.length === 0) {
    if (!doc && !gameDoc) {
      let errorText = document.createTextNode(`Sorry, ${startName} and ${gameInput} not found. Check your spelling and try again!`);
      middleSection.removeChild(middleSection.firstChild);
      middleSection.appendChild(errorText);
      
    } else if (doc && !gameDoc) {
      let errorText = document.createTextNode(`Sorry, destination page ${gameInput} not found. You'll just be exploring!`);
      middleSection.removeChild(middleSection.firstChild);
      middleSection.appendChild(errorText);
      setTimeout(() => {
          middleSection.removeChild(errorText);
        middleSection.appendChild(document.createTextNode("You're exploring Linkapedia! Pop those links or click any key (to the left) to go to that page!"));
      }, 5000);
    } 
  } else if (!doc && prevNodes.length === 0) { 
    let errorText = document.createTextNode(`Sorry, wikipedia page ${startName} not found. Check your spelling and try again!`);
    middleSection.removeChild(middleSection.firstChild);
    middleSection.appendChild(errorText);
    
  } else {
    document.querySelector("#si").value = "";
    document.querySelector("#gi").value = "";
  }
  //assign colors
  let assignedColor;
  if (colors.length) {
    assignedColor = colors.shift();
    colors.push(assignedColor)
  } else {
    assignedColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  }

  //keep list of previous page names
  let prevPages = prevNodes.map(el => el.page);
  
  // Refreshes the page with new nodes
  if (document.getElementById("textbox")) {
    document.getElementById("textbox").remove();
  }
  if (document.getElementById("svg")) {
    document.getElementById("svg").remove();
  }

  
  
  let startNodeLinks = [];
  if (doc) {
    if (!document.getElementById(startName)) {
      let pageBtn = document.createElement("button")
      pageBtn.setAttribute("class", "link-btn");
      pageBtn.setAttribute("id", startName)
      pageBtn.setAttribute("onclick", `openNewTab('https://en.wikipedia.org/?curid=${doc.json().pageID}');`);
      // debugger
      pageBtn.style.backgroundColor = assignedColor;
      let t = document.createTextNode(startName);
      pageBtn.appendChild(t)
      document.getElementById("key-box").append(pageBtn);
    }

    
    
 
    let filter = document.querySelector("#filter").checked;
    if (filter) {

      let sectionOne = doc
        .sections(0)
        .links()
        .map(l => ({
          page: l.page,
          origin: startName,
          color: assignedColor,
          x: xStart,
          y: yStart,
          clicked: false,
          radius: 4
        }));

      if (doc.sections(1)) {
        startNodeLinks = sectionOne.concat(doc
          .sections(1)
          .links()
          .map(l => ({
            page: l.page,
            origin: startName,
            color: assignedColor,
            x: xStart,
            y: yStart,
            clicked: false,
            radius: 4
          })))
      } else {
        startNodeLinks = sectionOne;
      }

    } else {
      startNodeLinks = doc.links().map(l => ({ 
        page: l.page, 
        origin: startName, 
        color: assignedColor,
        x: xStart,
        y: yStart,
        clicked: false,
        radius: 4
      }))
    }
  }
    

    startNodeLinks = startNodeLinks.filter(el => el.page && !prevPages.includes(el.page))
    

    allNodes = startNodeLinks.concat(prevNodes)

  let svg = d3
    .select("#wikiverse")
    .append("svg")
    .attr("id", "svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 300 300")
    .classed("svg-content", true)
    .append("g")
    .attr("transform", "translate(0,0)");

  let simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(xStart).strength(0.00005))
      .force("y", d3.forceY(yStart).strength(0.00005))
      .force("collide", d3.forceCollide(function(d) {
              return d.radius + 0.5;
          }))
      .alpha(100);
  
  let circles = svg.selectAll()
    .data(allNodes)
    .enter().append("circle")
    .attr("class", "nodes")
    .attr("id", function(d) {
      return d.page;
    })
    .attr("r", function (d) {
        return d.radius;
    })
    .attr("fill", function(d){
      return d.color;
    })
    .attr("cx", function(d) {
      // debugger
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
      })
    .text(function (d) { return d.page; })
    .on('mouseover', mouseover)
    .on('mousemove', function(d) {
      return mousemove(d)
    })
    .on('mouseout', mouseout)
    .on('click', function(d) {
      d.clicked = true;
      d.radius = d.radius/2;
      if (gameInput === null) {
        gameInput = "xzc";
      }
      startNode(d.page, gameInput, allNodes, d.x, d.y)
    })

  let div = d3.select("body").append("div")
    .attr("class", "textbox")
    .attr("id", "textbox")
    .style("display", "none");

  function mouseover() {
    div.style("display", "inline");
  }

  function mousemove(d) {
    div.text(d.page) 
        .style("left", d3.event.pageX - 100 + "px")
        .style("top", d3.event.pageY - 50 + "px");
  }

  function mouseout() {
    div.style("display", "none");
  }
  //check if game won!
  if (gameDoc) {
    doc.links().forEach(link => {
      if (link.page === gameDoc.title()) {
        let winningAlert = document.createTextNode(`Congrats! You found the ${gameInput} page! Keep exploring or start over!`);
        middleSection.removeChild(middleSection.firstChild);
        middleSection.appendChild(winningAlert);
        if (document.getElementById(link.page)) {
          let winner = document.getElementById(link.page);
          winner.setAttribute("r", 15);
          if (winner.__data__) {
            winner.__data__.radius = 15;
          }
        } else {
          let winnerCircle = [{ page: link.page, origin: startName, color: assignedColor, x: xStart, y: yStart, clicked: false, radius: 15 }];
          allNodes = allNodes.concat(winnerCircle);
          circles = svg.selectAll()
            .data(allNodes)
            .enter().append("circle")
            .attr("class", "nodes")
            .attr("id", function (d) {
              return d.page;
            })
            .attr("r", function (d) {
              return d.radius;
            })
            .attr("fill", function (d) {
              return d.color;
            })
            .attr("cx", function (d) {
              return d.x;
            })
            .attr("cy", function (d) {
              return d.y;
            })
            .text(function (d) { return d.page; })
            .on('mouseover', mouseover)
            .on('mousemove', function (d) {
              return mousemove(d)
            })
            .on('mouseout', mouseout)
            .on('click', function (d) {
              d.clicked = true;
              d.radius = d.radius / 2;
              if (gameInput === null) {
                gameInput = "xzc";
              }
              startNode(d.page, gameInput, allNodes, d.x, d.y);
            });
          let winner = document.getElementById(link.page);
          winner.setAttribute("r", 15);
          winner.__data__.radius = 15;
        }
        middleSection.style.backgroundColor = "green";
        middleSection.style.color = "white";
        window.scrollTo(0,0)
      }
    });
  }
  
  simulation.nodes(allNodes)
    .on('tick', ticked);

  function ticked() {
    circles
      .attr("cx", function(d) {
        // debugger
        // simulation
        return (d.x = Math.max(d.radius, Math.min(300 - d.radius, d.x))); //Width
      })
      .attr("cy", function(d) {
        // simulation.alpha(.01)
        return (d.y = Math.max(d.radius, Math.min(300 - d.radius, d.y)));
      })
  }
}

// module.exports = startNode;