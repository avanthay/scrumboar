var CardList = Backbone.Collection.extend({

    model: Card,

    getCardsWithStatus: function(status) {
        return this.filter(function(card) {
            return card.get('status') == status;
        });
    },

    appendCard: function(card) {
        var self = this;
        $.each($('.card-container'), function() {
            if ($(this).data('status') == card.get('status')) {
                var cardView = new CardView({model: card, collection: self});
                $(this).find('.cards').append(cardView.render().el);
            }
        });
    },

    updateTempId: function(tempId, newId) {
        var card = this.get(tempId);
        card.set('id', newId);
    },

    updateCard: function(card) {
        var theCard = this.get(card.id);
        theCard.set(card);
    },

    deleteCard: function(card) {
        var theCard = this.get(card.id);
        this.remove(theCard);
    },

    createCard: function(card) {
        this.appendCard(this.create(card));
    },

    createCards: function(cards) {
        var self = this;
        $.each(cards, function(index, value) {
            self.createCard(value);
        });
    },

    resetCards: function(cards) {
        this.reset();
        this.createCards(cards);
    }

});