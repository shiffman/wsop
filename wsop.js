
var adjust = function(val,i) {
  var field = document.getElementById('players'+i);
  field.value =val;
  winningProb(i);
  recalculate();
};

var changeRange = function(val,i) {
  var playersrange = document.getElementById('playersrange'+i);
  playersrange.value =val;
  winningProb(i);
  recalculate();
};

var adjustSkill = function(val,i) {
  var skill = document.getElementById('skill'+i);
  skill.value =val/100;
  winningProb(i);
  recalculate();
};

var changeRangeSkill = function(val,i) {
  var skillrange = document.getElementById('skillrange'+i);
  skillrange.value =val*100;
  winningProb(i);
  recalculate();
};


var recalculate = function() {

  var notwinning = 1;

  var checkers = document.getElementsByClassName('eventcheck');
  var events = document.getElementsByClassName('event');
  for (i = 0; i < events.length; i++) {
    if (checkers[i].checked) {
      var prob = winningProb(i);
      notwinning *= (1-prob);
      notwinning *= (1-prob);
      events[i].style.opacity = 1.0;
    } else {
      events[i].style.opacity = 0.2;
    }
  }

  var winning = 100*(1-notwinning);

  var showodds = document.getElementById('finalodds');
  showodds.innerHTML = 'Odds of Negreanu or Ivey Winning a Bracelet: <div id="thisisit">' + winning.toFixed(2) + '%</div>';

};


var winningProb = function(i) {
  var field = document.getElementById('players'+i);
  var skill = document.getElementById('skill'+i);
  var odds = document.getElementById('odds'+i);
  var players = Number(field.value);
  var edge = Number(skill.value);
  var prob = 100*((1*edge)/(players+(edge-1)));
  odds.innerHTML = prob.toFixed(3) + '% chance of winning this event.';
  return prob/100;
};

window.onload = function() {


  // Check all the events
  var checkers = document.getElementsByClassName('eventcheck');
  for (var i = 0; i < checkers.length; i++) {
    checkers[i].checked = true;
    checkers[i].setAttribute('onclick','recalculate()');
  }

  var events = document.getElementsByClassName('event');

  var total = 1000;

  for (i = 0; i < events.length; i++) {
    
    // TOTAL PLAYERS
    var field = document.createElement('div');

    var range = document.createElement('input');
    range.setAttribute('type','range');
    range.setAttribute('id','playersrange'+i);
    range.min = 50;
    range.max = 10000;
    range.setAttribute('value',total);
    range.setAttribute('oninput','adjust(this.value,'+i+')');
    field.appendChild(range);

    // Make a text field for input
    var players = document.createElement('input');
    players.type = 'text';
    players.size = 4;
    players.setAttribute('id','players' + i);
    players.setAttribute('value',total);
    players.setAttribute('oninput','changeRange(this.value,'+i+')');

    field.appendChild(players);

    field.innerHTML += ' estimated players ';
    
    // RELATIVE SKILL LEVEL
    var skill = document.createElement('div');

    var skillrange = document.createElement('input');
    skillrange.setAttribute('type','range');
    skillrange.setAttribute('id','skillrange'+i);
    skillrange.min = 1;
    skillrange.max = 1000;
    skillrange.setAttribute('value',100);

    skillrange.setAttribute('oninput','adjustSkill(this.value,'+i+')');
    skill.appendChild(skillrange);

    // Make a text field for input
    var skilltxt = document.createElement('input');
    skilltxt.type = 'text';
    skilltxt.size = 4;
    skilltxt.setAttribute('id','skill' + i);
    skilltxt.setAttribute('value',1);
    skilltxt.setAttribute('oninput','changeRangeSkill(this.value,'+i+')');

    skill.appendChild(skilltxt);

    skill.innerHTML += ' relative skill edge ';
    


    // ODDS OF WINNING
    var odds = document.createElement('div');
    odds.setAttribute('class','odds');
    odds.setAttribute('id','odds' + i);
    var prob = 100*(1/total);
    odds.innerHTML = prob.toFixed(3) + '% chance of winning.';


    //field.innerHTML += '<input min="50" max="10000" type="range" oninput="adjust(this.value,' + i + ')")></input>';
    events[i].appendChild(field);
    events[i].appendChild(skill);
    events[i].appendChild(odds);


  }

  recalculate();



};