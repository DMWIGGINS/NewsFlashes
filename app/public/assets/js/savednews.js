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



$(document).on('click', '#seeNotesBtn', function (event) {
    console.log("seeNotesBtn clicked");
    var id = $(this).data("id");
    // $('#notesModal').modal("data-show");

    $.ajax("/api/notes/" + id, {
        type: "GET",
    }).then(
        function (data) {
            console.log(data);
        });
});


$(document).on('click', '#addNotesBtn', function (event) {
    console.log("addNotesBtn clicked");

           var id = $(this).data("id");

    
        // $('#notesModal').modal("data-show");

        $.ajax("/api/notes/" + id, {
            type: "POST",
            data: newNote
        }).then(
            function (data) {
                console.log(data);
            });
});





//   $(document).on('click', '#deleteNotesBtn', function (event) {
// console.log("deleteNotesBtn clicked");
//     // Make sure to preventDefault on a submit event.

//   });