describe('CardList', function() {
    var CardList = require('../../models/CardList'),
        Card = require('../../models/Card'),
        cardList,
        card;

    beforeEach(function() {
        cardList = new CardList();
        card = new Card();
    });

    it("should be defined", function() {
        expect(CardList).toBeDefined();
        expect(cardList).toBeDefined();
    });

    it("should be able to save a card in the list", function() {
        var amountOfCards = cardList.length;
        cardList.add(card);
        expect(cardList.length).toEqual(amountOfCards + 1);
    });

});