import { TextStyle } from "pixi.js";

export const stageSize = {
  x: 800,
  y: 600,
};

const center = { x: stageSize.x / 2, y: stageSize.y / 2 };

const nameHeight = 22;
export const getCardHeight = (scale = 1): number => 170 * scale;
export const getCardWidth = (scale = 1): number => 120 * scale;

export const faceCardGapHeight = (scale = 1): number => 40 * scale;
export const handGapWidth = (scale = 1): number => 40 * scale;

const handsWith = (scale = 1): number => {
  const cardWidth = getCardWidth(scale);
  const perCardWidth = handGapWidth(scale);
  return 1 * cardWidth + 9 * perCardWidth;
};

export const myPos = (scale = 1): Pos => ({
  x: 0,
  y: stageSize.y - getCardHeight(scale) - nameHeight,
});

const frontGapWidth = 50;
const frontPos = (scale = 1): { handsWith: number; y: number } => {
  return {
    handsWith: handsWith(scale),
    y: 0 + faceCardGapHeight(scale),
  };
};
export const frontLeftPos = (scale = 1): Pos => {
  const front = frontPos(scale);
  return {
    x: center.x - frontGapWidth - front.handsWith,
    y: front.y,
  };
};
export const frontRightPos = (scale = 1): Pos => {
  const front = frontPos(scale);
  return {
    x: center.x + frontGapWidth,
    y: front.y,
  };
};
const neighborY = (scale = 1): number => {
  const myPosY = myPos(scale).y;
  const frontY = frontPos(scale).y;
  const center = (myPosY + frontY) / 2 - getCardHeight(scale);
  return center + faceCardGapHeight(scale);
};
export const leftPos = (scale = 1): Pos => {
  return {
    x: 0,
    y: neighborY(scale),
  };
};
export const rightPos = (scale = 1): Pos => {
  return {
    x: stageSize.x - handsWith(scale),
    y: neighborY(scale),
  };
};
type Pos = {
  x: number;
  y: number;
};

export const fieldCenter = {
  x: (scale = 1): number => center.x - getCardWidth(scale) / 2,
  y: (scale = 1): number => center.y - getCardHeight(scale) - nameHeight,
};

export const nameStyle = new TextStyle({
  fontSize: 16,
  fill: ["#ffffff"],
});

export const buttonTextStyle = new TextStyle({
  fontSize: 16,
  stroke: "#4a1850",
  strokeThickness: 5,
  fill: ["#ffffff"],
});
