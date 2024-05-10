import React, { useEffect } from 'react';
import style from './FlowList.module.scss';
import {
  selectActiveWorkspace,
  selectError,
  selectFlows,
  selectLoading,
} from '@Redux/selectors';
import { useAppDispatch, useAppSelector } from '@Redux/store';
import { fetchFlows, fetchOneFlow } from '@Redux/actions';
import { FlowTypes } from '@Types/Flow.types';
import { setCreateFlow } from '@Redux/reducers';

const FlowList = () => {
  const dispatch = useAppDispatch();
  const selectedWorkspace = useAppSelector(selectActiveWorkspace);
  const flows = useAppSelector(selectFlows);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchFlows(selectedWorkspace as string));
  }, [dispatch, selectedWorkspace]);

  const handleSelectFlow = (flow?: FlowTypes | undefined) => {
    if (flow) {
      dispatch(fetchOneFlow(flow?._id));
      dispatch(setCreateFlow(false));
    } else {
      dispatch(setCreateFlow(true));
    }
    dispatch(fetchOneFlow(flow?._id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={style.classList}>
      <div className={style.classListHeader}>
        <h3>{selectedWorkspace}</h3>
        <button className={'btn btn-link'} onClick={() => handleSelectFlow()}>
          Create new Flow
        </button>
      </div>
      <div className={style.classListContent}>
        <ul>
          <>
            {flows.length ? (
              flows.map((flow, key) => {
                return (
                  <div
                    className={style.classListItem}
                    onClick={() => handleSelectFlow(flow)}
                    key={key}
                  >
                    <div>
                      <h3>{flow.name}</h3>
                      <p>
                        Jobs: <strong>{flow.jobs?.length}</strong>
                      </p>
                    </div>
                    <i className="bi bi-arrow-right-short"></i>
                  </div>
                );
              })
            ) : (
              <div>No flows found</div>
            )}
          </>
        </ul>
      </div>
    </div>
  );
};

export default FlowList;
