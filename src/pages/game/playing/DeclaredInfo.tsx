import * as React from "react";
import * as PropTypes from "prop-types";

import { CardSprite } from "../../../components/CardSprite";
import {
  myPos,
  getCardWidth,
  stageSize,
  declarationTextStyle,
  getCardHeight,
} from "../pixiStyles";
import { Text, Graphics } from "@inlet/react-pixi";
import { Declaration } from "../../../domain/Declaration";
import { suitToLabel } from "../../../value_labels/SuiteValueLabels";
import { trumpToLabel } from "../../../value_labels/TrumpValueLabels";

type DiscardsProp = {
  declaration: Declaration;
};

export const DeclaredInfo: React.FC<DiscardsProp> = (props: DiscardsProp) => {
  const declaration = props.declaration;
  const [discard1, discard2] = declaration.discards;

  const trumpLabel = trumpToLabel(declaration.trump);
  const suitLabel = suitToLabel(declaration.aideCard.suit);

  const tatiLabel = `たち: ${trumpLabel}  ${declaration.faceCardNumber}`;
  const aideLabel = `副官: ${suitLabel}  ${declaration.aideCard.number}`;

  const draw = React.useCallback((g) => {
    g.clear();
    g.beginFill(0xffffff, 1);
    g.drawRect(0, 0, 140, 40);
    g.endFill();
  }, []);

  const cardWidth = getCardWidth();
  const cardHeight = getCardHeight();

  const centerX = stageSize.x - cardWidth;
  const x1 = centerX;
  const x2 = centerX - cardWidth;
  const y = myPos().y;

  const declarationY = y + cardHeight / 2;
  return (
    <React.Fragment>
      <CardSprite isDown={discard1.isFaceCard()} card={discard1} x={x1} y={y} />
      <CardSprite isDown={discard2.isFaceCard()} card={discard2} x={x2} y={y} />
      <Graphics x={x2} y={declarationY} draw={draw} />
      <Text
        text={tatiLabel + "\n" + aideLabel}
        x={x2}
        y={declarationY}
        // typescriptのエラーが出る
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        style={declarationTextStyle}
      />
    </React.Fragment>
  );
};

DeclaredInfo.propTypes = {
  declaration: PropTypes.instanceOf(Declaration),
};
