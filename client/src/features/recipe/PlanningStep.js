import React from "react";
import { Typography, makeStyles, Card, CardContent } from "@material-ui/core";
import { StepDuration } from "./StepDuration";

const useStyles = makeStyles((theme) => ({
  planningStep: {
    flexGrow: 1,
    position: "relative",
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  durationContainer: {
    display: "flex",
    flexDirection: "column",
  },
  duration: {
    flexGrow: 1,
  },
  stepAndDependencies: {
    flexGrow: 1,
  },
  previousSteps: {
    display: "flex",
    flexDirection: "row",
    marginBottom: (props) => (props.childrenCount ? theme.spacing(1) : 0),
  },
  previousStep: {
    flexGrow: 1,
    flexBasis: 1,
    display: "flex",
    alignItems: "flex-end",
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
  },
}));

export function PlanningStep({ stepTreeNode }) {
  const { step } = stepTreeNode;
  const classes = useStyles({
    step,
    childrenCount: stepTreeNode.children.length,
  });

  return (
    <div className={classes.stepAndDependencies}>
      <div className={classes.previousSteps}>
        {stepTreeNode.children.map((childNode) => (
          <div key={childNode.step.id} className={classes.previousStep}>
            <PlanningStep stepTreeNode={childNode} />
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <div className={classes.durationContainer}>
          <StepDuration step={step} className={classes.duration} />
        </div>
        <Card className={classes.planningStep}>
          <CardContent>
            <Typography>{step.instruction.text}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
