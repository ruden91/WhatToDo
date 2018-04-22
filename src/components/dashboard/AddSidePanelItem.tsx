import * as React from "react";
import "./AddSidePanelItem.scss";

interface Props {
  onHandleAddSidePanelButton: () => void;
}
const AddSidePanelItem: React.SFC<Props> = props => {
  return (
    <div className="wtd-dashboard-add-side-panel-item">
      <div className="left_list_man actions">
        <a
          className="wtd-dashboard-add-side-panel-item__add-task"
          href="javascript:;"
          onClick={props.onHandleAddSidePanelButton}
        >
          <span />프로젝트 추가
        </a>
      </div>
    </div>
  );
};

export default AddSidePanelItem;
