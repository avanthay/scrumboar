var socket = io('http://localhost:8080/');

socket.on('init', function(attrs) {
    if (attrs.cards) {
        cardList.resetCards(attrs.cards);
    }
});

socket.on('disconnect', function(attrs) {
    //TODO show message 'disconnected'
    cardList.resetCards({});
});

socket.on('created', function(attrs) {
    cardList.updateTempId(attrs.tempId, attrs.newId);
});

socket.on('card', function(attrs) {
    if (attrs.method && attrs.card) {
        switch(attrs.method) {
            case 'create':
                cardList.createCard(attrs.card);
                break;
            case 'update':
                cardList.updateCard(attrs.card);
                break;
            case 'delete':
                cardList.deleteCard(attrs.card);
                break;
            default:
                return;
        }
    }
});

$(document).ready(function() {
    window.cardList = new CardList();

    $('.create').click(function(e) {
        cardList.createCard({status: $(this).parent().data('status') });
        e.preventDefault();
    });

});
