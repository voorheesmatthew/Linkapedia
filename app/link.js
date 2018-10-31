async function links(start) {

  let doc = await wtf.fetch(start);
  let linksList = doc.links().map(link => link.page);
  console.log(linksList)

  let width = 500;
  let height = 500;

  let svg = d3.select("#wikiverse")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");

  let circles = svg.selectAll()
    .data(linksList)
    .enter().append("circle")
    .attr("class", "link")
    .attr("r", 35)
    .attr("fill", "lightblue")
    .attr("cx", 100).attr("cy", 300)
    .text(linksList)
}

module.exports = links;