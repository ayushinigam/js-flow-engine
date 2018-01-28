import React, { Component } from 'react';
import './App.css';
import rules from './rules.json';
import makeSafeEval from 'cross-safe-eval';
import { ToastContainer, toast } from 'react-toastify';

const safeEval = makeSafeEval();

class App extends Component {
  state = {
    rules: {},
    incomingData: '{"value": 2}'
  }
  currentCallStack = []
  setIncomingData = (e) => this.setState({incomingData: e.target.value});

  componentWillMount() {
    const mappedRules = Object.keys(rules).map((ruleID) => [ruleID, rules[ruleID]])
    this.setState({rules});
  }

  runRules = (currentRuleID) => {
    try {
      if(this.currentCallStack.includes(currentRuleID)) {
        throw `infinite loop at RuleID ${currentRuleID}\nCallstack: ${[...this.currentCallStack, currentRuleID].join(' --> ')}`;
      }
      const currentRule = rules[currentRuleID];
      const ruleLogic = safeEval(`(${currentRule.body})`);
      const incomingData = JSON.parse(this.state.incomingData);
      const ruleOutput = ruleLogic(incomingData);
      const nextRuleID = !!ruleOutput ? currentRule.passedRuleID : currentRule.failedRuleID;
      toast.success(`Rule ${currentRuleID} finished, \nOutput is: ${ruleOutput} \nNextRule: ${nextRuleID}`)
      if(nextRuleID && nextRuleID !== null) {
        this.currentCallStack.push(currentRuleID);
        this.runRules(nextRuleID);
      }
      else {
        this.currentCallStack = [];
        toast.success('✅ End of the flow!');
      }
    }
    catch(e) {
      this.currentCallStack = [];
      toast.error(`⚠️ ERROR EXECUTING RULE: "${currentRuleID}". ERROR: ${e}`, {autoClose: 7500});
    }
  }

  runHandler = () => {
    toast.success('✅ Flow Started!');
    this.runRules('a');
  }

  render() {
    return (
      <div className="">
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
        <ToastContainer />
      </div>
    );
  }
}

export default App;
