import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Actions from '../../flux/Actions';

class Search extends Component {
  constructor(props) {
    super(props);

    this._searchChange = this._searchChange.bind(this);
  }

  _searchChange(ev) {
    const searchField = this.props.searchField;

    Actions.searchChange(ev, searchField)
  }

  render() {
    return (
      <div>
        <input
          placeholder="Поиск"
          className="form-control form-control-sm"
          onFocus={Actions.startSearch.bind(Actions)}
          onChange={this._searchChange}
          onBlur={Actions.endSearch.bind(Actions)}
        />
      </div>
    )
  }
}

Search.propTypes = {
  searchField: PropTypes.string
}

Search.defaultProps = {
  searchField: 'name'
}

export default Search
