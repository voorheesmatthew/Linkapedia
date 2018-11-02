// import wikiLinks from './wiki_links';

async function startNode(startName, prevNodes = [], xStart, yStart) {
  
  let doc = await wtf.fetch(startName, "en");
  let assignedColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  let startNodeLinks;
  let filter = document.querySelector("#filter").checked;
  if (filter) {
    startNodeLinks = doc
        .sections(1)
        .links()
        .map(l => ({
            page: l.page,
            origin: startName,
            color: assignedColor
        }))
        .concat(doc
                .sections(0)
                .links()
          .map(l => ({ page: l.page, origin: startName, color: assignedColor })));
  } else {
    startNodeLinks = doc.links().map(l => ({ page: l.page, origin: startName, color: assignedColor }))
  }
  let prevPages = prevNodes.map(el => el.page);
  // debugger
  startNodeLinks = startNodeLinks.filter(el => el.page && !prevPages.includes(el.page))//.slice(0,21)
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
  // " + xStart + ", " + yStart + "
  let simulation = d3.forceSimulation()
  .force("x", d3.forceX(xStart).strength(.02))
  .force("y", d3.forceY(yStart).strength(.02))
  .force("collide", d3.forceCollide(3.5))
  
  let circles = svg.selectAll()
  .data(allNodes)
  .enter().append("circle")
  .attr("class", "nodes")
  .attr("r", 3)
  .attr("fill", function(d){
    return d.color;
  })
  .attr("cx", function(d) {
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
    document.getElementById("svg").remove()
    document.getElementById("textbox").remove()
    // debugger
    startNode(d.page, allNodes, 150, 150)// , d.x, d.y
  })

  let div = d3.select("body").append("div")
  .attr("class", "textbox")
  .attr("id", "textbox")
  .style("display", "none")

  function mouseover() {
    div.style("display", "inline")
  }

  function mousemove(d) {
    div.text(d.page)
      .style("left", (d3.event.pageX-100) + "px")
      .style("top", (d3.event.pageY-50) + "px");
  }

  function mouseout() {
    div.style("display", "none");
  }
  
  simulation.nodes(allNodes)
    .on('tick', ticked);

  function ticked() {
    circles
      .attr("cx", function(d) {
        return d.x
      })
      .attr("cy", function(d) {
        return d.y
      })
  }
}

module.exports = startNode;