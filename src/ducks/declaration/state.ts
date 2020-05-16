import { Declaration } from "../../domain/Declaration";
import Card from "../../domain/Card";

const initialDeclaration = new Declaration(
  0,
  "no_trump",
  "fifth_seat",
  new Card("spade", 0)
);
export class DeclarationState {
  declaration: Declaration = initialDeclaration;
}
