import { TextStyle } from "pixi.js";

export const stageSize = {
  x: 800,
  y: 600,
};

const center = { x: stageSize.x / 2, y: stageSize.y / 2 };

const cardHight = 212;
const cardWidth = 150;

const nameHeight = 22;

const handY = stageSize.y - cardHight - nameHeight;
export const myPos = {
  nameX: 0,
  nameY: stageSize.y - nameHeight,
  handY,
  playCardX: center.x - cardWidth / 2,
  playCardY: handY - cardHight,
};
export const leftPos = {
  x: 0,
  y: myPos.handY - 50, // 下の手札とある程度離す
};
export const frontLeftPos = {
  x: leftPos.x + cardWidth + 50, // 横の手札とある程度離す,
  y: 0 + cardHight + nameHeight,
};
export const rightPos = {
  x: stageSize.x - cardWidth,
  y: myPos.handY - 50, // 下の手札とある程度離す
};
export const frontRightPos = {
  x: rightPos.x - cardWidth - 50, // 横の手札とある程度離す
  y: 0 + cardHight + nameHeight,
};

export const openPos = {
  open1: {
    x: center.x - cardWidth / 2 - 40,
    y: center.y - cardHight,
  },
  open2: {
    x: center.x - cardWidth / 2 + 40,
    y: center.y - cardHight,
  },
};

export const nameStyle = new TextStyle({
  fontSize: 16,
  fill: ["#ffffff"],
});
