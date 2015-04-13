var Backbone = require('backbone');
var Card = require('./Card');

var CardList = Backbone.Collection.extend({
    model: Card
});

module.exports = CardList;