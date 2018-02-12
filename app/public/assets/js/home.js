// $(document).ready(function () {
//   console.log("I'm in home");
//   $.getJSON("/newsflash", function (data) {
//     // For each one
//     console.log("I'm in getJson");
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });


//   $(document).on('click', '#scrapeBtn', function (event) {
//     console.log("scrape button clicked;")
//     location.reload();

//     // scrapeNews();
//   });

  // $(document).on('click', '#saveBtn', function (event) {
  console.log("saveBtn clicked");
  //   // Make sure to preventDefault on a submit event.

  //   saveArticle();
  // });

// });