// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.
const fs = require("fs");
const frontMatter = require("front-matter");
const marked = require("marked");

const posts = fs.readdirSync("./content").map((postFilename) => {
  const postContent = fs.readFileSync(`./content/${postFilename}`, {
    encoding: "utf8",
  });
  const postFrontMatter = frontMatter(postContent);
  
  return {
    title: postFrontMatter.attributes.title,
    slug: postFrontMatter.attributes.slug,
    emoji: postFrontMatter.attributes.emoji,
    blurb: postFrontMatter.attributes.blurb,
    tags: postFrontMatter.attributes.tags,
    link: postFrontMatter.attributes.link,
    date: postFrontMatter.attributes.date,
    prod: postFrontMatter.attributes.prod,
    collaborators: postFrontMatter.attributes.collaborators,
    html: marked(postFrontMatter.body).replace(/^\t{3}/gm, "")
  };
});


export default posts;