import {cards} from "./blog/_posts.js";
import { prettyDate, prettyFullDate } from "../utils/date.js";

const contents = JSON.stringify(
  cards
    .filter((p) => p.prod)
    .map((post) => {
      post.timestamp = post.date
      post.fullDate = prettyFullDate(post.date)
      post.date = prettyDate(post.date)
      return post
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
