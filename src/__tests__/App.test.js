import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import {shallow} from 'enzyme';
import { toast } from 'react-toastify';

jest.mock('react-toastify')

describe('App component', () => {
  let wrapper, instance;
  beforeEach(()=> {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
    const rules = [{
      id: 'test123',
      body: 'function(obj) {return true}',
      passedRuleID: 'passed123',
      failedRuleID: 'failed123'
    }];
    wrapper.setState({rules});
  })
  it('App: renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('setIncomingData: should set state.incomingData', () => {
    const eventData = {target: {value: '"{test: 123}"'}};
    instance.setIncomingData(eventData);
    expect(instance.state.incomingData).toBe('"{test: 123}"');
  })
  it('processRule success: should process the rule and return {ruleOutput, nextRuleID} ', () => {
    const {ruleOutput, nextRuleID} = instance.processRule('test123');
    expect(ruleOutput).toBe(true);
    expect(nextRuleID).toBe('passed123');
  })
  it('processRule failure: should process the rule and return {ruleOutput, nextRuleID} ', () => {
    const rules = [{
      id: 'xyz123',
      body: 'function(obj) {return false}',
      passedRuleID: 'passed123',
      failedRuleID: 'failed123'
    }];
    wrapper.setState({rules});
    const {ruleOutput, nextRuleID} = instance.processRule('xyz123');
    expect(ruleOutput).toBe(false);
    expect(nextRuleID).toBe('failed123');
  })

  it('runHandler: should reset and start rules with first id', () =>{
    instance.runRules = jest.fn();
    instance.runHandler();
    expect(toast.dismiss).toBeCalledWith();
    expect(instance.runRules).toHaveBeenLastCalledWith('test123');
    expect(instance.state.statuses).toEqual({})
  })
  it('should show error if rule is already executed', () => {
    instance.currentCallStack = {'abc': true};
    instance.runRules('abc');
    expect(toast.error).toHaveBeenLastCalledWith(`⚠️ ERROR EXECUTING RULE: \"abc\". ERROR: Error: Infinite loop at RuleID abc Callstack: abc --> abc`, {autoClose: 7500})
  })

  it('runRules: should recursively run rules based on nextRuleID', () => {
    const rules = [{
      id: 'xyz123',
      body: 'function(obj) {return true}',
      passedRuleID: 'passed123',
      failedRuleID: 'failed123'
    },{
      id: 'passed123',
      body: 'function(obj) {return false}',
      passedRuleID: '',
      failedRuleID: null
    }];
    wrapper.setState({rules});
    jest.spyOn(instance, 'runRules');
    instance.runRules('xyz123');
    expect(instance.runRules).toHaveBeenCalledTimes(2);
    expect(toast.success).toHaveBeenLastCalledWith('✅ End of the flow!')
  })
});
