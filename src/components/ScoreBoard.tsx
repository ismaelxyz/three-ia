import React from 'react';
import { GameData } from '../types/game';
import { User, Brain, Minus } from 'lucide-react';

interface ScoreBoardProps {
  score: GameData['score'];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Puntuación</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-1 text-blue-600">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Tú</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {score.player}
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-1 text-yellow-600">
            <Minus className="w-4 h-4" />
            <span className="text-sm font-medium">Empates</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {score.draws}
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-1 text-red-600">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">IA</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {score.ai}
          </div>
        </div>
      </div>
    </div>
  );
};