#### Where PBT fits in CIS 1200
From [prior work](https://dl.acm.org/doi/10.1145/3597503.3639581), we knew assignments that had students implement and test data structures would be a clear fit for PBT. We waited two assignments for students to acclimate to unit testing and test-driven development (which is used in all assignments), then added PBT as a testing method for the implementation of trees and sets (HW3) and queues and deques (HW4).

#### PBT testing library
Property-based testing libraries are found in most major programming languages. See [Hypothesis](https://hypothesis.works/) for Python, [jqwik](https://jqwik.net/) for Java, and [theft](https://github.com/silentbicycle/theft) for C. We used [QCheck](https://github.com/c-cube/qcheck) for OCaml. These libraries are a useful starting point but contain too much complexity for a new programmer. To make things usable, we simplified the test runner by removing unnecessary arguments and opted not to teach creating generators. Instead, we provided prewritten generators (like `gen_int`) and combinators for building up generators for structured types from simpler ones (like `gen_pair` and `gen_set`).

#### PBT Starter Pack

This section provides a primer on the materials we think are core to the positive outcomes we saw with our intervention. These materials targeted specific outcomes. We wanted students to learn PBT's basic concepts, be able to use a PBT framework, think of properties on their own, and get a sense of when PBT was appropriate to use.

##### Intro to PBT lecture

In this short 10-minute lecture addition, we motivate PBT by generalizing a unit test suite. We introduce PBT's core constructs (properties, generators, and shrinkers) and explain their role in making PBT work.

![Intro to PBT lecture slides](/pbt-edu/intro-to-pbt-lecture/ "14")

##### PBT tutorial

In this tutorial, added to the beginning of HW3, we introduce PBT using simple examples. This tutorial provides...
- Examples of using PBT in different contexts
  - [An absolute value function](#pbtintro-L34)
  - [A `zip` and `unzip` function](#pbtintro-L239)
  - [A `List` module](#pbtintro-L352)
- Practice using a PBT framework
  - [Inspecting generated values](#pbtintro-L104)
  - [Understanding the role of shrinkers](#pbtintro-L147)
  - [Interpreting PBT-style feedback](#pbtintro-L220)
  - [Implementing a variety of provided properties](#pbtintro-L352)
- Productive ways of thinking about properties
  - [Generalizing unit tests](#pbtintro-L34)
  - [Scaffolding using known property categories](#pbtintro-L487)
  - [Being very careful about property validity](#pbtintro-L318)

![pbtIntro.ml](/pbt-edu/pbtIntro.ml#L5 "https://github.com/Penn-HCI/property-based-testing-materials/blob/main/materials/assignments/hw03/pbtIntro.ml")

##### PBT in test-driven development
In both homeworks, students had the opportunity to apply PBT during test-driven development. Notably, we left these tasks fairly open-ended. We did not prescribe a specific "property design process" or require engagement beyond a low baseline of one property-based test and one unit test. Students could choose whichever methods they felt best achieved the goal of a "robust" test suite. We thought this design would most clearly show if students found PBT to be intuitive, usable, and compelling. Below is how we framed the task for students to test queues in HW4. Here, students are asked to write tests for their queue implementations. Students were asked to write a robust set of tests for two functions, `truncate` and `delete`, with a minimum of one property-based test each. This resulted in a wide variety of properties, including the one shown in the intro.

![queueTest.ml](/pbt-edu/queueTest.ml#L59-L307 "https://github.com/Penn-HCI/property-based-testing-materials/blob/main/materials/assignments/hw04/queueTest.ml")

##### Other resources
We found past accounts of teaching PBT helpful while designing our material. Notably, [Wrenn et al.](https://jack.wrenn.fyi/publications/Wrenn,%20Nelson,%20Krishnamurthi%20-%20Using%20Relational%20Problems%20to%20Teach%20Property-Based%20Testing.pdf) and [Nelson et al.](https://tnelson.github.io/publications/nrsdwk-pj21-pbt.pdf) describe using relational problems to teach PBT. We drew inspiration from them and included a relational problem they describe, Sortacle, in a recitation activity. [Moy et al.'s](https://dl.acm.org/doi/10.1145/3747533) report of teaching PBT in a CS logic course was also informative to reference.

#### Outcomes

Through engaging with students, we found PBT was learnable and compelling. All students were able to submit a valid property-based test by the end of HW4. Students also used PBT in desirable ways, like writing powerful properties even if they were complex to implement. Students commented on the utility of random input generation and how properties provided a generative perspective on describing program behavior. Many students expressed a desire to continue using PBT later in the course. For more detailed outcomes and reflections, please read the full paper!