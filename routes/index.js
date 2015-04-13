var express = require('express'),
    app = express(),
    router = express.Router(),
    CardList = require('../models/CardList'),
    Card = require('../models/Card'),
    cardList = cardList || new CardList(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

http.listen(8080);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

router.get('/', function(req, res, next) {
  mycard = new Card();
  cardList.add(mycard);
  res.render('index', { cards: cardList });
});

module.exports = router;
