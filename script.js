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

var grid=document.querySelector('table');
var n=1;
grid.addEventListener('click',function(e){
  if (e.target.innerHTML==n && e.target.innerHTML<=20){
    e.target.innerHTML=n+20;
    n++;
  }else if(e.target.innerHTML==n && e.target.innerHTML>20){
    e.target.innerHTML=' ';
    n++;
  }else {
    ;
  }
});

var count=2;
var gridtest=document.querySelector('table');
gridtest.style.display='none';
var countdownNumber=document.querySelector('.countd');
var countdown=setInterval(function(){
  if (count===0){
    clearInterval(countdown);
    end();
  } else{
    countdownNumber.innerHTML=count;
    count--;
  }
},1000);

function end(){
  countdownNumber.style.display='none';
  gridtest.style.display='table';
}

var p=0;
var timeInSeconds=document.querySelector('.seconds');
var bestInSeconds=document.querySelector('.best-seconds');
var restartMsg=document.querySelector('.restart-msg');
var finalTime=document.querySelector('.final-time');
setTimeout(function(){
  var testtimer=setInterval(function(){
    if (n<41){
      var variable=performance.now()-3000;
      timeInSeconds.innerHTML=(variable/1000).toFixed(2);

    }else{
      bestInSeconds.innerHTML=timeInSeconds.innerHTML;
      finalTime.innerHTML=timeInSeconds.innerHTML;
      clearInterval(testtimer);
      gridtest.style.display='none';
      restartMsg.style.display='block';
      finalTime.style.display='block';
    }
  },10);
},3000);
