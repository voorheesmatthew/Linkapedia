Title: Linkapedia

* Background and Overview
    * Motivation:
    It's 1:30am, my friend and I are at a bar, we haven't even been drinking. Instead, both our phones are about to die because we've been incessantly clicking on wikipedia (hereby referred to as "wiki") links trying to see who can get from one spot to another in the fewest amount of clicks. Once we get to the goal page, we go back into our history and count the links we visited. Wouldn't it be nice if there was a more dynamic way to visualize what we were doing?
    * High-level overview:
    Linkapedia will start with a single page from wiki, represented by a dot. You click on that dot, and you get all the dots of pages with links that were on your parent dot. Eventually, you have a flower of wiki links that highlight the path from your original page to the dot your mouse hovers. When you get the page, you were looking for its game over and a summary of your journey (including the number of clicks and shortest path).

* Functionality and MVP Features
    * Input for wiki start page and wiki end page (a dropdown of choices. BONUS: search wiki)
    * One dot appears that contains links from a range within that wiki page. When clicked, it pops out links as new dots, including their own child links with lines connecting them. (BONUS: size is based on the number of connections it provides, to give the user a hint of what to click)
    * When a dot gets hovered it highlights all dots and its shortest path to the original wiki page.
    * A counter records the number of pops/clicks and calculates the shortest route from viewable dot connections. This is displayed as a modal once goal page is found.

* Architecture and Technologies
    * D3
        * Use D3 to manage dots behavior and data
    * MediaWiki action API
        * The API to get a list of links on any given page, as well as backlinks to pages
    * Node Backend (Pending approval)
        * Project might require the use of an external API inaccessible from a browser.

* Implementation Timeline
    * Monday: Write the proposal, get a review from a coach. Get a better overview of scope.
    * Tuesday: Learn D3, Wiki API, render a dot with wiki info.
    * Wednesday: Build event handlers for hover and clicks, get multiple dots with a click.
    * Thursday: Link and counters built between dots.
    * Friday: Styling and bug hunting 🐛🔫
