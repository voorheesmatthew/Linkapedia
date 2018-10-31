// import wikiLinks from './wiki_links';

async function startNode(startName) {

  let doc = await wtf.fetch(startName);
  let startNodeLinks = doc.links()
  console.log(startNodeLinks)
  // debugger

  let width = 500;
  let height = 500;

  let svg = d3.select("#wikiverse")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");

  let simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(35))

  // d3.queue()
    // .defer(d3.json, doc.links())
    // .await(function(error, datapoints) {
      // debugger
      let circles = svg.selectAll()
        .data(startNodeLinks)
        .enter().append("circle")
        .attr("class", "start-node")
        .attr("r", 35)
        .attr("fill", "lightblue")
        .attr("cx", 100).attr("cy", 300)
    // })



  simulation.nodes(startNodeLinks)
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