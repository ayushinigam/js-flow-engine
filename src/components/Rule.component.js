/* Rule: An accordian component which shows rule details and changes color based on status*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Rule extends Component {
  state = {
    collapsed: this.props.collapsed
  }
  componentWillReceiveProps() {
    this.setState({collapsed: this.props.collapsed})
  }
  render () {
    const {body, passedRuleID, failedRuleID, id, status} = this.props;
    return (
      <div>
        'id' <input disabled value={id}/>
        'ruleBody' <input disabled value={body}/>
        'passedRuleID' <input disabled value={passedRuleID}/>
        'failedRuleID' <input disabled value={failedRuleID}/>
        'status::::: '      {String(status)}
      </div>);
  }
}
Rule.defaultProps = {
};
Rule.propTypes = {
};
export default Rule;
