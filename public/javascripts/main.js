var socket = io('http://localhost:8080/');

socket.on('init', function(attrs) {
    if (attrs.cards) {
        cardListView.createCards(attrs.cards);
    }
});

socket.on('created', function(attrs) {
    cardListView.updateTempId(attrs.tempId, attrs.newId);
});

socket.on('card', function(attrs) {
    if (attrs.method && attrs.card) {
        switch(attrs.method) {
            case 'create':
                cardListView.createCard(attrs.card);
                break;
            case 'update':
                //TODO implement update
                break;
            case 'delete':
                //TODO implement delete
                break;
            default:
                return;
        }
    }
});

$(document).ready(function() {
    window.cardListView = new CardListView();

    $('.create').click(function(e) {
        cardListView.createCard({status: $(this).parent().data('status') });
        e.preventDefault();
    });

});
