import { useState, useEffect, useCallback } from 'react';
import { GameData, Player } from '../types/game';
import { getGameState, getBestMove } from '../utils/gameLogic';

const STORAGE_KEY = 'tic-tac-toe-game';

const defaultGameData: GameData = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  gameState: 'playing',
  winner: null,
  score: {
    player: 0,
    ai: 0,
    draws: 0,
  },
};

export const useGame = () => {
  const [gameData, setGameData] = useState<GameData>(defaultGameData);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Cargar juego guardado al inicializar
  useEffect(() => {
    const savedGame = localStorage.getItem(STORAGE_KEY);
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        setGameData(parsedGame);
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    }
  }, []);

  // Guardar juego automáticamente cuando cambie el estado
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
  }, [gameData]);

  const makeMove = useCallback((index: number) => {
    if (gameData.board[index] || gameData.gameState !== 'playing' || isAiThinking) {
      return;
    }

    const newBoard = [...gameData.board];
    newBoard[index] = gameData.currentPlayer;

    const { state, winner } = getGameState(newBoard);
    
    setGameData(prevData => {
      const newScore = { ...prevData.score };
      
      if (state === 'won') {
        if (winner === 'X') {
          newScore.player += 1;
        } else if (winner === 'O') {
          newScore.ai += 1;
        }
      } else if (state === 'draw') {
        newScore.draws += 1;
      }

      return {
        ...prevData,
        board: newBoard,
        currentPlayer: state === 'playing' ? 'O' : prevData.currentPlayer,
        gameState: state,
        winner,
        score: newScore,
      };
    });
  }, [gameData.board, gameData.gameState, gameData.currentPlayer, isAiThinking]);

  // Turno de la IA
  useEffect(() => {
    if (gameData.currentPlayer === 'O' && gameData.gameState === 'playing' && !isAiThinking) {
      setIsAiThinking(true);
      
      // Simular tiempo de "pensamiento" de la IA
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...gameData.board]);
        
        if (bestMove !== -1) {
          const newBoard = [...gameData.board];
          newBoard[bestMove] = 'O';

          const { state, winner } = getGameState(newBoard);
          
          setGameData(prevData => {
            const newScore = { ...prevData.score };
            
            if (state === 'won') {
              if (winner === 'O') {
                newScore.ai += 1;
              }
            } else if (state === 'draw') {
              newScore.draws += 1;
            }

            return {
              ...prevData,
              board: newBoard,
              currentPlayer: state === 'playing' ? 'X' : prevData.currentPlayer,
              gameState: state,
              winner,
              score: newScore,
            };
          });
        }
        
        setIsAiThinking(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [gameData.currentPlayer, gameData.gameState, gameData.board, isAiThinking]);

  const startNewGame = useCallback(() => {
    setGameData(prevData => ({
      ...defaultGameData,
      score: prevData.score, // Mantener puntuación
    }));
    setIsAiThinking(false);
  }, []);

  const resetScore = useCallback(() => {
    setGameData(prevData => ({
      ...prevData,
      score: {
        player: 0,
        ai: 0,
        draws: 0,
      },
    }));
  }, []);

  return {
    gameData,
    isAiThinking,
    makeMove,
    startNewGame,
    resetScore,
  };
};