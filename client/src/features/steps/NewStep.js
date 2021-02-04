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
import { TimeUnitsById, TimeUnits } from "../time/timeUnits";
import { TimeInput } from "../time/TimeInput";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 140,
  },
  timeEstimate: {
    marginTop: theme.spacing(3),
  },
  timeFormControl: {
    marginLeft: theme.spacing(1),
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
  const [timeEstimateInSeconds, setTimeEstimateInSeconds] = useState(
    5 * TimeUnitsById.MINUTE.inSeconds
  );
  const [timersInSeconds, setTimersInSeconds] = useState(false);
  const [attentionLevelId, setAttentionLevelId] = useState("");

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

        <TimeInput label="Time estimate" onChange={setTimeEstimateInSeconds} />
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
                timersInSeconds,
                attentionLevelId,
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
