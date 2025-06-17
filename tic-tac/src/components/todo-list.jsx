"use client"

import React from "react"
import { useState, useEffect } from "react"



export default function TodoList({ onBack }) {
    const [tasks, setTasks] = useState([])
    const [newTaskText, setNewTaskText] = useState("")
    const [editingTask, setEditingTask] = useState(null)
    const [editText, setEditText] = useState("")
    const [filter, setFilter] = useState < "all" | "active" | "completed" > ("all")

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("todo-list-tasks")
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks).map((task) => ({
                ...task,
                createdAt: new Date(task.createdAt),
                updatedAt: new Date(task.updatedAt),
            }))
            setTasks(parsedTasks)
        }
    }, [])

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("todo-list-tasks", JSON.stringify(tasks))
    }, [tasks])

    const addTask = (e) => {
        e.preventDefault()
        if (!newTaskText.trim()) return

        const newTask = {
            id: Date.now().toString(),
            text: newTaskText.trim(),
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        setTasks((prev) => [newTask, ...prev])
        setNewTaskText("")
    }

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task)),
        )
    }

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    const startEditing = (task) => {
        setEditingTask(task.id)
        setEditText(task.text)
    }

    const saveEdit = (id) => {
        if (!editText.trim()) {
            cancelEdit()
            return
        }

        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, text: editText.trim(), updatedAt: new Date() } : task)),
        )
        setEditingTask(null)
        setEditText("")
    }

    const cancelEdit = () => {
        setEditingTask(null)
        setEditText("")
    }

    const clearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.completed))
    }

    const filteredTasks = tasks.filter((task) => {
        switch (filter) {
            case "active":
                return !task.completed
            case "completed":
                return task.completed
            default:
                return true
        }
    })

    const completedCount = tasks.filter((task) => task.completed).length
    const activeCount = tasks.length - completedCount

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
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
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">To-Do List</h1>
                        <p className="text-gray-600">Stay organized and productive</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-1">{tasks.length}</div>
                            <div className="text-sm text-gray-600">Total Tasks</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-xl">
                            <div className="text-3xl font-bold text-yellow-600 mb-1">{activeCount}</div>
                            <div className="text-sm text-gray-600">Active Tasks</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                            <div className="text-3xl font-bold text-green-600 mb-1">{completedCount}</div>
                            <div className="text-sm text-gray-600">Completed</div>
                        </div>
                    </div>
                </div>

                {/* Add Task Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <form onSubmit={addTask} className="flex gap-4">
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 whitespace-nowrap"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Filter Buttons */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${filter === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            All ({tasks.length})
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${filter === "active" ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                }`}
                        >
                            Active ({activeCount})
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${filter === "completed" ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                        >
                            Completed ({completedCount})
                        </button>
                        {completedCount > 0 && (
                            <button
                                onClick={clearCompleted}
                                className="px-6 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                            >
                                Clear Completed
                            </button>
                        )}
                    </div>
                </div>

                {/* Tasks List */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg">
                                {filter === "all" && "No tasks yet. Add one above to get started!"}
                                {filter === "active" && "No active tasks. Great job!"}
                                {filter === "completed" && "No completed tasks yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${task.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    {/* Checkbox */}
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                                            ? "bg-green-600 border-green-600 text-white"
                                            : "border-gray-300 hover:border-green-500"
                                            }`}
                                    >
                                        {task.completed && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Task Text */}
                                    <div className="flex-1">
                                        {editingTask === task.id ? (
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveEdit(task.id)
                                                    if (e.key === "Escape") cancelEdit()
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                                                {task.text}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        {editingTask === task.id ? (
                                            <>
                                                <button
                                                    onClick={() => saveEdit(task.id)}
                                                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                    title="Save"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Cancel"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => startEditing(task)}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
