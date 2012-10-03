
// Foo App
// -----------

// A first simple way of encapsulating your code in a
// *namespace*
var Foo = {

  // ### init
  init: function() {
    this.tmpl = Hogan.compile($("#tweets-tmpl").html());
    this.loadTweets();
  },

  // ### loadTweets
  loadTweets: function() {
    var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=lillerik&count=5";

    // store a reference to this.
    var _this = this;

    // Load the tweets...
    $.ajax({ url: url, dataType: "jsonp" })

      // ... when fails
      .fail(function(response) {
        console.log(response);
      })

      // ... when done.
      .done(function(tweets) {
        // render the template
        $(".tweets .span6").append(_this.tmpl.render({ tweets: tweets }));
      });
  }

};

// When DOM is loaded, initialize our application
$(function() {
  Foo.init();
});

