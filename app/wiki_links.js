async function wikiLinks(startName) {

  let doc = await wtf.fetch(startName);
  let startNodeLinks = doc.links() //.map(link => link.page);
  // console.log(startNodeLinks);
  return startNodeLinks;

}

module.exports = wikiLinks;

