import React, { Component } from 'react';
import './App.css';
import rules from './rules.json';
import makeSafeEval from 'cross-safe-eval';
import Rule from './components/Rule/Rule.component';
import '../node_modules/reset-css/reset.css';
import { ToastContainer, toast } from 'react-toastify';

const safeEval = makeSafeEval(); // uses eval without access to globals, scope, closure and "this"

class App extends Component {
  state = {
    rules: rules,
    incomingData: '{"value": -1}',
    statuses: {}
  }
  currentCallStack = {}
  setIncomingData = (e) => this.setState({incomingData: e.target.value});

  processRule = (currentRuleID) => {
    const currentRule = this.state.rules.filter((ruleDetails) => ruleDetails.id === currentRuleID)[0];
    const ruleLogic = safeEval(`(${currentRule.body})`);
    const incomingData = JSON.parse(this.state.incomingData);
    const ruleOutput = ruleLogic(incomingData);
    const nextRuleID =  !!ruleOutput ? currentRule.passedRuleID : currentRule.failedRuleID;
    return {ruleOutput, nextRuleID};
  }

  runRules = (currentRuleID) => {
    try {
      if(this.currentCallStack.hasOwnProperty(currentRuleID)) {
        const callStack = [...Object.keys(this.currentCallStack), currentRuleID].join(' --> ');
        throw new Error(`Infinite loop at RuleID ${currentRuleID} Callstack: ${callStack}`);
      }
      const {ruleOutput, nextRuleID} = this.processRule(currentRuleID);
      this.currentCallStack[currentRuleID] = ruleOutput;
      if(nextRuleID && nextRuleID !== null) { //
        this.runRules(nextRuleID);
      }
      else { // last rule
        toast.success('✅ End of the flow!');
      }
    }
    catch(e) {
      toast.error(`⚠️ ERROR EXECUTING RULE: "${currentRuleID}". ERROR: ${e}`, {autoClose: 7500});
    }
  }

  runHandler = () => {
    this.currentCallStack = {};
    this.setState({statuses: this.currentCallStack}, () => { //clear previous state
      toast.dismiss(); //dismiss previous toasts
      this.runRules(this.state.rules[0].id);
      this.setState({statuses: this.currentCallStack})
    });

  }

  render() {
    return (
      <div className="app">
      Incoming data: <input onChange={this.setIncomingData} value={this.state.incomingData} />
      <button onClick={this.runHandler}>run rules</button>
        {this.state.rules.map((ruleDetails) => (
          <Rule key={ruleDetails.id} status={this.state.statuses[ruleDetails.id]} {...ruleDetails} />
        ))}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
