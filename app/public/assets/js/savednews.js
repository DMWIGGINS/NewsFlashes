// when deleteNewsBtn is clicked delete the article from the saved page 
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
})