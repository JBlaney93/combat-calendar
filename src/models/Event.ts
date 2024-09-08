import { Fight } from "./Fight";

export type Event = {
    id: string;
    title: string;
    date: string;
    link: string;
    fights: Fight[];
  };