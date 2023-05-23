# Generative Recursion

* Notes from How to Design Complex Data - Week 5 - Generative Recursion

---

## Fractals

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
(check-expect (stri CUTOFF) (triange CUTOFF "outline" "red"))

(check-expect (stri (* CUTOFF 2)
  (overlay (triangle (* 2 CUTOFF) "outline" "red")
           (local [(define sub (triangle CUTOFF "outline" "red"))]
           (above sub
                  (beside sub sub)))))
```

### Stub:
```racket
(define (stri s) (square 0 "solid" "white"))
```

Template:
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


---


