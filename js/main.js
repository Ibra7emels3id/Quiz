

let countLength = document.querySelector('.count span')
let spans = document.querySelector('.bullets .spans')
let SubmitButton = document.querySelector('.submit-button')
let quizarea = document.querySelector('.quiz-area')
let AnswersArea = document.querySelector('.answers-area')
let SubmitBu = document.querySelector('.SubmitButton')
let results = document.querySelector('.results')
let countdownHtml = document.querySelector('.countdown')
let quizApp = document.querySelector('.quiz-app')
let Handleemail = document.querySelector('.email')
let Handlepassword = document.querySelector('.password')
let CheackUserQuiz = document.getElementById('CheackUserQuiz')
let ErrorSelect = document.getElementById('ErrorSelect')
let Erroremail = document.getElementById('Erroremail')
let Errorpassword = document.getElementById('Errorpassword')


let CountIndex = 0
let rightAnswers = 0;
let CountTime = 30
let CountDounintervel;
let CheackQuiz;
let handleselectCheackQuiz;
let DataApiRE ;


// Handle Cheack Quiz
function handleCheackQuiz(event) {
    handleselectCheackQuiz = event.target.value
    handelAccount()
}

// Handel Login 

const handelAccount = async (event) => {
    event.preventDefault();
    if (handleselectCheackQuiz) {
        const response = await fetch(`http://localhost:1000/${handleselectCheackQuiz}`);
        const data = await response.json();

        for (let i = 0; i < data.length; i++) {
            if (Handleemail.value === data[i].email) {
                console.log('good email');
                if (Handlepassword.value === data[i].password) {
                    window.location.href = 'quiz.html?id=' + data[i].handleCheackQuiz;
                } else {
                    Errorpassword.textContent = 'Error Password'
                    setTimeout(() => {
                        Errorpassword.textContent = ''
                    }, 3000);
                    
                }
            } else {
                Erroremail.textContent = 'Error Email'
                setTimeout(() => {
                    Erroremail.textContent = ''
                }, 3000);
                
            }
        }
    } else {
        ErrorSelect.textContent = 'Please Select Data'
        setTimeout(() => {
            ErrorSelect.textContent = ''
        }, 3000);
        console.log('Please Select Data');
    }
}


// Get SEarch ID User Account
// const GetIdUser = async () => {
//     console.log(url);
//     const response = await fetch(`http://localhost:1000/${url}`);
//     const data = await response.json();
//     console.log(data);
//     GetDataApi(data)
// }

// Get Count Qusetions

const GetDataApi = async (data) => {
    const url = new URLSearchParams(window.location.search).get('id');
    // const Res = await fetch('js/db-Data.json')
    const Res = await fetch(`http://localhost:500/${url}`)
    const Data = await Res.json()
    // console.log(CheackQuiz);
    console.log(Data);
    const DataCount = Data.length

    GetCountQusetions(DataCount)
    GetDatatoQusetions(DataCount, Data[CountIndex])

    let StartQuiz = document.querySelector('.Start-Quiz')

    StartQuiz.addEventListener('click', () => {
        quizApp.style.display = 'block'
        StartQuiz.style.display = 'none'
        CountDown(CountTime, DataCount)
    })

    SubmitButton.onclick = () => {
        // Count Index Pluse
        let RightAnswer = Data[CountIndex].right_answer
        CountIndex++

        // Handle Question
        if (CountIndex < Data.length) {

            CheakQusetions(RightAnswer, DataCount)

            // Add The Qusetions New
            quizarea.innerHTML = '';
            AnswersArea.innerHTML = '';
            GetDatatoQusetions(DataCount, Data[CountIndex])

            //
            clearInterval(CountDounintervel)
            CountDown(CountTime, DataCount)
            //
            HandelSpans(DataCount)

        } else {
            quizarea.innerHTML = '';
            AnswersArea.innerHTML = '';
            SubmitButton.innerHTML = 'Loading...'
        }

        //
        showResults(DataCount, CountIndex)
        //
    }
    //
    CountDown(CountTime, DataCount)
    // Handel Show Resulte
    clearInterval(CountDounintervel)
}
GetDataApi()


// // Get Count Qusetions
function GetCountQusetions(Count) {
    countLength.textContent = Count
    //  Add Spans To Count
    for (let i = 0; i < Count; i++) {
        let span = document.createElement('span')
        spans.appendChild(span)

        if (i == CountIndex) {
            span.classList.add('on')
        }

    }
}

// Get Data to Qusetions
function GetDatatoQusetions(DataCount, Qusetions) {
    if (CountIndex < DataCount) {
        let Qh2 = document.createElement('h2')
        Qh2.innerText = Qusetions.title
        quizarea.appendChild(Qh2)

        // Add the answers
        for (let i = 1; i < 5; i++) {
            let Div = document.createElement('div')
            Div.classList.add('answer')
            let input = document.createElement('input')
            input.type = 'radio'
            input.name = 'answer'
            input.id = `answer_${i}`
            input.dataset.answer = Qusetions[`answer_${i}`]


            // create Label element
            let label = document.createElement('label')
            label.htmlFor = `answer_${i}`

            // create Label Node
            let LableText = document.createTextNode(Qusetions[`answer_${i}`])

            label.appendChild(LableText)
            // add the Label Html
            Div.appendChild(input)
            Div.appendChild(label)
            AnswersArea.appendChild(Div)
        }
    }
}

function CheakQusetions(RAnswer, DataCount) {
    let Answers = document.getElementsByName('answer')
    let TheChooseAnswer;

    for (let i = 0; i < Answers.length; i++) {
        if (Answers[i].checked) {
            TheChooseAnswer = Answers[i].dataset.answer
        }
    }
    if (TheChooseAnswer === RAnswer) {
        rightAnswers++
        console.log('Good answer');
    }


}


// Handel Spans
function HandelSpans(Count) {
    let spans = document.querySelectorAll('.bullets .spans span')
    spans.forEach((span, index) => {
        if (index == CountIndex) {
            span.classList.add('on')
        }
    })
}


// Handle Show Resulte
function showResults(Count) {
    let CountResulte;
    if (CountIndex === Count) {
        setTimeout(() => {
            SubmitButton.remove()
        }, 1000)
        AnswersArea.remove()
        quizarea.remove()
        spans.remove()
        countdownHtml.remove()


        if (rightAnswers > (Count / 2) && rightAnswers < Count) {
            CountResulte = `<span>It Is Good From ${rightAnswers} from ${Count}</span>`
        } else if (rightAnswers === Count) {
            CountResulte = `<span>It Is Good From ${rightAnswers} from ${Count}</span>`
        } else {
            CountResulte = `<span>It Is Not Good From ${rightAnswers} from ${Count}</span>`
        }
        setTimeout(() => {
            results.innerHTML = CountResulte
        }, 1100)

    }
}


//
quizApp.style.display = 'none'

function CountDown(Decoration, Count) {
    if (CountIndex < Count) {
        let minutes, seconds;
        CountDounintervel = setInterval(() => {
            minutes = parseInt(Decoration / 60)
            seconds = parseInt(Decoration % 60)

            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

            countdownHtml.innerHTML = `${minutes} : ${seconds}`

            if (--Decoration < 0) {
                clearInterval(CountDounintervel)
                SubmitButton.click()
            }
        }, 1000)
    }
}


