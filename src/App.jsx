import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/player.jsx";
import Log from "./components/Log";
import {  WINNING_COMBINATIONS  } from './winning-combinations.js';
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

//deriving active player to not have to manage it in a state
function deriveActivePlayer(gameTurns) {
  let currentPLayer= 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPLayer = 'O';
  }

  return currentPLayer;
}

function deriveGameboard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

  for (const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
    
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol) {
      
        winner= players[firstSquareSymbol];
      }
  }

  return winner;
}

function App() {

  const [ players,setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);


  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare= (rowIndex,colIndex) => {
  // setActivePlayer((curActivePlayer)=> curActivePlayer ==='X'? 'O':'X')
  setGameTurns((prevTurns) => {
  const currentPLayer = deriveActivePlayer(prevTurns);

    const updatedTurns = [
      {square:{row: rowIndex, col: colIndex}, player: currentPLayer},...prevTurns,
    ];
      return updatedTurns;
  });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName) {
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    });
  }

  

  return (
    <main>
    <div id='game-container'>

      <ol id='players' className="highlight-player">

        <Player
        initialName={PLAYERS.X} 
        symbol='X' 
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
        />

        <Player 
        initialName={PLAYERS.O} 
        symbol='O'
        isActive={activePlayer === 'O'}
        onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}/>}
        <GameBoard
         onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
  )
}

export default App
