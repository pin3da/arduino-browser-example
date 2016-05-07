var five = require('johnny-five');
var board = new five.Board();

var http = require('http');
var ecstatic = require('ecstatic');

var server = http.createServer(ecstatic({
  root: __dirname + '/web'
}));

var io = require('socket.io')(server);

var port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('Server ready on port ' + port);
});


board.on('ready', function () {
  var led = {};

  led['11'] = new five.Led(11);
  led['12'] = new five.Led(12);
  led['13'] = new five.Led(13);

  io.on('connection', function (socket) {
    console.log('new user connected');
    socket.on('strobe', function (number) {
      console.log('strobe ' + number);
      led[number].strobe();
    });

    socket.on('start', function (number) {
      console.log('start ' + number);
      led[number].on();
    });

    socket.on('stop', function (number) {
      console.log('stop ' + number);
      led[number].stop();
      led[number].off();
    });
  });

});
