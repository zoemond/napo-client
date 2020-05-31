import * as React from "react";
import * as PropTypes from "prop-types";

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  RadioGroup,
  DialogContent,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import Card from "../../../domain/Card";
import { Trump } from "../../../domain/Trump";
import { suitValueLabels } from "../../../value_labels/SuiteValueLabels";
import { trumpValueLabels } from "../../../value_labels/TrumpValueLabels";
import { Suit } from "../../../domain/Suit";

const range = (start: number, end: number): number[] =>
  [...Array(end - start + 1)].map((_, i) => start + i);

const faceCardNumbers = range(13, 20);
const numbers = range(1, 13);
const allCards = numbers.reduce((cards, number) => {
  return cards.concat(
    suitValueLabels.map((suit) => {
      return { card: new Card(suit.value, number), label: suit.label + number };
    })
  );
}, []);

const mightyNumber = 14;
const jackNumber = 15;
const oppositeJackNumber = 16;
const mighty = { card: new Card("spade", mightyNumber), label: "マイティー" };
const jack = { card: new Card("spade", jackNumber), label: "ジャック" };
const oppositeJack = {
  card: new Card("spade", oppositeJackNumber),
  label: "裏ジャック",
};
oppositeJack;

const oppositeSuit = (suit: Suit): Suit => {
  switch (suit) {
    case "club":
      return "spade";
    case "spade":
      return "club";
    case "diamond":
      return "heart";
    case "heart":
      return "diamond";
  }
};

const aides = [mighty, jack, oppositeJack].concat(allCards);

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      display: "flex",
    },
  })
);

type DeclareDialogProp = {
  onClose: ({ trump: Trump, faceCardNumber: number, aideCard: Card }?) => void;
  open: boolean;
};
export const DeclareDialog: React.FC<DeclareDialogProp> = (
  props: DeclareDialogProp
) => {
  const { onClose, open } = props;
  const [trump, setTrump] = React.useState(trumpValueLabels[0].value);
  const handleTrump = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setTrump(value as Trump);
  };

  const [faceCardNumber, setFaceCardNumber] = React.useState(
    faceCardNumbers[0]
  );
  const handleFaceCard = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setFaceCardNumber(parseInt(value));
  };

  const [aide, setAide] = React.useState(aides[0].card.toStr());
  const handleAide = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setAide(value);
  };

  const convertAideAlias = (card: Card): Card => {
    if (card.number === mightyNumber) {
      return new Card("spade", 1);
    }
    if (card.number === jackNumber) {
      if (trump === "no_trump") {
        throw new Error("ノートラは正ジャック指名できません");
      }
      return new Card(trump, 11);
    }
    if (card.number === oppositeJackNumber) {
      if (trump === "no_trump") {
        throw new Error("ノートラは裏ジャック指名できません");
      }
      return new Card(oppositeSuit(trump), 11);
    }
    return card;
  };
  const handleOk = (): void => {
    const aideCard = Card.fromStr(aide);
    onClose({
      trump,
      faceCardNumber,
      aideCard: convertAideAlias(aideCard),
    });
  };
  const handleCancel = (): void => {
    onClose({
      trump: null,
      faceCardNumber: 0,
      aideCard: null,
    });
  };

  const classes = useStyles();
  return (
    <Dialog open={open}>
      <DialogTitle>宣言</DialogTitle>
      <DialogContent className={classes.content} dividers>
        <RadioGroup value={trump} onChange={handleTrump}>
          {trumpValueLabels.map((trumpValueLabel) => {
            const value = trumpValueLabel.value;
            return (
              <FormControlLabel
                value={value}
                key={value}
                control={<Radio />}
                label={trumpValueLabel.label}
              />
            );
          })}
        </RadioGroup>
        <RadioGroup value={faceCardNumber} onChange={handleFaceCard}>
          {faceCardNumbers.map((n) => (
            <FormControlLabel value={n} key={n} control={<Radio />} label={n} />
          ))}
        </RadioGroup>
        <RadioGroup value={aide} onChange={handleAide}>
          {aides.map((a) => {
            const value = a.card.toStr();
            const isJackAlias = [jackNumber, oppositeJackNumber].includes(
              a.card.number
            );
            return (
              <FormControlLabel
                disabled={trump === "no_trump" && isJackAlias}
                value={value}
                key={value}
                control={<Radio />}
                label={a.label}
              />
            );
          })}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeclareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
