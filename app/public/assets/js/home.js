$(document).ready(function () {
  console.log("I'm in home");

  $.getJSON("/newsflashes", function (data) {

  });

  
});




//   $(document).on('click', '#scrapeBtn', function (event) {
//     console.log("scrape button clicked;")
//     location.reload();

//     // scrapeNews();
//   });

// $(document).on('click', '#saveBtn', function (event) {
// console.log("saveBtn clicked");
//   // Make sure to preventDefault on a submit event.

//   saveArticle();
// });