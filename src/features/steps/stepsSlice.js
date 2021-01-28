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
          equipment: stepInput.equipment,
        },
        time: {
          estimateInSeconds: stepInput.timeEstimateInSeconds,
          timerUseful: stepInput.timerUseful,
          reminderInterval: stepInput.reminderInterval,
        },
        attentionLevelId: stepInput.attentionLevelId,
        output: stepInput.output,
      };
    }),
  },
});

export const { addStep } = stepsSlice.actions;

export const selectStepsById = (state) => state.steps.stepsById;
export const selectSteps = (state) => Object.values(state.steps.stepsById);
export const selectStep = (id) => (state) => state.steps.stepsById[id];

export const stepsReducer = stepsSlice.reducer;
