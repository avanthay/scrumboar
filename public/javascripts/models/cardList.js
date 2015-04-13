var CardList = Backbone.Collection.extend({
    model: Card,
    getCardsWithStatus: function(status) {
        return this.filter(function(card) {
            return card.get('status') == status;
        });
    }
});