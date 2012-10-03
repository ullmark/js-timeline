
// Foo App
// -----------

// Our namespaces
var Foo = {};
Foo.Models = {};
Foo.Collections = {};
Foo.Views = {};

// Models
// --------------

Foo.Models.Tweet = Backbone.Model.extend({
});

// Collections
// --------------

Foo.Collections.TweetCollection = Backbone.Collection.extend({
});

// Views
// --------------

Foo.Views.TweetList = Backbone.View.extend({
  // our template
  tmpl: Hogan.compile($("#tweet-tmpl").html()),

  // ### initialize
  initialize: function() {
    _.bindAll(this);

    this.ul = $("<ul>");

    var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";
    url += this.$el.data("handle") + "&count=5";

    this.tweets = new Foo.Collections.TweetCollection();
    this.tweets.url = url;
    this.tweets.on("reset", this.addAll);
    this.tweets.on("add", this.addOne);
  },

  // ### addAll
  addAll: function(tweets) {
    tweets.each(this.addOne);
  },

  // ### addOne
  addOne: function(tweet) {
    this.$("ul").append(this.tmpl.render(tweet.attributes));
  },

  // ### render
  render: function() {
    this.$(".span6").append(this.ul);
    this.tweets.fetch({ dataType: "jsonp" });
    return this;
  }

});

Foo.Views.App = Backbone.View.extend({
  // The el is already visible on page
  el: $("#foo"),

  // ### initialize
  initialize: function() {
    this.$(".tweets").each(function(index, el) {
      var tweets = new Foo.Views.TweetList({ el: el });
      tweets.render();
    });
  }

});

$(function() {
  new Foo.Views.App;
});
