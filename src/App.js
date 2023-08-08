import React from 'react';
import { useState } from 'react';

// Tutorial from: https://react.dev/learn/tutorial-tic-tac-toe

function Square({ value, onSquareClick }) { // each square in the tic-tac-toe board 
	// const [value, setValue] = useState(null);

	// function handleClick() {
	// 	// console.log("clicked!!!");
	// 	setValue('X');
	// }

	return (
		<button 
			className="square"
			onClick={ onSquareClick } 
			// onClick={ handleClick } */
		>
			{ value }
		</button>
	);
}

/**
 * 
 * @props xIsNext    player who is playing next 
 * @props squares    current board status 
 * @props onPlay     handle play function as a prop, which adds arrays to game history and chooses who makes the next move
 * @returns updated game board 
 */
function Board({ xIsNext, squares, onPlay }) { // call the square components in the board 
	// const [xIsNext, setXIsNext] = useState(true);
	// const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		if (squares[i] != null || calculateWinner( squares )) {
			return;
		}
		const nextSquares = squares.slice(); // clone squares 
		if (xIsNext) {
			nextSquares[i] = "X"; // set the specific index from the array to X
		} else {
			nextSquares[i] = "O"; // set the specific index from the array to X
		}
		// setSquares( nextSquares ); 
		// setXIsNext( !xIsNext );
		onPlay( nextSquares );
	}

	const winner = calculateWinner( squares );
	let status;
	if ( winner ) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext? "X" : "O"); 
		// ternary operator (?) works as such:
		// if xIsNext == TRUE, then X is printed, otherwise O will be printed.
	}

  return ( 
		<div>
			<div className="status">{ status }</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick( 0 )} />
				<Square value={squares[1]} onSquareClick={() => handleClick( 1 )} />
				<Square value={squares[2]} onSquareClick={() => handleClick( 2 )} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick( 3 )} />
				<Square value={squares[4]} onSquareClick={() => handleClick( 4 )} />
				<Square value={squares[5]} onSquareClick={() => handleClick( 5 )} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick( 6 )} />
				<Square value={squares[7]} onSquareClick={() => handleClick( 7 )} />
				<Square value={squares[8]} onSquareClick={() => handleClick( 8 )} />
			</div>
		</div>
	);
}

export default function Game() {
	// const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState( [ Array(9).fill(null) ] );
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[ currentMove ];

	function handlePlay( nextSquares ) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory( nextHistory ); // appending new moves to the old history array of arrays
		setCurrentMove( nextHistory.length - 1 );
		// setXIsNext( !xIsNext );
	}

	function jumpTo( nextMove ) {
		setCurrentMove( nextMove );
		// setXIsNext( nextMove % 2 === 0); // x goes when the "move" is even
	}

	const moves = history.map( (squares, move) => {
		let description;
		if ( move > 0 ) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}
		return (
			<li key={ move }>
				<button onClick={() => jumpTo( move )}>{ description }</button>
			</li>
		)
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
			</div>
			<div className="game-info">
				<ol>{ moves }</ol>
			</div>
		</div>
	);
}


/**
 * 
 * @param {*} squares array of 3 positions on the tictactoe game to check the winner
 * @returns the winner of the game
 */
function calculateWinner( squares ) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {

	  const [a, b, c] = lines[i];

	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }

	}
	return null;
  }