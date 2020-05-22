import * as React from "react";
import * as PropTypes from "prop-types";

import { Button } from "@material-ui/core";

import { orderedSeatNames } from "../../domain/SeatName";
import * as storage from "../../localStorage/localStorage";
import { MyGameState } from "../../ducks/my_game/state";

type DebugSwitchSeatProp = {
  gameTableId: number;
};
export const DebugSwitchSeat: React.FC<DebugSwitchSeatProp> = ({
  gameTableId,
}) => {
  /* Debug中のみ表示 */
  if (!process.env.IS_DEV) {
    return null;
  }
  return (
    <React.Fragment>
      {orderedSeatNames.map((seatName, i) => {
        return (
          <Button
            key={i}
            onClick={(): void => {
              storage.setMyGame(
                new MyGameState({ gameTableId, mySeatName: seatName })
              );
              location.reload();
            }}
          >
            {i + 1}
          </Button>
        );
      })}
    </React.Fragment>
  );
};

DebugSwitchSeat.propTypes = {
  gameTableId: PropTypes.number.isRequired,
};
