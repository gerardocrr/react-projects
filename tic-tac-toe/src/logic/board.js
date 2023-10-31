import { WINNER_COMBOS } from "./constants";

export const checkWinnerFrom = (boardToCheck) => {
  //Revisar combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  //Si no hay ganador
  return null;
};

export const chechEndGame = (newBoard) => {
  //Revisamos si hay un empate, si no hay mas espacios vacios en el tablero
  return newBoard.every((square) => square != null);
};
