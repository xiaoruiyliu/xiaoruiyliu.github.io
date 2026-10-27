We'll use [QCheck](https://github.com/c-cube/qcheck), a PBT library for OCaml, and build with [dune](https://dune.build/).

#### 1. Install

```bash
opam install qcheck
```

#### 2. Write a property

In a new directory, create three files. First `dune-project`:

```
(lang dune 3.0)
```

Then `dune`, which declares a test executable that uses QCheck:

```
(test
 (name test_reverse)
 (libraries qcheck))
```

Finally `test_reverse.ml`:

```ocaml
let test_reverse_twice =
  QCheck.Test.make ~name:"reverse twice" QCheck.(list int) (fun xs ->
      List.rev (List.rev xs) = xs)

let () = QCheck_runner.run_tests_main [ test_reverse_twice ]
```

`QCheck.Test.make` runs the function many times, each time with a fresh list of integers built by the generator `QCheck.(list int)`. The test passes if the function returns `true` every time.

#### 3. Run it

```bash
dune test
```

#### 4. Watch it fail

Now add a property that *isn't* true, such as "reversing a list leaves it unchanged", and replace the last line so it runs both tests:

```ocaml
let test_reverse_is_identity =
  QCheck.Test.make ~name:"reverse is identity" QCheck.(list int) (fun xs ->
      List.rev xs = xs)

let () =
  QCheck_runner.run_tests_main [ test_reverse_twice; test_reverse_is_identity ]
```

QCheck will report a small counterexample like `[0; 1]`. Finding inputs like this one is what PBT is for.
