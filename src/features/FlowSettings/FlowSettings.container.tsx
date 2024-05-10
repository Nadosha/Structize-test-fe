import React from 'react';
import style from './FlowSettings.module.scss';
import { useAppDispatch } from '@Redux/store';
import { useSelector } from 'react-redux';
import { setActiveWorkspace } from '@Redux/reducers';
import { selectWorkspaces } from '@Redux/selectors';
import FlowList from './components/FlowList/FlowList';
import FlowItem from './components/FlowItem/FlowItem';

const FlowSettingsContainer = () => {
  const workspaces = useSelector(selectWorkspaces);
  const dispatch = useAppDispatch();
  const handleWorkspaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workspace = e.target.value;
    dispatch(setActiveWorkspace(workspace));
  };

  return (
    <>
      <div className={style.pageTitle}>
        <h1>Flow Settings</h1>
        <div className="input-group grade">
          <div className="input-group-text" id="btnGroupAddon">
            Workspace:
          </div>
          <select
            className="form-select"
            onChange={handleWorkspaceChange}
            defaultValue="1"
          >
            {workspaces.map((workspace, index) => {
              return (
                <option value={workspace} key={index}>
                  {workspace}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="container full-height">
        <div className="row align-items-start full-height gap-4">
          <div className={`col-sm-2 ${style.panel}`}>
            <FlowList />
          </div>
          <div className={`col-sm ${style.panel}`}>
            <FlowItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowSettingsContainer;
