# JS-FLOW

A flow engine built using ReactJS.

<div style="text-align:center">
<img src="/app.png" style="width: 80%;display:inline-block;" hspace="20">
</div>

# Features

+ Rule are passed using `src/rules.json`;
+ Incoming data will be entered by the user;
+ The flow engine will execute the first rule passing incoming data to each rule in rules.json
+ The next rule will be calculated and called recursively based the output of currentrule.
+ Handled circular recursion.

# Running the app

To start the app on dev mode:
1. `npm install` or `yarn`
2. `npm start` or `yarn start

To build the app:
1. `npm install` or `yarn`
2. `npm run build` or `yarn build`
3.  Run the build using `npm run build:serve` or `yarn build:serve`
4. The build folder is `./build`

# Coverage
<div style="text-align:center">
<img src="/coverage.png" style="width: 80%;display:inline-block;" hspace="20">
</div>
