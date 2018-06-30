import React, { Component } from 'react';


export default class Row extends Component {

  viewItem = () => {
    const { item } = this.props;
    this.props.viewItem(item.id);
  }

  render() {
    const { item } = this.props;
    const trans = item.ntranslated;
    const total = item.strings.length;

    return (
      <tr onClick={this.viewItem}>
        <td>{item.id}</td>
        <td>{item.source}</td>
        <td>{item.target}</td>
        <td>{trans} / {total}</td>
      </tr>
    );
  }
}
