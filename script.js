const board = document.getElementById("board");
        const status = document.getElementById("status");
        const restartButton = document.getElementById("restartButton");
        let currentPlayer = "X";
        let gameBoard = Array(9).fill(null);
        
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                [0, 4, 8], [2, 4, 6]
            ];
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    return gameBoard[a];
                }
            }
            return gameBoard.includes(null) ? null : "Draw";
        }
        
        function handleMove() {
            let index = prompt(`Player ${currentPlayer}, enter a position (1-9):`);
            index = parseInt(index) - 1;
            if (isNaN(index) || index < 0 || index > 8 || gameBoard[index]) {
                alert("Invalid move! Try again.");
                return;
            }
            gameBoard[index] = currentPlayer;
            renderBoard();
            let winner = checkWinner();
            if (winner) {
                alert(winner === "Draw" ? "It's a draw!" : `Player ${winner} Wins!`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s Turn`;
            }
        }
        
        function renderBoard() {
            board.innerHTML = "";
            gameBoard.forEach((value, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                if (value) cell.classList.add("taken");
                cell.textContent = value;
                cell.dataset.index = index;
                board.appendChild(cell);
            });
        }
        
        function resetGame() {
            gameBoard.fill(null);
            currentPlayer = "X";
            status.textContent = "Player X's Turn";
            renderBoard();
        }
        
        document.addEventListener("DOMContentLoaded", () => {
            renderBoard();
            board.addEventListener("click", handleMove);
            restartButton.addEventListener("click", resetGame);
        });