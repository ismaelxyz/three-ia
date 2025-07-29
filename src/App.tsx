import React from 'react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { ScoreBoard } from './components/ScoreBoard';
import { useGame } from './hooks/useGame';
import { Grid3X3 } from 'lucide-react';

function App() {
  const { gameData, isAiThinking, makeMove, startNewGame, resetScore } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Grid3X3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Tres en Raya</h1>
          </div>
          <p className="text-gray-600">Juega contra la IA inteligente</p>
        </div>

        {/* Score Board */}
        <ScoreBoard score={gameData.score} />

        {/* Game Board */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <Board
            board={gameData.board}
            onSquareClick={makeMove}
            disabled={gameData.gameState !== 'playing' || isAiThinking || gameData.currentPlayer !== 'X'}
            winner={gameData.winner}
          />
        </div>

        {/* Game Status and Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <GameStatus
            gameData={gameData}
            isAiThinking={isAiThinking}
            onNewGame={startNewGame}
            onResetScore={resetScore}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          El juego se guarda automáticamente
        </div>
      </div>
    </div>
  );
}

export default App;