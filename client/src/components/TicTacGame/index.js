import React, { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../../utils/socket";
import Box from "@mui/material/Box";
import "../../assets/styles/TicTacGame.css";

const TicTacGame = (props) => {
  // const [turn, setTurn] = useState("X");
  const [spaces, setSpaces] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState('');
  const [tie, setTie] = useState(false);
  const [isPlayerX, setIsPlayerX] = useState(false);
  const [isTurn, setIsTurn] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [restartClicked, setRestartClicked] = useState(false);
  const refWinner = useRef('');
  const refPlayerX = useRef(isPlayerX);
  const refRestartClicked = useRef(false);
  const refSpaces = useRef(spaces);
  const socket = useContext(SocketContext);
  const username = props.user.user.username;
  const roomNum = props.room;

  useEffect(() => {
    socket.emit("checkRoom", roomNum, username, (response) => {
      console.log("checking room state...");
      if (response.player === "X") {
        refPlayerX.current = true;
        setIsPlayerX(true);
      }
    });
  }, []);
   
  useEffect(() => {
    socket.on("startGame", (response) => {
      console.log(response);
      console.log("isplayerX:", refPlayerX.current);
      if (refPlayerX.current) {
        setIsTurn(true);
      }
      setHasGameStarted(true);
    });

    socket.on("recieveTurn", (tileClicked) => {
      setIsTurn(true);
      let squares = [...refSpaces.current];
      if(refPlayerX.current) {
        squares[tileClicked] = 'O';
      } else {
        squares[tileClicked] = 'X';
      }
      refSpaces.current = squares;
      setSpaces(squares);
      checkWinner(squares);
      if (!refWinner.current){
        checkTie();
      }
    });

    socket.on('confirmRestart', (roomNum) => {
        console.log('confirming restart in room:', roomNum);
        socket.emit('relayRestart', roomNum, refRestartClicked.current);
    });

    socket.on('restartGame', (message) => {
        console.log('restart?:', message);
        refWinner.current = '';
        refSpaces.current = Array(9).fill("");
        refRestartClicked.current = false;
        refPlayerX.current = !refPlayerX.current;
        setHasGameStarted(true);
        setWinner(null);
        setTie(false);
        setIsPlayerX(prev => !prev);
        setSpaces(Array(9).fill(""));
        setHasGameEnded(false);
        setRestartClicked(false);
    });
  }, [socket]);
  
  const checkWinner = (squares) => {
    let winCombos = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let winCombo in winCombos) {
      winCombos[winCombo].forEach((pattern) => {
        //If one of these tiles are empty then there is no way there is a winning pattern in the winCombo
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        }
        //If everything is the same (Either x or O), set the winner to whoever won
        else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          //Winner is decided Logic (Game finished)
          setHasGameStarted(false);
          setHasGameEnded(true);
          setWinner(squares[pattern[0]]);
          refWinner.current = squares[pattern[0]]
        }
      });
    }
  };

  const checkTie = () => {
    let moves = 0;
          for (let i = 0; i < spaces.length; i++) {
            if (spaces[i] === "") {
              moves+=1;
            }
          }
          console.log(moves)
          if(moves===1) {
            setTie(true);
            setHasGameEnded(true);
            setHasGameStarted(false);
          }
  }

  //Add Explosion Logic
  const handleClick = (num) => {
    if (isTurn && hasGameStarted) {
      if (spaces[num] !== "") {
        return;
      }
      let squares = [...spaces];
      if (isPlayerX) {
        // props.mindoroHandler(true)
        // props.corregidorHandler(false)
        squares[num] = "X";
        setIsTurn(false);
        socket.emit('passTurn', { tileClicked: num, roomNum: roomNum })
      } else {
        // props.mindoroHandler(false);
        // props.corregidorHandler(true);
        squares[num] = "O";
        setIsTurn(false);
        socket.emit('passTurn', { tileClicked: num, roomNum: roomNum })
      }
      refSpaces.current = squares;
      setSpaces(squares);
      checkWinner(squares);
      if (!refWinner.current){
        checkTie();
      }
    }
  };

  const Space = ({ num }) => {
    return (
      <td
        style={{ border: "2px solid black", width: "100px", height: "100px" }}
        onClick={() => handleClick(num)}
      >
        {spaces[num]}
      </td>
    );
  };

  //Restarting game Logic
  const handleRestart = () => {
    refRestartClicked.current = true;
    setRestartClicked(true);

    socket.emit('checkRestart', roomNum);
  };

  //Game is either a tied or ongoing
    return (
      //Change layout as needed
      <Box
        component="main"
        sx={{ flexGrow: 1, background: "#EDEDED", height: "100vh" }}
      >
            <div className="container">
                <div className="gameSettings">
                    <h1>{`Your room ID is: ${roomNum}`}</h1>
                    {isPlayerX ? <h2>You are player X</h2> : <h2>You are player O</h2>}
                </div>

                <table>
                    <tbody>
                    <tr>
                        <Space num={0} />
                        <Space num={1} />
                        <Space num={2} />
                    </tr>
                    <tr>
                        <Space num={3} />
                        <Space num={4} />
                        <Space num={5} />
                    </tr>
                    <tr>
                        <Space num={6} />
                        <Space num={7} />
                        <Space num={8} />
                    </tr>
                    </tbody>
                </table>

                {(!hasGameStarted && !hasGameEnded) && <h3>Waiting for opponent...</h3>}
                {tie && (
                    <h3 className="tie">The game is a tie!</h3>
                )}
                {winner && (
                    <h3 className="winner">{winner} is the winner!</h3>
                )}
                {hasGameEnded &&(
                    <button 
                        className="btn" 
                        onClick={() => handleRestart()}
                        disabled={restartClicked}
                    >
                        {restartClicked ? 'Waiting for opponent...' : 'Play Again'}
                    </button>
                )}
            </div>
        </Box>
    );
};

export default TicTacGame;
