var CardList = Backbone.Collection.extend({

    model: Card,

    getCardsWithStatus: function(status) {
        return this.filter(function(card) {
            return card.get('status') == status;
        });
    }

});

var CardListView = Backbone.View.extend({

    cards: new CardList(),

    events: {

    },

    appendCard: function(card) {
        $.each($('.card-container'), function() {
            if ($(this).data('status') == card.get('status')) {
                var cardView = new CardView({model: card});
                $(this).find('.cards').append(cardView.render().el);
            }
        });
    },

    updateTempId: function(tempId, newId) {
        var card = this.cards.get(tempId);
        card.set('id', newId);
        this.cards.set(card);
    },

    updateCard: function(card) {
        var theCard = this.cards.get(card.id);
        theCard.set(card);
        this.cards.set(theCard);
    },

    createCard: function(card) {
        var newCard;
        if (card.id) {
            newCard = this.cards.set(card);
        } else {
            newCard = this.cards.create(card);
        }
        this.appendCard(newCard);
    },

    createCards: function(cards) {
        var self = this;
        $.each(cards, function(index, value) {
            self.createCard(value);
        });
    }

});