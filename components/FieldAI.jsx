'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import Button from './Button';
import Link from 'next/link';

function Square({ value, onClick }) {
    return (
      <button className="square rounded-2xl big:w-[100px] big:h-[100px]" onClick={onClick}>
        {value}
      </button>
    );
  }

const FieldAI = () => {
    const initialBoard = Array(16).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (!winner && !xIsNext) {
            let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * board.length);
        } while (board[randomIndex] !== null && !winner);
                const newBoard = rotateBoard([...board]);
                newBoard[randomIndex] = 'O'; // Assuming 'O' represents the computer's move
                setTimeout(() => {
                    setBoard(newBoard)
                    const rotatedBoard = rotateBoard(newBoard);
                    setTimeout(() => {
                        setBoard(rotatedBoard);
                        setXIsNext(true);
                        setWinner(calculateWinner(rotatedBoard));
                        checkDraw(rotatedBoard);
                    }, 2000)
                }
                , 3500);
            
        }
    }, [xIsNext]);


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
      return null;
    };

    const isBoardFull = squares => {
      return squares.every(square => square !== null);
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

      const handleClick = i => {
        if (winner || board[i] || !xIsNext) return;

        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
      
        // Rotate board
        const rotatedBoard = rotateBoard(newBoard);

        // Update board and check for winner
        setBoard(newBoard);
        setXIsNext(!xIsNext)
        setTimeout(() => {
          setBoard(rotatedBoard)
          setWinner(calculateWinner(rotatedBoard))
          checkDraw(rotatedBoard)
        }
        , 2000);
    };


    const checkDraw = (board) => {
        // Check for draw
      if (!winner && isBoardFull(board)) {
        setWinner('Draw');
      }
    }

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

    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const resetGame = () => {
      setBoard(initialBoard);
      setXIsNext(true);
      setWinner(null);
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
          {winner && (
               <div className='flex justify-center gap-x-10'>
                 <button className='text-md big:text-xl flex justify-center items-center bg-yellow-400 px-6 big:px-12 py-2 rounded-2xl shadow-lg border border-black' onClick={resetGame}>
                   Retry
                 </button>
                 <button className='text-md big:text-xl flex justify-center items-center bg-yellow-400 px-6 big:px-12 py-2 rounded-2xl shadow-lg border border-black'>
                   <Link href='/lobby'>Back to Lobby</Link>
                 </button>
               </div>
          )}
        </div>
      </div>
    );
}

export default FieldAI