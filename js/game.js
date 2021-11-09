var gamemode = -1;
var timelimit = -1;
var dummy = [];
var questionNumber = 0;
var randomChoice = [1, 2, 3, 4];
var listOfGameModes = ['Local customs', 'Sensitive Hawaiian environments', '"Leave no trace" ethics', 'Safety', 'Neighborhood sensitivity'];
var detect;
var userResults = [-1, -1, -1, -1, -1];
var userTimes = [];
var firstTime;
var isUserOnQuestion = false;
var scoreBreakdownText = ['Questions correct:', 'Time spent:', 'Longest correct answer streak:', 'Rank:']
var scoreBreakdownColors = ['darkgreen', 'orange', 'purple', 'cornflowerblue'];
var totalTimeElapsed = 0;

function detectGameMode(){
    for (var i = 0; i < document.getElementsByClassName('quizChoice').length; i++){
        document.getElementsByClassName('quizChoice')[i].style.color = 'black';
        document.getElementsByClassName('quizChoice')[i].style.backgroundColor = 'white';
    }

    for (var i = 0; i < listOfGameModes.length; i++){
        if(this.innerHTML == listOfGameModes[i]){
            document.getElementsByClassName('quizChoice')[i].style.color = 'white';
            document.getElementsByClassName('quizChoice')[i].style.backgroundColor = 'green';
            gamemode = i+1;
            break;
        }
    }
    document.getElementById('timeHolder').style.display = 'block';
    document.getElementById('getStarted').style.display = 'block';
    document.getElementById('timeHolder').scrollIntoView();
}

function detectTime(){
    for (var i = 0; i < document.getElementsByClassName('choiceSelection').length; i++){
        document.getElementsByClassName('choiceSelection')[i].style.backgroundColor = 'white';
    }
    if(this.getElementsByClassName('choiceContent')[0].innerHTML == '5 seconds'){
        timelimit = 5;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '10 seconds'){
        timelimit = 10;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '15 seconds'){
        timelimit = 15;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '25 seconds'){
        timelimit = 25;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '45 seconds'){
        timelimit = 45;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '60 seconds'){
        timelimit = 60;
    }else{
        timelimit = -1;
    }

    this.getElementsByClassName('choiceSelection')[0].style.backgroundColor = 'green';
    document.getElementById('getStarted').style.opacity = 1;
}

function launch(){
    document.getElementById('pregame').style.display = 'none';
    document.getElementById('ingame').style.display = 'block';
    document.getElementById('entireQuiz').style.display = 'block';
    document.getElementById('entireQuiz').style.display = 'flex';

    //alert('hello world');
    dummy = [];
    for(var i = 0; i < listOfQuestions.length; i++){
        if(listOfQuestions[i].category.includes(gamemode)){
            dummy.push(listOfQuestions[i]);
        }
    }

    //rearrange questions stored in 'dummy'
    for (var i = dummy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [dummy[i], dummy[j]] = [dummy[j], dummy[i]];
    }

    //rearrange answer choices in 'dummy'
    for(var outer = 0; outer < dummy.length; outer++){
        if(dummy[outer].type != 'in order'){
            for (var i = dummy[outer].choices.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [dummy[outer].choices[i], dummy[outer].choices[j]] = [dummy[outer].choices[j], dummy[outer].choices[i]];
            }
        }
    }
    
    //console.log(dummy);

    //start quiz
    document.getElementById('navigationMainText').innerHTML = 'Quiz in progress: ' + listOfGameModes[gamemode-1];
    createElements();
}

function createElements(){
    questionNumber++;

    var t = document.createElement('p');
    t.className = 'question';
    t.innerHTML = questionNumber + '. ' + dummy[questionNumber-1].question;
    document.getElementById('quizContent').appendChild(t);
    for (var i = 0; i < dummy[questionNumber-1].choices.length; i++){
        var d = document.createElement('div');
        d.className = 'questionChoiceHolder';
        document.getElementById('quizContent').appendChild(d);

        var empty = document.createElement('div');
        empty.className = 'questionChoiceEmpty';
        document.getElementsByClassName('questionChoiceHolder')[i].appendChild(empty);

        var answerContent = document.createElement('p');
        answerContent.className = 'questionChoiceContent';
        answerContent.innerHTML = dummy[questionNumber-1].choices[i];
        document.getElementsByClassName('questionChoiceHolder')[i].appendChild(answerContent);
    }

    for(var i = 0; i < 4; i++){
        document.getElementsByClassName('questionChoiceHolder')[i].addEventListener('click', select);
    }

    //start timer
    firstTime = new Date().getTime();
    isUserOnQuestion = true;//used to detect when timer bar will stop shrinking

    if(timelimit > 0){
        var timer = setInterval(generateTimer, 10);
    }

    function generateTimer(){
        if(isUserOnQuestion){
            if((new Date().getTime() - firstTime) < (timelimit*1000)){
                document.getElementById('visualTimer').style.width = ((1 - ((new Date().getTime() - firstTime) / (timelimit*1000))))*100 + "%"; 
                if(((1 - ((new Date().getTime() - firstTime) / (timelimit*1000))))*100 < 10){
                    document.getElementById('visualTimer').style.backgroundColor = 'red';
                }else if(((1 - ((new Date().getTime() - firstTime) / (timelimit*1000))))*100 < 25){
                    document.getElementById('visualTimer').style.backgroundColor = '#eb6134';
                }else if(((1 - ((new Date().getTime() - firstTime) / (timelimit*1000))))*100 < 50){
                    document.getElementById('visualTimer').style.backgroundColor = 'orange';
                }else{
                    document.getElementById('visualTimer').style.backgroundColor = 'darkgreen';
                }
            }else{
                nextQuestion();
                return;
            }
        }else{
            return; //stop function completely!
        }
    }
}

function startQuiz(){
    if(timelimit > 0){
        
        if(this.style.opacity == 1){
            if (confirm('Choosing a time limit will not allow you to look over previously answered questions. Are you sure you want to continue? (To be able to move back and forth between questions, you could select "no time limit".')){
                launch();
            }
        }
    }else{
        launch();
    }   
    
    
}

function scanChoices(){
    detect = 0;
    for (var i = 0; i < 4; i++){
        var scan = document.getElementsByClassName('questionChoiceEmpty')[i];
        if(scan.style.backgroundColor === 'blue'){
            detect = (i+1);
            break;
        }
    }
    userResults[questionNumber-1] = detect;
    /*console.log(userResults);*/
    console.log(userResults);
}

function select(){
    for (var j = 0; j < 4; j++){
        document.getElementsByClassName('questionChoiceEmpty')[j].style.backgroundColor = 'white';
    }
    if(this.getElementsByClassName('questionChoiceEmpty')[0].style.backgroundColor === 'white'){
        this.getElementsByClassName('questionChoiceEmpty')[0].style.backgroundColor = 'blue';
    }else{
        this.getElementsByClassName('questionChoiceEmpty')[0].style.backgroundColor = 'white';
    }
    scanChoices();
}

function nextQuestion(){
    //instantly stop timer upon click
    isUserOnQuestion = false;
    var secondTime = new Date().getTime();
    userTimes[questionNumber - 1] = (timelimit*1000) - (secondTime - firstTime);
    totalTimeElapsed += (secondTime - firstTime);
    //remove questions
    if(questionNumber < 5){
        document.getElementsByClassName('question')[0].remove();
        for(var i = 0; i < 4; i++){
            document.getElementsByClassName('questionChoiceHolder')[0].remove();
        }
        createElements();
        document.getElementById('rightArrow').style.opacity = 1;
        if(userResults[questionNumber-1] != -1){//this line of code checks if the user has an answer stored for the generated question.
            document.getElementsByClassName('questionChoiceEmpty')[userResults[questionNumber-1]-1].style.backgroundColor = 'blue';
        }
    }else{//end quiz
        document.getElementById('ingame').style.display = 'none';
        showEndScreen();
    }
    
}

function previousQuestion(){
    //remove questions
    if(questionNumber > 1 && timelimit < 0){
        isUserOnQuestion = false;
        document.getElementsByClassName('question')[0].remove();
        for(var i = 0; i < 4; i++){
            document.getElementsByClassName('questionChoiceHolder')[0].remove();
        }
        questionNumber-=2; //decrementing questionNumber by 2
        createElements(); //this increases questionNumber by 1, resulting in a net decrease of 1.
        if(userResults[questionNumber-1] != -1){
            document.getElementsByClassName('questionChoiceEmpty')[userResults[questionNumber-1]-1].style.backgroundColor = 'blue';
        }
    }
}

function showEndScreen(){
    document.getElementById('postgame').style.display = 'block';
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < 2; j++){
            var h = document.createElement('div');
            h.className = 'holder';
            document.getElementsByClassName('scoreBreakdownDetail')[i].appendChild(h);

            var l = document.createElement('p');
            l.innerHTML = scoreBreakdownText[(i*2)+j];
            l.className = 'first';
            document.getElementsByClassName('holder')[(i*2)+j].appendChild(l);
            document.getElementsByClassName('holder')[(i*2)+j].style.backgroundColor = scoreBreakdownColors[(i*2)+j];

            var m = document.createElement('p');
            if(i === 0 && j === 0){
                m.innerHTML = 1 + '/5';
            }else if (i === 0 && j === 1){
                var newString;
                if (totalTimeElapsed > 60000){
                    newString = Math.trunc(totalTimeElapsed / 60000) + 'm ' + Math.trunc((totalTimeElapsed - (Math.trunc(totalTimeElapsed / 60000)*60000))/1000) + 's ' + (totalTimeElapsed - (Math.trunc(totalTimeElapsed / 60000)*60000) - (Math.trunc((totalTimeElapsed - (Math.trunc(totalTimeElapsed / 60000)*60000))/1000)*1000)) + 'ms';
                }else{
                    newString = Math.trunc(totalTimeElapsed / 1000) + 's ' + (totalTimeElapsed - (Math.trunc(totalTimeElapsed / 1000)*1000)) + 'ms';
                }
                m.innerHTML = newString;
            }else if (i === 1 && j === 0){
                m.innerHTML = foundStreak;
            }else{
                if (userScore < 6000){
                    m.innerHTML = 'Newbie'
                }else if (userScore < 13000){
                    m.innerHTML = 'Amateur'
                }else if (userScore < 21000){
                    m.innerHTML = 'Rookie'
                }else if (userScore < 28500){
                    m.innerHTML = 'Skilled'
                }else if (userScore < 37000){
                    m.innerHTML = 'Master';
                }else{
                    m.innerHTML = 'Speedrunner'
                }
            }
            m.className = 'second';
            document.getElementsByClassName('holder')[(i*2)+j].appendChild(m);

            var n = document.createElement('p');
            n.className = 'third';
            if(i === 0 && j === 0){
                n.innerHTML = 'Original score: ' + (correctQuestions*1000);
            }else if (i === 0 && j === 1){
                n.innerHTML = 'Score added by ' + Math.trunc(totalSpeedScore);
            }else if (i === 1 && j === 0){
                n.innerHTML = 'Score added by ' + totalStreakScore;
            }else{
                n.innerHTML = 'This doesn\'t affect your score, but it\'s nice to know!'
            }
            document.getElementsByClassName('holder')[(i*2)+j].appendChild(n);
        }
    }
}

//adding event listeners

for (var i = 0; i < document.getElementsByClassName('quizChoice').length; i++){// for original quiz choice
    document.getElementsByClassName('quizChoice')[i].addEventListener('click', detectGameMode);
}

for (var i = 0; i < document.getElementsByClassName('choiceHolder').length; i++){// for time
    document.getElementsByClassName('choiceHolder')[i].addEventListener('click', detectTime);
}

document.getElementById('leftArrow').addEventListener('click', previousQuestion);
document.getElementById('rightArrow').addEventListener('click', nextQuestion);
document.getElementById('getStarted').addEventListener('click', startQuiz);