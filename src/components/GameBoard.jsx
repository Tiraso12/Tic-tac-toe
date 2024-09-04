
const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;

    for (const turn of turns){
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col]=player;
    }

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
            {gameBoard.map((row,rowIndex)=>
             (<li key={rowIndex}>
                    <ol>
                     {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                        </li>))}
                    </ol>
                </li>
            ))}
        </ol>
    )
    
}