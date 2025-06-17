"use client"

import React from "react"
import { useState, useEffect } from "react"


const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
]

export default function TicTacToe({ onBack }) {
    const [gameState, setGameState] = useState({
        board: Array(9).fill(null),
        currentPlayer: "X",
        winner: null,
        status: "setup",
        playerX: { name: "", wins: 0 },
        playerO: { name: "", wins: 0 },
    })

    const [playerXName, setPlayerXName] = useState("")
    const [playerOName, setPlayerOName] = useState("")

    // Load win counts from localStorage on component mount
    useEffect(() => {
        const savedStats = localStorage.getItem("tic-tac-toe-stats")
        if (savedStats) {
            const stats = JSON.parse(savedStats)
            setGameState((prev) => ({
                ...prev,
                playerX: { ...prev.playerX, wins: stats.playerX || 0 },
                playerO: { ...prev.playerO, wins: stats.playerO || 0 },
            }))
        }
    }, [])

    // Save win counts to localStorage whenever they change
    useEffect(() => {
        if (gameState.status !== "setup") {
            const stats = {
                playerX: gameState.playerX.wins,
                playerO: gameState.playerO.wins,
            }
            localStorage.setItem("tic-tac-toe-stats", JSON.stringify(stats))
        }
    }, [gameState.playerX.wins, gameState.playerO.wins, gameState.status])

    const checkWinner = (board) => {
        // Check for winning combinations
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]
            }
        }

        // Check for draw
        if (board.every((cell) => cell !== null)) {
            return "draw"
        }

        return null
    }

    const handleCellClick = (index) => {
        if (gameState.board[index] || gameState.winner || gameState.status !== "playing") {
            return
        }

        const newBoard = [...gameState.board]
        newBoard[index] = gameState.currentPlayer

        const winner = checkWinner(newBoard)
        const nextPlayer = gameState.currentPlayer === "X" ? "O" : "X"

        setGameState((prev) => {
            const newState = {
                ...prev,
                board: newBoard,
                currentPlayer: nextPlayer,
                winner,
                status: winner ? ("finished") : ("playing"),
            }

            // Update win counts
            if (winner === "X") {
                newState.playerX.wins += 1
            } else if (winner === "O") {
                newState.playerO.wins += 1
            }

            return newState
        })
    }

    const startGame = (e) => {
        e.preventDefault()
        if (!playerXName.trim() || !playerOName.trim()) {
            alert("Please enter names for both players")
            return
        }

        setGameState((prev) => ({
            ...prev,
            status: "playing",
            playerX: { ...prev.playerX, name: playerXName.trim() },
            playerO: { ...prev.playerO, name: playerOName.trim() },
        }))
    }

    const restartGame = () => {
        setGameState((prev) => ({
            ...prev,
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            status: "playing",
        }))
    }

    const resetAll = () => {
        setGameState({
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            status: "setup",
            playerX: { name: "", wins: 0 },
            playerO: { name: "", wins: 0 },
        })
        setPlayerXName("")
        setPlayerOName("")
        localStorage.removeItem("tic-tac-toe-stats")
    }

    const getStatusMessage = () => {
        if (gameState.winner === "draw") {
            return "It's a draw!"
        }
        if (gameState.winner) {
            const winnerName = gameState.winner === "X" ? gameState.playerX.name : gameState.playerO.name
            return `${winnerName} wins!`
        }
        if (gameState.status === "playing") {
            const currentPlayerName = gameState.currentPlayer === "X" ? gameState.playerX.name : gameState.playerO.name
            return `${currentPlayerName}'s turn (${gameState.currentPlayer})`
        }
        return ""
    }

    if (gameState.status === "setup") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <div className="flex items-center mb-6">
                        <button onClick={onBack} className="text-gray-600 hover:text-gray-800 transition-colors mr-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Tic-Tac-Toe Setup</h1>
                    </div>

                    <form onSubmit={startGame} className="space-y-6">
                        <div>
                            <label htmlFor="playerX" className="block text-sm font-medium text-gray-700 mb-2">
                                Player X Name
                            </label>
                            <input
                                type="text"
                                id="playerX"
                                value={playerXName}
                                onChange={(e) => setPlayerXName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter Player X name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="playerO" className="block text-sm font-medium text-gray-700 mb-2">
                                Player O Name
                            </label>
                            <input
                                type="text"
                                id="playerO"
                                value={playerOName}
                                onChange={(e) => setPlayerOName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter Player O name"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                        >
                            Start Game
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header with Back Button */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={onBack}
                        className="text-gray-600 hover:text-gray-800 transition-colors mr-4 p-2 rounded-lg hover:bg-white/50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="text-center flex-1">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Tic-Tac-Toe</h1>
                        <div className="text-xl font-semibold text-gray-700 mb-4">{getStatusMessage()}</div>
                    </div>
                </div>

                {/* Score Board */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div
                            className={`text-center p-4 rounded-xl transition-all ${gameState.currentPlayer === "X" && gameState.status === "playing"
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-gray-50"
                                }`}
                        >
                            <div className="text-2xl font-bold text-blue-600 mb-1">X</div>
                            <div className="text-lg font-semibold text-gray-800">{gameState.playerX.name}</div>
                            <div className="text-sm text-gray-600">Wins: {gameState.playerX.wins}</div>
                        </div>
                        <div
                            className={`text-center p-4 rounded-xl transition-all ${gameState.currentPlayer === "O" && gameState.status === "playing"
                                ? "bg-red-100 border-2 border-red-500"
                                : "bg-gray-50"
                                }`}
                        >
                            <div className="text-2xl font-bold text-red-600 mb-1">O</div>
                            <div className="text-lg font-semibold text-gray-800">{gameState.playerO.name}</div>
                            <div className="text-sm text-gray-600">Wins: {gameState.playerO.wins}</div>
                        </div>
                    </div>
                </div>

                {/* Game Board */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                        {gameState.board.map((cell, index) => (
                            <button
                                key={index}
                                onClick={() => handleCellClick(index)}
                                className={`
                  aspect-square flex items-center justify-center text-4xl md:text-5xl font-bold
                  border-2 border-gray-300 rounded-lg transition-all duration-200
                  hover:bg-gray-50 hover:scale-105 active:scale-95
                  ${cell === "X" ? "text-blue-600" : cell === "O" ? "text-red-600" : "text-gray-400"}
                  ${gameState.status !== "playing" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                `}
                                disabled={gameState.status !== "playing" || cell !== null}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={restartGame}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                    >
                        New Game
                    </button>
                    <button
                        onClick={resetAll}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                    >
                        Reset All
                    </button>
                </div>
            </div>
        </div>
    )
}
