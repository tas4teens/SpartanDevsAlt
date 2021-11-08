var gamemode = -1;
var timelimit = -1;
var listOfGameModes = ['Local customs', 'Sensitive Hawaiian environments', '"Leave no trace" ethics', 'Safety', 'Neighborhood sensitivity'];

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

    if(this.getElementsByClassName('choiceContent')[0].innerHTML == '15 seconds'){
        timelimit = 15;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '20 seconds'){
        timelimit = 20;
    }else if(this.getElementsByClassName('choiceContent')[0].innerHTML == '30 seconds'){
        timelimit = 30;
    }else{
        timelimit = -1;
    }

    this.getElementsByClassName('choiceSelection')[0].style.backgroundColor = 'green';
    document.getElementById('getStarted').style.opacity = 1;
}

function launch(){
    alert('hello world');
}

function startQuiz(){
    if(this.style.opacity == 1){
        launch();
    }
}

//adding event listeners

for (var i = 0; i < document.getElementsByClassName('quizChoice').length; i++){// for original quiz choice
    document.getElementsByClassName('quizChoice')[i].addEventListener('click', detectGameMode);
}

for (var i = 0; i < document.getElementsByClassName('choiceHolder').length; i++){// for time
    document.getElementsByClassName('choiceHolder')[i].addEventListener('click', detectTime);
}

document.getElementById('getStarted').addEventListener('click', startQuiz);