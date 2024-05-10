import { createSlice } from '@reduxjs/toolkit';
import { validateJson } from '@Utils/validateJson';
import {
  createFlow,
  fetchFlows,
  fetchOneFlow,
  updateFlow,
} from '@Redux/actions';
import { initialStateT } from '@Types/DataState.types';

export const initialState: initialStateT = {
  workspaces: Array.from({ length: 4 }, (_, index) => `${index + 1}`),
  activeWorkspace: '1',
  flows: [],
  activeFlow: null,
  isNewFlow: false,
  jobs: [],
  activeJob: null,
  loading: false,
  error: undefined,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setActiveWorkspace(state, action) {
      state.activeWorkspace = action.payload;
    },
    setCreateFlow(state, action) {
      state.isNewFlow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlows.fulfilled, (state, action) => {
        state.loading = false;
        state.flows = action.payload;

        if (action.payload.length > 0)
          localStorage.setItem('cachedFlows', JSON.stringify(action.payload));
      })
      .addCase(fetchFlows.rejected, (state, action) => {
        state.loading = false;
        const string = localStorage.getItem('cachedFlows');
        state.flows = validateJson(string);
        state.error = action.error.message;
      })

      .addCase(updateFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;

        state.activeFlow = action.payload;
      })

      .addCase(createFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.flows.push(action.payload);
        state.activeFlow = action.payload;
      })

      .addCase(fetchOneFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.activeFlow = action.payload[0];
      });
  },
});

export const { setActiveWorkspace, setCreateFlow } = dataSlice.actions;

export default dataSlice.reducer;
