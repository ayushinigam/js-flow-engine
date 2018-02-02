/* Rule: An accordian component which shows rule details and changes color based on status*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Rule.styles.css'

const InputWithLabel = ({className, label, ...extraprops}) => (
  <div className={`input-with-label ${className}`}>
    <p>{label}</p>
    <input {...extraprops} />
  </div>
);

class Rule extends Component {
  state = {
    collapsed: this.props.collapsed
  }
  componentWillReceiveProps() {
    this.setState({collapsed: this.props.collapsed})
  }
  STATUS_CLASSES_MAP = {
    true: 'rule-success',
    false: 'rule-failed',
    null: ''
  }
  render () {
    const {body, passedRuleID, failedRuleID, id, status} = this.props;

    return (
      <div className='rule-container'>
        <div className={`rule-header ${this.STATUS_CLASSES_MAP[status]}`}>
          <span className='rule-id'>{id}</span>
          <p className='rule-title'>Rule title</p>
        </div>
        <div className={`rule-content ${this.state.collapsed ? 'rule-collapsed' : 'rule-un-collapsed'}`}>
          <InputWithLabel className='rule-body' label='Rule body' disabled value={body} />
          <div className='next-rules-container'>
            <InputWithLabel label='Next rule-id if passed' disabled value={passedRuleID} />
            <InputWithLabel label='Next rule-id if failed' disabled value={failedRuleID} />
          </div>
        </div>
      </div>);
  }
}
Rule.defaultProps = {
  status: null
};
Rule.propTypes = {
};
export default Rule;
