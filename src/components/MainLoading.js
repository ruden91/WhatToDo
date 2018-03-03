import React from 'react';

const MainLoading = ({ settings }) => (
  <div className="todo-app__main-loading" style={{ 'backgroundColor': settings ? settings.backgroundColor : ''}}></div>
)

export default MainLoading;