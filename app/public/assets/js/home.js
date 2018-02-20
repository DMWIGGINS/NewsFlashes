$(document).ready(function () {

  console.log("I'm in home");



  $(document).on('click', '#scrape', function (event) {
    console.log("I'm in scrape");

    $.ajax("/scrape", {
      type: "GET",
    }).then(
      function () {
        console.log("Scrape Successful in button function");
      });
    alert("Scraping Articles from USA Today!");
    location.reload();
  });

  $(document).on('click', '#saveBtn', function (event) {
    console.log("saveBtn clicked");

    var id = $(this).data("id");
    var newSave = $(this).data("issaved");

    var newSavedNow = {
      saved: true
    };

    // Send the PUT request.
    $.ajax("/api/savednews/" + id, {
      type: "PUT",
      data: newSavedNow
    }).then(
      function () {
        console.log("You Saved It");
        // Reload the page to get the updated list
        location.reload();
      }
    );

  });

});