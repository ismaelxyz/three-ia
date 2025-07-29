import { Player, GameState } from '../types/game';

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (board: Player[]): Player => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const isBoardFull = (board: Player[]): boolean => {
  return board.every(cell => cell !== null);
};

export const getGameState = (board: Player[]): { state: GameState; winner: Player } => {
  const winner = checkWinner(board);
  if (winner) {
    return { state: 'won', winner };
  }
  if (isBoardFull(board)) {
    return { state: 'draw', winner: null };
  }
  return { state: 'playing', winner: null };
};

export const getAvailableMoves = (board: Player[]): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
};

// Algoritmo Minimax para la IA
export const minimax = (
  board: Player[],
  depth: number,
  isMaximizing: boolean,
  maxPlayer: Player = 'O',
  minPlayer: Player = 'X'
): number => {
  const { state, winner } = getGameState(board);
  
  if (state === 'won') {
    return winner === maxPlayer ? 10 - depth : depth - 10;
  }
  
  if (state === 'draw') {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    const availableMoves = getAvailableMoves(board);
    
    for (const move of availableMoves) {
      board[move] = maxPlayer;
      const score = minimax(board, depth + 1, false, maxPlayer, minPlayer);
      board[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    
    return bestScore;
  } else {
    let bestScore = Infinity;
    const availableMoves = getAvailableMoves(board);
    
    for (const move of availableMoves) {
      board[move] = minPlayer;
      const score = minimax(board, depth + 1, true, maxPlayer, minPlayer);
      board[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    
    return bestScore;
  }
};

export const getBestMove = (board: Player[]): number => {
  let bestScore = -Infinity;
  let bestMove = -1;
  const availableMoves = getAvailableMoves(board);

  for (const move of availableMoves) {
    board[move] = 'O';
    const score = minimax(board, 0, false);
    board[move] = null;
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};