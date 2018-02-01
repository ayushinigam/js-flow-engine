import React, { Component } from 'react';
import './App.css';
import rules from './rules.json';
import makeSafeEval from 'cross-safe-eval';
import Rule from './components/Rule.component';
import { ToastContainer, toast } from 'react-toastify';

const safeEval = makeSafeEval(); // uses eval without access to globals, scope, closure and "this"

class App extends Component {
  state = {
    rules: rules,
    incomingData: '{"value": 2}'
  }
  currentCallStack = []
  setIncomingData = (e) => this.setState({incomingData: e.target.value});

  processRule = (currentRuleID) => {
    const currentRule = rules.filter((ruleDetails) => ruleDetails.id === currentRuleID)[0];
    const ruleLogic = safeEval(`(${currentRule.body})`);
    const incomingData = JSON.parse(this.state.incomingData);
    const ruleOutput = ruleLogic(incomingData);
    // toast.success(`Rule ${currentRuleID} finished, \nOutput is: ${ruleOutput} \nNextRule: ${nextRuleID}`)
    const nextRuleID =  !!ruleOutput ? currentRule.passedRuleID : currentRule.failedRuleID;
    return {ruleOutput, nextRuleID};
  }

  runRules = (currentRuleID) => {
    try {
      if(this.currentCallStack.includes(currentRuleID)) {
        throw `Infinite loop at RuleID ${currentRuleID}\nCallstack: ${[...this.currentCallStack, currentRuleID].join(' --> ')}`;
      }
      const {ruleOutput, nextRuleID} = this.processRule(currentRuleID);
      if(nextRuleID && nextRuleID !== null) { //
        this.currentCallStack.push(currentRuleID);
        this.runRules(nextRuleID);
      }
      else { // last rule
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
    this.runRules(this.state.rules[0].id);
  }

  render() {
    return (
      <div className="">
        {this.state.rules.map((ruleDetails)=>(<Rule key={ruleDetails.id} {...ruleDetails} />))}
        incoming data: <input onChange={this.setIncomingData} value={this.state.incomingData} />
        <button onClick={this.runHandler}>run rules</button>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
