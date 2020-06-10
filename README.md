# [Linkapedia](https://www.linkapedia.app/)
## A gamified data visualization of wikipedia links, with colorful, happy, dots.
### A Vanilla JS Project with D3

![Alt Text](https://media.giphy.com/media/dt6ao6vj3YU9mb8CJT/source.gif)

## Description
[Linkapedia](https://www.linkapedia.app/) was inspired through many-a-nerdy-session of clicking wikilinks, trying to get from one page to the next. You start by typing a wikipage into the first input. If you want to explore, you're good to go, otherwise, you fill in the goal page input and click Begin. If the filter is off, you'll get tons of dots exploding out of the screen (sometimes too many), the filter limits the results to only links that are more relevant to the page. More dots explode out of the dot you click on revealing the links from each page. If you find your goal page a huge dot appears on the screen and you get a congrats from the info bar. Want to go again or just bored of the path you've choosen? Click resart and you're good to go for unlimited rounds!

### Live Version:
[Linkapedia](https://www.linkapedia.app/)

## Technologies

[Linkapedia](https://www.linkapedia.app/) was built all on the frontend. wtf_wikipedia hits and parses the wikipedia api, D3 gives you the data visualization, and Vanilla Js for all logic and html manipulation. CSS3 for styling.

## Key Features (of many)

### Exploding dots from it's origin page...

...with a decrease in radius on the clicked dot to mimic a "squeezed out" status.

![Alt Text](https://media.giphy.com/media/Mb3pUhxujyEKOMe3vy/source.gif)

```js
    .on('mouseout', mouseout)
    .on('click', function(d) {
      d.clicked = true;
      d.radius = d.radius/2;
```

### Encourage exploration beyond [Linkapedia](https://www.linkapedia.app/)

A Key keeps track of the dots you clicked and you can click on any of those key elements to explore that wikipedia page.

```js
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
```

### Keeping relevant data at each dot

Every dot keeps track of it's own baggage. It's radius, click status, assigned color, it's name and origin page. All the data is there on each dot, making it easy to code in dynamic ways, with scalable design.

```js
  startNodeLinks = doc.links().map(l => ({ 
        page: l.page, 
        origin: startName, 
        color: assignedColor,
        x: xStart,
        y: yStart,
        clicked: false,
        radius: 4
```

```js
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
```

### Empathetic design, a top infobar that gets you.

The center infobar helps guide you with setTimeout information and beyond. Make a mistake, don't know what to do? Infobar's got you.

```js
topMiddle.appendChild(document.createTextNode(`Welcome to Linkapedia!`));
  setTimeout(() => {
    if (document.querySelector("#si").value.length === 0) {
      topMiddle.removeChild(topMiddle.firstChild);
      topMiddle.appendChild(document.createTextNode(`Enter a Wikipage (input to the left) to explore. Add a goal page to play the game! Filter gives you only the most relavent links.`));
    }
  }, 30000);
```
```js
if (doc && !gameDoc) {
      let errorText = document.createTextNode(`Sorry, destination page ${gameInput} not found. You'll just be exploring!`);
      middleSection.removeChild(middleSection.firstChild);
      middleSection.appendChild(errorText);
      setTimeout(() => {
          middleSection.removeChild(errorText);
        middleSection.appendChild(document.createTextNode("You're exploring Linkapedia! Pop those links or click any key (to the left) to go to that page!"));
      }, 5000);
```

# The End?


### Future project direction sorted by priority:

1. Make it mobile, duh!

2. Refactor code to allow for easier manipulation

3. Add search and suggestion through wikipedia api

4. Re-design for modern look

5. Integrate AR so dots bouce around the room
