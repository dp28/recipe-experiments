import React, { useState, useCallback } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { TimeUnitsById, TimeUnits } from "../time/timeUnits";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 140,
  },
  time: {
    marginTop: theme.spacing(3),
  },
  timeFormControl: {
    marginLeft: theme.spacing(1),
  },
  info: {
    marginLeft: theme.spacing(1),
  },
}));

export const TimeInput = ({
  onChange,
  label,
  defaultUnitId = TimeUnitsById.MINUTE.id,
}) => {
  const classes = useStyles();
  const [timeUnitId, setTimeUnitId] = useState(defaultUnitId);
  const [timeInUnits, setTimeInUnits] = useState(5);

  const callOnChange = useCallback(() => {
    onChange(timeInUnits * TimeUnitsById[timeUnitId].inSeconds);
  }, [onChange, timeUnitId, timeInUnits]);

  return (
    <div className={classes.time}>
      <TextField
        required
        type="number"
        label={label}
        value={timeInUnits}
        onChange={(event) => {
          setTimeInUnits(Number(event.target.value));
          callOnChange();
        }}
        inputProps={{ min: 0, step: 1 }}
      />

      <FormControl className={classes.timeFormControl} required>
        <InputLabel id="timeUnitsLabel"></InputLabel>
        <Select
          required
          labelId="timeUnitsLabel"
          value={timeUnitId}
          onChange={(event) => {
            setTimeUnitId(event.target.value);
            callOnChange();
          }}
        >
          {TimeUnits.map((timeUnit) => (
            <MenuItem key={timeUnit.id} value={timeUnit.id}>
              {timeInUnits === 1 ? timeUnit.singular : timeUnit.plural}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
