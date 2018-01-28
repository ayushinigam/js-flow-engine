import React, { Component } from 'react';
import './App.css';

import makeSafeEval from 'cross-safe-eval';

const safeEval = makeSafeEval();

const fn = `(function(obj){
  return obj.play==true;
})`;

safeEval(fn);


const rules = {
  a: {
    body: 'function (obj) {return Number(obj.value) > 0}',
    passedRuleID: 'b',
    failedRuleID: 'd'
  },
  b: {
    body: 'function (obj) {return Number(obj.value) > 0}',
    passedRuleID: 'b',
    failedRuleID: 'b'
  },
  c: {
    body: '',
    passedRuleID: 'b',
    failedRuleID: 'd'
  },
  d: {
    body: 'function (obj) {return Number(obj.value) > 0}',
    passedRuleID: null,
    failedRuleID: null
  }
};

class App extends Component {
  state = {
    rules: {},
    incomingData: {value: 2}
  }
  setIncomingData = (e) => {
    try {
      this.setState({incomingData: JSON.parse(e.target.value)});
    }
    catch(e) {
      this.setState({incomingData: {}});
    }
  };

  componentWillMount() {
    const mappedRules = Object.keys(rules).map((ruleID) => [ruleID, rules[ruleID]])
    this.setState({rules});
  }

  runRules = (currentRuleID) => {
    try {
      const currentRule = rules[currentRuleID];
      const ruleLogic = safeEval(`(${currentRule.body})`);
      const ruleOutput = ruleLogic(this.state.incomingData);
      const nextRuleID = !!ruleOutput ? currentRule.passedRuleID : currentRule.failedRuleID;
      console.log(`rule ${currentRuleID} finished, \n output is: ${ruleOutput} \n nextRule: ${nextRuleID}`);
      if(nextRuleID && nextRuleID !== null && nextRuleID !== currentRuleID) {
        this.runRules(nextRuleID);
      }
      else {
        console.log('rules ended');
      }
    }
    catch(e) {
      console.log(`ERROR EXECUTING RULE WITH ID: ${currentRuleID}\nERROR IS: ${e}`);
    }
  }

  runHandler = () => this.runRules('a')

  render() {
    return (
      <div className="">
      {JSON.stringify(this.state.rules)}
        {Object.keys(this.state.rules).map((ruleID)=>(
          <div key={ruleID}>
            'ruleID' <input disabled value={ruleID}/>
            'ruleBody' <input disabled value={this.state.rules[ruleID].body}/>
            'passedRuleID' <input disabled value={this.state.rules[ruleID].passedRuleID}/>
            'failedRuleID' <input disabled value={this.state.rules[ruleID].failedRuleID}/>
          </div>
        ))}
        incoming data: <input onChange={this.setIncomingData} value={this.state.incomingData} />
        <button onClick={this.runHandler}>run rules</button>
      </div>
    );
  }
}

export default App;
