import React from 'react';
import { Player } from '../types/game';

interface SquareProps {
  value: Player;
  onClick: () => void;
  disabled: boolean;
  isWinning?: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, disabled, isWinning }) => {
  return (
    <button
      className={`
        aspect-square rounded-lg text-4xl md:text-5xl font-bold transition-all duration-200
        border-2 border-gray-200 bg-white shadow-sm
        hover:shadow-md hover:scale-105 active:scale-95
        disabled:cursor-not-allowed
        ${isWinning ? 'bg-green-100 border-green-300 shadow-green-200' : ''}
        ${!disabled && !value ? 'hover:bg-gray-50' : ''}
        ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-500' : 'text-gray-400'}
      `}
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={`Square ${value || 'empty'}`}
    >
      {value && (
        <span className="animate-in fade-in-50 zoom-in-50 duration-200">
          {value}
        </span>
      )}
    </button>
  );
};