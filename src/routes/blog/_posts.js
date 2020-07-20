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

// Every new line in markdown is considered a new paragraph, this prevents img tags from being wrapped <p> tags
// which is helpful for resizing the first img, centering captions, etc.
marked.Renderer.prototype.paragraph = (text) => {
  if (text.startsWith("<img")) {
    return text + "\n";
  }
  return "<p>" + text + "</p>";
};
const dirPath = `./content/blog`;
const posts = fs.readdirSync(dirPath).map((postFilename) => {
  const postContent = fs.readFileSync(dirPath+`/${postFilename}`, {
    encoding: "utf8",
  });
  const postFrontMatter = frontMatter(postContent);

  return {
    title: postFrontMatter.attributes.title,
    slug: postFrontMatter.attributes.slug,
    emoji: postFrontMatter.attributes.emoji,
    blurb: postFrontMatter.attributes.blurb,
    type: postFrontMatter.attributes.type,
    tags: postFrontMatter.attributes.tags,
    link: postFrontMatter.attributes.link,
    date: postFrontMatter.attributes.date,
    prod: postFrontMatter.attributes.prod,
    collaborators: postFrontMatter.attributes.collaborators,
    html: marked(postFrontMatter.body).replace(/^\t{3}/gm, ""),
  };
});

export default posts;
