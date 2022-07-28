import React from 'react'
import {useState} from "react"

const TicTacGame = () => {
    const [turn, setTurn] = useState('X');
    const [spaces, setSpaces] = useState(Array(9).fill(''));
    const [winner, setWinner]= useState()

    const checkWinner=(squares) =>{
        let winCombos = {
            horizontal: [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ],
            vertical: [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagonal: [
                [0,4,8],
                [2,4,6]
            ]
        };

        for (let winCombo in winCombos){
            winCombos[winCombo].forEach((pattern)=>{
                //If one of these tiles are empty then there is no way there is a winning pattern in the winCombo
                if (
                    squares[pattern[0]]===''||
                    squares[pattern[1]]===''||
                    squares[pattern[2]]===''
                ){}
                //If everything is the same (Either x or O), set the winner to whoever won
                else if(squares[pattern[0]]===squares[pattern[1]] && 
                    squares[pattern[1]]===squares[pattern[2]])
                {
                    setWinner(squares[pattern[0]]) 
                }
            })
        }
    }

    //Add Explosion Logic
    const handleClick=(num)=>{
        if(spaces[num]!==""){
            return
        }
        let squares=[...spaces]
        if(turn==="X"){
            squares[num]="X"
            setTurn("O")
        }
        else{
            squares[num]="O"
            setTurn("X")
        }
        checkWinner(squares)
        setCells(squares)
    };

    const Space=({num})=>{
        return <td onClick={()=>handleClick(num)}>{spaces[num]}</td>
    };

    const handleRestart=()=>{
        setWinner(null)
        setSpaces(Array(9).fill(''))
    }

    return (
        //Change layout as needed
        <div className='container'>
            <div>
               <h3>Are you ready for your game?</h3>
            </div>
            
            <table>
                <tbody >
                    <tr>
                        <Space num={0}/>
                        <Space num={1}/>
                        <Space num={2}/>
                    </tr>
                    <tr>
                        <Space num={3}/>
                        <Space num={4}/>
                        <Space num={5}/>
                    </tr>
                    <tr>
                        <Space num={6}/>
                        <Space num={7}/>
                        <Space num={8}/>
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                    <h3 className='winner'>{winner} is the winner!</h3>
                    <button className='btn' onClick={()=>handleRestart()}>Play Again?</button>
                </>
            )}
        </div>
      )
};

export default TicTacGame;