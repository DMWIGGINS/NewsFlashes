$(document).on('click', '#deleteNewsBtn', function (event) {
console.log("deleteNewsBtn clicked");

var id = $(this).data("id");

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


// Make sure to preventDefault on a submit event.


// });


// $(document).on('click', '#addNotesBtn', function (event) {
// console.log("addNotesBtn clicked");
//     // Make sure to preventDefault on a submit event.


//   });

//   $(document).on('click', '#deleteNotesBtn', function (event) {
// console.log("deleteNotesBtn clicked");
//     // Make sure to preventDefault on a submit event.

//   });