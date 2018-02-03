/* Rule: An accordian component which shows rule details and changes color based on status*/

import React, {PureComponent} from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel.component';
import './Rule.styles.css'

class Rule extends PureComponent {
  state = {
    collapsed: true
  }
  STATUS_CLASSES_MAP = {
    true: 'rule-success',
    false: 'rule-failed',
    null: ''
  }
  toggleContent = () => this.setState({collapsed: !this.state.collapsed})

  render () {
    const {body, passedRuleID, failedRuleID, id, status, title} = this.props;
    return (
      <div className='rule-container'>
        <div className={`rule-header ${this.STATUS_CLASSES_MAP[status]}`} onClick={this.toggleContent}>
          <span className='rule-id'>{id}</span>
          <p className='rule-title'>{title}</p>
        </div>
        <div className={`rule-content ${this.state.collapsed ? 'rule-collapsed' : 'rule-un-collapsed'}`}>
          <InputWithLabel inputClassName='rule-body' label='Rule body' disabled value={body} />
          <div className='next-rules-container'>
            <InputWithLabel className='next-rule' label='Next rule-id if passed' disabled value={passedRuleID} />
            <InputWithLabel className='next-rule' label='Next rule-id if failed' disabled value={failedRuleID} />
          </div>
        </div>
      </div>);
  }
}
Rule.defaultProps = {
  status: null,
  value: '',
  title: 'No Title'
};

export default Rule;
