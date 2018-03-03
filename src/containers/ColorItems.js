import React, { Component } from 'react';

import { SketchPicker } from 'react-color';
class ColorItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: this.props.settings ? this.props.settings.backgroundColor : '',
    };    

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeComplete(color) {
    this.setState({
      background: color.hex
    })
    this.props.dispatchSettingData(color.hex);
  }
  render() {
    return (
      <SketchPicker 
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    )
  }
}

export default ColorItems;