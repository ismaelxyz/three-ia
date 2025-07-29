import React from 'react';
import { GameData } from '../types/game';
import { Brain, User, Trophy, RotateCcw } from 'lucide-react';

interface GameStatusProps {
  gameData: GameData;
  isAiThinking: boolean;
  onNewGame: () => void;
  onResetScore: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  gameData,
  isAiThinking,
  onNewGame,
  onResetScore,
}) => {
  const getStatusMessage = () => {
    if (isAiThinking) {
      return (
        <div className="flex items-center gap-2 text-orange-600">
          <Brain className="w-5 h-5 animate-pulse" />
          <span>IA pensando...</span>
        </div>
      );
    }

    if (gameData.gameState === 'won') {
      if (gameData.winner === 'X') {
        return (
          <div className="flex items-center gap-2 text-green-600">
            <Trophy className="w-5 h-5" />
            <span>¡Has ganado!</span>
          </div>
        );
      } else {
        return (
          <div className="flex items-center gap-2 text-red-600">
            <Brain className="w-5 h-5" />
            <span>La IA ha ganado</span>
          </div>
        );
      }
    }

    if (gameData.gameState === 'draw') {
      return (
        <div className="flex items-center gap-2 text-yellow-600">
          <span>¡Empate!</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-blue-600">
        {gameData.currentPlayer === 'X' ? (
          <>
            <User className="w-5 h-5" />
            <span>Tu turno (X)</span>
          </>
        ) : (
          <>
            <Brain className="w-5 h-5" />
            <span>Turno de la IA (O)</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="text-center space-y-4">
      <div className="text-lg font-semibold">
        {getStatusMessage()}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onNewGame}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Nuevo Juego
        </button>
        
        <button
          onClick={onResetScore}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Reiniciar Puntuación
        </button>
      </div>
    </div>
  );
};