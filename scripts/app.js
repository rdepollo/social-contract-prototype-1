$(document).ready(function() {

  function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  var config = {
    apiKey: "AIzaSyD8HOyzY4M28_UUxOViMkMznoteOJh6Ot4",
    authDomain: "social-contract-38c49.firebaseapp.com",
    databaseURL: "https://social-contract-38c49.firebaseio.com",
    projectId: "social-contract-38c49",
    storageBucket: "social-contract-38c49.appspot.com",
    messagingSenderId: "937098666552"
  };

  firebase.initializeApp(config);
  var posts = firebase.database().ref('posts');

  var categoryselection = $(".selection").text();

  $('.option').click(function() {
    var option = $(this).text();
    var holder = [categoryselection, option];
    $(".selection").text(holder[1]);
    $(this).text(holder[0]);
    console.log(holder[0]);
    console.log(holder[1]);
    categoryselection = $(".selection").text();
  })




  var updatePosts = function() {
    posts.on('child_added', function(myFirebaseItem) {

      // Access the child of the main branch
      var firebaseChild = myFirebaseItem.val();

      // Get the message metadata
      var postCategory = firebaseChild.category;

      // Get the username metadata
      var postContent = firebaseChild.content;
      var postID = firebaseChild.id;
      var postDate = firebaseChild.date;
      var yesVotes = firebaseChild.yesvotesCount;
      var noVotes = firebaseChild.novotesCount;

      // $('#messages').append(userMessage + ' by ' + userName);
      $('#posts').append('<div class="post" data-postId="' + postID + '">Is it considered ' + postCategory + ' when ' + postContent + '<br><span class="yes">yes</span> <span class="no">no</span><br><span class="yesvotes">'+yesVotes+'</span><span class="novotes">'+noVotes+'</span><br><span class="postdate">' + postDate + '</div>');

    });
  }

  updatePosts();

  var provider = new firebase.auth.GoogleAuthProvider();

  // USER BRANCH FROM THE DATABASE
  var userBranch = firebase.database().ref('users');

  // VARIABLES TO BE USED BELOW
  var userId, currentUser;

  $('#login').click(function() {

    // Initaliaze FB login system for Google users
    firebase.auth().signInWithPopup(provider).then(function(result) {

      // Necessary User variables
      var token = result.credential.accessToken;
      var user = result.user;

      // Grab the current user's
      // Define the userId with the current user
      userId = result.user.uid;
      console.log(result.user.uid + "yeeehaw");

      // Display the U
      $('#profile .uid').text(userId);

      // Define currentUser var to the child insde the User Branch
      currentUser = firebase.database().ref('users').child(userId);

      $('.send').click(function() {
        var date = new Date();
        var category = categoryselection;
        var content = $('.content').text();
        posts.push({
          category: category,
          content: content,
          author: userId,
          date: date.toDateString(),
          id: makeid(15),
          yesvotesCount: "0",
          novotesCount: "0"

        });
        // Empty out the divs
        $('.content').text("...");
      })

      $(".yes").click(function() {
        var selectedID = $(this).parent().attr('data-postId');
        posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(function(data) {
            snapshot.forEach(function(data) {
              target = data.key
              return target
            });
            return target;
          });

          return target;
        });
        console.log(target);
        ///////////////////////////////
        posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(function(data) {
            snapshot.forEach(function(data) {
              target = data.key
              return target
            });
            return target;
          });

          return target;
        });
        firebase.database().ref("users/" + userId + "/votes").once("value", function(snapshot) {
          if (snapshot.hasChild(target)) {
            console.log('exists');
          } else {
            console.log("doesn't");
            var date = new Date();
            var voteLog = {};
            voteLog[userId] = date.toDateString();
            firebase.database().ref("posts/" + target + "/yesvotes").update(voteLog);

            var what = firebase.database().ref("posts").child(target).key;
            var who = firebase.database().ref("posts/" + what).child("yesvotesCount").key;
            firebase.database().ref('/posts/' + what).once('value', function(snapshot) {
              var holder = snapshot.child("yesvotesCount").val();
              var number = parseInt(holder) + 1;
              var yesvoteLog = {};
              yesvoteLog["yesvotesCount"] = number.toString();
              firebase.database().ref("posts/" + target).update(yesvoteLog)
            });
            var postLog = {};
            postLog[target] = "yes";
            firebase.database().ref("users/" + userId + "/votes").update(postLog);
          }
        });
      });

      $(".no").click(function() {
        var selectedID = $(this).parent().attr('data-postId');
        posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(function(data) {
            snapshot.forEach(function(data) {
              target = data.key
              return target
            });
            return target;
          });

          return target;
        });
        console.log(target);
        ///////////////////////////////
        posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
          console.log(snapshot.val());
          snapshot.forEach(function(data) {
            snapshot.forEach(function(data) {
              target = data.key
              return target
            });
            return target;
          });

          return target;
        });
        firebase.database().ref("users/" + userId + "/votes").once("value", function(snapshot) {
          if (snapshot.hasChild(target)) {
            console.log('exists');
          } else {
            console.log("doesn't");
            var date = new Date();
            var voteLog = {};
            voteLog[userId] = date.toDateString();
            firebase.database().ref("posts/" + target + "/novotes").update(voteLog);
            var what = firebase.database().ref("posts").child(target).key;
            var who = firebase.database().ref("posts/" + what).child("novotesCount").key;
            firebase.database().ref('/posts/' + what).once('value', function(snapshot) {
              var holder = snapshot.child("novotesCount").val();
              var number = parseInt(holder) + 1;
              var novoteLog = {};
              novoteLog["novotesCount"] = number.toString();
              firebase.database().ref("posts/" + target).update(novoteLog)
            });
            var postLog = {};
            postLog[target] = "no";
            firebase.database().ref("users/" + userId + "/votes").update(postLog);
          }
        });
      });


      // If there is an error
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })






})
