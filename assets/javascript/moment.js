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

    var dataRef = firebase.database();

});