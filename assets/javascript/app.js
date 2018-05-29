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


});

});
