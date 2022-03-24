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
const katex = require("katex")


const renderer = new marked.Renderer()
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
    // Every new line in markdown is considered a new paragraph, this prevents img tags from being wrapped <p> tags
  // which is helpful for resizing the first img, centering captions, etc.
  if (text.startsWith("<img")) {
    return text + "\n";
  }
  return "<p>" + text + "</p>";
}

function renderMathsExpression(expr) {
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
    html = html.replace(/class="katex"/g, 'class="katex" style="font-size: inherit;"')
    if (displayStyle && html) {
      html = html.replace(/class="katex"/g, 'class="katex katex-block" style="display: block; font-size: inherit;"')
    }
    return html
  } else {
    return null
  }
}
marked.setOptions({ renderer: renderer })

// marked.Renderer.prototype.paragraph = (text) => {
//   if (text.startsWith("<img")) {
//     return text + "\n";
//   }
//   return "<p>" + text + "</p>";
// };
const dirPath = `./content/blog`;
export const posts = fs.readdirSync(dirPath).map((postFilename) => {
  const postContent = fs.readFileSync(dirPath + `/${postFilename}`, {
    encoding: "utf8",
  });
  const postFrontMatter = frontMatter(postContent);
  let post = postFrontMatter.attributes
  post.html = marked(postFrontMatter.body).replace(/^\t{3}/gm, "")
  return post
});

export const cards = JSON.parse(JSON.stringify(posts)).map(p => {
  delete p.html
  return p
});

