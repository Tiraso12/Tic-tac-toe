


export default function GameBoard({ onSelectSquare, board }) {
   
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const handleSelectSquare = (rowIndex, colIndex) =>{
    //     setGameBoard((prevGameboard)=>{
    //         // creating a new copy of the gameboard to make it unmutable
    //         const updatedBoard= [...prevGameboard.map(innerArray=> [...innerArray])];
    //         // updating the gameboard
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id='game-board'>
            {board.map((row,rowIndex)=>
             (<li key={rowIndex}>
                    <ol>
                     {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !==null}>
                                {playerSymbol}
                            </button>
                        </li>))}
                    </ol>
                </li>
            ))}
        </ol>
    )
    
}