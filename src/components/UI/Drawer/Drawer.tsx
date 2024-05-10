import React, { useState } from 'react';
import style from './Drawer.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@Redux/store';
import { selectActiveFlow, selectActiveJob } from '@Redux/selectors';
import { createJob, fetchOneFlow } from '@Redux/actions';
import { Job as JobType } from '@Types/Flow.types';

type DrawerProps = {
  show: boolean;
  onHide: (
    evt: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) => void;
};

const triggers = [
  { value: 'on_submit', label: 'On Submit' },
  { value: 'on_close', label: 'On Close' },
  { value: 'on_update', label: 'On Update' },
  { value: 'on_create', label: 'On Create' },
  { value: 'on_delete', label: 'On Delete' },
  { value: 'on_save', label: 'On Save' },
  { value: 'on_cancel', label: 'On Cancel' },
];

const actions = [
  { value: 'email', label: 'Email' },
  { value: 'notification', label: 'Notification' },
  { value: 'webhook', label: 'Webhook' },
  { value: 'webhook_slack', label: 'Webhook Slack' },
];
const Drawer = ({ show, onHide }: DrawerProps) => {
  const dispatch = useAppDispatch();
  const selectedFlow = useSelector(selectActiveFlow);
  const selectedJob = useSelector(selectActiveJob);
  const [formData, setFormData] = useState<{
    title: string;
    action: string;
    trigger: string;
  }>({
    title: '',
    action: '',
    trigger: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const SubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createJobInput = {
      ...formData,
      flowId: selectedFlow?._id as string,
    };

    dispatch(createJob(createJobInput)).then(() => {
      dispatch(fetchOneFlow(selectedFlow?._id));
      onHide(e);
    });
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${show && 'show'}`}
      tabIndex={1}
      data-bs-scroll="false"
    >
      <div className={style.drawerHeader}>
        <div className={style.drawerHeaderTitle}>
          <h1>Add new job</h1>
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onHide}
          style={{ marginLeft: 'auto' }}
        ></button>
      </div>
      <div className="offcanvas-body">
        <form className={style.form} onSubmit={SubmitForm}>
          <div className="col-12 mt-4 mb-4">
            <label htmlFor="className">Job Name</label>
            <input
              type="text"
              className="form-control-plaintext"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="form-select">Trigger</label>
              <select
                className="form-select"
                defaultValue="1"
                name="trigger"
                value={formData.trigger}
                onChange={handleInputChange}
              >
                {triggers.map((trigger, index) => {
                  return (
                    <option
                      value={trigger.value}
                      selected={trigger.value === selectedJob?.trigger}
                      key={index}
                    >
                      {trigger.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-6">
              <label htmlFor="className">Action</label>
              <select
                className="form-select"
                defaultValue="1"
                name="action"
                value={formData.action}
                onChange={handleInputChange}
              >
                {actions.map((action, index) => {
                  return (
                    <option
                      value={action.value}
                      selected={action.value === selectedJob?.action}
                      key={index}
                    >
                      {action.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={style.drawerFooter}>
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Drawer;
