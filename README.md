# Generative Recursion - Fractals

* Notes from How to Design Complex Data - Week 5 - Generative Recursion

---

## Sierpinski Triangle

PROBLEM:
Design a function that consumes a number and produces a Sierpinski triangle of that size. Your function should use generative recursion.

One way to draw a Sierpinski triangle is to:
 - start with an equilateral triangle with side length s
 - inside that triangle are three more Sierpinski triangles
 - and inside each of those 3... etc


Understanding the problem:

If each triangle has a side length of s, then each sub-triangle will have a side length of s/2
We just keep making them until they get small enough (??)

"Small enough" constant:
```racket
(define CUTOFF 2)
```

### Signature:
```racket
Number -> Image
```

### Purpose:
produce a Sierpinski triangle of the given size

### Examples/tests:
```racket
(check-expect (stri CUTOFF) (triangle CUTOFF "outline" "red"))

(check-expect (stri (* CUTOFF 2)
  (overlay (triangle (* 2 CUTOFF) "outline" "red")
           (local [(define sub (triangle CUTOFF "outline" "red"))]
           (above sub
                  (beside sub sub)))))
```

### Stub:
```racket
(define (stri s) (square s "solid" "white"))
```

### Template:
From https://courses.edx.org/courses/course-v1:UBCx+HtC2x+2T2017/77860a93562d40bda45e452ea064998b/#GenRec
```racket
(define (genrec-fn d)
  (cond [(trivial? d) (trivial-answer d)]
        [else
         (... d
              (genrec-fn (next-problem d)))]))
```

Trivial: when the size <= CUTOFF

Trivial answer: what to do if there is no more recursion -> make a triangle of that size


### Function:
```racket
(define (stri s)
  (if (<= S CUTOFF)
      (triangle s "outline" "red")
      (overlay (triangle s "outline" "red")
               (local [(define sub (stri (/ s 2)))]
                 (above sub
                        (beside sub sub))))))
```

### Termination argument (3 parts)

> Base case: `(<= s CUTOFF)`
> Reduction step: `(/ s 2)`
> Argument that repeated application of reduction step will eventually reach base case:
> As long as the cutoff is > 0 and s starts at >=0, repeated division by 2 will eventually be less than cutoff.


NOTE: You should always include a termination argument when doing generative recursion. To prove your function will end eventually.

---


## Sierpinski Square

### Signature
```racket
Number -> Image
```

### Purpose
interp.: produce Sierpinski carpet of given size


### Examples/tests
```racket
(check-expect (scarpet CUTOFF) (square CUTOFF "outline" "red"))

(check-expect (scarpet (* CUTOFF 3))
              (overlay (square (* CUTOFF 3) "outline" "red")
                       (local [(define sub (square CUTOFF "outline" "red"))
                               (define blk (square CUTOFF "outline" "white"))]
                        (above (beside sub sub sub)
                               (beside sub blk sub)
                               (beside sub sub sub))
                       )))
```

### Template
```racket
(define (genrec-fn d)
  (cond [(trivial? d) (trivial-answer d)]
        [else
         (... d
              (genrec-fn (next-problem d)))]))
```

### Function
```racket
(define (scarpet s)
  (if (<= s CUTOFF)
      (square s "outline" "red")
      (overlay (square s "outline" "red")
               (local [(define sub (scarpet (/ s 3)))
                       (define blk (square (/ s 3) "solid" "white"))]
                  (above (beside sub sub sub)
                         (beside sub blk sub)
                         (beside sub sub sub))))))
```

### Termination argument (3 parts)

> Base case: `(<= s CUTOFF)`
> Reduction step: `(/ s 3)`
> Argument that repeated application of reduction step will eventually reach base case:
> As long as the cutoff is > 0 and s starts at >=0, repeated division by 3 will eventually be less than cutoff.

---

## Collatz Conjecture

```
if n is even => f(n) = n/2
if n is odd  => f(n) = 3n + 1
```

This process will eventually reach the number 1, regardless of which positive integer is chosen initially.

### Signature
```racket
Integer[>=1] -> (listof Integer[>=1])
```

### Purpose
interp.: produce hailstone sequence for n

### Examples/tests:
```racket
(check-expect (hailstones 1) (list 1))
(check-expect (hailstones 2) (list 2 1))
(check-expect (hailstones 4) (list 4 2 1))
(check-expect (hailstones 5) (list 5 16 8 4 2 1))
```

### Function
```racket
(define (hailstones n)
  (if (= n 1)
    (list 1)
    (cons n
        (if (even? n)
          (hailstones (/ n 2))
          (hailstones (add1 (* n 3)))))))
```

### Termination argument (3 parts)

> Base case: `(= n 1)`
> Reduction step: if n is even => `(/ n 2)`, if n is odd => `(add1 (* n 3))`
> Argument that repeated application of reduction step will eventually reach base case:
> ??? Mathematicians have yet to prove this - there has been no counterexample -> there is no n that disproves this thus far

