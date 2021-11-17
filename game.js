var gamemode = -1;
var timelimit = -1;
var dummy = [];
var questionNumber = 0;
var randomChoice = [1, 2, 3, 4];
var listOfGameModes = ['Local customs', 'Sensitive Hawaiian environments', '"Leave no trace" ethics', 'Safety', 'Neighborhood sensitivity'];
var detect;
var userResults = [-1, -1, -1, -1, -1];
var userTimes = [];
var userStreaks = [];
var userScore = 0;
var firstTime;
var isUserOnQuestion = false;
var scoreBreakdownText = ['Questions correct:', 'Time spent:', 'Longest correct answer streak:', 'Your total score:']
var scoreBreakdownColors = ['darkgreen', 'orange', 'purple', 'cornflowerblue'];
var backgroundImages = ['url("https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")', 'url("https://p0.pxfuel.com/preview/778/544/37/hawaii-diamond-head-honolulu-oahu.jpg")', 'url("https://p1.pxfuel.com/preview/765/978/336/hawaii-oahu-mountain-sky-paradise-scenic.jpg")', 'url("https://p1.pxfuel.com/preview/182/655/633/hawaii-oahu-ko-olina-landscape.jpg")', 'url("https://p1.pxfuel.com/preview/123/765/129/waikiki-beach-hawaii-honolulu-oahu.jpg")']
var currentStreak = 0;
var correctQuestions = 0;
var totalTimeElapsed = 0;
var totalSpeedScore = 0;
var totalStreakScore = 0;

for (var i = 0; i < 5; i++){
    document.getElementsByClassName('quizChoice')[i].style.backgroundImage = backgroundImages[i];
}

function detectGameMode(){
    for (var i = 0; i < document.getElementsByClassName('quizChoice').length; i++){
        document.getElementsByClassName('quizChoice')[i].style.color = 'white';
        document.getElementsByClassName('quizChoice')[i].style.backgroundImage = backgroundImages[i];
    }

    for (var i = 0; i < listOfGameModes.length; i++){
        if(this.innerHTML == listOfGameModes[i]){
            document.getElementsByClassName('quizChoice')[i].style.color = 'white';
            document.getElementsByClassName('quizChoice')[i].style.backgroundColor = 'green';
            document.getElementsByClassName('quizChoice')[i].style.backgroundImage = 'none';
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
    //calculate scores
    currentStreak = 0;
    correctQuestions = 0;
    totalSpeedScore = 0;
    totalStreakScore = 0;
    for (var i = 0; i < 5; i++){
        if((userResults[i] - 1) === dummy[i].choices.indexOf(dummy[i].answer)){
            currentStreak++;
            correctQuestions++;
            currentStreak+= 1;
            totalStreakScore += (currentStreak*400);
            totalSpeedScore += userTimes[i];
            userStreaks.push(currentStreak);
        }else{
            currentStreak = 0;
            userStreaks.push(currentStreak);
        }
    }
    totalSpeedScore = Math.trunc(totalSpeedScore / 3);
    document.getElementById('numCorrect').innerHTML = correctQuestions;
    document.getElementById('scoreDisplay').innerHTML = "Your score is: " + Math.round((correctQuestions*1000)+totalSpeedScore+(totalStreakScore/2));

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
                m.innerHTML = correctQuestions + '/5';
            }else if (i === 0 && j === 1){
                var newString;
                
                if (totalTimeElapsed > 60000){
                    newString = Math.trunc(totalTimeElapsed / 60000) + 'm ' + Math.trunc((totalTimeElapsed - (Math.trunc(totalTimeElapsed / 60000)*60000))/1000) + 's ' + (totalTimeElapsed - (Math.trunc(totalTimeElapsed / 60000)*60000) - (Math.trunc((totalTimeElapsed - (Math.trunc(totalTimeElapsed / 60000)*60000))/1000)*1000)) + 'ms';
                }else{
                    newString = Math.trunc(totalTimeElapsed / 1000) + 's ' + (totalTimeElapsed - (Math.trunc(totalTimeElapsed / 1000)*1000)) + 'ms';
                }
                m.innerHTML = newString;
            }else if (i === 1 && j === 0){
                var max = -1;
                for(var z = 0; z < userStreaks.length; z++){
                    if(userStreaks[z] > max){
                        max = userStreaks[z];
                    }
                }
                m.innerHTML = (max/2);
            }else{
                m.innerHTML = Math.round((correctQuestions*1000)+totalSpeedScore+(totalStreakScore/2));
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
                n.innerHTML = 'Score added by ' + (totalStreakScore/2);
            }else{
                n.innerHTML = 'Great job!'
            }
            document.getElementsByClassName('holder')[(i*2)+j].appendChild(n);
        }
    }
}

function quit(){
    if(confirm('Are you sure you want to quit?')){
        //reverting variables
        dummy = [];
        questionNumber = 0;
        randomChoice = [1, 2, 3, 4];
        detect = -1;
        userResults = [-1, -1, -1, -1, -1];
        userTimes = [];
        userStreaks = [];
        userScore = 0;
        isUserOnQuestion = false;
        currentStreak = 0;
        correctQuestions = 0;
        totalTimeElapsed = 0;
        totalSpeedScore = 0;
        totalStreakScore = 0;

        //removes all questions
        document.getElementsByClassName('question')[0].remove();
        for(var i = 0; i < 4; i++){
            document.getElementsByClassName('questionChoiceHolder')[0].remove();
        }

        if(document.getElementById('postgame').style.display === 'block'){
            for(var i = 0; i < 4; i++){
                document.getElementsByClassName('holder')[0].remove();
            }
        }
        
        //back to main page
        document.getElementById('ingame').style.display = 'none';
        document.getElementById('postgame').style.display = 'none';
        document.getElementById('pregame').style.display = 'block';
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
document.getElementsByClassName('indivSubNavigation')[0].addEventListener('click', quit);
document.getElementsByClassName('indivEndLink')[0].addEventListener('click', quit);