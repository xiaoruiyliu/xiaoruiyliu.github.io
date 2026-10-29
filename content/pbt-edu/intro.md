Welcome! This page is an introduction to the property-based testing (PBT) materials described in the paper "Property-Based Testing in Intro CS: A Feasibility Study" (please read the full paper, link forthcoming!). This material is actively used in [CIS 1200](https://www.cis.upenn.edu/~cis120/archive/26sp/syllabus/) at the University of Pennsylvania, the first required course for CS majors. We believe PBT should be taught early to students. It can help better motivate testing by providing a way to write more robust tests, is actively used in industry, and helps teach a specification-oriented mindset (a quality we believe is important in developing a mature perspective on program design). Our goal is to make PBT approachable early in the CS curriculum for both students writing their first property-based tests and the instructors teaching them.

From our first deployment, students were able to write sophisticated properties like the one below after only two assignments! Keep reading to learn more, jump to the [PBT Starter Pack](#pbt-starter-pack), find the complete repository of materials we used [here](https://github.com/Penn-HCI/property-based-testing-materials/tree/main/materials).

```ocaml
let property ((ops, x) : int op list * int) : bool =
  let q = init_with ops in
  let original = to_list q in
  truncate x q;
  let result = to_list q in
  let rec is_prefix l1 l2 = match l1, l2 with
    | [], _ -> true
    | _, [] -> false
    | h1 :: t1, h2 :: t2 -> h1 = h2 && is_prefix t1 t2
  in
  is_prefix result original
;; run_property_test
  "truncate result is prefix of original"
  (gen_pair gen_ops gen_int)
  property
```

