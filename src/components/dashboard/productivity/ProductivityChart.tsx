import * as React from 'react';
import { map } from 'lodash';
import ProductivityChartBar from 'components/dashboard/productivity/ProductivityChartBar';
interface ProductivityChartProps {
  weeklyStats: any;
  maxValue: number;
}
export default class ProductivityChart extends React.Component<
  ProductivityChartProps
> {
  constructor(props: ProductivityChartProps) {
    super(props);
  }
  mapToComponent = () => {
    return map(this.props.weeklyStats, (stats, key) => (
      <ProductivityChartBar count={stats.count} maxValue={this.props.maxValue} day={stats.day} key={key} />
    ));
  };

  render() {
    return (
      <div className="wtd-dashboard-productivity__bar-chart">
        {this.mapToComponent()}
      </div>
    );
  }
}
