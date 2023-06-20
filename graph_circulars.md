# Graphs

Cyclic - Acyclic

Directed - Undirected

---

```rkt
(define H2
    (shared ((-0- (make-room "A" (list (make-room "B" (list -0-))))))
        -0-))
```

```rkt
(define H3
    (shared ((-0- (make-room "A"
                    (list (make-room "B"
                        (list (make-room "C" (list -0-))))))))
        -0-))
```

Alternative format to H3 definition:
```rkt
(define H3
    (shared ((-A- (make-room "A" (list -B-)))
             (-B- (make-room "B" (list -C-)))
             (-C- (make-room "C" (list -A-))))
    -A-))
```

To define data structures and traversal functions:
Template:

* Structural Recursion
* Encapsulate With Local
* Tail-Recursive With Worklist
* Context-Preserving Accumulator (what rooms we've already visited)

### Pre-worklist template:

```rkt
(define (fn-for-house r0)
    (local [(define (fn-for-room r)
                (... (room-name r)
                    (fn-for-lor (room-exits r))))
            (define (fn-for-lor lor)
                (cond [(empty? lor) (...)]
                      [else
                        (... (fn-for-room (first lor))
                             (fn-for-lor (rest lor)))]))]
            (fn-for-room r0)))
```

### Adding a worklist, this will go around in circles
```rkt
(define (fn-for-house r0)
    ;; todo is (listof Room), a worklist accumulator
    (local [(define (fn-for-room r todo)
                (fn-for-lor (append (room-exits r) todo)))          ; (... (room-name r))
            (define (fn-for-lor todo)
                (cond [(empty? todo) (...)]
                      [else
                        (fn-for-room (first todo)
                                     (rest todo))]))]
            (fn-for-room r0 empty)))
```

### Adding a context-preserving accumulator
```rkt
(define (fn-for-house r0)
    ;; todo is (listof Room), a worklist accumulator
    ;; visited is (listof String), context preserving accumulator, names of rooms already visited
    (local [(define (fn-for-room r todo visited)
                (if (member (room-name r) visited)
                    (fn-for-lor todo visited)
                    (fn-for-lor (append (room-exits r) todo)
                                (cons (room-name r) visited))))
                (define (fn-for-lor todo visited)
                    (cond [(empty? todo) (...)]
                        [else
                            (fn-for-room (first todo)
                                         (rest todo)
                                         visited)]))]
            (fn-for-room r0 empty empty)))
```

### Finishing the function from the built-up templates

Now that we have this template we can define functions that will operator on graphs; fill in the ... above

## Reachable?

Problem:
> define a function that consumes a Room and a room name, and produces true if it is possible to
> reach a room with the given name starting at the given room.

```rkt
(reachable? H1 "A") => true
(reachable? H1 "B") => true
(reachable? H1 "C") => false
(reachable? H4 "F") => true
```

;; Room String -> Boolean
;; produce true if starting at r0, it is possible to reach a room named rn

; tests
```rkt
(check-expect (reachable? H1 "A") true)
(check-expect (reachable? H1 "B") true)
(check-expect (reachable? H1 "C") false)
(check-expect (reachable? (first (room-exits H1)) "A") false)
(check-expect (reachable? H4 "F") true)
```

; stub
```rkt
(define (reachable? r0 rn) false)
```

; template
```rkt
(define (reachable? r0 rn)
    ;; todo is (listof Room), a worklist accumulator
    ;; visited is (listof String), context preserving accumulator, names of rooms already visited
    (local [(define (fn-for-room r todo visited)
                (cond [(string=? (room-name r) rn) true]
                      [(member (room-name r) visited) (fn-for-lor todo visited)]
                      [else (fn-for-lor (append (room-exits r) todo)
                                (cons (room-name r) visited))]))
            (define (fn-for-lor todo visited)
                (cond [(empty? todo) false]
                    [else
                        (fn-for-room (first todo)
                                    (rest todo)
                                    visited)]))]
        (fn-for-room r0 empty empty)))
```
