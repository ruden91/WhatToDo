import React, { Component } from 'react';

export default class ProductivityCanvas extends Component {

  drawCanvas = () => {
    const canvas = document.querySelector('.wtd-dashboard__productivity-canvas');

    if (canvas.getContext) {
      let context = canvas.getContext("2d");
      context.translate(0.5, 0.5);
      // circle
      context.beginPath();
      context.arc(15, 5, 1.5, 0,(Math.PI/180) *360,false);
      context.fillStyle = '#737373';
      context.fill();

      // circle
      context.beginPath();
      context.arc(15, 162, 1.5, 0,(Math.PI/180) *360,false);
      context.fillStyle = '#737373';
      context.fill();

      // line
      
      context.strokeStyle = '#737373';
      context.beginPath();
      context.moveTo(15, 5);
      context.lineTo(15, 163);
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