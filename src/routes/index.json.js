import posts from "./blog/_posts.js";
import { prettyDate } from "../utils/date.js";

const contents = JSON.stringify(
  posts
    .filter((p) => p.prod)
    .map((post) => {
      return {
        title: post.title,
        slug: post.slug,
        emoji: post.emoji,
        type: post.type,
        tags: post.tags,
        link: post.link,
        blurb: post.blurb,
        timestamp: post.date,
        date: prettyDate(post.date),
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
