import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { Board } from "./components/Board";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./logic/constants";
import { checkWinnerFrom, chechEndGame } from "./logic/board";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null); //Null = No hay ganador, false = Empate

  //Resetear juego, setear los useStates a los valores iniciales
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    //No actualizamos la posicion si ya tiene algo
    if (board[index] || winner) return;

    //Actualizar tablero
    const newBoard = [...board]; //Creamos una copia del board utilizando rest operator
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guardar partida
    saveGameToStorage({ board: newBoard, turn: newTurn });

    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (chechEndGame(newBoard)) {
      setWinner(false); //Empate
    }
  };

  return (
    <main className="card">
      <div className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset game</button>

        <Board board={board} updateBoard={updateBoard}></Board>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
      </div>
    </main>
  );
}

export default App;
