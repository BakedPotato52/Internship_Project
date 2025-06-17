"use client"
import { useState } from "react"
import TicTacToe from "./components/tic-tac-toe"
import TodoList from "./components/todo-list"


export default function Home() {
  const [currentApp, setCurrentApp] = useState("home")

  const renderCurrentApp = () => {
    switch (currentApp) {
      case "tic-tac-toe":
        return <TicTacToe onBack={() => setCurrentApp("home")} />
      case "todo-list":
        return <TodoList onBack={() => setCurrentApp("home")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Welcome to My Apps</h1>
                <p className="text-xl text-gray-600">Choose an application to get started</p>
              </div>

              {/* App Selection Cards */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Tic-Tac-Toe Card */}
                <div
                  onClick={() => setCurrentApp("tic-tac-toe")}
                  className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Tic-Tac-Toe</h2>
                    <p className="text-gray-600 mb-6">
                      Challenge a friend in the classic game of Tic-Tac-Toe. Features player names, win tracking, and
                      responsive design.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        2 Players
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Win Tracking
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        Local Storage
                      </span>
                    </div>
                  </div>
                </div>

                {/* To-Do List Card */}
                <div
                  onClick={() => setCurrentApp("todo-list")}
                  className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-green-600 rounded-sm"></div>
                          <div className="w-8 h-1 bg-green-600 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-600 rounded-sm flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                          <div className="w-6 h-1 bg-green-600 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-green-600 rounded-sm"></div>
                          <div className="w-10 h-1 bg-green-600 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">To-Do List</h2>
                    <p className="text-gray-600 mb-6">
                      Stay organized with a powerful to-do list. Add, edit, delete, and track your tasks with persistent
                      storage.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Task Management
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Edit & Delete
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        Persistent
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-12">
                <p className="text-gray-500">
                  Built with React+vite and Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderCurrentApp()
}
