import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import { allCsCourseNames } from "../../utils/data";
import { httpPost } from "../../utils/http-client";

type CreateCourseDialogProps = {
  open: boolean;
  coursesCount: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateCoursesCount: React.Dispatch<React.SetStateAction<number>>;
};

const useStyles = makeStyles(() => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  formControl: {
    width: "100%",
  },
}));

export default function CreateCourseDialog({
  open,
  coursesCount,
  setOpen,
  updateCoursesCount,
}: CreateCourseDialogProps) {
  const [courseNames, setCourseNames] = useState<string[]>([]);
  const { teamId } = useParams();
  const classes = useStyles();

  function resetState() {
    setCourseNames([]);
  }

  function closeDialog() {
    setOpen(false);
    resetState();
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCourseNames(event.target.value as string[]);
  };

  async function createCourse() {
    try {
      const body = { courseNames };
      const response = await httpPost(`/api/teams/${teamId}/courses`, body, true);
      closeDialog();
      if (response.status === 201) {
        coursesCount += 1;
        updateCoursesCount(coursesCount);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeDialog}
        aria-labelledby="create-course-dialog-title"
      >
        <DialogTitle id="create-course-dialog-title">Add Modules</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="mutiple-chip-label">Select your modules</InputLabel>
            <Select
              labelId="mutiple-chip-label"
              id="mutiple-chip"
              multiple
              value={courseNames}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {allCsCourseNames.map((name, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={false} onClick={createCourse}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}