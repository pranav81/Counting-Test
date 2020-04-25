var boxes=document.querySelectorAll('.number-grid td');
var numbers=[];                                 //Array to store the numbers 1-20
var bestboxes=document.querySelectorAll('.best-scores td');   //To show the top 5 scores
for(var i=1; i<=20; i++){
  numbers.push(i);
}

var trialNo=0                     //Used to set the value of BEST after the first trial automatically
                                  //For subsequent trials, BEST will be set if TIME is lower than BEST

var bestArray=[]                  //Used to store the top 5 scores


action();                         //Function to be run everytime the user wants to play
                                  //This call initiates the game for the first time
                                  //The user can use the RESTART button to play again

function action(){

  for(var i=numbers.length-1; i>0; i--) {                   //Loop to shuffle the contents of numbers[]
    var j = Math.floor(Math.random()*(i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  var i=0;

  boxes.forEach(function(box){                      //Contents of numbers[] are set to boxes in the grid
    box.innerHTML=numbers[i];                       //The boxes now contain 1-20 in random order
    i++;
  });

  var grid=document.querySelector('table');
  var n=1;                                          //n is just a counting variable

  grid.addEventListener('click',function(e){
    if (e.target.innerHTML==n && e.target.innerHTML<=20){       //If number inside the box is <=20,
      e.target.innerHTML=n+20;                                  //increase the value by 20
      n++;
    }else if(e.target.innerHTML==n && e.target.innerHTML>20){   //If number inside the box is >20
      e.target.innerHTML=' ';                                   //Change the content to nothing
      n++;
    }else {
      ;
    }                                                           // By the end of this loop, n=41
  });

  grid.style.display='none';                                //Hiding the table initially to show countdown
  var countdownNumber=document.querySelector('.countd');
  var timeInSeconds=document.querySelector('.seconds');
  var bestInSeconds=document.querySelector('.best-seconds');    //Declaring all elements of HTML to be used
  var restartMsg=document.querySelector('.restart-msg');
  var finalTime=document.querySelector('.final-time');
  var restartBtn=document.querySelector('.restart-btn');
  var count=2;                                              //count is used for the initial countdown

  countdownNumber.style.display='block';              //Displaying the countdown (3..2..1..)
  restartMsg.style.display='none';
  finalTime.style.display='none';            //Hiding the game results, to be displayed after the game ends
  restartBtn.style.display='none';

  countdownNumber.innerHTML=3;               //Countdown starts at 3

  var countdown=setInterval(function(){      //Every second, we reduce count by 1 until it is 0
    if (count===0){
      clearInterval(countdown);
      end();
    } else{
      countdownNumber.innerHTML=count;
      count--;
    }
  },1000);

  function end(){                            //Once countdown ends, hide the countdown and display the table
    countdownNumber.style.display='none';
    restartMsg.style.display='none';
    finalTime.style.display='none';
    restartBtn.style.display='none';
    grid.style.display='table';
  }

  var timevar=performance.now();            //To check the time when the game starts

  setTimeout(function(){                    //Executing after 3 seconds to account for countdown

    var timerset=setInterval(function(){    //Executing every 10 ms to change the timer every 10 ms

      if (n<41){                                            //To check if the game is still running
        var variable=performance.now()-3000-timevar;        //To set the relative time using timevar
        timeInSeconds.innerHTML=(variable/1000).toFixed(2);
      }else{
       result=timeInSeconds.innerHTML;                    //If the game is over, set the result
        if (trialNo==1){
          bestInSeconds.innerHTML=result;
        }
        else{
          if (bestInSeconds.innerHTML>result){          //If TIME<BEST, change BEST
            bestInSeconds.innerHTML=result;
          }
        }

        finalTime.innerHTML=result;

        if (bestArray.length<=4){               //For the first 5 trials, add score to the bestArray
          bestArray.push(result)
          bestArray.sort();
        }else{

          if(result<bestArray[4]){         //For the subsequent trials, check before updating bestArray

            bestArray.push(result);
            bestArray.sort();
            bestArray.pop();
          }


        }

        localStorage.setItem('ScoreTable', JSON.stringify(bestArray));    //Storing the top scores
        var bestScoresString=localStorage.getItem('ScoreTable');

        var bestScoresArray=JSON.parse(bestScoresString);

        var scorecount=0;
        bestScoresArray.forEach(function(){                        //Setting values to the TOP SCORES table
          bestboxes[scorecount].innerHTML=bestScoresArray[scorecount];
          scorecount++;
        });


        clearInterval(timerset);                 //Once game is over, clear the interval set for the time

        grid.style.display='none';
        restartMsg.style.display='block';               //Display the game results, hide the grid
        finalTime.style.display='block';
        restartBtn.style.display='block';

        restartBtn.addEventListener('click',action);    //If the RESTART button is clicked, execute action()
      }
    },10);
  },3000);
  trialNo++;
}
