const currentPlayerDisplay = document.querySelector(".currentPlayer");
let selected = [];
let player = "X";

const winningCombinations = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9], 
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 6, 9], 
    [1, 5, 9], 
    [3, 5, 7],
];

function init() {
    selected = Array(10).fill(null); 
    player = "X";
    currentPlayerDisplay.innerHTML = `Jogador da vez: ${player}`;

    document.querySelectorAll(".game button").forEach((button) => {
        button.innerHTML = "";
        button.disabled = false;
        button.addEventListener("click", newMove);
    });
}

function newMove(e) {
    const index = parseInt(e.target.getAttribute("data-i"));
    e.target.innerHTML = player;
    e.target.disabled = true;
    selected[index] = player;

    setTimeout(check, 100);

    player = player === "X" ? "O" : "X";
    currentPlayerDisplay.innerHTML = `Jogador da vez: ${player}`;
}

function check() {
    const lastPlayer = player === "X" ? "O" : "X";

    for (const pos of winningCombinations) {
        if (pos.every((index) => selected[index] === lastPlayer)) {
            alert(`O jogador '${lastPlayer}' ganhou!`);
            init();
            return;
        }
    }

    if (selected.slice(1).every((item) => item !== null)) {
        alert("Deu empate!");
        init();
        return;
    }
}

init();