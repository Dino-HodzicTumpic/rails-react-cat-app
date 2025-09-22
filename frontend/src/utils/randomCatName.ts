import { catNames } from "../data/catNames";

export const randomCatName = (): string => {
  return catNames[Math.floor(Math.random() * catNames.length)];
};
