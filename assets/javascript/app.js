$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCc-7rNrOn0LomKyRCQvqa3cc6rbnXM_Ig",
        authDomain: "trainscheduler-f5d69.firebaseapp.com",
        databaseURL: "https://trainscheduler-f5d69.firebaseio.com",
        storageBucket: "trainscheduler-f5d69.appspot.com",
        messagingSenderId: "242377092637"
    };
    firebase.initializeApp(config);

    //create a variable to reference the database

    var dataFire = firebase.database();

     //on button click, store data
     $("#submit-btn").on("click", function(event) {
     //don't refresh the page
        event.preventDefault();

        //code in logic for storing and retrieving the most recent information.

        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        //clear input fields after submit

        $("#name").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

        //push data rather than set in order to add onto previous data

        dataFire.ref().push({
            name: name,
            destination: destination,
            time: firstTrain,
            frequency: frequency
        });
    });

    //create firebase "watcher"

    dataFire.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());


        //create new variables for clean build from childSnapshot of data from firebase

        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var time = childSnapshot.val().time;
        var key = childSnapshot.key;
        var remove = "<button class='glyphicon glyphicon-trash' id=" + key + "></button>"

        //convert first train time back a year to make sure it is set before current time before pushing to firebase.

        var firstTrainConverted = moment(time, "hh:mm").subtract(1, "years");
        console.log(firstTrainConverted);

        //set a variable equal to the current time from moment.js

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));

        //post current time to jumbotron for reference

        $("#currentTime").html("Current Time: " + moment(currentTime).format("hh:mm"));

        //difference between the first train time and the current time

        var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("Difference In Time: " + timeDiff);

        //time apart by finding the remainder of the time difference and the frequency

        var timeRemainder = timeDiff % frequency;
        console.log(timeRemainder);

        //minutes until the next train

        var nextTrainMin = frequency - timeRemainder;
        console.log("Minutes Till Train: " + nextTrainMin);

        //find the time of the next train arrival

        var nextTrainAdd = moment().add(nextTrainMin, "minutes");
        var nextTrainArr = moment(nextTrainAdd).format("hh:mm");
        console.log("Arrival Time: " + nextTrainArr);

        //prepend all information for train data submitted by user

        $("#schedule").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainArr + "</td><td>" + nextTrainMin + "</td><td>" + remove + "</td></tr>");


    }, function(err) {
        console.log(err);
    }); 

});
