import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Actions from '../../flux/Actions';

class SelectAndSort extends Component {
  constructor(props) {
    super(props);

    this._makeOptionsList = this._makeOptionsList.bind(this);
    this._selectChange = this._selectChange.bind(this);
  }

  _selectChange(ev) {
    let [field, direction] = ev.target.value.split('-');

    Actions.sortData({field, direction});
  }

  _makeOptionsList() {
    let list = [];

    Object.keys(this.props.options).forEach((field, index) => {
      list.push(<option key={index} value={field + '-down'}>{this.props.options[field]} по убыванию</option>);
      list.push(<option key={index + '.5'} value={field + '-up'}>{this.props.options[field]} по возрастанию</option>);
    });

    return list;
  }

  render() {
    return (
      <div>
        <select
          className="form-control form-control-sm"
          defaultValue="sort"
          onChange={this._selectChange}
        >
          <option disabled value="sort">cортировка</option>
          {this._makeOptionsList()}
        </select>
      </div>
    )
  }
}

SelectAndSort.propTypes = {
  options: PropTypes.object.isRequired
}

export default SelectAndSort
