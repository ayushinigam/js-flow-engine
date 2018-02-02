Friendsurance code assignment
=============================

- [LICENSE](#license)
- [Introduction](#introduction)
- [Flow Engine](#flow-engine)
  - [Description](#description)
  - [Outcome](#outcome)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Notes from IT](#notes-from-it)
- [How to submit a solution](#how-to-submit-a-solution)

LICENSE
=============================
Copyright (C) Alecto GmbH - All Rights Reserved

Unauthorized copying of any content of this project via any medium is strictly prohibited.
Proprietary and confidential.

Introduction
=============================
Hello and welcome fellow Coder!

As part of our interview process we would like you to complete a programming assignment.
Please read the whole description thoroughly, then create a program to solve the problem at hand.

For the solution, we request that you use **JavaScript** (or TypeScript) as a programming language and **ReactJS** as your framework.
The application must run and your solution should provide sufficient evidence that it is complete.

Flow Engine
=============================

Description
-----------
Your challenge is to create a simple *flow engine*.

Flow engine is an application that executes a flow consisting of linked rules against incoming data and each rule will contain:
- `id`
- `body`, that runs against the incoming data. (it's a function which takes a parameter and returns a boolean)
- `true_id`, that is the next rule to be executed if function returns true
- `false_id`, that is the next rule to be executed if function returns false

You can pass the incoming data (a simple JSON string parsed to a JavaScript object) to the created flow, to excute it!
The execution will end when `null` is provided for `true_id` or `false_id` accroding to what is the returned from related body function.

Outcome
-------------------
- By running the application, we must see the list of rules (like as [here](fs-fe-codechallenge-mockup.png) in the mockup), colorefulled based on being passed or failed
- We must be able to see each rules body, next rule-id if it passes and next rule-id if it fails (like first one in the mockup)
- user being able to open/close the panel would be a plus point

Acceptance Criteria
-------------------
- Flow engine should never get circular based on given rule-set.
- As mentioned you must use Javascript or Typescript for the logic implementation and ReactJS to present! For styling you must use one of CSS Pre-Processors (preferly SASS)
- Proper bundler or task runner would be a plus point

Notes from IT
-------------
- Please don't spend more than 3 - 4 hours on this task.
- Provided mockup is just an idea how we want you to implemnet the UI. We indeed don't need you to provide the exact same design! Feel free to be creative!

How to submit a solution
=============================
Once everything is done and you are happy with results, please simply `.zip` your project and email it to [this email address](mailto:borna@friendsurance.de)

Please, feel free to contact us with any questions regarding assignment or submission process. We would be happy to help!

Good luck!
Friendsurance Dev Team



Questions:

+ Hardcoded/Dynamic rules?
+ Which rule should execute first?
+ same dataset for all the rules?
+ 
