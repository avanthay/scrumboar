var express = require('express'),
    app = express(),
    router = express.Router(),
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
  res.render('index', { });
});

module.exports = router;
