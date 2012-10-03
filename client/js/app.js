
// Foo App
// -----------

// When DOM is loaded, load our tweets.
$(function() {

  var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=lillerik&count=5";
  var tmpl = Hogan.compile($("#tweets-tmpl").html());

  // Load the tweets...
  $.ajax({ url: url, dataType: "jsonp" })

    // ... // when fails
    .fail(function(response) {
      console.log(response);
    })

    // ... when done.
    .done(function(tweets) {
      // render the template
      $(".tweets .span6").append(tmpl.render({ tweets: tweets }));
    });

});
