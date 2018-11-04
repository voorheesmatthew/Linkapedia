// import wikiLinks from './wiki_links';
const colors = ["#fd1790","#8df84d","#c33dd6","#cbe211","#f37ef6","#28de66","#fc3b39","#45facb","#c85286","#1b8f43","#7f8c10","#4eb5f8","#5c82a9","#fa9942","#93e3f4","#d25244","#aff1a3","#f7c6eb","#ac6e52","#f8d9a1","#845c00"];

async function startNode(startName, prevNodes = [], xStart = 100, yStart = 100) {
  
  let doc = await wtf.fetch(startName, "en");
  if (!doc) {
    let noPageError = document.getElementById("middle")
    let errorText = document.createTextNode(`Sorry, ${startName} not found. Check your spelling!`);
    noPageError.appendChild(errorText);
    setTimeout(() => {
      noPageError.removeChild(errorText);
    }, 5000);
  }
  let assignedColor;
  if (colors.length) {
    assignedColor = colors.shift();
    colors.push(assignedColor)
  } else {
    assignedColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  }
  let prevPages = prevNodes.map(el => el.page);

  


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
    console.log(startNodeLinks)
    

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
      startNode(d.page, allNodes, d.x, d.y)
    })

  let div = d3.select("body").append("div")
    .attr("class", "textbox")
    .attr("id", "textbox")
    .style("display", "none")

  function mouseover() {
    div.style("display", "inline")
  }

  function mousemove(d) {
    div.text(d.page) //"Page: " + d.origin + " || Link: " +
        .style("left", d3.event.pageX - 100 + "px")
        .style("top", d3.event.pageY - 50 + "px");
  }

  function mouseout() {
    div.style("display", "none");
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

module.exports = startNode;