// This file is called `_about.js` rather than `about.js`, because
// we don't want to create an `/blog/overview` route — the leading
// underscore tells Sapper not to do that.
const fs = require("fs");
const frontMatter = require("front-matter");

const marked = require("marked");

const dirPath = `./content/about`;

const introContent = fs.readFileSync(`${dirPath}/intro.md`, {
  encoding: "utf8",
});
const introFrontMatter = frontMatter(introContent);
let i = introFrontMatter.attributes;
i.html =  marked(introFrontMatter.body).replace(/^\t{3}/gm, "");
export const intro = i;

const bcontent = fs.readFileSync(`${dirPath}/bottom-content.md`, {
    encoding: "utf8",
  });
const contentFrontMatter = frontMatter(bcontent);
let c = contentFrontMatter.attributes;
c.html =  marked(contentFrontMatter.body).replace(/^\t{3}/gm, "");
export const content = c;