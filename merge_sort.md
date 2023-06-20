# Merge Sort

take a list, split it into parts, sort the parts, then merge them back together

;; signature
;; (listof Number) -> (listof Number)
;; produces sorted list in ascending order using merge sort

(check-expect (merge-sort (empty) empty))
(check-expect (merge-sort (list 2) (list 2)))
(check-expect (merge-sort (list 1 2) (list 1 2)))
(check-expect (merge-sort (list 4 3) (list 3 4)))
(check-expect (merge-sort (list 6 5 3 1 8 2 4 7) (list 1 2 3 4 5 6 7 8)))

(define (merge-sort lon) lon)

;; when we split the list in two, we have a sublist, thus we use generative recursion
;; template for generative recursion
```rkt
(define (merge-sort lon)
    (cond   [(empty? lon) empty]
            [(empty? (rest lon)) lon]
            [else
                (merge  (merge-sort (take lon (quotient (length lon) 2)))
                        (merge-sort (drop lon (quotient (length lon) 2))))]))
```

Wishlist entries for: take, drop, and merge

;; merge
;; signature: (listof Number) (listof Number) -> (listof Number)
;; interp. combines two lists into a single list in ascending order
;; ASSUME: lon1 and lon2 are both already sorted
```rkt
(define (merge lon1 lon2)
    if (and (empty? lon1) (empty? lon2) empty)
    (cons (lon1 lon2) empty))
```

Tests
```rkt
(check-expect (merge empty empty) empty)
(check-expect (merge (list 1) empty) (list 1))
(check-expect (merge empty (list 2)) (list 2))
(check-expect (merge (list 1 3 5 7) (list 2 4 6 8)) (list 1 2 3 4 5 6 7 8))
```

;; stub
```rkt
(define (merge lon1 lon2) empty)
```

```rkt
(define (merge lon1 lon2)
    (cond   [(empty? lon1) lon2]
            [(empty? lon2) lon1]
            [else
                (< (first lon1) (first lon2))
                (cons (first lon1) (merge (rest lon1) lon2))
                (cons (first lon2) (merge lon1 (rest lon2)))]))
```


;; take
;; signature: (listof Number) Natural -> (listof Number)
;; interp. returns the first n elements of a list of numbers
```rkt
(define (take lon n)
    if (empty? lon) empty)

```

;; drop
;; signature: (listof Number) -> (listof Number)
;; interp. returns the second half of a list of numbers
```rkt
(define (drop lon)
    if (empty? lon) empty)

```
