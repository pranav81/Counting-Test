var boxes=document.querySelectorAll('td');
var numbers=[];

for(var i=1; i<=20; i++){
  numbers.push(i);
}
var trialNo=0
action();
function action(){

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


  //var gridtest=document.querySelector('table');
  grid.style.display='none';
  var countdownNumber=document.querySelector('.countd');
  var timeInSeconds=document.querySelector('.seconds');
  var bestInSeconds=document.querySelector('.best-seconds');
  var restartMsg=document.querySelector('.restart-msg');
  var finalTime=document.querySelector('.final-time');
  var restartBtn=document.querySelector('.restart-btn');
  var count=2;
  countdownNumber.style.display='block';
  countdownNumber.innerHTML=3;
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
    restartMsg.style.display='none';
    finalTime.style.display='none';
    restartBtn.style.display='none';
    grid.style.display='table';
  }

  var p=0;
  /*var timeInSeconds=document.querySelector('.seconds');
  var bestInSeconds=document.querySelector('.best-seconds');
  var restartMsg=document.querySelector('.restart-msg');
  var finalTime=document.querySelector('.final-time');
  var restartBtn=document.querySelector('.restart-btn');*/

  var timevar=performance.now();
  setTimeout(function(){
    var timerset=setInterval(function(){
      if (n<41){
        var variable=performance.now()-3000-timevar;
        timeInSeconds.innerHTML=(variable/1000).toFixed(2);
      }else{
       result=timeInSeconds.innerHTML;
        if (trialNo==1){
          bestInSeconds.innerHTML=result;
        }
        else{
          if (bestInSeconds.innerHTML>result){
            bestInSeconds.innerHTML=result;
          }
        }
        finalTime.innerHTML=result;
        clearInterval(timerset);
        grid.style.display='none';
        restartMsg.style.display='block';
        finalTime.style.display='block';
        restartBtn.style.display='block';

        restartBtn.addEventListener('click',action);
      }
    },10);
  },3000);
  trialNo++;
}
