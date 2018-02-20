// when addNotesBtn is clicked the text from the text box will be sent to the database
$(document).on('click', '#addNotesBtn', function (event) {
    console.log("addNotesBtn clicked");

    var id = $(this).data("id");
    console.log(id);;
    var newNote = {
        _id: id,
        text: $("#newNote").val().trim()
    }
    console.log(newNote);

    $.ajax("/api/notes/" + id, {
        type: "POST",
        data: newNote
    }).then(
        function () {
            alert("Saving Note!");
            location.reload();
        });
});

// when the deleteNotesBtn is clicked the note will be deleted from the database
$(document).on('click', '#deleteNotesBtn', function (event) {
    console.log("deleteNotesBtn clicked");
    var id = $(this).data("id");
    $.ajax("/api/notes/" + id, {
        type: "DELETE",
    }).then(
        function () {
            console.log("You Deleted the Note");
            // Reload the page to get the updated list
            location.reload();
        });
});