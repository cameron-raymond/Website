// This file is called `_about.js` rather than `about.js`, because
// we don't want to create an `/blog/overview` route — the leading

import renderMathInElement from "katex/dist/contrib/auto-render";

// underscore tells Sapper not to do that.
const fs = require("fs");
const frontMatter = require("front-matter");

const marked = require("marked");
const katex = require("katex")


const renderer = new marked.Renderer()
let originParagraph = renderer.paragraph.bind(renderer)
renderer.paragraph = (text) => {
  const blockRegex = /\$\$[^\$]*\$\$/g
  const inlineRegex = /\$[^\$]*\$/g
  let blockExprArray = text.match(blockRegex)
  let inlineExprArray = text.match(inlineRegex)
  for (let i in blockExprArray) {
    const expr = blockExprArray[i]
    const result = renderMathsExpression(expr)
    text = text.replace(expr, result)
  }
  for (let i in inlineExprArray) {
    const expr = inlineExprArray[i]
    const result = renderMathsExpression(expr)
    text = text.replace(expr, result)
  }
  return originParagraph(text)
}
function renderMathsExpression (expr) {
  if (expr[0] === '$' && expr[expr.length - 1] === '$') {
    let displayStyle = false
    expr = expr.substr(1, expr.length - 2)
    if (expr[0] === '$' && expr[expr.length - 1] === '$') {
      displayStyle = true
      expr = expr.substr(1, expr.length - 2)
    }
    let html = null
    try {
      html = katex.renderToString(expr)
    } catch (e) {
      console.err(e)
    }
    if (displayStyle && html) {
      html = html.replace(/class="katex"/g, 'class="katex katex-block" style="display: block;"')
    }
    return html
  } else {
    return null
  }
}
marked.setOptions({renderer: renderer})

const dirPath = `./static/content/about`;

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

const booklistContent = fs.readFileSync(`${dirPath}/booklist.md`, {
  encoding: "utf8",
});
const booklistContentFrontMatter = frontMatter(booklistContent);
let b = booklistContentFrontMatter.attributes;
b.html =  marked(booklistContentFrontMatter.body).replace(/^\t{3}/gm, "");
export const booklist = b;