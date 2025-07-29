import React from 'react';
import { Square } from './Square';
import { Player } from '../types/game';
import { WINNING_COMBINATIONS } from '../utils/gameLogic';

interface BoardProps {
  board: Player[];
  onSquareClick: (index: number) => void;
  disabled: boolean;
  winner: Player;
}

export const Board: React.FC<BoardProps> = ({ board, onSquareClick, disabled, winner }) => {
  const getWinningSquares = (): number[] => {
    if (!winner) return [];
    
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] === winner && board[b] === winner && board[c] === winner) {
        return combination;
      }
    }
    return [];
  };

  const winningSquares = getWinningSquares();

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 w-full max-w-xs md:max-w-sm mx-auto">
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
          disabled={disabled}
          isWinning={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
};