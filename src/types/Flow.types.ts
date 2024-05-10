export type Job = {
  title: string;
  trigger: string;
  action: string;
  flowId: string;
};

export type FlowTypes = {
  _id: string;
  name: string;
  workspace: string;
  jobs: Job[];
};
