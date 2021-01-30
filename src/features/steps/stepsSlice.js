import { createSlice } from "@reduxjs/toolkit";
import { withNewId } from "../../identity";

export const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    stepsById: {},
  },
  reducers: {
    addStep: withNewId((state, action) => {
      const stepInput = action.payload;
      state.stepsById[stepInput.id] = {
        id: stepInput.id,
        instruction: stepInput.instruction,
        input: {
          ingredients: stepInput.ingredients,
          previousStepIds: stepInput.previousStepIds,
        },
        time: {
          estimateInSeconds: stepInput.timeEstimateInSeconds,
          timersInSeconds: stepInput.timersInSeconds,
        },
        attentionLevelId: stepInput.attentionLevelId,
      };
    }),
  },
});

export const { addStep } = stepsSlice.actions;

export const selectStepsById = (state) => state.steps.stepsById;
export const selectSteps = (state) => Object.values(state.steps.stepsById);
export const selectStep = (id) => (state) => state.steps.stepsById[id];

export const stepsReducer = stepsSlice.reducer;
