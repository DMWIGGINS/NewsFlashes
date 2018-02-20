$(document).on('click', '#deleteNewsBtn', function (event) {
    console.log("deleteNewsBtn clicked");

    var id = $(this).data("id");
    console.log(id);
    // Send the DELETE request.
    $.ajax("/api/savednews/" + id, {
        type: "DELETE",

    }).then(
        function () {
            console.log("You Deleted It");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});



// $(document).on('click', '#seeNotesBtn', function (event) {
//     console.log("seeNotesBtn clicked");

//     var id = $(this).data("id");


//     $.ajax("/notes/" + id, {
//         type: "GET",
//     }).then(
//         function (data) {
//             console.log("notes successful");
//             location.reload();

//         });
// });