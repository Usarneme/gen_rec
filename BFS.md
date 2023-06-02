# Sudoku Solver
### By way of Brute Force Search

---

#### Domain analysis:

9x9 board
81 squares
9 rows
9 columns
9 boxes

27 total units = 9 + 9 + 9 units

Goal of the game is to fill every square with a natural number 1-9 while ensuring there are
no rows, columns, or boxes that contain a duplicate number.

---

### Brute Force Solver

#### Data Definitions

"Val" is a Natural[1, 9]

"Board" is (listof Val|false) that is 81 elements long (9x9)

"Pos" is Natural[0, 80]
    interp. the position of a square on the board, for a given p, then
        - the row is quotient p 9
        - the column is remainder p 9

Convert 0-based row and column to Pos
(define (r-c->pos r c) (+ (* r 9) c))

"Unit" is (listof Pos) of length 9
    interp. the position of every square in a unit. There are 27 of these (9 rows, 9 cols, 9 boxes)

(define ALL-VALS (list 1 2 3 4 5 6 7 8 9))

// easier than writing FALSE FALSE FALSE -> B B B
(define B false)

(define BD1
    (list B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B))

(define BD2
    (list 1 2 3 4 5 6 7 8 9
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B
          B B B B B B B B B))

(define BD3
    (list 1 B B B B B B B B
          2 B B B B B B B B
          3 B B B B B B B B
          4 B B B B B B B B
          5 B B B B B B B B
          6 B B B B B B B B
          7 B B B B B B B B
          8 B B B B B B B B
          9 B B B B B B B B))

// easy board
(define BD4
    (list 2 7 4 B 9 1 B B 5
          1 B B 5 B B B 9 B
          6 B B B B 3 2 8 B
          B B 1 9 B B B B 8
          B B 5 1 B B 6 B B
          7 B B B 8 B B B 3
          4 B 2 B B B B B 9
          B B B B B B B 7 B
          8 B B 3 4 9 B B B))

// easy board solution
(define BD4s
    (list 2 7 4 8 9 1 3 6 5
          1 3 8 5 2 6 4 9 7
          6 5 9 4 7 3 2 8 1
          3 2 1 9 6 4 7 5 8
          9 8 5 1 3 7 6 4 2
          7 4 6 2 8 5 9 1 3
          4 6 2 7 5 8 1 3 9
          5 9 3 6 1 2 8 7 4
          8 1 7 3 4 9 5 2 6))

// hard board
(define BD5
    (list 5 B B B B 4 B 7 B
          B 1 B B 5 B 6 B B
          B B 4 9 B B B B B
          B 9 B B B B 7 5 B
          1 8 B 2 B B B B B
          B B B B B 6 B B B
          B B 3 B B B B B 8
          B 6 B B 8 B B B 9
          B B 8 B 7 B B 3 1))

// hard board solution
(define BD5s
    (list 5 3 9 1 6 4 8 7 2
          8 1 2 7 5 3 6 9 4
          6 7 4 9 2 8 3 1 5
          2 9 6 4 1 7 5 8 3
          1 8 7 2 3 5 9 4 6
          3 4 5 8 9 6 1 2 7
          9 2 3 5 4 1 7 6 8
          7 6 1 3 8 2 4 5 9
          4 5 8 6 7 9 2 3 1))

// no solution board
(define BD6
    (list 1 2 3 4 5 6 7 8 B
          B B B B B B B B 2
          B B B B B B B B 3
          B B B B B B B B 4
          B B B B B B B B 5
          B B B B B B B B 6
          B B B B B B B B 7
          B B B B B B B B 8
          B B B B B B B B 9))

// Positions of all the rows, columns, and boxes:
(define ROWS
    (list (list  0  1  2  3  4  5  6  7  8)
          (list  9 10 11 12 13 14 15 16 17)
          (list 18 19 20 21 22 23 24 25 26)
          (list 27 28 29 30 31 32 33 34 35)
          (list 36 37 38 39 40 41 42 43 44)
          (list 45 46 47 48 49 50 51 52 53)
          (list 54 55 56 57 58 59 60 61 62)
          (list 63 64 65 66 67 68 69 70 71)
          (list 72 73 74 75 76 77 78 79 80)))

(define COLS
    (list (list  0  9 18 27 36 45 54 63 72)
          (list  1 10 19 28 37 46 55 64 73)
          (list  2 11 20 29 38 47 56 65 74)
          (list  3 12 21 30 39 48 57 66 75)
          (list  4 13 22 31 40 49 58 67 76)
          (list  5 14 23 32 41 50 59 68 77)
          (list  6 15 24 33 42 51 60 69 78)
          (list  7 16 25 34 43 52 61 70 79)
          (list  8 17 26 35 44 53 62 71 80)))

(define BOXES
    (list (list  0  1  2  9 10 11 18 19 20)
          (list  3  4  5 12 13 14 21 22 23)
          (list  6  7  8 15 16 17 24 25 26)
          (list 27 28 29 36 37 38 45 46 47)
          (list 30 31 32 39 40 41 48 49 50)
          (list 33 34 35 42 43 44 51 52 53)
          (list 54 55 56 63 64 65 72 73 74)
          (list 57 58 59 66 67 68 75 76 77)
          (list 60 61 62 69 70 71 78 79 80)))

(define UNITS (append ROWS COLS BOXES))

#### Functions


#### Signatures and Tests
// Board Pos -> Val or false
// Produce value at given position on board
(check-expect (read-square DB2 (r-c->pos 0 5)) 6)
(check-expect (read-square DB3 (r-c->pos 7 0)) 8)

(define (read-square bd p)
    (list-ref bd p))


// Board Pos Val -> Board
// produce new board with val at given position
(check-expect (fill-square BD1 (r-c->pos 0 0) 1)
    (cons 1 (rest BD1)))

(define (fill-square bd p nv)
    (append (take bd p)
            (list nv)
            (drop bd (add1 p))))















