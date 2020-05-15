import * as React from "react";
import * as PropTypes from "prop-types";

import { Text } from "@inlet/react-pixi";
import { myPos, buttonTextStyle, getCardHeight } from "../pixiStyles";

type DiscardsButtonProp = {
  onDiscards: () => void;
};
export const DiscardsButton: React.FC<DiscardsButtonProp> = (
  props: DiscardsButtonProp
) => {
  return (
    <React.Fragment>
      <Text
        text="捨てるカードを確定して宣言する"
        buttonMode={true}
        interactive={true}
        pointerdown={(): void => {
          props.onDiscards();
        }}
        x={myPos().x}
        y={myPos().y + getCardHeight()}
        // typescriptのエラーが出る
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        style={buttonTextStyle}
      />
    </React.Fragment>
  );
};

DiscardsButton.propTypes = {
  onDiscards: PropTypes.func.isRequired,
};
