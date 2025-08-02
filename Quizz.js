const question=document.getElementsByClassName('qquestion')[0]
const nextButton=document.getElementsByClassName('qbutton')[0]
const optionButtons=document.getElementsByClassName('opbutton')[0]
const quizBody=document.getElementById('qcontent')
const questionCount=document.getElementsByClassName('p1')[0]
const result=document.getElementById('result')
const resultPage=document.getElementById('result_page')
let index;
let count=1;

const questionAnswers=[
    {"Question":"You saw a famous painting of a woman with a mysterious smile. What is the name of this painting?",
        "option-1":"Girl with a Pearl Earring",
        "option-2":"The Starry Night",
        "option-3":"Mona Lisa",
        "option-4":"The Scream",
        "answer":"option-3"
    },
    {"Question":"In one of the halls, you noticed a large, ancient Greek statue without arms. What is this statue called?",
        "option-1":"Venus de Milo",
        "option-2":"The Thinker",
        "option-3":"Discobolus",
        "option-4":"Statue of David",
        "answer":"option-1"
    },
    {"Question":"You came across a large painting depicting the coronation of a French Emperor. Which artwork did you see?",
        "option-1":"Liberty Leading the People",
        "option-2":"The Coronation of Napoleon",
        "option-3":"The Raft of the Medusa",
        "option-4":"The Last Supper",
        "answer":"option-2"
    },
    {"Question":"While exploring, you encountered a famous sculpture of a winged figure. What is this sculpture called?",
        "option-1":"Winged Victory of Samothrace",
        "option-2":"Nike of Athens",
        "option-3":"Statue of Hermes",
        "option-4":") Athena Parthenos",
        "answer":"option-1"
    },
    {"Question":"You saw an ancient code of laws carved into a black stone. Which artifact did you see?",
        "option-1":"The Rosetta Stone",
        "option-2":"The Code of Hammurabi",
        "option-3":"The Cyrus Cylinder",
        "option-4":"The Stele of Naramsin",
        "answer":"option-2"
    },
    {"Question":".  In the Egyptian Antiquities section, you admired a famous statue of a seated scribe. What is it commonly known as?",
        "option-1":"The Seated Pharaoh",
        "option-2":"The Seated Scribe",
        "option-3":"The Bust of Nefertiti",
        "option-4":"The Mask of Tutankhamun",
        "answer":"option-2"
    },
    {"Question":"You walked past a massive, intricate painting of a historical wedding feast. What is the name of this artwork?",
        "option-1":"The Wedding at Cana",
        "option-2":"The School of Athens",
        "option-3":"The Marriage of the Virgin",
        "option-4":"The Feast of the Gods",
        "answer":"option-1"
    },
    {"Question":"In the gallery, you saw a Renaissance masterpiece showing a woman holding a baby and a lamb. Which painting is this?",
        "option-1":"Madonna of the Rocks",
        "option-2":"The Virgin and Child with St. Anne",
        "option-3":"Lady with an Ermine",
        "option-4":"The Birth of Venus",
        "answer":"option-2"
    },
    {"Question":"You marveled at a medieval artifact known as the “Crown of the Visigoth Kings.” What type of item is it?",
        "option-1":"A sword",
        "option-2":"A shield",
        "option-3":"A crown",
        "option-4":" A necklace",
        "answer":"option-3"
    }
    ,
    {"Question":"You found an iconic artifact representing a Babylonian mythical creature. What is this artifact called?",
        "option-1":"The Lamassu",
        "option-2":"The Lion of Babylon",
        "option-3":"The Ishtar Gate",
        "option-4":"The Bull of Persepolis",
        "answer":"option-1"
    }
]



const questionsDone={}



displayQuestion(getRandomQuestion());

// function to get a random number of the question
function randomNumber(){
    return Math.floor(Math.random()*questionAnswers.length);
}

// function to check whether the randomly generated question is distinct than the questions which are already done
function getRandomQuestion(){
    index=randomNumber();
    while(index in questionsDone){
        index=randomNumber();
    }
    return index;
    
}


// Function to display the current question and all the options
function displayQuestion(index){
    let currentQuestion=questionAnswers[index]["Question"]
    question.innerHTML=currentQuestion;

    // Setting all the options
    for(let i=1; i<=4; i++){
        currentOption=document.getElementById(`option-${i}`)
        currentOption.innerHTML=questionAnswers[index][`option-${i}`]
    }

    // Reseting the colors of all the option buttons
    let options = document.getElementsByClassName('qoption');

    for (let i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = '#FFD68C';
    }
}

// function to return the number of correct answers
function evaluateAnswers(){
    let correct=0
    let questions = Object.keys(questionsDone);
    for(let i of questions){
        if(questionsDone[i] == questionAnswers[Number(i)].answer){
            correct++;
        }
    }

    return correct;
}

// Function to show a warning message if user has not attempted a question
function showError(){
    message=document.getElementById('warning')
    // If the warning message does not exist previously only then display the message
    if(!message){
        let message=document.createElement('p')
        message.innerText='Please choose a option';
        message.id='warning';
        message.style.color='red';
        quizBody.appendChild(message)  
    }
}

// tracking the click on each option and updating the selected option
optionButtons.addEventListener('click',(e)=>{
    // Ensuring that the user has selected a option
    if(e.target.classList[0]=='qoption'){
        // reseting the colors of all the option buttons
        let options = document.getElementsByClassName('qoption');
        for (let i = 0; i < options.length; i++) {
            options[i].style.backgroundColor = '#FFD68C';
        }

        choice=e.target.id
        // Updating the selected option and adding the current to question to questionsDone
        questionsDone[index]=choice;
        // Changing the color of the selected option
        e.target.style.backgroundColor='#FDAE64';
    }
    
})

// function to check if the question is attempted and then move to the next one
function checkQuestion(){
    // If user has attempted the question move to next
    if(index in questionsDone){
        displayQuestion(getRandomQuestion());
        count++;
        questionCount.innerText=`Question ${count}`

        // If warning message exists remove it
        message=document.getElementById('warning')
        if(message){
            message.parentNode.removeChild(message);
        }
    }else{
    // If the user hasn't attempted then show an error
        showError()
    }
}


nextButton.addEventListener('click',()=>{
    if(count==4){
        nextButton.innerHTML='submit'
        checkQuestion();
    }else if(count<5){
        checkQuestion();
        
        // If the user has attempted all questions display the result
    }else{
        // If last question is solved only then display the results
        if(index in questionsDone){
            let correct = evaluateAnswers();
            result.innerHTML=`${correct} / ${count}`
            resultPage.style.display='flex';
            // If last question is not solved show error
        }else{
            // If the user hasn't attempted then show an error
            showError()
        }
    }
})