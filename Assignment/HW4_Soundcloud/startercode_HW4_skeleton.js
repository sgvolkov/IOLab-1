// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
            render(data)
		},'json'
	);
}

// Calls API with user's input
$("#new-item").on('click', function() {
    // once the document loads, create new item with this function
    var user_input = $('#todo-item-input').val();
    callAPI(user_input)
})

// Add a song to the playlist; change the button text from 'add' to 'remove'
$("#list_todo").on('click', '.move', function() {
        // move from list_todo container to list_completed container
        ($(this).html("Remove from playlist"));
        var workingItem = $(this).parent();
        $(workingItem).clone().prependTo("#list_completed").css("color", "#B10DC9"); //changing the color of a completed item
});


// Remove a song from the playlist
$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container
        ($(this).html("Move me to playlist"));
        var incompleteItem = $(this).parent();
        $(incompleteItem).remove();
});


// Play a song with the play button
$("#list_todo").on('click', '.play', function(){
    var url = $(this).attr('id');
    changeTrack(url);
})

//Select the necessary elements from JSON object (title, artist, image, URL)
function render(data) {
    //songlist= []
    for (i = 0; i < 20; i++) {
        var title = data[i].title;
        var url = data[i].permalink_url;
        var artist = data[i].user.username;
        var picture = data[i].artwork_url;
        $('#list_todo').prepend("<ol><button class='move'> Move me to playlist! </button>" + title + "&nbsp;" + artist + "&nbsp;" + "<img src = '" + picture + "'>" + "&nbsp;" + "<button class='play' id="+url+"> Play! </button></ol>");
    }
}


// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}


