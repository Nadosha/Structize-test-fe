import { FlowTypes, Job } from '@Types/Flow.types';

export type initialStateT = {
  workspaces: string[];
  activeWorkspace: string | null | undefined;
  flows: FlowTypes[];
  activeFlow: FlowTypes | null | undefined;
  isNewFlow: boolean;
  jobs: Job[];
  activeJob: Job | null | undefined;
  loading: boolean;
  error: string | undefined;
};
