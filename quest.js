let timeLeft = localStorage.getItem('timeLeft') 
               ? parseInt(localStorage.getItem('timeLeft')) 
               : 30;

const timerElement = document.getElementById('timer');

// Exibe o tempo imediatamente, sem delay
timerElement.textContent = timeLeft;

const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    localStorage.setItem('timeLeft', timeLeft);

    if (timeLeft <= 0) {
        clearInterval(countdown);
        timerElement.textContent = "Tempo esgotado!";
        timerElement.classList.add("esgoted");
        if (pergunta === quizData.length){
            clearInterval(countdown);
            scores.push(score);
            localStorage.setItem("score", 0);
            localStorage.setItem("pergunta", 1);
            localStorage.setItem("usados", JSON.stringify([]));
            localStorage.setItem("scores", JSON.stringify(scores));
            mostrarPopup();
        } else {
            pergunta++;
            localStorage.setItem("pergunta", pergunta);
            localStorage.setItem("score", score);
            localStorage.setItem("usados", JSON.stringify(usados));
            localStorage.setItem('timeLeft', 30);
            window.location.href = `quest.html?pergunta=${pergunta}`;
        }
    }
}, 1000);


const quizData = [
    {
      pergunta: "Qual é a capital de Portugal?",
      opcoes: ["Faro", "Porto", "Lisboa", "Leiria"],
      correta: 2
    },
    {
      pergunta: "Qual é o maior planeta do sistema solar?",
      opcoes: ["Marte", "Terra", "Saturno", "Júpiter"],
      correta: 3
    },
    {
      pergunta: "Quem pintou a Mona Lisa?",
      opcoes: ["Picasso", "Van Gogh", "Da Vinci", "Michelangelo"],
      correta: 2
    },
    {
      pergunta: "Em que continente está o Egito?",
      opcoes: ["Ásia", "África", "Europa", "América"],
      correta: 1
    },
    {
      pergunta: "Quanto é 9 x 7?",
      opcoes: ["56", "72", "63", "67"],
      correta: 2
    },
    {
      pergunta: "Qual é o elemento químico com símbolo 'O'?",
      opcoes: ["Ouro", "Oxigénio", "Prata", "Cobre"],
      correta: 1
    },
    {
      pergunta: "Qual destes animais é um mamífero?",
      opcoes: ["Crocodilo", "Ornitorrinco", "Galinha", "Tubarão"],
      correta: 1
    },
    {
      pergunta: "Quem escreveu 'Os Lusíadas'?",
      opcoes: ["Fernando Pessoa", "Eça de Queirós", "Camões", "Sophia de Mello"],
      correta: 2
    },
    {
      pergunta: "Quantos continentes existem?",
      opcoes: ["5", "6", "7", "8"],
      correta: 2
    },
    {
      pergunta: "Qual é o oceano entre África e Austrália?",
      opcoes: ["Pacífico", "Atlântico", "Ártico", "Índico"],
      correta: 3
    }
];
// Iniciar ou recuperar dados
let pergunta = parseInt(localStorage.getItem("pergunta")) || 1;
let score = parseInt(localStorage.getItem("score")) || 0;
let usados = JSON.parse(localStorage.getItem("usados")) || [];
let scores = JSON.parse(localStorage.getItem("scores")) || [];

// Se usados estiver vazio (primeira pergunta), inicializa
if (usados.length === 0) {
    for (let i = 0; i < quizData.length; i++) {
        usados.push(i);
    }
}


function reset(){
  const variavel = pergunta - 1;
  const data = quizData[variavel];
  document.getElementById('question').textContent = data.pergunta;
  let opcoesDisponiveis = [...data.opcoes];
  let botaoCorreto = "";
  document.querySelectorAll(".button").forEach(botao => {
    const aleatorio = Math.floor(Math.random() * opcoesDisponiveis.length);
    if (aleatorio === data.correta) {
      botaoCorreto = botao.id;
    }
    botao.textContent = opcoesDisponiveis[aleatorio];
    opcoesDisponiveis.splice(aleatorio, 1)
    botao.addEventListener("click", () => {
      if(botao.id === botaoCorreto){
        score += 100 + (timeLeft * 10);
      }
      if (pergunta === quizData.length){
        clearInterval(countdown);
        scores.push(score);
        localStorage.setItem("score", 0);
        localStorage.setItem("pergunta", 1);
        localStorage.setItem("usados", JSON.stringify([]));
        localStorage.setItem("scores", JSON.stringify(scores));
        mostrarPopup();
      } else {
        pergunta++;
        localStorage.setItem("pergunta", pergunta);
        localStorage.setItem("score", score);
        localStorage.setItem("usados", JSON.stringify(usados));
        localStorage.setItem('timeLeft', 30);
        window.location.href = `quest.html?pergunta=${pergunta}`;
      }
    });
  });
}

function mostrarPopup() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("finalizado").textContent = "Quiz finalizado";
    document.getElementById("score").textContent = "Score: " + score;
}
function fecharPopup() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "main.html";
}


