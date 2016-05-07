var io = require('socket.io-client')();

document.addEventListener('DOMContentLoaded', function () {
  var events = ['strobe', 'start', 'stop'];
  var led = ['11', '13', '12'];

  for (var i = 0; i < events.length; ++i) {
    for (var j = 0; j < led.length; ++j) {
      var button = document.createElement('BUTTON');
      button.innerText = events[i] + ' ' + led[j];
      button.id = events[i] + led[j];
      (function (b, e, l) {
        b.addEventListener('click', function (ev) {
          console.log(e, l);
          io.emit(e, l);
        });
      })(button, events[i], led[j]);
      document.body.appendChild(button);
    }
  }
});
