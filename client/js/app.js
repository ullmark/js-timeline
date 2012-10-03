
// Foo App
// -----------

// When DOM is loaded, load our tweets.
$(function() {

  var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=lillerik&count=5";

  // Load the tweets...
  $.ajax({ url: url, dataType: "jsonp" })
    // ... // when fails
    .fail(function(response) {
      console.log(response);
    })
    // ... when done.
    .done(function(tweets) {
      // Create a container for the tweets.
      var ul = $("<ul>");
      // We got some tweets, loop them and create the html
      $.each(tweets, function(index, tweet) {
        var li = $("<li>").html(tweet.text);
        var img = $("<img>", { "src": tweet.user.profile_image_url, "alt": "" });
        li.prepend(img);
        ul.append(li);
      });

      // append it to the page in the correct place
      $(".tweets .span6").append(ul);
    });

});
