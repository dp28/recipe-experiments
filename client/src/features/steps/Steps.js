import React, { useState } from "react";
import { useSelector } from "react-redux";
import { List, ListItem, Typography, Button } from "@material-ui/core";
import { selectSteps } from "./stepsSlice";
import { NewStep } from "./NewStep";

export const Steps = () => {
  const steps = useSelector(selectSteps);
  const [showNewStep, setShowNewStep] = useState(false);

  return (
    <div>
      <Typography gutterBottom>Steps ({steps.length})</Typography>

      {showNewStep || (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowNewStep(true)}
        >
          New step
        </Button>
      )}

      {showNewStep && <NewStep onComplete={() => setShowNewStep(false)} />}

      <List>
        {steps.map((step) => (
          <ListItem key={step.id}>
            <Typography>{step.instruction}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
