import React, { useEffect, useState } from 'react';

import { Drawer } from '@Components/UI/Drawer';
import { useAppDispatch, useAppSelector } from '@Redux/store';

import 'react-datepicker/dist/react-datepicker.css';
import style from './FlowItem.module.scss';
import { useGetActiveFlow } from '@Hooks/Hooks.flow';
import {
  selectActiveWorkspace,
  selectIsNewFlow,
  selectWorkspaces,
} from '@Redux/selectors';
import { createFlow, updateFlow } from '@Redux/actions';

const FlowItem = () => {
  const dispatch = useAppDispatch();
  const selectedFlow = useGetActiveFlow();
  const isNewFlow = useAppSelector(selectIsNewFlow);
  const workspaces = useAppSelector(selectWorkspaces);
  const selectedWorkspace = useAppSelector(selectActiveWorkspace);

  const [formData, setFormData] = useState<{
    name: string | undefined;
    workspace: string | undefined;
  }>({ name: undefined, workspace: undefined });

  const [showDrawer, setShowDrawer] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission = {
      ...formData,
    };

    if (!isNewFlow && selectedFlow?._id) {
      dispatch(
        updateFlow({
          flowId: selectedFlow._id,
          newValues: {
            name: submission.name || '',
            workspace: submission.workspace || '1',
          },
        }),
      );
    } else {
      dispatch(
        createFlow({
          name: submission.name || '',
          workspace: submission.workspace || '1',
        }),
      );
    }
  };

  useEffect(() => {
    const formData = {
      name: selectedFlow?.name,
      workspace: selectedFlow?.workspace,
    };

    setFormData(() => {
      return formData;
    });
  }, [selectedFlow, isNewFlow, selectedWorkspace]);

  const toggleDrawer = (
    evt: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) => {
    evt.preventDefault();
    setShowDrawer(!showDrawer);
  };

  if (!isNewFlow && !selectedFlow) {
    return (
      <div className="container p-3 col">
        <h3>Select flow for beginning ...</h3>
      </div>
    );
  }

  return (
    <div
      className="container p-3 col"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <form onSubmit={SubmitForm}>
        <div className={style.classItemHeader}>
          <div className={style.classItemHeaderTitle}>
            <h1>
              {isNewFlow && !selectedFlow
                ? `Create New Flow`
                : selectedFlow?.name}
            </h1>
            {selectedFlow && (
              <div>
                <p>
                  Workspace: <strong>{selectedFlow?.workspace}</strong> | Jobs:{' '}
                  <strong>{selectedFlow?.jobs?.length}</strong>
                </p>
              </div>
            )}
          </div>

          <div className="circle" style={{ marginLeft: 'auto' }}>
            <i className="bi bi-pencil-fill"></i>
          </div>
        </div>
        <div className={style.classItemContent}>
          <div className="section">
            <div className="row">
              <div className="col-6">
                <label htmlFor="className">Flow name</label>
                <input
                  type="text"
                  className="form-control-plaintext"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-6">
                <label htmlFor="workspaceRegion">Workspace</label>
                <select
                  className="form-select"
                  defaultValue="1"
                  name="workspace"
                  value={formData.workspace || ''}
                  onChange={handleInputChange}
                >
                  {workspaces.map((workspace, index) => {
                    return (
                      <option
                        value={workspace}
                        selected={workspace === selectedFlow?.workspace}
                        key={index}
                      >
                        {index + 1}st
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="section">
            <div className={'row'}>
              <div className="col-6">
                <h3>Jobs</h3>
              </div>
              <div
                className="col-6"
                style={{ display: 'flex', justifyItems: 'flex-end' }}
              >
                <button
                  className={`btn btn-link ${style.addStudent}`}
                  style={{ marginLeft: 'auto' }}
                  onClick={toggleDrawer}
                  disabled={!selectedFlow?._id}
                >
                  Add new Job
                </button>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Trigger</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedFlow?.jobs?.length ? (
                  selectedFlow.jobs.map((job, key) => (
                    <tr key={key}>
                      <td>{job.title}</td>
                      <td>{job.trigger}</td>
                      <td>{job.action}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={0}>
                    <td></td>
                    <td>This Flow doesn't have any jobs yet</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className={style.classItemFooter}>
          <button className="btn btn-link critical-action">
            <p>
              <i className="bi bi-trash" /> Delete Flow
            </p>
          </button>
          <div className={style.buttonGroup}>
            <button className="btn btn-link">Cancel</button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
      <Drawer show={showDrawer} onHide={toggleDrawer} />
    </div>
  );
};

export default FlowItem;
