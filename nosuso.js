#!/usr/bin/env node

/* MAIN */
const solve = (board) => {
    if (solved(board)) {
        return board
    } else {
        solveBoard(board)
    }
}

const solveList = (board) => {
    if (board.length === 0) return false

    // TODO:
}

/* HELPERS */

// Takes a Board, returns true if each square has a value (is non-empty/false)
const isComplete = (board) => {
    return board.map((square) => Boolean(square)) // null/false/undefined/empty string === false
}

// Produce a list of valid Boards
// Finds the first empty square, fills it with a Natural[1, 9]
// and keeps only valid Boards
const nextBoards = (board) => {
    const nextBlankPosition = findNextBlank(board)
    const potentialNextBoard = fillEmptySquare(board, nextBlankPosition)
    return keepOnlyValid//TODO:
}

const isBoardValid = (board) => {

}

const areUnitsValid = (board, units) => units.every((unit) => isUnitValid(board, unit))
const isUnitValid = (board, unit) => hasNoDuplicates(keepOnlyValues(readSquare(board, unit)))

// const readUnit = (board, position) => 
const readPosition = (board, position) => readSquare(board, position)

// Convert 0-based row and column values to a position
const getPosition = (board, row, column) => board[(row * 9) + column]

const hasNoDuplicates = (listOfValues) => {
    if (listOfValues.length === 0) return true
    const uniqueSet = new Set(listOfValues)
    return (uniqueSet.size === listOfValues.length)
}

const keepOnlyValues = (listOfValues) => listOfValues.filter((value) => parseInt(value, 10))

const readSquare = (board, position) => board[position]

const fillSquare = (board, position, newValue) => {
    const newBoard = [...board]
    newBoard[position] = newValue
    return newBoard
}

/* CONSTANTS */
const B = false // blank/false/empty shorthand

const Board1 = [
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
]

const Board2 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
    B, B, B, B, B, B, B, B, B,
]

const Board3 = [
    1, B, B, B, B, B, B, B, B,
    2, B, B, B, B, B, B, B, B,
    3, B, B, B, B, B, B, B, B,
    4, B, B, B, B, B, B, B, B,
    5, B, B, B, B, B, B, B, B,
    6, B, B, B, B, B, B, B, B,
    7, B, B, B, B, B, B, B, B,
    8, B, B, B, B, B, B, B, B,
    9, B, B, B, B, B, B, B, B,
]

// easy board
const Board4 = [
    2, 7, 4, B, 9, 1, B, B, 5,
    1, B, B, 5, B, B, B, 9, B,
    6, B, B, B, B, 3, 2, 8, B,
    B, B, 1, 9, B, B, B, B, 8,
    B, B, 5, 1, B, B, 6, B, B,
    7, B, B, B, 8, B, B, B, 3,
    4, B, 2, B, B, B, B, B, 9,
    B, B, B, B, B, B, B, 7, B,
    8, B, B, 3, 4, 9, B, B, B,
]

// easy board solution
const Board4s = [
    2, 7, 4, 8, 9, 1, 3, 6, 5,
    1, 3, 8, 5, 2, 6, 4, 9, 7,
    6, 5, 9, 4, 7, 3, 2, 8, 1,
    3, 2, 1, 9, 6, 4, 7, 5, 8,
    9, 8, 5, 1, 3, 7, 6, 4, 2,
    7, 4, 6, 2, 8, 5, 9, 1, 3,
    4, 6, 2, 7, 5, 8, 1, 3, 9,
    5, 9, 3, 6, 1, 2, 8, 7, 4,
    8, 1, 7, 3, 4, 9, 5, 2, 6,
]

// hard board
const Board5 = [
    5, B, B, B, B, 4, B, 7, B,
    B, 1, B, B, 5, B, 6, B, B,
    B, B, 4, 9, B, B, B, B, B,
    B, 9, B, B, B, B, 7, 5, B,
    1, 8, B, 2, B, B, B, B, B,
    B, B, B, B, B, 6, B, B, B,
    B, B, 3, B, B, B, B, B, 8,
    B, 6, B, B, 8, B, B, B, 9,
    B, B, 8, B, 7, B, B, 3, 1,
]

// hard board solution
const Board5s = [
    5, 3, 9, 1, 6, 4, 8, 7, 2,
    8, 1, 2, 7, 5, 3, 6, 9, 4,
    6, 7, 4, 9, 2, 8, 3, 1, 5,
    2, 9, 6, 4, 1, 7, 5, 8, 3,
    1, 8, 7, 2, 3, 5, 9, 4, 6,
    3, 4, 5, 8, 9, 6, 1, 2, 7,
    9, 2, 3, 5, 4, 1, 7, 6, 8,
    7, 6, 1, 3, 8, 2, 4, 5, 9,
    4, 5, 8, 6, 7, 9, 2, 3, 1,
]

// no solution board
const Board6 = [
    1, 2, 3, 4, 5, 6, 7, 8, B,
    B, B, B, B, B, B, B, B, 2,
    B, B, B, B, B, B, B, B, 3,
    B, B, B, B, B, B, B, B, 4,
    B, B, B, B, B, B, B, B, 5,
    B, B, B, B, B, B, B, B, 6,
    B, B, B, B, B, B, B, B, 7,
    B, B, B, B, B, B, B, B, 8,
    B, B, B, B, B, B, B, B, 9,
]

const ROWS = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77, 78, 79, 80],
]

const COLS = [
    [0, 9, 18, 27, 36, 45, 54, 63, 72],
    [1, 10, 19, 28, 37, 46, 55, 64, 73],
    [2, 11, 20, 29, 38, 47, 56, 65, 74],
    [3, 12, 21, 30, 39, 48, 57, 66, 75],
    [4, 13, 22, 31, 40, 49, 58, 67, 76],
    [5, 14, 23, 32, 41, 50, 59, 68, 77],
    [6, 15, 24, 33, 42, 51, 60, 69, 78],
    [7, 16, 25, 34, 43, 52, 61, 70, 79],
    [8, 17, 26, 35, 44, 53, 62, 71, 80],
]

const BOXES = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80],
]

const UNITS = [
    ...ROWS,
    ...COLS,
    ...BOXES
]
