import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName]=useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const editHandler = () =>{
         setIsEditing((editing)=> !editing); 

         if(isEditing){
             onChangeName(symbol, playerName);
         }
    }

    //this functions handles the change of the name
    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editiblePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Save';

    if(isEditing){
        editiblePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
    // let btnCaption = 'Edit';

    }
    
    return (
        <li className={isActive? 'active':undefined}>
        <span className="player">
          {/* {isEditing ? <input></input> :<span className="player-name">{name}</span>} */}
          {editiblePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={editHandler} className="button">{isEditing ? 'Save': 'Edit'}</button>
      </li>
    )
}