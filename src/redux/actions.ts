import { createAsyncThunk } from '@reduxjs/toolkit';
import * as process from 'process';

export const fetchFlows = createAsyncThunk(
  'flows/fetchFlows',
  async (workspace: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/flows?workspace=${workspace || '1'}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flows');
      }
      const res = await response.json();

      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchOneFlow = createAsyncThunk(
  'flows/fetchOneFlow',
  async (id: string | undefined, { rejectWithValue }) => {
    if (!id) {
      return [
        {
          name: undefined,
          workspace: undefined,
          _id: undefined,
          jobs: [],
        },
      ];
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/flows/${id}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flow');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateFlow = createAsyncThunk(
  'flows/updateFlow',
  async (
    {
      flowId,
      newValues,
    }: { flowId: string; newValues: { name: string; workspace: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/flows/${flowId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newValues),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update flow');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createFlow = createAsyncThunk(
  'flows/createFlow',
  async (
    classInput: { name: string; workspace: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/flows`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(classInput),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to create flow');
      }
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (
    jobInput: {
      title: string | undefined;
      trigger: string | undefined;
      action: string | undefined;
      flowId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobInput),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
