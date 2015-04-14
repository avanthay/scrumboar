var socketIo = require('socket.io'),
    uuid = require('node-uuid'),
    cards = {};

var createCard = function(card) {
        if (!card.id) {
            card.id = uuid.v1();
        }
        return updateCard(card);
    },
    updateCard = function(card) {
        if (card.id) {
            cards[card.id] = card;
            return card.id;
        }
        return false;
    },
    deleteCard = function(card) {
        if (card.id) {
            delete(cards[card.id]);
            return true;
        }
        return false;
    };

var create = function(app) {
    io = socketIo(app);

    io.on('connection', function(socket) {
        socket.emit('init', {cards: cards});
        socket.on('card', function(attrs) {
            if (attrs.method && attrs.card) {
                switch (attrs.method) {
                    case 'create':
                        var id = createCard(attrs.card);
                        if (id) {
                            attrs.card.id = id;
                            socket.emit('created', {tempId: attrs.cid, newId: id});
                        }
                        break;
                    case 'update':
                        updateCard(attrs.card);
                        break;
                    case 'delete':
                        deleteCard(attrs.card);
                        break;
                    default:
                        return;
                }
                socket.broadcast.emit('card', attrs);
            }
        });
    });
};

module.exports = create;