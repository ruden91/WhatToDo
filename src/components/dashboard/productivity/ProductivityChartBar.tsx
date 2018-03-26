import * as React from 'react';

interface ProductivityChartBarProps {
  count: number;
  day: string;
}
const ProductivityChartBar: React.SFC<ProductivityChartBarProps> = props => (
  <div className="wtd-dashboard-productivity__chart-bar">
    <div style={{ width: `${props.count / 80 * 100}%` }}>
      <span>
        {props.day} <b>{props.count}</b>
      </span>
    </div>
  </div>
);

export default ProductivityChartBar;
