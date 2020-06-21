import React from "react";
import { makeStyles, CardHeader, Typography } from "@material-ui/core";

import CreateTaskButton from "./CreateTaskButton";

type ColumnHeaderProps = {
  id: number;
  title: string;
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

export default function ColumnHeader(props: ColumnHeaderProps) {
  const { id, title } = props;
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.header}
      title={<Typography variant="subtitle2">{title}</Typography>}
      action={
        <div>
          <CreateTaskButton columnId={id} />
        </div>
      }
    />
  );
}