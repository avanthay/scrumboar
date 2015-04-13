describe('CardList', function() {
    var cardList,
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

    it("should provide a function to get all cards with the same status", function() {
        cardToDo = new Card({status: 'to do'});
        cardToDo2 = new Card({status: 'to do'});
        cardNotToDo = new Card({status: 'in progress'});
        cardList.add([cardToDo, cardToDo2, cardNotToDo]);
        expect(cardList.getCardsWithStatus('to do').length).toBe(2);
        expect(cardList.getCardsWithStatus('in progress').length).toBe(1);
        expect(cardList.getCardsWithStatus('done').length).toBe(0);
    });

});