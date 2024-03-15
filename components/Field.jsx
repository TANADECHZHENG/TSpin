'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { auth, database } from '@/app/firebase/config';
import { ref, onValue, update, get, remove } from 'firebase/database';

function Square({ value, onClick }) {
    return (
      <button
        className="square rounded-2xl big:w-[100px] big:h-[100px]"
        onClick={onClick}
      >
        {value}
      </button>
    );
}

const Field = ({ code, playerX, playerO }) => {
    const initialBoard = Array(16).fill('');
    const [board, setBoard] = useState(initialBoard);
    const [game, setGame] = useState([]);
    const [winner, setWinner] = useState('');
    const [player, setPlayer] = useState('');
    const [statX, setStatX] = useState([]);
    const [statO, setStatO] = useState([]);

    const gameRef = ref(database, `rooms/${code}`);
    const router = useRouter();

    useEffect(() => {
      const updateData = async () => {
        try {
          // Listen for changes in the database and update the board accordingly
          onValue(gameRef, (snapshot) => {
            const gameState = snapshot.val();
            setGame(gameState);
            setBoard(gameState.board);
            // setWinner(gameState.winner);
            setPlayer(auth.currentUser.displayName === gameState.playerX ? 'X' : 'O');

            // Once game data is updated, fetch player data
            const playerData = async () => {
              try {
                const hostSnapshot = await get(ref(database, `Scoreboard/${playerX}`));
                const hostData = hostSnapshot.val();
            
                const challengerSnapshot = await get(ref(database, `Scoreboard/${playerO}`));
                const challengerData = challengerSnapshot.val();
            
                // console.log("Host data:", hostData);
                // console.log("Challenger data:", challengerData);

                setStatX(hostData || {});
                setStatO(challengerData || {});
              } catch (error) {
                console.log("Error fetching scoreboard data:", error);
              }
            };

            playerData();
          });
        } catch (error) {
          console.log("Error fetching game data:", error);
        }
      };

      updateData();
    }, []);


    useEffect(() => {
      const updateScore = async () =>{
        if (game.winner) {
          if (game.winner === 'X') {
            await update(ref(database, `Scoreboard/${playerX}`), {
              score: parseInt(statX.score) + 3,
              win: parseInt(statX.win) + 1,
            });
            await update(ref(database, `Scoreboard/${playerO}`), {
              score: parseInt(statO.score) - 3,
              lose: parseInt(statO.lose) + 1,
            });
            console.log('Xwin');
          } else if (game.winner === 'O') {
            await update(ref(database, `Scoreboard/${playerO}`), {
              score: parseInt(statO.score) + 3,
              win: parseInt(statO.win) + 1,
            });
            console.log('Owin');
            await update(ref(database, `Scoreboard/${playerX}`), {
              score: parseInt(statX.score) - 3,
              lose: parseInt(statX.lose) + 1,
            });
          } else if (game.winner === 'draw') {
            await update(ref(database, `Scoreboard/${playerX}`), {
              score: parseInt(statX.score) + 1,
              draw: parseInt(statX.draw) + 1,
            });
            await update(ref(database, `Scoreboard/${playerO}`), {
              score: parseInt(statO.score) + 1,
              draw: parseInt(statO.draw) + 1,
            });
            console.log('XO');
          }
      }
  }
  updateScore();
}, [game.winner]);

    const calculateWinner = squares => {
      const lines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c] &&
          squares[a] === squares[d]
        ) {
          return squares[a];
        }
      }

      if (isBoardFull(squares)) {
        return 'draw'; // Board is full, declare a draw
      }
      return '';
    };

    const isBoardFull = squares => {
      return squares.every(square => square !== '');
    };

    const patterns1 = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4, 0] // Looping pattern 1
    const patterns2 = [5, 6, 10, 9, 5] // Looping pattern 2

    const rotateBoard = squares => {
    const newBoard = squares.slice(); // Copy the original board

    // Rotate values according to patterns1
    for (let i = 0; i < patterns1.length; i++) {
        newBoard[patterns1[i + 1]] = squares[patterns1[i]];
        // Rotate values according to patterns2
    }

    for (let j = 0; j < patterns2.length; j++) {
        newBoard[patterns2[j + 1]] = squares[patterns2[j]];
    }
    return newBoard;
  };

      const handleClick = async (i) => {
        if (game.winner || board[i] || player !== game.turn) return;

        const newBoard = [...board];
        newBoard[i] = player;
        // console.log(newBoard[i]);

        // Rotate board
        const rotatedBoard = rotateBoard(newBoard);

        // Update board and check for winner
        await update(gameRef, {
          board: newBoard,
          turn: game.turn !== 'X' ? 'X' : 'O',
        })
        setBoard(newBoard);

        setTimeout(async () => {
          setBoard(rotatedBoard);
          // console.log(rotatedBoard);
          await update(gameRef, {
            board: rotatedBoard,
            winner: calculateWinner(rotatedBoard),
          });
      }, 2000);

    };


    const direction = ['→', '→', '→', '↓',
                       '↑', '→', '↓', '↓',
                       '↑', '↑', '←', '↓',
                       '↑', '←', '←', '←',
                      ];

    const renderSquare = i => {
        return (
          <Square
            key={i}
            value={board[i]}
            onClick={() => handleClick(i)}
            direction={direction[i]}
          />
        );
      };


    const renderBoard = () => {
      if (!Array.isArray(board)) {
        return null; // or return a fallback UI
      }
      return (
        <div className="board">
          {board.map((square, i) => (
            <div key={i} className="square-container rounded-md big:rounded-2xl text-black font-extrabold text-2xl big:text-5xl mix-blend-luminosity w-full h-full">
              <div className='absolute opacity-40 -z-10'>
               {direction[i]}
              </div>
              {renderSquare(i)}
            </div>
          ))}
        </div>
      );
    };

    const status = game.winner
      ? `Winner: ${game.winner}`
      : `Next player: ${game.turn}`;


    const resetGame = () => {
      update(gameRef, {
        board: Array(16).fill(''),
        turn: 'X',
        winner: ''
      })
      setBoard(initialBoard);
      // setXIsNext(true);
      setWinner(null);
    };

    const leaveGame = () => {
        router.back()
    };

    return (
      <div className="flex justify-center items-center w-3/4 big:w-full bg-slate-500 p-8 rounded-3xl flex-col">
         <div className='flex justify-center items-center mb-4'>
            <h1 className='font-bold text-center text-yellow-100 text-4xl'>
              {status}
            </h1>
          </div>
        <div className="board">
          <div>{renderBoard()}</div>
        </div>
        <div className="game-info mt-4">
          {game.winner && (
               <div className='flex justify-center gap-x-10'>
               <button className='text-xl flex justify-center items-center bg-yellow-400 px-6 big:px-12 py-2 rounded-2xl shadow-lg border border-black hover:bg-yellow-200' onClick={resetGame}>
                 Retry
               </button>
               <button className='text-xl flex justify-center items-center bg-yellow-400 px-6 big:px-12 py-2 rounded-2xl shadow-lg border border-black hover:bg-yellow-200' onClick={leaveGame}>
                 Back to Lobby
               </button>
             </div>
          )}
        </div>
      </div>
    );
}

export default Field