import * as React from "react";
import * as PropTypes from "prop-types";

import { Text } from "@inlet/react-pixi";
import { myPos, buttonTextStyle, getCardHeight } from "../pixiStyles";

type DeclarationStartButtonProp = {
  onClick: () => void;
};
export const DeclarationStartButton: React.FC<DeclarationStartButtonProp> = (
  props: DeclarationStartButtonProp
) => {
  return (
    <React.Fragment>
      <Text
        text="たつ確定"
        buttonMode={true}
        interactive={true}
        pointerdown={(): void => {
          props.onClick();
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

DeclarationStartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
