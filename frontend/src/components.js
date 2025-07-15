import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Character Component
export const Character = ({ lane, position, jumping, sliding, jetpack }) => {
  const lanePosition = lane * 120 + 60;
  const characterY = position;
  
  return (
    <motion.div
      className="character"
      style={{
        left: lanePosition,
        bottom: 100 - characterY,
        width: 40,
        height: 40,
        position: 'absolute',
        backgroundImage: 'url(https://images.unsplash.com/photo-1633533826315-470bc54abbf9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxzdWJ3YXklMjBzdXJmZXJzJTIwY2hhcmFjdGVyfGVufDB8fHx8MTc1MjYwNDgwOHww&ixlib=rb-4.1.0&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%',
        border: `3px solid ${COLORS.electric_blue}`,
        zIndex: 10
      }}
      animate={{
        scale: jumping ? 1.2 : sliding ? 0.8 : 1,
        rotate: jumping ? 360 : 0,
        y: jetpack ? -20 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {jetpack && (
        <motion.div
          className="jetpack-fire"
          style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 20,
            height: 30,
            background: `linear-gradient(to top, ${COLORS.electric_red}, ${COLORS.shandy})`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(1px)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity
          }}
        />
      )}
    </motion.div>
  );
};

// Obstacle Component
export const Obstacle = ({ obstacle }) => {
  const lanePosition = obstacle.lane * 120 + 60;
  
  return (
    <motion.div
      className="obstacle"
      style={{
        left: lanePosition,
        top: obstacle.y,
        width: 60,
        height: 60,
        position: 'absolute',
        backgroundImage: 'url(https://images.unsplash.com/photo-1619334748651-55dfe05ff3bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzdWJ3YXklMjB0cmFpbnxlbnwwfHx8fDE3NTI2MDQ4MTd8MA&ixlib=rb-4.1.0&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        border: `2px solid ${COLORS.electric_red}`,
        zIndex: 5
      }}
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
};

// Coin Component
export const Coin = ({ coin }) => {
  const lanePosition = coin.lane * 120 + 80;
  
  if (coin.collected) {
    return (
      <motion.div
        className="coin-collected"
        style={{
          left: lanePosition,
          top: coin.y,
          width: 20,
          height: 20,
          position: 'absolute',
          color: COLORS.shandy,
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 8
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 2, opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        +10
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="coin"
      style={{
        left: lanePosition,
        top: coin.y,
        width: 20,
        height: 20,
        position: 'absolute',
        backgroundImage: 'url(https://images.unsplash.com/photo-1624365168785-c65be9114821?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY29pbnxlbnwwfHx8fDE3NTI2MDQ4MjV8MA&ixlib=rb-4.1.0&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%',
        border: `2px solid ${COLORS.shandy}`,
        zIndex: 6
      }}
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{
        rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
        scale: { duration: 1, repeat: Infinity }
      }}
    />
  );
};

// PowerUp Component
export const PowerUp = ({ powerUp }) => {
  const lanePosition = powerUp.lane * 120 + 75;
  
  return (
    <motion.div
      className="power-up"
      style={{
        left: lanePosition,
        top: powerUp.y,
        width: 30,
        height: 30,
        position: 'absolute',
        backgroundImage: 'url(https://images.unsplash.com/photo-1717540231957-607ce2bcfe02?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxqZXRwYWNrfGVufDB8fHx8MTc1MjYwNDg0MXww&ixlib=rb-4.1.0&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        border: `3px solid ${COLORS.electric_blue}`,
        zIndex: 7
      }}
      animate={{
        scale: [1, 1.3, 1],
        boxShadow: [
          `0 0 10px ${COLORS.electric_blue}`,
          `0 0 20px ${COLORS.electric_blue}`,
          `0 0 10px ${COLORS.electric_blue}`
        ]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  );
};

// Game Background Component
export const GameBackground = ({ backgroundOffset }) => {
  return (
    <div 
      className="game-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1707552619791-0962947aaedd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxzdWJ3YXklMjB0dW5uZWx8ZW58MHx8fHwxNzUyNjA0ODMyfDA&ixlib=rb-4.1.0&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: `center ${backgroundOffset % 600}px`,
        backgroundRepeat: 'repeat-y',
        filter: 'brightness(0.7) contrast(1.2)',
        zIndex: 1
      }}
    >
      {/* Lane dividers */}
      <div className="lane-dividers">
        {[1, 2].map(lane => (
          <div
            key={lane}
            style={{
              position: 'absolute',
              left: lane * 120,
              top: 0,
              width: 2,
              height: '100%',
              background: `linear-gradient(to bottom, transparent, ${COLORS.shandy}, transparent)`,
              backgroundSize: '100% 50px',
              backgroundRepeat: 'repeat-y',
              animation: 'moveDown 0.5s linear infinite',
              zIndex: 2
            }}
          />
        ))}
      </div>
    </div>
  );
};

// HUD Component
export const HUD = ({ score, coins, onPauseGame }) => {
  return (
    <div className="hud">
      <div className="hud-top">
        <div className="score-display">
          <div className="score-label">Score</div>
          <div className="score-value">{score.toLocaleString()}</div>
        </div>
        <div className="coins-display">
          <div className="coin-icon">🪙</div>
          <div className="coins-value">{coins}</div>
        </div>
        <button className="pause-button" onClick={onPauseGame}>
          ⏸️
        </button>
      </div>
    </div>
  );
};

// Menu Screen Component
export const MenuScreen = ({ highScore, onStartGame }) => {
  return (
    <motion.div
      className="menu-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${COLORS.dark_bg}, ${COLORS.tunnel_gray}, ${COLORS.bright_green})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: 20
      }}
    >
      <motion.h1
        className="game-title"
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: `linear-gradient(45deg, ${COLORS.electric_blue}, ${COLORS.shandy}, ${COLORS.electric_red})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          textShadow: [
            '2px 2px 4px rgba(0,0,0,0.5)',
            '4px 4px 8px rgba(0,0,0,0.8)',
            '2px 2px 4px rgba(0,0,0,0.5)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        SUBWAY SURFERS
      </motion.h1>
      
      <div className="high-score" style={{ fontSize: '24px', marginBottom: '40px', color: COLORS.mellow_apricot }}>
        High Score: {highScore.toLocaleString()}
      </div>
      
      <motion.button
        className="start-button"
        onClick={onStartGame}
        style={{
          padding: '15px 40px',
          fontSize: '24px',
          fontWeight: 'bold',
          backgroundColor: COLORS.electric_red,
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          marginBottom: '20px',
          boxShadow: `0 4px 15px rgba(227, 25, 2, 0.4)`,
          transition: 'all 0.3s ease'
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: `0 6px 20px rgba(227, 25, 2, 0.6)`
        }}
        whileTap={{ scale: 0.95 }}
      >
        START GAME
      </motion.button>
      
      <div className="controls-info" style={{ fontSize: '16px', color: COLORS.diamond, lineHeight: '1.5' }}>
        <p>🎮 Controls:</p>
        <p>← → Arrow Keys: Change lanes</p>
        <p>↑ Arrow / Space: Jump</p>
        <p>↓ Arrow: Slide</p>
        <p>📱 Touch: Tap areas to control</p>
      </div>
    </motion.div>
  );
};

// Game Over Screen Component
export const GameOverScreen = ({ score, highScore, coins, onRestartGame, onGoToMenu }) => {
  const isNewHighScore = score > highScore;
  
  return (
    <motion.div
      className="game-over-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxnYW1lJTIwb3ZlcnxlbnwwfHx8fDE3NTI2MDQ4NDl8MA&ixlib=rb-4.1.0&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: 20
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '40px',
          borderRadius: '20px',
          border: `3px solid ${COLORS.electric_red}`,
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: COLORS.electric_red,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            color: [COLORS.electric_red, COLORS.shandy, COLORS.electric_red]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          GAME OVER
        </motion.h1>
        
        {isNewHighScore && (
          <motion.div
            style={{
              fontSize: '24px',
              color: COLORS.shandy,
              marginBottom: '20px',
              fontWeight: 'bold'
            }}
            animate={{
              scale: [1, 1.2, 1],
              textShadow: [
                '0 0 10px rgba(255, 237, 109, 0.8)',
                '0 0 20px rgba(255, 237, 109, 1)',
                '0 0 10px rgba(255, 237, 109, 0.8)'
              ]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          >
            🎉 NEW HIGH SCORE! 🎉
          </motion.div>
        )}
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: COLORS.electric_blue, marginBottom: '10px' }}>
            Score: {score.toLocaleString()}
          </div>
          <div style={{ fontSize: '20px', color: COLORS.mellow_apricot, marginBottom: '10px' }}>
            High Score: {Math.max(score, highScore).toLocaleString()}
          </div>
          <div style={{ fontSize: '18px', color: COLORS.shandy }}>
            Coins: {coins} 🪙
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <motion.button
            onClick={onRestartGame}
            style={{
              padding: '12px 30px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: COLORS.electric_blue,
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              boxShadow: `0 4px 15px rgba(106, 238, 253, 0.4)`,
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 6px 20px rgba(106, 238, 253, 0.6)`
            }}
            whileTap={{ scale: 0.95 }}
          >
            PLAY AGAIN
          </motion.button>
          
          <motion.button
            onClick={onGoToMenu}
            style={{
              padding: '12px 30px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: COLORS.tunnel_gray,
              color: 'white',
              border: `2px solid ${COLORS.diamond}`,
              borderRadius: '25px',
              cursor: 'pointer',
              boxShadow: `0 4px 15px rgba(198, 254, 254, 0.4)`,
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: COLORS.diamond,
              color: COLORS.tunnel_gray
            }}
            whileTap={{ scale: 0.95 }}
          >
            MENU
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Pause Screen Component
export const PauseScreen = ({ onResumeGame, onGoToMenu }) => {
  return (
    <motion.div
      className="pause-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: 20,
        backdropFilter: 'blur(5px)'
      }}
    >
      <h2 style={{ fontSize: '48px', marginBottom: '40px', color: COLORS.electric_blue }}>
        PAUSED
      </h2>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <motion.button
          onClick={onResumeGame}
          style={{
            padding: '12px 30px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: COLORS.electric_blue,
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: `0 4px 15px rgba(106, 238, 253, 0.4)`
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RESUME
        </motion.button>
        
        <motion.button
          onClick={onGoToMenu}
          style={{
            padding: '12px 30px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: COLORS.tunnel_gray,
            color: 'white',
            border: `2px solid ${COLORS.diamond}`,
            borderRadius: '25px',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MENU
        </motion.button>
      </div>
    </motion.div>
  );
};

// PowerUp Notification Component
export const PowerUpNotification = ({ show, text }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="power-up-notification"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '32px',
            fontWeight: 'bold',
            color: COLORS.shandy,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            zIndex: 15,
            background: `linear-gradient(45deg, ${COLORS.electric_blue}, ${COLORS.electric_red})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Game Engine Component
export const GameEngine = ({ 
  gameState, 
  score, 
  coins, 
  highScore, 
  character, 
  obstacles, 
  gameCoins, 
  powerUps, 
  showPowerUp, 
  powerUpText, 
  backgroundOffset,
  onTouchStart,
  onStartGame,
  onPauseGame,
  onResumeGame,
  onRestartGame,
  onGoToMenu
}) => {
  return (
    <div 
      className="game-engine"
      style={{
        position: 'relative',
        width: '400px',
        height: '600px',
        overflow: 'hidden',
        border: `4px solid ${COLORS.electric_blue}`,
        borderRadius: '20px',
        background: COLORS.dark_bg,
        boxShadow: `0 0 30px rgba(106, 238, 253, 0.5)`,
        margin: '0 auto'
      }}
      onTouchStart={onTouchStart}
    >
      <GameBackground backgroundOffset={backgroundOffset} />
      
      {gameState === 'playing' && (
        <>
          <HUD score={score} coins={coins} onPauseGame={onPauseGame} />
          
          <Character 
            lane={character.lane}
            position={character.position}
            jumping={character.jumping}
            sliding={character.sliding}
            jetpack={character.jetpack}
          />
          
          {obstacles.map(obstacle => (
            <Obstacle key={obstacle.id} obstacle={obstacle} />
          ))}
          
          {gameCoins.map(coin => (
            <Coin key={coin.id} coin={coin} />
          ))}
          
          {powerUps.map(powerUp => (
            <PowerUp key={powerUp.id} powerUp={powerUp} />
          ))}
          
          <PowerUpNotification show={showPowerUp} text={powerUpText} />
        </>
      )}
      
      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <MenuScreen highScore={highScore} onStartGame={onStartGame} />
        )}
        
        {gameState === 'paused' && (
          <PauseScreen onResumeGame={onResumeGame} onGoToMenu={onGoToMenu} />
        )}
        
        {gameState === 'gameOver' && (
          <GameOverScreen 
            score={score} 
            highScore={highScore} 
            coins={coins}
            onRestartGame={onRestartGame} 
            onGoToMenu={onGoToMenu} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};