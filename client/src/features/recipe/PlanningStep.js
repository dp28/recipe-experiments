import React from "react";
import { Typography, makeStyles, Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  planningStep: {
    minHeight: ({ step }) => step.time.estimatedDurationInSeconds / 10,
  },
  stepAndDependencies: {},
  previousSteps: {
    display: "flex",
    flexDirection: "row",
    marginBottom: (props) => (props.childrenCount ? theme.spacing(1) : 0),
  },
  previousStep: {
    flexGrow: 1,
    flexBasis: 1,
    display: "block",
  },
}));

export function PlanningStep({ stepTreeNode, stepsById }) {
  const step = stepsById[stepTreeNode.id];
  const classes = useStyles({
    step,
    childrenCount: stepTreeNode.children.length,
  });

  return (
    <div className={classes.stepAndDependencies}>
      <div className={classes.previousSteps}>
        {stepTreeNode.children.map((childNode) => (
          <div key={childNode.id} className={classes.previousStep}>
            <PlanningStep stepTreeNode={childNode} stepsById={stepsById} />
          </div>
        ))}
      </div>
      <Card className={classes.planningStep}>
        <CardContent>
          <Typography>{step.instruction.text}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
