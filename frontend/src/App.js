import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { GameEngine } from './components';

const GAME_CONFIG = {
  lanes: 3,
  speed: 2,
  gravity: 0.5,
  jumpPower: -15,
  obstacleSpawnRate: 0.02,
  coinSpawnRate: 0.03,
  powerUpSpawnRate: 0.005,
  gameHeight: 600,
  gameWidth: 400,
  characterSize: 40,
  obstacleSize: 60,
  coinSize: 20,
  powerUpSize: 30
};

const COLORS = {
  electric_red: '#E31902',
  mellow_apricot: '#F7BE76',
  shandy: '#FFED6D',
  diamond: '#C6FEFE',
  electric_blue: '#6AEEFD',
  pigment_blue: '#354093',
  dark_bg: '#1a1a2e',
  tunnel_gray: '#16213e',
  bright_green: '#0f3460'
};

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('subwayHighScore') || '0'));
  const [character, setCharacter] = useState({
    lane: 1, // 0, 1, 2
    position: 0,
    jumping: false,
    sliding: false,
    jetpack: false,
    jetpackTime: 0
  });
  const [obstacles, setObstacles] = useState([]);
  const [gameCoins, setGameCoins] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(GAME_CONFIG.speed);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const [powerUpText, setPowerUpText] = useState('');
  const gameLoopRef = useRef(null);
  const backgroundOffset = useRef(0);

  // Initialize game
  const initializeGame = useCallback(() => {
    setScore(0);
    setCoins(0);
    setCharacter({
      lane: 1,
      position: 0,
      jumping: false,
      sliding: false,
      jetpack: false,
      jetpackTime: 0
    });
    setObstacles([]);
    setGameCoins([]);
    setPowerUps([]);
    setGameSpeed(GAME_CONFIG.speed);
    setShowPowerUp(false);
    backgroundOffset.current = 0;
  }, []);

  // Game controls
  const handleKeyPress = useCallback((e) => {
    if (gameState !== 'playing') return;
    
    switch(e.key) {
      case 'ArrowLeft':
        setCharacter(prev => ({ ...prev, lane: Math.max(0, prev.lane - 1) }));
        break;
      case 'ArrowRight':
        setCharacter(prev => ({ ...prev, lane: Math.min(2, prev.lane + 1) }));
        break;
      case 'ArrowUp':
      case ' ':
        if (!character.jumping && !character.jetpack) {
          setCharacter(prev => ({ ...prev, jumping: true, position: 0 }));
        }
        break;
      case 'ArrowDown':
        if (!character.jumping && !character.jetpack) {
          setCharacter(prev => ({ ...prev, sliding: true }));
          setTimeout(() => setCharacter(prev => ({ ...prev, sliding: false })), 800);
        }
        break;
      default:
        break;
    }
  }, [gameState, character.jumping, character.jetpack]);

  // Touch controls
  const handleTouchStart = useCallback((e) => {
    if (gameState !== 'playing') return;
    
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const gameWidth = rect.width;
    const gameHeight = rect.height;
    
    // Swipe detection
    if (y < gameHeight / 3) {
      // Jump
      if (!character.jumping && !character.jetpack) {
        setCharacter(prev => ({ ...prev, jumping: true, position: 0 }));
      }
    } else if (y > gameHeight * 2/3) {
      // Slide
      if (!character.jumping && !character.jetpack) {
        setCharacter(prev => ({ ...prev, sliding: true }));
        setTimeout(() => setCharacter(prev => ({ ...prev, sliding: false })), 800);
      }
    } else {
      // Lane change
      if (x < gameWidth / 2) {
        setCharacter(prev => ({ ...prev, lane: Math.max(0, prev.lane - 1) }));
      } else {
        setCharacter(prev => ({ ...prev, lane: Math.min(2, prev.lane + 1) }));
      }
    }
  }, [gameState, character.jumping, character.jetpack]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      // Update background
      backgroundOffset.current += gameSpeed;
      
      // Update character physics
      setCharacter(prev => {
        let newChar = { ...prev };
        
        // Jumping physics
        if (newChar.jumping) {
          newChar.position += GAME_CONFIG.jumpPower + (prev.position * GAME_CONFIG.gravity);
          if (newChar.position >= 0) {
            newChar.position = 0;
            newChar.jumping = false;
          }
        }
        
        // Jetpack physics
        if (newChar.jetpack) {
          newChar.jetpackTime -= 1;
          if (newChar.jetpackTime <= 0) {
            newChar.jetpack = false;
          }
        }
        
        return newChar;
      });

      // Spawn obstacles
      if (Math.random() < GAME_CONFIG.obstacleSpawnRate) {
        setObstacles(prev => [...prev, {
          id: Date.now() + Math.random(),
          lane: Math.floor(Math.random() * 3),
          y: -GAME_CONFIG.obstacleSize,
          type: Math.random() > 0.5 ? 'train' : 'barrier'
        }]);
      }

      // Spawn coins
      if (Math.random() < GAME_CONFIG.coinSpawnRate) {
        setGameCoins(prev => [...prev, {
          id: Date.now() + Math.random(),
          lane: Math.floor(Math.random() * 3),
          y: -GAME_CONFIG.coinSize,
          collected: false
        }]);
      }

      // Spawn power-ups
      if (Math.random() < GAME_CONFIG.powerUpSpawnRate) {
        setPowerUps(prev => [...prev, {
          id: Date.now() + Math.random(),
          lane: Math.floor(Math.random() * 3),
          y: -GAME_CONFIG.powerUpSize,
          type: Math.random() > 0.5 ? 'jetpack' : 'magnet'
        }]);
      }

      // Update obstacles
      setObstacles(prev => prev.map(obstacle => ({
        ...obstacle,
        y: obstacle.y + gameSpeed
      })).filter(obstacle => obstacle.y < GAME_CONFIG.gameHeight + 50));

      // Update coins
      setGameCoins(prev => prev.map(coin => ({
        ...coin,
        y: coin.y + gameSpeed
      })).filter(coin => coin.y < GAME_CONFIG.gameHeight + 50));

      // Update power-ups
      setPowerUps(prev => prev.map(powerUp => ({
        ...powerUp,
        y: powerUp.y + gameSpeed
      })).filter(powerUp => powerUp.y < GAME_CONFIG.gameHeight + 50));

      // Collision detection
      setObstacles(prev => {
        const characterY = GAME_CONFIG.gameHeight - 100;
        const characterX = character.lane;
        
        const collision = prev.find(obstacle => 
          obstacle.lane === characterX &&
          obstacle.y > characterY - 60 &&
          obstacle.y < characterY + 60 &&
          !character.jumping &&
          !character.jetpack
        );
        
        if (collision) {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('subwayHighScore', score.toString());
          }
        }
        
        return prev;
      });

      // Coin collection
      setGameCoins(prev => {
        const characterY = GAME_CONFIG.gameHeight - 100;
        const characterX = character.lane;
        
        return prev.map(coin => {
          if (!coin.collected &&
              coin.lane === characterX &&
              coin.y > characterY - 40 &&
              coin.y < characterY + 40) {
            setCoins(prevCoins => prevCoins + 1);
            setScore(prevScore => prevScore + 10);
            return { ...coin, collected: true };
          }
          return coin;
        });
      });

      // Power-up collection
      setPowerUps(prev => {
        const characterY = GAME_CONFIG.gameHeight - 100;
        const characterX = character.lane;
        
        return prev.filter(powerUp => {
          if (powerUp.lane === characterX &&
              powerUp.y > characterY - 40 &&
              powerUp.y < characterY + 40) {
            
            if (powerUp.type === 'jetpack') {
              setCharacter(prevChar => ({
                ...prevChar,
                jetpack: true,
                jetpackTime: 300
              }));
              setShowPowerUp(true);
              setPowerUpText('JETPACK!');
              setTimeout(() => setShowPowerUp(false), 2000);
            } else if (powerUp.type === 'magnet') {
              setShowPowerUp(true);
              setPowerUpText('MAGNET!');
              setTimeout(() => setShowPowerUp(false), 2000);
            }
            
            return false;
          }
          return true;
        });
      });

      // Increase score
      setScore(prev => prev + 1);
      
      // Increase speed over time
      setGameSpeed(prev => Math.min(prev + 0.001, 8));
    };

    gameLoopRef.current = setInterval(gameLoop, 16);
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, character.lane, character.jumping, character.jetpack, gameSpeed, score, highScore]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    initializeGame();
    setGameState('playing');
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const restartGame = () => {
    initializeGame();
    setGameState('playing');
  };

  const goToMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="app">
      <div className="game-container">
        <GameEngine 
          gameState={gameState}
          score={score}
          coins={coins}
          highScore={highScore}
          character={character}
          obstacles={obstacles}
          gameCoins={gameCoins}
          powerUps={powerUps}
          showPowerUp={showPowerUp}
          powerUpText={powerUpText}
          backgroundOffset={backgroundOffset.current}
          onTouchStart={handleTouchStart}
          onStartGame={startGame}
          onPauseGame={pauseGame}
          onResumeGame={resumeGame}
          onRestartGame={restartGame}
          onGoToMenu={goToMenu}
        />
      </div>
    </div>
  );
}

export default App;