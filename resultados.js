const scoresList = document.getElementById('scoresList');
const clearBtn = document.getElementById('clearBtn');

function loadScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scoresList.innerHTML = '';

    if(scores.length === 0){
        const li = document.createElement('li');
        li.textContent = 'Nenhum score salvo ainda.';
        scoresList.appendChild(li);
        return;
    }
    scores.sort((a, b) => b - a);

    scores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1} - Pontuação: ${score}`;
        scoresList.appendChild(li);
    });
}

function clearScores() {
    localStorage.removeItem('scores');
    loadScores();
}

clearBtn.addEventListener('click', clearScores);

loadScores();

document.getElementById("voltar").addEventListener("click", function() {
    window.location.href = "main.html";
});
