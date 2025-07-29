export type Player = 'X' | 'O' | null;

export type GameState = 'playing' | 'won' | 'draw';

export interface GameData {
  board: Player[];
  currentPlayer: Player;
  gameState: GameState;
  winner: Player;
  score: {
    player: number;
    ai: number;
    draws: number;
  };
}

export interface Move {
  index: number;
  player: Player;
}