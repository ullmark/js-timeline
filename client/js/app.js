
// Foo App
// -----------

// A first simple way of encapsulating your code in a
// *namespace*
var Foo = (function() {

  // our template to use
  var tmpl = Hogan.compile($("#tweets-tmpl").html());

  // ### init
  var init = function() {
    loadTweets();
  },

  // ### loadTweets
  loadTweets = function() {
    var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=lillerik&count=5";

    // Load the tweets...
    $.ajax({ url: url, dataType: "jsonp" })

      // ... when fails
      .fail(function(response) {
        console.log(response);
      })

      // ... when done.
      .done(function(tweets) {
        // render the template
        $(".tweets .span6").append(tmpl.render({ tweets: tweets }));
      });
  };

  // Return the function to be made public
  return {
    init: init
  }

})();

// When DOM is loaded, initialize our application
$(function() {
  Foo.init();
});

