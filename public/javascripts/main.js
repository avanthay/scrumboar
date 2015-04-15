var socket = io();

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

    $('.cards').sortable({
        connectWith: '.cards',
        update: function(event, ui) {
            $('.card').trigger('sortupdate');
        }
    }).doubletap(function(e) {
        $(e.target).trigger('dblclick');
    });

    $('.delete').droppable({
        tolerance: 'touch',
        over: function(event, ui) {
            ui.draggable.find('div').hide();
            ui.draggable.append($('<div>').addClass('over').append($('<span>').addClass('glyphicon glyphicon-trash').attr('aria-hidden', true)));
        },
        out: function(event, ui) {
            ui.draggable.find('.over').remove();
            ui.draggable.find('div').show();
        },
        drop: function(event, ui) {
            ui.draggable.trigger('drop');
        }
    });

});
