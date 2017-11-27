import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Search from './Search';
import SelectAndSort from './SelectAndSort';

class TableWithSearchAndSort extends Component {
  render() {
    const optionsForSelect = {
      price: 'цена',
      date: 'дата',
      type: 'тип'
    }
    return (
      <div>
        <div className="row">
          <div className="Search col">
            <Search
              searchField="name"
            />
          </div>
          <div className="SelectAndSort col">
            <SelectAndSort
              options={optionsForSelect}
            />
          </div>
        </div>
        <div className="Table">
          <Table />
        </div>
      </div>
    )
  }
}

export default TableWithSearchAndSort
