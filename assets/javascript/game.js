$( document).ready(function(){
	//Array that holds gifs.
	var actions = ["Dancing", "Singing", "Crying", "Laughing"];
	//

	//Function that displays all gif buttons 
	function displayGifButtons(){
		//Deleting buttons prior to adding new buttons 
		//erasing anything in this div id so that it doesn't duplicate the results 
		$("#gifButtonsView").empty(); 
		//Looping through the array of actions 
		for (var i = 0; i < actions.length; i++){
		//Dynamically generating buttons for each actions in the array
		//All the code needed for jQuery start and end tag
			var gifButton = $("<button>");
			//Adding a class
			gifButton.addClass("action"); 
			gifButton.addClass("btn btn-primary")
			//Adding a data-attribute with the value of the action at index i 
			gifButton.attr("data-name", actions[i]);
			//Providing the button's text with a value of the movie at index i 
			gifButton.text(actions[i]);
			//adding the button to the HTML 
			$("#gifButtonsView").append(gifButton);
		}
		$("#gifButtonsView").on('click', '.action', retrieveGifs)
	}
		

	//This function handles events where one button is clicked 
	$("#addGif").on("click", function(event) {
	//event.preventDefaut () prevents the form from trying to submit itself.
	//We're using a form so that the user can hit enter instead of clicking the button if they want
	event.preventDefault();

	//This line will grab the text from the input box
	var action = $("#action-input").val().trim();

	//THe action from the textbox is then added to our array
	actions.push(action);

	//calling displayGifButtons which handles the processing of our action array
	displayGifButtons();
});

// calling the displayGifButton function at least once to display the intial list of actions 
displayGifButtons();
});


// Function that displays gifs 
function retrieveGifs(action){
	var action = $(this).attr("data-name");
	
	//Query giphy API to retrieve 10 giphy matching the topic 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&limit=10&api_key=dc6zaTOxFJmzC";
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		displayGifs(response);

	});

};

//Display gifs in DOM
function displayGifs (response){

	//Delete existing gifs to make room for new gifs 
	$("#gifsView").empty();
	var results = response.data; 

	//Loop through array of gif responses
	for (var i = 0;  i < results.length; i++) { 

		console.log(results.length);


		
		//Creating a div to hold the action 
		var gifDiv = $("<div class='action'>");

		//Storing the rating data 
		var rating = response.data[i].rating; 
	
		//Creating an element to have the rating displayed 
		var gifRating = $("<p ='rating'>").text("Rating: " + rating);

		//Displaying the rating 
		gifDiv.append(gifRating);

		//pulling the URL image 
		var gifImage = response.data[i].images.original.url;

		//Store still version of gif for still state
		var stillGif = response.data[i].images.original_still.url;

		//Creating an element to hold the image 
		var gifImage = $("<img>").attr("src", stillGif);

		//Appending the image
		gifImage.addClass("gif"); 

		gifImage.attr("data-still", stillGif);

		gifImage.attr("data-animate", gifImage); 

		//Default src displayed is still gif
		gifImage.attr("data-state", "still"); 

		gifDiv.append(gifImage); 

		//Putting the entire image above the previous action 
		$("#gifsView").prepend(gifDiv);
	
	}

};  

//Document Event Listeners 
$(document).on("click", ".action", displayGifs); 
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if( state == 'still'){
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
});;
		


