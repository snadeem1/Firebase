$( document ).ready(function() {
var config = {
  apiKey: "AIzaSyBySqxLoIdEYCTz8aGwBOhnrqsx25388bc",
  authDomain: "train-tracker-572cc.firebaseapp.com",
  databaseURL: "https://train-tracker-572cc.firebaseio.com",
  projectId: "train-tracker-572cc",
  storageBucket: "train-tracker-572cc.appspot.com",
  messagingSenderId: "1014114410039"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainTime = $("#time-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

var newTrain = {
  name : trainName,
  destination : trainDestination,
  time : trainTime,
  frequency : trainFrequency
};

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

alert("Train successfully added");

$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain+ "</td></tr>");
});
});