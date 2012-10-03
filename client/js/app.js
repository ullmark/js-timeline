
// Foo App
// -----------

// Our namespace
var Foo = {};

// Tweet List
// ----------
Foo.TweetList = function(el) {
  this.el = $(el);
  this.url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";
  this.url += this.el.data("handle") + "&count=5";
  this.loadTweets();
};

// Our tmpl
Foo.TweetList.prototype.tmpl = Hogan.compile($("#tweets-tmpl").html());

// ### loadTweets
Foo.TweetList.prototype.loadTweets = function() {
  // keep track of *this*
  var _this = this;
  // Load the tweets...
  $.ajax({ url: this.url, dataType: "jsonp" })

    // ... when fails
    .fail(function(response) {
      console.log(response);
    })

    // ... when done.
    .done(function(tweets) {
      // render the template
      _this.el.find(".span6").append(_this.tmpl.render({ tweets: tweets }));
    });
};

// When DOM is loaded, loop all tweet lists and
// create a **TweetList** for each.
$(function() {

  $(".tweets").each(function(index, el) {
    new Foo.TweetList(el);
  });

});
