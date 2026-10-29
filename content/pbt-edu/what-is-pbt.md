Property-based testing is an automated testing technique that checks whether an executable statement about a program's behavior holds for a large number of randomly generated inputs. An example property-based test is:

```ocaml
let property ((x, s) : int * int set) : bool = (* Property *)
  let s_after_add = add x s in
  member x s_after_add
;; run_property_test "correct membership" 
  (gen_pair gen_int (gen_set gen_int)) (* Generator *)
  property 
```

This test evaluates a *property* that should hold for all integers and sets: if an element is added to a set, that element should become a member of the set. The property is tested many times using random values produced by a *generator* (here, a pair containing a random integer and a random set). With this structure, PBT encourages students to write more general specifications of program behavior. 
