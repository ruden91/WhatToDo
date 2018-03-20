import React, { Component } from 'react';

export default class ProductivityCanvas extends Component {
  constructor(props) {
    super(props);
  }

  drawCanvas = () => {
    const { goalCount, maxValue } = this.props;
    const canvas = document.querySelector('.wtd-dashboard__productivity-canvas');
    let value = 220 * ((goalCount / maxValue) * 100) / 100;
    
    if (canvas.getContext) {
      let context = canvas.getContext("2d");
      // circle
      context.beginPath();
      context.arc(value, 5, 1.5, 0,(Math.PI/180) *360,false);
      context.fillStyle = '#737373';
      context.fill();

      // circle
      context.beginPath();
      context.arc(value, 162, 1.5, 0,(Math.PI/180) *360,false);
      context.fillStyle = '#737373';
      context.fill();

      // line
      context.strokeStyle = '#737373';
      context.beginPath();
      context.moveTo(value, 5);
      context.lineTo(value, 163);
      context.stroke();
    }
  }

  componentDidMount () {
    this.drawCanvas();
  }
  render() {
    return (
      <div className="wtd-dashboard__productivity-canvas-container">
        <canvas className="wtd-dashboard__productivity-canvas" width="280" height="168" />
      </div>
    )
  }
}