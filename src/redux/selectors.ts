import { RootState } from '@Redux/store';

export const selectWorkspaces = (state: RootState) => state.data.workspaces;
export const selectActiveWorkspace = (state: RootState) =>
  state.data.activeWorkspace;
export const selectFlows = (state: RootState) => state.data.flows;
export const selectActiveFlow = (state: RootState) => state.data.activeFlow;
export const selectIsNewFlow = (state: RootState) => state.data.isNewFlow;
export const selectJobs = (state: RootState) => state.data.jobs;
export const selectActiveJob = (state: RootState) => state.data.activeJob;
export const selectLoading = (state: RootState) => state.data.loading;
export const selectError = (state: RootState) => state.data.error;
