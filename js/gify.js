// array that holds the already defined buttons on screen in the gif-buttons id
var food = ["Bacon", "Kbbq", "Chinese", "Grilled Cheese", "Pizza", "Pancakes", "Donuts", "Ice Cream", "Waffles", "Tacos"];
console.log(food);
 
function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < food.length; i++) {
        var button = $("<button class='waves-effect waves-light btn'>");
        button.addClass("gifButton");
        button.attr("data-name", food[i]);
        button.text(food[i]);
        $("#gif-buttons").append(button);
    }

    // On Click function for each gif button that pushes that value into the queryURL variable
    $(".gifButton").click(function () {
        // empties the div with id food-gifs so that only those of the button clicked are shown
        $("#food-gifs").empty();
        var gifClicked = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifClicked + "&api_key=QnwuhO1xbCtEj7JlHRH8hZEehT9cOjTH&limit=5";
        $.ajax({
                url: queryURL,
                method: "GET"
            }) 
            .done(function (response) {

                var gif = response.data;
                for (i = 0; i < gif.length; i++) {
                    var p = $("<p>");
                    p.addClass("rating");
                    p.text("Rating: " + gif[i].rating);
                    var gifImg = $("<img>");

                    gifImg.attr({
                        "src": gif[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-still": gif[i].images.fixed_height_still.url,
                        "data-animate": gif[i].images.fixed_height.url
                    });
                    var state = $(this).attr("data-state", "animated");
                    // put the p tag information and gifimg information into the div with id food-gifs
                    $("#food-gifs").prepend(p, gifImg);
                    $(gifImg).click(function () {
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                            // if state is animate then change it to data still and change url
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                };

            });

    });
};
renderButtons();
$("#add-button").click(function () {
    event.preventDefault();
    var gifInput = $("#gif-input").val().trim();
    food.push(gifInput);
    $("#gif-input").val("");
    renderButtons();
});
