import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Card,
  CardActions,
  Button,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  FormHelperText,
  Tooltip,
  Chip,
} from "@material-ui/core";
import { addStep } from "./stepsSlice";
import { AttentionLevels } from "../attentionLevel/attentionLevels";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 140,
  },
  info: {
    marginLeft: theme.spacing(1),
  },
}));

export const NewStep = ({ onComplete }) => {
  const classes = useStyles();
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [previousStepIds, setPreviousStepIds] = useState([]);
  const [timeEstimateInSeconds, setTimeEstimateInSeconds] = useState(null);
  const [timerUseful, setTimerUseful] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(null);
  const [attentionLevelId, setAttentionLevelId] = useState("");
  const [output, setOutput] = useState(null);

  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader title="New step" />
      <CardContent>
        <TextField
          autoFocus
          multiline
          required
          fullWidth
          label="Instruction"
          placeholder="Chop the onions"
          value={instruction}
          onChange={(event) => setInstruction(event.target.value)}
        />

        <FormControl className={classes.formControl} required>
          <InputLabel id="attentionLevelLabel">Attention level</InputLabel>
          <Select
            labelId="attentionLevelLabel"
            value={attentionLevelId}
            onChange={(event) => setAttentionLevelId(event.target.value)}
          >
            {AttentionLevels.map((attentionLevel) => (
              <MenuItem key={attentionLevel.id} value={attentionLevel.id}>
                {attentionLevel.label}
                <Tooltip title={attentionLevel.description}>
                  <Chip className={classes.info} label="?" size="small" />
                </Tooltip>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            How much of your attention the instruction requires
          </FormHelperText>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button onClick={onComplete}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => {
            dispatch(
              addStep({
                instruction,
                ingredients,
                previousStepIds,
                timeEstimateInSeconds,
                timerUseful,
                reminderInterval,
                attentionLevelId,
                output,
              })
            );
            onComplete();
          }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};
