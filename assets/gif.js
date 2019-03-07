$(document).ready(()=>{
    // let newSinger = "";
    //here's my array of people I want to add
    let singerArray = ["Don Henley", "Jackson Browne", "Madonna", "Ricky Martin", "Bruno Mars", "Prince", "Adam Levine", "Sting", "Rob Thomas", "Lady Gaga"];
    function displaySingers(){
    //clears out gif display id 
    $("#buttons").empty();
    for(let i = 0; i < singerArray.length; i++){
        //this creates a button that matches the array elements
        let gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary");
        gifButton.attr("data-name", singerArray[i]);
        gifButton.text(singerArray[i]);
        $("#buttons").append(gifButton);
        
        }
    }
    //when a user wants to add a new singer to the array
    function addSinger(){
        $("#add-gif").on("click", ()=>{
            let action = $("#gif-input").val().trim();
            if(action === ""){
                alert("Make sure you put in someone's name!");
                return false;
            }
            singerArray.push(action);

            displaySingers();
            return false;
        })
    }

    //when the user wants to remove the last person
    function removeSinger(){
        $("#remove-gif").on("click", ()=>{
            singerArray.pop(); //or singerArray.pop(newSinger);
            displaySingers();
            return false;

        });
    }

    function displayGifs(){
        let action = $(this).attr("data-name");
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=91wq4dRZPLF9JLhgQdH9BrfCqvqAvaWF&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response){
            $("#gif-display").empty();
            let singerGif = response.data;
            if(singerGif === ""){
                alert("Sorry, homeslice. Nothing to see here.");
            }
            for(let i = 0; i < singerGif.length; i++){
                let singerDiv = $("<div>");
                singerDiv.addClass("singerDiv");
                let singerRating = $("<p>").text("Rating: " + singerGif[i].rating);
                singerDiv.append(singerRating);
                let singerImages = $("<img>");
                singerImages.attr("src", singerGif[i].images.fixed_height_small_still.url);
                singerImages.attr("data-still", singerGif[i].images.fixed_height_small_still.url);
                singerImages.attr("data-animate", singerGif[i].images.fixed_height_small.url);
                singerImages.attr("data-state", "still");
                singerImages.addClass("image");
                singerDiv.append(singerImages);
                $("#gif-display").prepend(singerDiv);
            }
        });
    }
    displaySingers();
    addSinger();
    removeSinger();
    //event listeners
    $(document.body).on("click", ".action", displayGifs);
    $(document.body).on("click", ".image", function(){
        console.log(this);
        console.log($(this));
        let state = $(this).attr("data-state");
        // alert($(this).attr("data-animate"));
        // alert($(this));
        if(state === "still"){
            // alert("still");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            // alert("else");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    });
})