import * as React from "react";
import * as PropTypes from "prop-types";

import { TextField } from "@material-ui/core";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableSeat: {
      margin: theme.spacing(1),
    },
  })
);

const NO_USER = "名前を入力";
export const TableSeat: React.FC<{
  name: string;
  disabled: boolean;
  onChange: (text: string) => void;
}> = (props) => {
  const classes = useStyles();
  const name = props.name || "";
  // FIXME: 席を外したときにvalueが管理できていないので入力値が残る
  // label廃止でvalue管理?
  // TODO: 同時にフォーカスして座ったとき
  // label廃止でvalue管理?
  return (
    <div className={classes.tableSeat}>
      <TextField
        label={name || NO_USER}
        variant="outlined"
        disabled={props.disabled}
        onChange={(event): void => {
          props.onChange(event.target.value);
        }}
      />
    </div>
  );
};

TableSeat.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
