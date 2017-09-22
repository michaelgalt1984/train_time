
$(document).ready(function(){
// My firebase database
var config = {
	apiKey: "AIzaSyCiTU2Br0lIWnrYWPYCM-a82YtAWUZ35Jk",
	authDomain: "traintime-aec7d.firebaseapp.com",
	databaseURL: "https://traintime-aec7d.firebaseio.com",
	projectId: "traintime-aec7d",
	storageBucket: "traintime-aec7d.appspot.com",
	messagingSenderId: "387467378315"
};
firebase.initializeApp(config);

var allScheduleStuff = firebase.database();

$("#submit_train_request").on("click", function() {

	// Need to make sure that it first gets the values from each input field in the request form
	var train_name = $("#train_name_input").val().trim();
	var destination = $("#destination_input").val().trim();
	var first_train_time = $("#first_train_time_input").val().trim();
	var frequency = $("#frequency_input").val().trim();

	// Now I need to store all that information in an object, which has keys that I can reference for Firebase
	var freshly_inputted_train_data = {
		name: train_name,
		destination: destination,
		first_train_time: first_train_time,
		frequency: frequency
	};

	// Making sure that object actually works- it does!
	console.log(freshly_inputted_train_data);

	// Now I need to get that information stored on Firebase...
	allScheduleStuff.ref().push(freshly_inputted_train_data);

	// And it looks like it worked... So now I need to that actually get written to the table, which means it will need to draw it from Firebase and then write it to the table


});

allScheduleStuff.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	var firebase_name = childSnapshot.val().name;
	var firebase_destination = childSnapshot.val().destination;
	var firebase_frequency = childSnapshot.val().frequency;
	var firebase_first_train_time = childSnapshot.val().first_train_time;

	// Still haven't done the functions for moment.js to get the next time and time to the next train


	var moment_calculator = moment().diff(moment.unix(firebase_first_train_time), "minutes");
	var time_to_next_train = moment().diff(moment.unix(firebase_first_train_time), "minutes") % firebase_frequency;
	var time_in_minutes = firebase_frequency - time_to_next_train;

  	var arrival_time = moment().add(time_in_minutes, "m").format("hh:mm A");


  $("#train_info > tbody").append("<tr><td>" + firebase_name + "</td><td>" + firebase_destination + "</td><td>"
  	+ firebase_frequency + "</td><td>" + arrival_time + "</td><td>" + time_in_minutes + "</td></tr>");
});

		// And that didn't work... I realize now that I don't have the information for all the other fields of the table (next_arrival_of_train and minutes_away_for_train), so I'm just going to put blank data in there to test that
		// Still isn't working... not sure why not :/  I have it getting written to Firebase... and it should just put those fields into the table
		
		// I guess that I need to try to make the functions to calculate the time for the next arrival of the train, and for how many minutes away that is...
	})