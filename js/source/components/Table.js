import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Actions from '../../flux/Actions';
import Store from '../../flux/Store';

class Table extends Component {
  constructor(props) {
    super(props);

    Store.addListener('change', () => {
      this.setState({
        list: Store.getData()
      })
    })
  }

  render() {
    return (
      <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            {Store.getHeaders().map((header, index) => {
              return <th key={index}>{header}</th>
            })}
          </tr>
        </thead>
        <tbody>
         {Store.getData().map((row, rowIndex) => {
           return (
             <tr key={rowIndex}>
               {Object.keys(row).map((cell, cellIndex) => {
                 return <td key={cellIndex}>{row[cell]}</td>
               })}
             </tr>
           )
         })}
        </tbody>
      </table>
    )
  }
}

export default Table
