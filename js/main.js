
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

	// And it looks like it worked...


});
})