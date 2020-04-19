var boxes=document.querySelectorAll('td');
var numbers=[];

for(var i=1; i<=20; i++){
  numbers.push(i);
}

for(var i=numbers.length-1; i>0; i--) {
  var j = Math.floor(Math.random()*(i + 1));
  [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
}

var i=0;
boxes.forEach(function(box){
  box.innerHTML=numbers[i];
  i++;
});
