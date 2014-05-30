
var convert = function(json) {
  var s = '?';
  for (var i = 0; i < json.length; i++) {
    var obj = json[i];
    s += json[i].entrants + ',' + Number(json[i].playing) + ',' + json[i].edge + ',';
  }
  s = s.substring(0,s.length-1);
};

var decode = function() {
  var events = document.getElementById('events');
  while (events.hasChildNodes()) {
    events.removeChild(events.lastChild);
  }
  var s = window.location.search.substring(2);
  if (s.charAt(s.length-1) === '/') {
    s = s.substring(0,s.length-1);
  }
  var data = s.split(',');
  var count = 0;
  for (var i = 0; i < data.length; i+=3) {
    wsop[count].entrants = Number(data[i]);
    if (data[i+1] === '0') wsop[count].playing = false;
    else wsop[count].playing = true;
    wsop[count].edge = Number(data[i+2]);
    count++;
  }
  loadData();
  recalculate();
};