import * as React from 'react';

interface DashboardHeaderItemsProps {
  onOpenDashboardModal: ((
    e: React.MouseEvent<HTMLElement>,
    target: string
  ) => void);
  completedCount: number;
}

export default class DashboardHeaderItems extends React.Component<
  DashboardHeaderItemsProps
> {
  constructor(props: DashboardHeaderItemsProps) {
    super(props);
  }

  render() {
    const { onOpenDashboardModal, completedCount } = this.props;
    return (
      <div>
        <ul className="wtd-dashboard-header__actions-holder">
          {/* <li className="wtd-dashboard-header__actions">
            <button className="wtd-dashboard-header__action wtd-dashboard-header__action--add" />
          </li> */}
          <li className="wtd-dashboard-header__actions">
            <button
              className="wtd-dashboard-header__action"
              onClick={e => onOpenDashboardModal(e, 'productivity')}
            >
              <i className="far fa-check-circle" />
              <span>{completedCount}</span>
            </button>
          </li>
          <li className="wtd-dashboard-header__actions">
            <button
              className="wtd-dashboard-header__action"
              onClick={e => onOpenDashboardModal(e, 'notice')}
            >
              <i className="fas fa-bell" />
            </button>
          </li>
          <li className="wtd-dashboard-header__actions">
            <button
              className="wtd-dashboard-header__action wtd-dashboard-header__action--setting"
              onClick={e => onOpenDashboardModal(e, 'setting')}
            >
              <i className="fas fa-cog" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
