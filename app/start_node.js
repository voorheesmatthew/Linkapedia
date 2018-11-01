// import wikiLinks from './wiki_links';

async function startNode(startName, prevNodes = []) {
  
  let doc = await wtf.fetch(startName);
  let assignedColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  let startNodeLinks = doc.links().map(l => ({ page: l.page, origin: startName, color: assignedColor }))
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
  
  let simulation = d3.forceSimulation()
  .force("x", d3.forceX(150).strength(.03))
  .force("y", d3.forceY(150).strength(.03))
  .force("collide", d3.forceCollide(4))
  
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
  .on('mouseover', function(d) {
    console.log(d)
  })
  .on('click', function(d) {
    document.getElementById("svg").remove()
    startNode(d.page, allNodes)
  })

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