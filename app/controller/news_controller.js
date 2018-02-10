// var request = require("request");

// request("https://www.usatoday.com/news/world/", function(error, response, html) {
//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(html);
//   // An empty array to save the data that we'll scrape
//   var results = [];
//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
//   // $("p.title").each(function(i, element) {
//     $("li.hgpm-item").each(function(i, element) {
//     // <a class="load-story js-asset-link " href="/story/news/world/2018/02/07/why-french-balking-metoo-movement/303648002/" data-ht="heromodule"><span class="js-asset-headline">Why the French are balking at the #MeToo movement</span></a>
//     // Save the text of the element in a "title" variable
//     var title = $(element).text();
//     // ("hgpm-list-hed.js-asset-headline.placeholder-bg");
//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var link = $(element).children().attr("href");
//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });
//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });