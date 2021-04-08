'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs$2 = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

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
  const postContent = fs.readFileSync(dirPath + `/${postFilename}`, {
    encoding: "utf8",
  });
  const postFrontMatter = frontMatter(postContent);
  let post = postFrontMatter.attributes;
  post.html = marked(postFrontMatter.body).replace(/^\t{3}/gm, "");
  return post
});

const cards =  JSON.parse(JSON.stringify(posts)).map(p => {
  delete p.html;
  return p
});

let prettyDate = (date) => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  return mo == "May" ? `${mo} ${ye}` : `${mo}. ${ye}`;
};

let prettyFullDate = (date) => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "numeric" }).format(d);
  return mo == "May" ? `${mo} ${da}, ${ye}` : `${mo}. ${da}, ${ye}`;
};

const contents = JSON.stringify(
  cards
    .filter((p) => p.prod)
    .map((post) => {
      post.timestamp = post.date;
      post.fullDate = prettyFullDate(post.date);
      post.date = prettyDate(post.date);
      return post
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
);

function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get
});

// sitemap.xml.js

const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://cameronraymond.me</loc>
    </url>
    <url>
        <loc>https://cameronraymond.me/about/</loc>
    </url>
    <url>
        <loc>https://cameronraymond.me/blog/</loc>
    </url>
    ${posts
      .filter((post) => post.slug && post.prod)
      .map((post) => {
        return `<url>
                 <loc>${
                   `https://cameronraymond.me/blog/${post.slug}/`
                 }</loc>
            </url>`;
      })
      .join("")}
    </urlset>
`;

async function get$1(req, res) {
  // The important thing for you to know about this is that
  // this get request returns a list of stringified json objects.
  res.writeHead(200, {
    "Content-Type": "application/xml",
  });
  res.end(render(posts));
}

var route_1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get$1
});

// This file is called `_about.js` rather than `about.js`, because
// we don't want to create an `/blog/overview` route — the leading
// underscore tells Sapper not to do that.
const fs$1 = require("fs");
const frontMatter$1 = require("front-matter");

const marked$1 = require("marked");

const dirPath$1 = `./content/about`;

const introContent = fs$1.readFileSync(`${dirPath$1}/intro.md`, {
  encoding: "utf8",
});
const introFrontMatter = frontMatter$1(introContent);
let i = introFrontMatter.attributes;
i.html =  marked$1(introFrontMatter.body).replace(/^\t{3}/gm, "");
const intro = i;

const bcontent = fs$1.readFileSync(`${dirPath$1}/bottom-content.md`, {
    encoding: "utf8",
  });
const contentFrontMatter = frontMatter$1(bcontent);
let c = contentFrontMatter.attributes;
c.html =  marked$1(contentFrontMatter.body).replace(/^\t{3}/gm, "");
const content = c;

const contents$1 = JSON.stringify(content);
function get$2(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(contents$1);
}

var route_2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get$2
});

const contents$2 = JSON.stringify(intro);
function get$3(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(contents$2);
}

var route_3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get$3
});

const lookup = new Map();
posts.forEach((post) => {
  post.date = prettyFullDate(post.date);
  lookup.set(post.slug, JSON.stringify(post));
});

function get$4(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  if (lookup.has(slug)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}

var route_4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get$4
});

function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/components/Emoji.svelte generated by Svelte v3.32.2 */

const Emoji = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { label = "Emoji" } = $$props;
	let { symbol } = $$props;
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	if ($$props.symbol === void 0 && $$bindings.symbol && symbol !== void 0) $$bindings.symbol(symbol);
	return `<span role="${"img"}"${add_attribute("aria-label", label ? label : "", 0)}${add_attribute("aria-hidden", label ? "false" : "true", 0)}>${escape(symbol)}</span>`;
});

const  tagLabels = {
    rl: "Reinforcement Learning",
    gt: "Graph Theory",
    ml: "Machine Learning",
    nlp: "NLP",
    pl: "Politics",
  };

const typeLabels = {
  bp: "Blog Post",
  rp: "Research Paper",
  sp: "School Proj."
};

/* src/components/Tag.svelte generated by Svelte v3.32.2 */

const css = {
	code: "code.svelte-4q3zai{margin:0.2rem 0;margin-right:0.4rem;display:flex;flex-direction:row;align-items:center;height:1.2rem;padding:0 0.3rem;font-size:0.7rem;white-space:nowrap;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}img.svelte-4q3zai{height:0.85rem;width:0.85rem;margin:0.2rem 0.2rem 0 0}.tagLabel.svelte-4q3zai{text-transform:capitalize}@media(max-width: 40rem){code.svelte-4q3zai{font-size:0.6rem}img.svelte-4q3zai{height:0.6rem;width:0.6rem;margin-right:0.1rem}}",
	map: "{\"version\":3,\"file\":\"Tag.svelte\",\"sources\":[\"Tag.svelte\"],\"sourcesContent\":[\"<script>\\n  import { tagLabels, typeLabels } from \\\"../utils/tags.js\\\";\\n  export let tagId;\\n\\n  $: tagString = tagLabels[tagId] || typeLabels[tagId] ||tagId;\\n</script>\\n\\n<style>\\n  code {\\n    margin: 0.2rem 0;\\n    margin-right: 0.4rem;\\n    display: flex;\\n    flex-direction: row;\\n    align-items: center;\\n    height: 1.2rem;\\n    padding: 0 0.3rem;\\n    font-size: 0.7rem;\\n    white-space: nowrap;\\n    -webkit-touch-callout: none; /* iOS Safari */\\n    -webkit-user-select: none; /* Safari */\\n    -khtml-user-select: none; /* Konqueror HTML */\\n    -moz-user-select: none; /* Old versions of Firefox */\\n    -ms-user-select: none; /* Internet Explorer/Edge */\\n    user-select: none; /* Non-prefixed version, currently\\n                                  supported by Chrome, Edge, Opera and Firefox */\\n  }\\n  img {\\n    height: 0.85rem;\\n    width: 0.85rem;\\n    margin: 0.2rem 0.2rem 0 0;\\n  }\\n  .tagLabel {\\n    text-transform: capitalize;\\n  }\\n  @media (max-width: 40rem) {\\n    code {\\n      font-size: 0.6rem;\\n    }\\n    img {\\n      height: 0.6rem;\\n      width: 0.6rem;\\n      margin-right: 0.1rem;\\n    }\\n  }\\n</style>\\n\\n<code>\\n  <picture>\\n    <source srcset=\\\"tags/{tagId}.webp\\\" type=\\\"image/webp\\\" />\\n    <source srcset=\\\"tags/{tagId}.png\\\" type=\\\"image/png\\\" />\\n    <img src=\\\"tags/{tagId}.png\\\" alt={`${tagString} logo`} />\\n  </picture>\\n  <div class=\\\"tagLabel\\\">{tagString}</div>\\n</code>\\n\"],\"names\":[],\"mappings\":\"AAQE,IAAI,cAAC,CAAC,AACJ,MAAM,CAAE,MAAM,CAAC,CAAC,CAChB,YAAY,CAAE,MAAM,CACpB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,MAAM,CACd,OAAO,CAAE,CAAC,CAAC,MAAM,CACjB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,IAAI,CAC3B,mBAAmB,CAAE,IAAI,CACzB,kBAAkB,CAAE,IAAI,CACxB,gBAAgB,CAAE,IAAI,CACtB,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,IAAI,AAEnB,CAAC,AACD,GAAG,cAAC,CAAC,AACH,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,MAAM,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,AAC3B,CAAC,AACD,SAAS,cAAC,CAAC,AACT,cAAc,CAAE,UAAU,AAC5B,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,IAAI,cAAC,CAAC,AACJ,SAAS,CAAE,MAAM,AACnB,CAAC,AACD,GAAG,cAAC,CAAC,AACH,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MAAM,CACb,YAAY,CAAE,MAAM,AACtB,CAAC,AACH,CAAC\"}"
};

const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let tagString;
	let { tagId } = $$props;
	if ($$props.tagId === void 0 && $$bindings.tagId && tagId !== void 0) $$bindings.tagId(tagId);
	$$result.css.add(css);
	tagString = tagLabels[tagId] || typeLabels[tagId] || tagId;

	return `<code class="${"svelte-4q3zai"}"><picture><source srcset="${"tags/" + escape(tagId) + ".webp"}" type="${"image/webp"}">
    <source srcset="${"tags/" + escape(tagId) + ".png"}" type="${"image/png"}">
    <img src="${"tags/" + escape(tagId) + ".png"}"${add_attribute("alt", `${tagString} logo`, 0)} class="${"svelte-4q3zai"}"></picture>
  <div class="${"tagLabel svelte-4q3zai"}">${escape(tagString)}</div></code>`;
});

/* src/components/Card.svelte generated by Svelte v3.32.2 */

const css$1 = {
	code: ".card.svelte-1i867j9.svelte-1i867j9{display:flex;flex-direction:column;justify-content:space-between;align-items:center;margin:1rem;width:30rem;border:1px solid #d1d5da;border-radius:8px;transition:0.3s;overflow:hidden}p.svelte-1i867j9.svelte-1i867j9{text-align:left;padding:0 1.5rem 0 1.5rem;height:6rem;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical}.card.svelte-1i867j9.svelte-1i867j9:hover{transform:translatey(-0.5em);transition:0.3s;box-shadow:2px 10px 10px 2px rgba(0, 0, 0, 0.12)}.head.svelte-1i867j9.svelte-1i867j9{display:flex;align-self:stretch;flex-direction:row;justify-content:space-between;align-items:center;background-color:rgba(238, 238, 238, 0.5);height:4.6rem;padding:0.3rem 1.5rem 0.1rem 1.5rem;text-align:right}.head.svelte-1i867j9 .emoji.svelte-1i867j9{text-align:center;margin-right:1.5rem;font-size:0.7rem}.head.svelte-1i867j9 .title.svelte-1i867j9{text-align:right;font-size:0.7rem}.head.svelte-1i867j9 h4.svelte-1i867j9{font-size:initial;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.link.svelte-1i867j9.svelte-1i867j9{text-decoration:underline;text-decoration-color:rgb(255, 62, 0)}.foot.svelte-1i867j9.svelte-1i867j9{display:flex;flex-direction:row;align-self:stretch;justify-content:space-between;align-items:center;height:2rem;padding:0 0.5rem 0 1.5rem}.foot.svelte-1i867j9 span.svelte-1i867j9{display:flex;flex-wrap:wrap}@media(max-width: 40rem){.card.svelte-1i867j9.svelte-1i867j9{width:100vw;align-self:center;border-radius:0;margin:0rem;border:none;padding-bottom:1rem;box-shadow:0 0 0 0}.foot.svelte-1i867j9.svelte-1i867j9{height:1rem}p.svelte-1i867j9.svelte-1i867j9{height:initial}}",
	map: "{\"version\":3,\"file\":\"Card.svelte\",\"sources\":[\"Card.svelte\"],\"sourcesContent\":[\"<script>\\n  import Tag from \\\"./Tag.svelte\\\";\\n  import Emoji from \\\"./Emoji.svelte\\\";\\n  export let post;\\n  export let onHome;\\n</script>\\n\\n<style>\\n  .card {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: space-between;\\n    align-items: center;\\n    margin: 1rem;\\n    width: 30rem;\\n    border: 1px solid #d1d5da;\\n    border-radius: 8px;\\n    transition: 0.3s;\\n    overflow: hidden;\\n  }\\n  p {\\n    text-align: left;\\n    padding: 0 1.5rem 0 1.5rem;\\n    height: 6rem;\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n    display: -webkit-box;\\n    -webkit-line-clamp: 4; /* number of lines to show */\\n    -webkit-box-orient: vertical;\\n  }\\n  .card:hover {\\n    transform: translatey(-0.5em);\\n    transition: 0.3s;\\n    box-shadow: 2px 10px 10px 2px rgba(0, 0, 0, 0.12);\\n  }\\n\\n  .head {\\n    display: flex;\\n    align-self: stretch;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: center;\\n    background-color: rgba(238, 238, 238, 0.5);\\n    height: 4.6rem;\\n    padding: 0.3rem 1.5rem 0.1rem 1.5rem;\\n    text-align: right;\\n  }\\n  .head .emoji {\\n    text-align: center;\\n    margin-right: 1.5rem;\\n    font-size: 0.7rem;\\n  }\\n  .head .title {\\n    text-align: right;\\n    font-size: 0.7rem;\\n  }\\n\\n  .head h4 {\\n    font-size: initial;\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n    display: -webkit-box;\\n    -webkit-line-clamp: 2; /* number of lines to show */\\n    -webkit-box-orient: vertical;\\n  }\\n  .link {\\n    text-decoration: underline;\\n    text-decoration-color: rgb(255, 62, 0);\\n  }\\n  .foot {\\n    display: flex;\\n    flex-direction: row;\\n    align-self: stretch;\\n    justify-content: space-between;\\n    align-items: center;\\n    height: 2rem;\\n    padding: 0 0.5rem 0 1.5rem;\\n  }\\n  .foot span {\\n    display: flex;\\n    flex-wrap: wrap;\\n  }\\n\\n  @media (max-width: 40rem) {\\n    .card {\\n      width: 100vw;\\n      align-self: center;\\n      border-radius: 0;\\n      margin: 0rem;\\n      border: none;\\n      padding-bottom: 1rem;\\n      box-shadow: 0 0 0 0;\\n    }\\n    .foot {\\n      height: 1rem;\\n    }\\n    p {\\n      height: initial;\\n    }\\n  }\\n</style>\\n\\n<div class=\\\"card\\\">\\n  <div class=\\\"head\\\">\\n    <div class=\\\"emoji\\\">\\n      <h4>\\n        <Emoji symbol={post.emoji} />\\n      </h4>\\n      {#if post.link}\\n        <span class=\\\"link\\\">\\n          {@html post.link}\\n        </span>\\n      {/if}\\n    </div>\\n    <div class=\\\"title\\\">\\n      <h4>{post.title}</h4>\\n      {#if post.date}{post.date}{/if}\\n    </div>\\n  </div>\\n\\n  <p>\\n    {@html post.blurb}\\n  </p>\\n\\n  {#if post.tags || post.slug}\\n    <div class=\\\"foot\\\">\\n      {#if post.tags}\\n        <span>\\n          {#each [post.type,...post.tags] as tagId}\\n            <Tag {tagId} />\\n          {/each}\\n        </span>\\n      {/if}\\n      {#if post.slug}\\n        <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches\\n\\t\\t     the blog data when we hover over the link or tap it on a touchscreen -->\\n        <a\\n          rel=\\\"prefetch\\\"\\n          href=\\\"blog/{post.slug}/\\\"\\n          class=\\\"link\\\"\\n          on:click={() => (onHome = false)}>\\n          Read More\\n        </a>\\n      {/if}\\n    </div>\\n  {/if}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAQE,KAAK,8BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,QAAQ,CAAE,MAAM,AAClB,CAAC,AACD,CAAC,8BAAC,CAAC,AACD,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,MAAM,CAC1B,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,AAC9B,CAAC,AACD,mCAAK,MAAM,AAAC,CAAC,AACX,SAAS,CAAE,WAAW,MAAM,CAAC,CAC7B,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AACnD,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,OAAO,CACnB,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,MAAM,CAAE,MAAM,CACd,OAAO,CAAE,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CACpC,UAAU,CAAE,KAAK,AACnB,CAAC,AACD,oBAAK,CAAC,MAAM,eAAC,CAAC,AACZ,UAAU,CAAE,MAAM,CAClB,YAAY,CAAE,MAAM,CACpB,SAAS,CAAE,MAAM,AACnB,CAAC,AACD,oBAAK,CAAC,MAAM,eAAC,CAAC,AACZ,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,MAAM,AACnB,CAAC,AAED,oBAAK,CAAC,EAAE,eAAC,CAAC,AACR,SAAS,CAAE,OAAO,CAClB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,AAC9B,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,eAAe,CAAE,SAAS,CAC1B,qBAAqB,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,AACxC,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,MAAM,AAC5B,CAAC,AACD,oBAAK,CAAC,IAAI,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,CAAC,CAChB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CACZ,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AACrB,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,MAAM,CAAE,IAAI,AACd,CAAC,AACD,CAAC,8BAAC,CAAC,AACD,MAAM,CAAE,OAAO,AACjB,CAAC,AACH,CAAC\"}"
};

const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { post } = $$props;
	let { onHome } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	if ($$props.onHome === void 0 && $$bindings.onHome && onHome !== void 0) $$bindings.onHome(onHome);
	$$result.css.add(css$1);

	return `<div class="${"card svelte-1i867j9"}"><div class="${"head svelte-1i867j9"}"><div class="${"emoji svelte-1i867j9"}"><h4 class="${"svelte-1i867j9"}">${validate_component(Emoji, "Emoji").$$render($$result, { symbol: post.emoji }, {}, {})}</h4>
      ${post.link
	? `<span class="${"link svelte-1i867j9"}">${post.link}</span>`
	: ``}</div>
    <div class="${"title svelte-1i867j9"}"><h4 class="${"svelte-1i867j9"}">${escape(post.title)}</h4>
      ${post.date ? `${escape(post.date)}` : ``}</div></div>

  <p class="${"svelte-1i867j9"}">${post.blurb}</p>

  ${post.tags || post.slug
	? `<div class="${"foot svelte-1i867j9"}">${post.tags
		? `<span class="${"svelte-1i867j9"}">${each([post.type, ...post.tags], tagId => `${validate_component(Tag, "Tag").$$render($$result, { tagId }, {}, {})}`)}</span>`
		: ``}
      ${post.slug
		? `
        <a rel="${"prefetch"}" href="${"blog/" + escape(post.slug) + "/"}" class="${"link svelte-1i867j9"}">Read More
        </a>`
		: ``}</div>`
	: ``}</div>`;
});

/* src/components/PostFilter.svelte generated by Svelte v3.32.2 */

const css$2 = {
	code: "span.svelte-1d3imom{max-width:35rem;display:flex;flex-wrap:wrap}code.svelte-1d3imom{margin:0.2rem 0;margin-right:0.4rem;display:flex;flex-direction:row;align-items:center;height:1.2rem;padding:0 0.3rem;font-size:0.7rem;cursor:pointer;white-space:nowrap;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}h3.svelte-1d3imom{margin-top:0.5rem}.activeTags.svelte-1d3imom{background-color:#689dd1;color:white}img.svelte-1d3imom{height:0.85rem;width:0.85rem;margin:0.2rem 0.2rem 0 0}.tagLabel.svelte-1d3imom{text-transform:capitalize}@media(max-width: 40rem){code.svelte-1d3imom{font-size:0.6rem}img.svelte-1d3imom{height:0.6rem;width:0.6rem;margin-right:0.1rem}}",
	map: "{\"version\":3,\"file\":\"PostFilter.svelte\",\"sources\":[\"PostFilter.svelte\"],\"sourcesContent\":[\"<script>\\n  import { tagLabels, typeLabels } from \\\"../utils/tags.js\\\";\\n  export let tags = [];\\n  export let types = [];\\n  export let activeTypes = [];\\n  export let activeTags = [];\\n  let updateType = typeId => {\\n    activeTypes.has(typeId)\\n      ? activeTypes.delete(typeId)\\n      : activeTypes.add(typeId);\\n    activeTypes = activeTypes.size == 0 ? new Set(types) : activeTypes;\\n  };\\n  let updateTag = tagId => {\\n    activeTags.has(tagId) ? activeTags.delete(tagId) : activeTags.add(tagId);\\n    activeTags = activeTags.size == 0 ? new Set(tags) : activeTags;\\n  };\\n  let pluralize = label =>\\n    label.endsWith(\\\".\\\") ? label.slice(0, -1) + \\\"s.\\\" : label + \\\"s\\\";\\n</script>\\n\\n<style>\\n  span {\\n    max-width: 35rem;\\n    display: flex;\\n    flex-wrap: wrap;\\n  }\\n  code {\\n    margin: 0.2rem 0;\\n    margin-right: 0.4rem;\\n    display: flex;\\n    flex-direction: row;\\n    align-items: center;\\n    height: 1.2rem;\\n    padding: 0 0.3rem;\\n    font-size: 0.7rem;\\n    cursor: pointer;\\n    white-space: nowrap;\\n    -webkit-touch-callout: none; /* iOS Safari */\\n    -webkit-user-select: none; /* Safari */\\n    -khtml-user-select: none; /* Konqueror HTML */\\n    -moz-user-select: none; /* Old versions of Firefox */\\n    -ms-user-select: none; /* Internet Explorer/Edge */\\n    user-select: none; /* Non-prefixed version, currently\\n                                  supported by Chrome, Edge, Opera and Firefox */\\n  }\\n  h3 {\\n    margin-top: 0.5rem;\\n  }\\n\\n  .activeTags {\\n    background-color: #689dd1;\\n    color: white;\\n  }\\n  img {\\n    height: 0.85rem;\\n    width: 0.85rem;\\n    margin: 0.2rem 0.2rem 0 0;\\n  }\\n  .tagLabel {\\n    text-transform: capitalize;\\n  }\\n  @media (max-width: 40rem) {\\n    code {\\n      font-size: 0.6rem;\\n    }\\n    img {\\n      height: 0.6rem;\\n      width: 0.6rem;\\n      margin-right: 0.1rem;\\n    }\\n  }\\n</style>\\n\\n{#if tags && types}\\n  {#if types.length}\\n    <h3>Include</h3>\\n    <span>\\n      {#each types as typeId}\\n        <code\\n          class:activeTags={activeTypes.has(typeId)}\\n          on:click={() => updateType(typeId)}>\\n          <picture>\\n            <source srcset=\\\"tags/{typeId}.webp\\\" type=\\\"image/webp\\\" />\\n            <source srcset=\\\"tags/{typeId}.png\\\" type=\\\"image/png\\\" />\\n            <img\\n              src=\\\"tags/{typeId}.png\\\"\\n              alt={`${tagLabels[typeId] || typeId} logo`} />\\n          </picture>\\n          <div class=\\\"tagLabel\\\">\\n            {pluralize(typeLabels[typeId]) || pluralize(typeId)}\\n          </div>\\n        </code>\\n      {/each}\\n    </span>\\n  {/if}\\n  {#if tags.length}\\n    {#if types.length}\\n      <h3>About</h3>\\n    {:else}\\n      <h3>Include</h3>\\n    {/if}\\n    <span>\\n      {#each tags as tagId}\\n        <code\\n          class:activeTags={activeTags.has(tagId)}\\n          on:click={() => updateTag(tagId)}>\\n          <picture>\\n            <source srcset=\\\"tags/{tagId}.webp\\\" type=\\\"image/webp\\\" />\\n            <source srcset=\\\"tags/{tagId}.png\\\" type=\\\"image/png\\\" />\\n            <img\\n              src=\\\"tags/{tagId}.png\\\"\\n              alt={`${tagLabels[tagId] || tagId} logo`} />\\n          </picture>\\n          <div class=\\\"tagLabel\\\">{tagLabels[tagId] || tagId}</div>\\n        </code>\\n      {/each}\\n    </span>\\n  {/if}\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAqBE,IAAI,eAAC,CAAC,AACJ,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,IAAI,eAAC,CAAC,AACJ,MAAM,CAAE,MAAM,CAAC,CAAC,CAChB,YAAY,CAAE,MAAM,CACpB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,MAAM,CACd,OAAO,CAAE,CAAC,CAAC,MAAM,CACjB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,OAAO,CACf,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,IAAI,CAC3B,mBAAmB,CAAE,IAAI,CACzB,kBAAkB,CAAE,IAAI,CACxB,gBAAgB,CAAE,IAAI,CACtB,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,IAAI,AAEnB,CAAC,AACD,EAAE,eAAC,CAAC,AACF,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,WAAW,eAAC,CAAC,AACX,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,AACd,CAAC,AACD,GAAG,eAAC,CAAC,AACH,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,MAAM,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,AAC3B,CAAC,AACD,SAAS,eAAC,CAAC,AACT,cAAc,CAAE,UAAU,AAC5B,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,IAAI,eAAC,CAAC,AACJ,SAAS,CAAE,MAAM,AACnB,CAAC,AACD,GAAG,eAAC,CAAC,AACH,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MAAM,CACb,YAAY,CAAE,MAAM,AACtB,CAAC,AACH,CAAC\"}"
};

const PostFilter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { tags = [] } = $$props;
	let { types = [] } = $$props;
	let { activeTypes = [] } = $$props;
	let { activeTags = [] } = $$props;

	let pluralize = label => label.endsWith(".")
	? label.slice(0, -1) + "s."
	: label + "s";

	if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0) $$bindings.tags(tags);
	if ($$props.types === void 0 && $$bindings.types && types !== void 0) $$bindings.types(types);
	if ($$props.activeTypes === void 0 && $$bindings.activeTypes && activeTypes !== void 0) $$bindings.activeTypes(activeTypes);
	if ($$props.activeTags === void 0 && $$bindings.activeTags && activeTags !== void 0) $$bindings.activeTags(activeTags);
	$$result.css.add(css$2);

	return `${tags && types
	? `${types.length
		? `<h3 class="${"svelte-1d3imom"}">Include</h3>
    <span class="${"svelte-1d3imom"}">${each(types, typeId => `<code class="${["svelte-1d3imom", activeTypes.has(typeId) ? "activeTags" : ""].join(" ").trim()}"><picture><source srcset="${"tags/" + escape(typeId) + ".webp"}" type="${"image/webp"}">
            <source srcset="${"tags/" + escape(typeId) + ".png"}" type="${"image/png"}">
            <img src="${"tags/" + escape(typeId) + ".png"}"${add_attribute("alt", `${tagLabels[typeId] || typeId} logo`, 0)} class="${"svelte-1d3imom"}"></picture>
          <div class="${"tagLabel svelte-1d3imom"}">${escape(pluralize(typeLabels[typeId]) || pluralize(typeId))}</div>
        </code>`)}</span>`
		: ``}
  ${tags.length
		? `${types.length
			? `<h3 class="${"svelte-1d3imom"}">About</h3>`
			: `<h3 class="${"svelte-1d3imom"}">Include</h3>`}
    <span class="${"svelte-1d3imom"}">${each(tags, tagId => `<code class="${["svelte-1d3imom", activeTags.has(tagId) ? "activeTags" : ""].join(" ").trim()}"><picture><source srcset="${"tags/" + escape(tagId) + ".webp"}" type="${"image/webp"}">
            <source srcset="${"tags/" + escape(tagId) + ".png"}" type="${"image/png"}">
            <img src="${"tags/" + escape(tagId) + ".png"}"${add_attribute("alt", `${tagLabels[tagId] || tagId} logo`, 0)} class="${"svelte-1d3imom"}"></picture>
          <div class="${"tagLabel svelte-1d3imom"}">${escape(tagLabels[tagId] || tagId)}</div>
        </code>`)}</span>`
		: ``}`
	: ``}`;
});

/* src/components/Cards.svelte generated by Svelte v3.32.2 */

const css$3 = {
	code: "h2.svelte-26pfj0{margin-top:2rem;margin-bottom:3.5rem}.postFilter.svelte-26pfj0{margin-bottom:0.5rem}.cont.svelte-26pfj0{display:flex;flex:1;align-self:center;flex-direction:row;justify-content:space-evenly;align-items:flex-start;flex-wrap:wrap;margin:1rem;max-width:70em}.placeholder.svelte-26pfj0{visibility:hidden;width:30rem;height:0;margin-left:1rem;margin-right:1rem;border:1px solid #fff}@media(max-width: 40rem){h2.svelte-26pfj0{margin-bottom:2rem}.cont.svelte-26pfj0{flex-direction:column;justify-content:flex-start;align-items:center;margin-left:-2rem;margin-right:-2rem}.placeholder.svelte-26pfj0{display:none}}",
	map: "{\"version\":3,\"file\":\"Cards.svelte\",\"sources\":[\"Cards.svelte\"],\"sourcesContent\":[\"<script>\\n  import Card from \\\"./Card.svelte\\\";\\n  import PostFilter from \\\"./PostFilter.svelte\\\";\\n  import Emoji from \\\"./Emoji.svelte\\\";\\n  export let posts;\\n  export let onHome;\\n  // Two filters, types (blog posts, journal articles, etc.) and tags (ML, graph theory, etc.).\\n  let activeTypes = posts \\n    ? new Set([].concat(...posts.map(x => x.type)))\\n    : undefined;  \\n  let activeTags = posts \\n    ? new Set([].concat(...posts.map(x => x.tags)))\\n    : undefined;\\n  let tags = posts ? [...activeTags] : undefined;\\n  let types = posts ? [...activeTypes] : undefined;\\n  // Make a post visible if its type is set to visible and one of the tags are present.\\n  $: visible = posts.filter(post => post.tags.some(tag => activeTags.has(tag)) && activeTypes.has(post.type));\\n</script>\\n\\n<style>\\n  h2 {\\n    margin-top: 2rem;\\n    margin-bottom: 3.5rem;\\n  }\\n  .postFilter {\\n    margin-bottom: 0.5rem;\\n  }\\n  .cont {\\n    display: flex;\\n    flex: 1;\\n    align-self: center;\\n    flex-direction: row;\\n    justify-content: space-evenly;\\n    align-items: flex-start;\\n    flex-wrap: wrap;\\n    margin: 1rem;\\n    max-width: 70em;\\n  }\\n  .placeholder {\\n    visibility: hidden;\\n    width: 30rem;\\n    height: 0;\\n    margin-left: 1rem;\\n    margin-right: 1rem;\\n    border: 1px solid #fff;\\n  }\\n  @media (max-width: 40rem) {\\n    h2 {\\n      margin-bottom: 2rem;\\n    }\\n    .cont {\\n      flex-direction: column;\\n      justify-content: flex-start;\\n      align-items: center;\\n      margin-left: -2rem;\\n      margin-right: -2rem;\\n    }\\n    .placeholder {\\n      display: none;\\n    }\\n  }\\n</style>\\n\\n<h2 id=\\\"blog\\\">\\n  Check out my work\\n  <Emoji symbol=\\\"👨‍🔧\\\" />\\n</h2>\\n{#if tags}\\n  <PostFilter {tags} {types} bind:activeTags bind:activeTypes/>\\n{/if}\\n<span class=\\\"postFilter\\\" />\\n\\n{#if visible}\\n  <span class=\\\"cont\\\">\\n    {#each visible as post}\\n      <Card {post} bind:onHome />\\n    {/each}\\n    {#if visible.length % 2 != 0}\\n      <span class=\\\"placeholder\\\" />\\n    {/if}\\n  </span>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAoBE,EAAE,cAAC,CAAC,AACF,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,MAAM,AACvB,CAAC,AACD,WAAW,cAAC,CAAC,AACX,aAAa,CAAE,MAAM,AACvB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,CAC7B,WAAW,CAAE,UAAU,CACvB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AACxB,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,EAAE,cAAC,CAAC,AACF,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,KAAK,CAClB,YAAY,CAAE,KAAK,AACrB,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC\"}"
};

const Cards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let visible;
	let { posts } = $$props;
	let { onHome } = $$props;

	// Two filters, types (blog posts, journal articles, etc.) and tags (ML, graph theory, etc.).
	let activeTypes = posts
	? new Set([].concat(...posts.map(x => x.type)))
	: undefined;

	let activeTags = posts
	? new Set([].concat(...posts.map(x => x.tags)))
	: undefined;

	let tags = posts ? [...activeTags] : undefined;
	let types = posts ? [...activeTypes] : undefined;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	if ($$props.onHome === void 0 && $$bindings.onHome && onHome !== void 0) $$bindings.onHome(onHome);
	$$result.css.add(css$3);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;
		visible = posts.filter(post => post.tags.some(tag => activeTags.has(tag)) && activeTypes.has(post.type));

		$$rendered = `<h2 id="${"blog"}" class="${"svelte-26pfj0"}">Check out my work
  ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "👨‍🔧" }, {}, {})}</h2>
${tags
		? `${validate_component(PostFilter, "PostFilter").$$render(
				$$result,
				{ tags, types, activeTags, activeTypes },
				{
					activeTags: $$value => {
						activeTags = $$value;
						$$settled = false;
					},
					activeTypes: $$value => {
						activeTypes = $$value;
						$$settled = false;
					}
				},
				{}
			)}`
		: ``}
<span class="${"postFilter svelte-26pfj0"}"></span>

${visible
		? `<span class="${"cont svelte-26pfj0"}">${each(visible, post => `${validate_component(Card, "Card").$$render(
				$$result,
				{ post, onHome },
				{
					onHome: $$value => {
						onHome = $$value;
						$$settled = false;
					}
				},
				{}
			)}`)}
    ${visible.length % 2 != 0
			? `<span class="${"placeholder svelte-26pfj0"}"></span>`
			: ``}</span>`
		: ``}`;
	} while (!$$settled);

	return $$rendered;
});

/* src/components/HoC/LazyLoad.svelte generated by Svelte v3.32.2 */

const LazyLoad = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let el = null;
	let visible = false;
	let hasBeenVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(entries => {
				visible = entries[0].isIntersecting;
				hasBeenVisible = hasBeenVisible || visible;
			});

		observer.observe(el);
		return () => observer.unobserve(el);
	});

	return `<div${add_attribute("this", el, 1)}>${slots.default
	? slots.default({ visible, hasBeenVisible })
	: ``}</div>`;
});

/* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.32.2 */

const css$4 = {
	code: "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}",
	map: "{\"version\":3,\"file\":\"IconBase.svelte\",\"sources\":[\"IconBase.svelte\"],\"sourcesContent\":[\"<script>\\n  export let title = null;\\n  export let viewBox;\\n</script>\\n\\n<style>\\n  svg {\\n    stroke: currentColor;\\n    fill: currentColor;\\n    stroke-width: 0;\\n    width: 100%;\\n    height: auto;\\n    max-height: 100%;\\n  }  \\n</style>\\n\\n<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" {viewBox}>\\n  {#if title}\\n    <title>{title}</title>\\n  {/if}\\n  <slot />\\n</svg>\\n\"],\"names\":[],\"mappings\":\"AAME,GAAG,cAAC,CAAC,AACH,MAAM,CAAE,YAAY,CACpB,IAAI,CAAE,YAAY,CAClB,YAAY,CAAE,CAAC,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,AAClB,CAAC\"}"
};

const IconBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { title = null } = $$props;
	let { viewBox } = $$props;
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0) $$bindings.viewBox(viewBox);
	$$result.css.add(css$4);
	return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("viewBox", viewBox, 0)} class="${"svelte-c8tyih"}">${title ? `<title>${escape(title)}</title>` : ``}${slots.default ? slots.default({}) : ``}</svg>`;
});

/* node_modules/svelte-icons/fa/FaGithub.svelte generated by Svelte v3.32.2 */

const FaGithub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 496 512" }, $$props), {}, {
		default: () => `<path d="${"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaLinkedinIn.svelte generated by Svelte v3.32.2 */

const FaLinkedinIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 448 512" }, $$props), {}, {
		default: () => `<path d="${"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaMediumM.svelte generated by Svelte v3.32.2 */

const FaMediumM = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 512 512" }, $$props), {}, {
		default: () => `<path d="${"M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaTwitter.svelte generated by Svelte v3.32.2 */

const FaTwitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 512 512" }, $$props), {}, {
		default: () => `<path d="${"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaAngleDown.svelte generated by Svelte v3.32.2 */

const FaAngleDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 320 512" }, $$props), {}, {
		default: () => `<path d="${"M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaNewspaper.svelte generated by Svelte v3.32.2 */

const FaNewspaper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 576 512" }, $$props), {}, {
		default: () => `<path d="${"M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaPencilAlt.svelte generated by Svelte v3.32.2 */

const FaPencilAlt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 512 512" }, $$props), {}, {
		default: () => `<path d="${"M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"}"></path>`
	})}`;
});

/* node_modules/svelte-icons/fa/FaUser.svelte generated by Svelte v3.32.2 */

const FaUser = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 448 512" }, $$props), {}, {
		default: () => `<path d="${"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"}"></path>`
	})}`;
});

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

/* src/routes/index.svelte generated by Svelte v3.32.2 */

const css$5 = {
	code: ".cont.svelte-1jd95ya{position:relative;min-height:25rem;height:calc(100vh - 4em);width:calc(100vw - 4em)}.intro.svelte-1jd95ya{padding-left:1rem;padding-top:10rem;padding-right:8rem}@media(min-width: 400){h1.svelte-1jd95ya{font-size:4em}.intro.svelte-1jd95ya{padding-right:0rem}}.intro-svg.svelte-1jd95ya{position:absolute;bottom:0;right:-1rem;width:100%;max-width:42rem;min-width:35rem;overflow:hidden;z-index:-1}.down-arrow.svelte-1jd95ya{position:absolute;bottom:4rem;left:calc(50vw - 4em);color:rgb(255, 62, 0);height:2.5rem;width:2.5rem}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  export function preload({ params, query }) {\\n    return this.fetch(`index.json`)\\n      .then(r => r.json())\\n      .then(posts => {\\n        return { posts };\\n      });\\n  }\\n</script>\\n\\n<script>\\n  import Emoji from \\\"../components/Emoji.svelte\\\";\\n  import Cards from \\\"../components/Cards.svelte\\\";\\n  import LazyLoad from \\\"../components/HoC/LazyLoad.svelte\\\";\\n  import { FaAngleDown } from \\\"svelte-icons/fa\\\";\\n  import { fly, fade } from \\\"svelte/transition\\\";\\n  // When you click on the \\\"Read More\\\" section of a card, it sets onHome from\\n  // true to false and removes the intro content from the DOM\\n  let y;\\n  let onHome = true;\\n  export let posts;\\n</script>\\n\\n<style>\\n  .cont {\\n    position: relative;\\n    min-height: 25rem;\\n    height: calc(100vh - 4em);\\n    width: calc(100vw - 4em);\\n  }\\n  .intro {\\n    padding-left: 1rem;\\n    padding-top: 10rem;\\n    padding-right: 8rem;\\n  }\\n  @media (min-width: 400) {\\n    h1 {\\n      font-size: 4em;\\n    }\\n    .intro {\\n      padding-right: 0rem;\\n    }\\n  }\\n  .intro-svg {\\n    position: absolute;\\n    bottom: 0;\\n    right: -1rem;\\n    width: 100%;\\n    max-width: 42rem;\\n    min-width: 35rem;\\n    overflow: hidden;\\n    z-index: -1;\\n  }\\n  .down-arrow {\\n    position: absolute;\\n    bottom: 4rem;\\n    left: calc(50vw - 4em);\\n    color: rgb(255, 62, 0);\\n    height: 2.5rem;\\n    width: 2.5rem;\\n  }\\n</style>\\n\\n<svelte:window bind:scrollY={y} />\\n\\n<div class=\\\"cont\\\">\\n  <LazyLoad let:hasBeenVisible let:visible>\\n    {#if visible && onHome}\\n      <div class=\\\"intro\\\">\\n        <h1\\n          in:fly={{ y: 50, duration: 500 }}\\n          out:fly={{ delay: 50, y: 50, duration: 500 }}>\\n          Hello\\n          <Emoji symbol=\\\"👋\\\" />\\n        </h1>\\n        <p\\n          in:fly={{ delay: 300, y: 50, duration: 500 }}\\n          out:fly={{ y: 50, duration: 500 }}>\\n          I'm Cameron - a data scientist\\n          <Emoji symbol=\\\"📈\\\" />\\n          and graduate student\\n          <Emoji symbol=\\\"🧑‍💻\\\" />\\n          at the\\n          <a aria-label=\\\"University of Oxford\\\" href=\\\"http://www.ox.ac.uk/\\\">\\n            University of Oxford\\n          </a>\\n          <Emoji symbol=\\\"🏫🏯\\\" />\\n        </p>\\n        <p\\n          in:fly={{ delay: 350, y: 50, duration: 500 }}\\n          out:fly={{ y: 50, duration: 500 }}>\\n          Previously a research scientist at the University of Toronto's\\n          <a\\n            aria-label=\\\"University of Toronto\\\"\\n            href=\\\"http://csslab.cs.toronto.edu/\\\">\\n            Computational Social Science Lab\\n          </a>\\n        </p>\\n        <p\\n          in:fly={{ delay: 400, y: 50, duration: 500 }}\\n          out:fly={{ y: 50, duration: 500 }}>\\n          And an incoming research fellow at\\n          <a aria-label=\\\"Stanford Law School\\\" href=\\\"https://law.stanford.edu/\\\">\\n            Stanford Law School\\n          </a>\\n          <Emoji symbol=\\\"⚖️\\\" />\\n        </p>\\n      </div>\\n      <span\\n        in:fade={{ duration: 500, delay: 3000 }}\\n        out:fade={{ duration: 500 }}\\n        style=\\\"opacity: {1 - Math.max(0, y / 500)}\\\"\\n        class=\\\"down-arrow\\\">\\n        <FaAngleDown />\\n      </span>\\n    {/if}\\n  </LazyLoad>\\n\\n  <img\\n    src=\\\"intro.svg\\\"\\n    alt=\\\"\\\"\\n    class=\\\"intro-svg\\\"\\n    out:fade={{ duration: 100, delay: 100 }} />\\n</div>\\n<Cards {posts} bind:onHome />\\n<svelte:head>\\n  <title>🤯Cameron Raymond🤯</title>\\n\\n  <meta\\n    name=\\\"description\\\"\\n    content=\\\"Cameron Raymond is a data scientist and incoming graduate student\\n    at the University of Oxford. His broad areas of interest include network\\n    science, machine learning, and computational social science.\\\" />\\n  <meta\\n    name=\\\"keywords\\\"\\n    content=\\\"Cameron Raymond, University of Oxford, Oxford University, Data\\n    Science, Social Data Sience, Data Scientist\\\" />\\n  <link rel=\\\"canonical\\\" href=\\\"https://cameronraymond.me\\\" />\\n\\n  <!-- Open Graph / Facebook -->\\n  <meta property=\\\"og:type\\\" content=\\\"website\\\" />\\n  <meta property=\\\"og:url\\\" content=\\\"https://cameronraymond.me\\\" />\\n  <meta property=\\\"og:title\\\" content=\\\"🤯Cameron Raymond🤯\\\" />\\n  <meta\\n    name=\\\"og:description\\\"\\n    content=\\\"Cameron Raymond is a data scientist and incoming graduate student\\n    at the University of Oxford. His broad areas of interest include network\\n    science, machine learning, and computational social science.\\\" />\\n  <meta\\n    property=\\\"og:image\\\"\\n    content=\\\"https://cameronraymond.me/summary_large_image.png\\\" />\\n\\n  <!-- Twitter -->\\n  <meta property=\\\"twitter:card\\\" content=\\\"summary_large_image\\\" />\\n  <meta property=\\\"twitter:url\\\" content=\\\"https://cameronraymond.me\\\" />\\n  <meta property=\\\"twitter:title\\\" content=\\\"🤯Cameron Raymond🤯\\\" />\\n  <meta\\n    property=\\\"twitter:description\\\"\\n    content=\\\"Cameron Raymond is a data scientist and incoming graduate student\\n    at the University of Oxford.\\\" />\\n  <meta\\n    property=\\\"twitter:image\\\"\\n    content=\\\"https://cameronraymond.me/summary_large_image.png\\\" />\\n</svelte:head>\\n\"],\"names\":[],\"mappings\":\"AAwBE,KAAK,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACzB,KAAK,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,AAC1B,CAAC,AACD,MAAM,eAAC,CAAC,AACN,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,KAAK,CAClB,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,MAAM,AAAC,YAAY,GAAG,CAAC,AAAC,CAAC,AACvB,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,GAAG,AAChB,CAAC,AACD,MAAM,eAAC,CAAC,AACN,aAAa,CAAE,IAAI,AACrB,CAAC,AACH,CAAC,AACD,UAAU,eAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,KAAK,CAChB,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,EAAE,AACb,CAAC,AACD,WAAW,eAAC,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACtB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACtB,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MAAM,AACf,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`index.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let y;
	let onHome = true;
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$5);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `

<div class="${"cont svelte-1jd95ya"}">${validate_component(LazyLoad, "LazyLoad").$$render($$result, {}, {}, {
			default: ({ hasBeenVisible, visible }) => `${visible && onHome
			? `<div class="${"intro svelte-1jd95ya"}"><h1 class="${"svelte-1jd95ya"}">Hello
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "👋" }, {}, {})}</h1>
        <p>I&#39;m Cameron - a data scientist
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "📈" }, {}, {})}
          and graduate student
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "🧑‍💻" }, {}, {})}
          at the
          <a aria-label="${"University of Oxford"}" href="${"http://www.ox.ac.uk/"}">University of Oxford
          </a>
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "🏫🏯" }, {}, {})}</p>
        <p>Previously a research scientist at the University of Toronto&#39;s
          <a aria-label="${"University of Toronto"}" href="${"http://csslab.cs.toronto.edu/"}">Computational Social Science Lab
          </a></p>
        <p>And an incoming research fellow at
          <a aria-label="${"Stanford Law School"}" href="${"https://law.stanford.edu/"}">Stanford Law School
          </a>
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "⚖️" }, {}, {})}</p></div>
      <span style="${"opacity: " + escape(1 - Math.max(0, y / 500))}" class="${"down-arrow svelte-1jd95ya"}">${validate_component(FaAngleDown, "FaAngleDown").$$render($$result, {}, {}, {})}</span>`
			: ``}`
		})}

  <img src="${"intro.svg"}" alt="${""}" class="${"intro-svg svelte-1jd95ya"}"></div>
${validate_component(Cards, "Cards").$$render(
			$$result,
			{ posts, onHome },
			{
				onHome: $$value => {
					onHome = $$value;
					$$settled = false;
				}
			},
			{}
		)}
${($$result.head += `${($$result.title = `<title>🤯Cameron Raymond🤯</title>`, "")}<meta name="${"description"}" content="${"Cameron Raymond is a data scientist and incoming graduate student\n    at the University of Oxford. His broad areas of interest include network\n    science, machine learning, and computational social science."}"><meta name="${"keywords"}" content="${"Cameron Raymond, University of Oxford, Oxford University, Data\n    Science, Social Data Sience, Data Scientist"}"><link rel="${"canonical"}" href="${"https://cameronraymond.me"}"><meta property="${"og:type"}" content="${"website"}"><meta property="${"og:url"}" content="${"https://cameronraymond.me"}"><meta property="${"og:title"}" content="${"🤯Cameron Raymond🤯"}"><meta name="${"og:description"}" content="${"Cameron Raymond is a data scientist and incoming graduate student\n    at the University of Oxford. His broad areas of interest include network\n    science, machine learning, and computational social science."}"><meta property="${"og:image"}" content="${"https://cameronraymond.me/summary_large_image.png"}"><meta property="${"twitter:card"}" content="${"summary_large_image"}"><meta property="${"twitter:url"}" content="${"https://cameronraymond.me"}"><meta property="${"twitter:title"}" content="${"🤯Cameron Raymond🤯"}"><meta property="${"twitter:description"}" content="${"Cameron Raymond is a data scientist and incoming graduate student\n    at the University of Oxford."}"><meta property="${"twitter:image"}" content="${"https://cameronraymond.me/summary_large_image.png"}">`, "")}`;
	} while (!$$settled);

	return $$rendered;
});

/* src/routes/about/index.svelte generated by Svelte v3.32.2 */

const css$6 = {
	code: ".container.svelte-3y3qkx{display:flex;flex-direction:column;margin:auto;width:80vw;max-width:62em;margin-top:3.45rem}span.svelte-3y3qkx{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;overflow:hidden;margin-bottom:2rem}.intro.svelte-3y3qkx{padding-right:1rem;max-width:40em}img.svelte-3y3qkx{width:20rem;height:auto;object-fit:contain;overflow:hidden}img{width:100%\n  }ol{padding-left:0px;display:flex;flex-direction:row;justify-content:space-evenly;align-items:flex-start;flex-wrap:wrap;max-width:80em}h2{margin:1.5em 0 0.5em 0}li > ol{padding-left:20px;display:block}li{list-style-type:none}@media(max-width: 60rem){span.svelte-3y3qkx{margin-top:3rem;margin-left:0;margin-right:0;flex-direction:column-reverse;justify-content:flex-end;align-self:center;align-items:center}.intro.svelte-3y3qkx{padding-right:0}img.svelte-3y3qkx{margin-bottom:0.5rem}h2{margin:.75em 0 0.25em 0}ol{flex-direction:column;align-items:flex-start;justify-content:flex-start}}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  export async function preload({ params, query }) {\\n    const intro = await this.fetch(`about/intro.json`).then(r => r.json());\\n    const content = await this.fetch(`about/content.json`).then(r =>\\n      r.json()\\n    );\\n    return {intro, content };\\n  }\\n</script>\\n\\n<script>\\n  import { onMount, onDestroy } from \\\"svelte\\\";\\n  import { fly, fade } from \\\"svelte/transition\\\";\\n  import Emoji from \\\"../../components/Emoji.svelte\\\";\\n  let visible = false;\\n  export let intro;\\n  export let content;\\n\\n  onMount(() => {\\n    visible = true;\\n  });\\n</script>\\n\\n<style>\\n  .container {\\n    display: flex;\\n    flex-direction: column;\\n    margin: auto;\\n    width: 80vw;\\n    max-width: 62em;\\n    margin-top: 3.45rem;\\n  }\\n  span {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: flex-start;\\n    overflow: hidden;\\n    margin-bottom: 2rem;\\n  }\\n  .intro {\\n    padding-right: 1rem;\\n    max-width: 40em;\\n  }\\n  img {\\n    width: 20rem;\\n    height: auto;\\n    object-fit: contain;\\n    overflow: hidden;\\n  }\\n  :global(img){\\n      width: 100%\\n  }\\n  :global(ol) {\\n    padding-left: 0px;\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-evenly;\\n    align-items: flex-start;\\n    flex-wrap: wrap;\\n    max-width: 80em;\\n  }\\n  :global(h2){\\n      margin: 1.5em 0 0.5em 0;\\n  }\\n  :global(li > ol) {\\n    padding-left: 20px;\\n    display: block;\\n  }\\n  :global(li) {\\n    list-style-type: none;\\n  }\\n  @media (max-width: 60rem) {\\n    span {\\n      margin-top: 3rem;\\n      margin-left: 0;\\n      margin-right: 0;\\n      flex-direction: column-reverse;\\n      justify-content: flex-end;\\n      align-self: center;\\n      align-items: center;\\n    }\\n    .intro {\\n      padding-right: 0;\\n    }\\n    img {\\n      margin-bottom: 0.5rem;\\n    }\\n    :global(h2){\\n      margin: .75em 0 0.25em 0;\\n  }\\n    :global(ol) {\\n      flex-direction: column;\\n      align-items: flex-start;\\n      justify-content: flex-start;\\n    }\\n  }\\n</style>\\n\\n{#if visible}\\n  <div class=\\\"container\\\">\\n    <span>\\n      <div class=\\\"intro\\\">\\n        <h1\\n          in:fly={{ delay: 500, y: 50, duration: 500 }}\\n          out:fly={{ y: 50, duration: 300 }}>\\n          {intro.title}\\n          <Emoji symbol={intro.emoji} />\\n        </h1>\\n        <div\\n          in:fly={{ delay: 800, y: 50, duration: 500 }}\\n          out:fly={{ y: 50, duration: 300 }}>\\n          {@html intro.html}\\n        </div>\\n      </div>\\n      <picture\\n        rel=\\\"preload\\\"\\n        in:fade={{ delay: 600, duration: 200 }}\\n        out:fly={{ y: 50, duration: 100 }}>\\n        <source type=\\\"image/webp\\\" srcset=\\\"{intro.image}.webp\\\" />\\n        <source type=\\\"image/jpeg\\\" srcset=\\\"{intro.image}.png\\\" />\\n        <img src=\\\"{intro.image}.webp\\\" alt={intro.image} />\\n      </picture>\\n    </span>\\n    <div\\n      in:fade={{ delay: 1100, duration: 500 }}\\n      out:fly={{ y: 50, duration: 300 }}>\\n      {@html content.html}\\n    </div>\\n  </div>\\n{/if}\\n<svelte:head>\\n  <title>💭About - Cameron Raymond💭</title>\\n  <meta\\n    name=\\\"description\\\"\\n    content=\\\"Cameron Raymond is a 21 year old data scienist from Toronto,\\n    Ontario. In the fall he will be joining the University of Oxford to do his\\n    MSc in Social Data Science. His broad areas of interest include network\\n    science, machine learning, and computational social science.\\\" />\\n  <meta\\n    name=\\\"keywords\\\"\\n    content=\\\"Cameron Raymond, University of Oxford, Oxford University, Data\\n    Science, Social Data Sience, Data Scientist\\\" />\\n  <link rel=\\\"canonical\\\" href=\\\"https://cameronraymond.me/about/\\\" />\\n\\n  <!-- Open Graph / Facebook -->\\n  <meta property=\\\"og:type\\\" content=\\\"website\\\" />\\n  <meta property=\\\"og:url\\\" content=\\\"https://cameronraymond.me/about/\\\" />\\n  <meta property=\\\"og:title\\\" content=\\\"💭About - Cameron Raymond💭\\\" />\\n  <meta\\n    name=\\\"og:description\\\"\\n    content=\\\"Cameron Raymond is a 21 year old data scienist from Toronto,\\n    Ontario. In the fall he will be joining the University of Oxford to do his\\n    MSc in Social Data Science. His broad areas of interest include network\\n    science, machine learning, and computational social science.\\\" />\\n  <meta\\n    property=\\\"og:image\\\"\\n    content=\\\"https://cameronraymond.me/summary_about_large.png\\\" />\\n\\n  <!-- Twitter -->\\n  <meta property=\\\"twitter:card\\\" content=\\\"summary_large_image\\\" />\\n  <meta property=\\\"twitter:url\\\" content=\\\"https://cameronraymond.me/about/\\\" />\\n  <meta property=\\\"twitter:title\\\" content=\\\"💭About - Cameron Raymond💭\\\" />\\n  <meta\\n    property=\\\"twitter:description\\\"\\n    content=\\\"Cameron Raymond is a 21 year old data scienist from Toronto,\\n    Ontario. In the fall he will be joining the University of Oxford to do his\\n    MSc in Social Data Science.\\\" />\\n  <meta\\n    property=\\\"twitter:image\\\"\\n    content=\\\"https://cameronraymond.me/summary_about_large.png\\\" />\\n</svelte:head>\\n\"],\"names\":[],\"mappings\":\"AAwBE,UAAU,cAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,OAAO,AACrB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,UAAU,CACvB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,GAAG,cAAC,CAAC,AACH,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CACnB,QAAQ,CAAE,MAAM,AAClB,CAAC,AACO,GAAG,AAAC,CAAC,AACT,KAAK,CAAE,IAAI;EACf,CAAC,AACO,EAAE,AAAE,CAAC,AACX,YAAY,CAAE,GAAG,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,CAC7B,WAAW,CAAE,UAAU,CACvB,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,IAAI,AACjB,CAAC,AACO,EAAE,AAAC,CAAC,AACR,MAAM,CAAE,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AAC3B,CAAC,AACO,OAAO,AAAE,CAAC,AAChB,YAAY,CAAE,IAAI,CAClB,OAAO,CAAE,KAAK,AAChB,CAAC,AACO,EAAE,AAAE,CAAC,AACX,eAAe,CAAE,IAAI,AACvB,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,IAAI,cAAC,CAAC,AACJ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,CAAC,CACd,YAAY,CAAE,CAAC,CACf,cAAc,CAAE,cAAc,CAC9B,eAAe,CAAE,QAAQ,CACzB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,aAAa,CAAE,CAAC,AAClB,CAAC,AACD,GAAG,cAAC,CAAC,AACH,aAAa,CAAE,MAAM,AACvB,CAAC,AACO,EAAE,AAAC,CAAC,AACV,MAAM,CAAE,KAAK,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AAC5B,CAAC,AACS,EAAE,AAAE,CAAC,AACX,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,UAAU,CACvB,eAAe,CAAE,UAAU,AAC7B,CAAC,AACH,CAAC\"}"
};

async function preload$1({ params, query }) {
	const intro = await this.fetch(`about/intro.json`).then(r => r.json());
	const content = await this.fetch(`about/content.json`).then(r => r.json());
	return { intro, content };
}

const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let visible = false;
	let { intro } = $$props;
	let { content } = $$props;

	onMount(() => {
		visible = true;
	});

	if ($$props.intro === void 0 && $$bindings.intro && intro !== void 0) $$bindings.intro(intro);
	if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
	$$result.css.add(css$6);

	return `${visible
	? `<div class="${"container svelte-3y3qkx"}"><span class="${"svelte-3y3qkx"}"><div class="${"intro svelte-3y3qkx"}"><h1>${escape(intro.title)}
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: intro.emoji }, {}, {})}</h1>
        <div>${intro.html}</div></div>
      <picture rel="${"preload"}"><source type="${"image/webp"}" srcset="${escape(intro.image) + ".webp"}">
        <source type="${"image/jpeg"}" srcset="${escape(intro.image) + ".png"}">
        <img src="${escape(intro.image) + ".webp"}"${add_attribute("alt", intro.image, 0)} class="${"svelte-3y3qkx"}"></picture></span>
    <div>${content.html}</div></div>`
	: ``}
${($$result.head += `${($$result.title = `<title>💭About - Cameron Raymond💭</title>`, "")}<meta name="${"description"}" content="${"Cameron Raymond is a 21 year old data scienist from Toronto,\n    Ontario. In the fall he will be joining the University of Oxford to do his\n    MSc in Social Data Science. His broad areas of interest include network\n    science, machine learning, and computational social science."}"><meta name="${"keywords"}" content="${"Cameron Raymond, University of Oxford, Oxford University, Data\n    Science, Social Data Sience, Data Scientist"}"><link rel="${"canonical"}" href="${"https://cameronraymond.me/about/"}"><meta property="${"og:type"}" content="${"website"}"><meta property="${"og:url"}" content="${"https://cameronraymond.me/about/"}"><meta property="${"og:title"}" content="${"💭About - Cameron Raymond💭"}"><meta name="${"og:description"}" content="${"Cameron Raymond is a 21 year old data scienist from Toronto,\n    Ontario. In the fall he will be joining the University of Oxford to do his\n    MSc in Social Data Science. His broad areas of interest include network\n    science, machine learning, and computational social science."}"><meta property="${"og:image"}" content="${"https://cameronraymond.me/summary_about_large.png"}"><meta property="${"twitter:card"}" content="${"summary_large_image"}"><meta property="${"twitter:url"}" content="${"https://cameronraymond.me/about/"}"><meta property="${"twitter:title"}" content="${"💭About - Cameron Raymond💭"}"><meta property="${"twitter:description"}" content="${"Cameron Raymond is a 21 year old data scienist from Toronto,\n    Ontario. In the fall he will be joining the University of Oxford to do his\n    MSc in Social Data Science."}"><meta property="${"twitter:image"}" content="${"https://cameronraymond.me/summary_about_large.png"}">`, "")}`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.32.2 */

const css$7 = {
	code: ".content.svelte-1odeufq.svelte-1odeufq{display:flex;flex-direction:column;margin:auto;width:80vw;max-width:40rem}.subtitle.svelte-1odeufq.svelte-1odeufq{color:#555;max-width:40rem;margin-bottom:0.5rem}.title.svelte-1odeufq.svelte-1odeufq{display:flex;flex-direction:row}.title.svelte-1odeufq h2.svelte-1odeufq{margin-left:0.7rem}h1.svelte-1odeufq.svelte-1odeufq{margin-top:4rem;max-width:58rem}.tags.svelte-1odeufq.svelte-1odeufq{display:flex;flex:1;justify-content:space-between;align-items:center;flex-wrap:wrap}.postFilter.svelte-1odeufq.svelte-1odeufq{margin-bottom:3rem}.tags.svelte-1odeufq span.svelte-1odeufq{display:flex}@media(max-width: 40rem){.title.svelte-1odeufq h2.svelte-1odeufq{margin-left:0.4rem}}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  export async function preload({ params, query }) {\\n    let posts = await this.fetch(`../index.json`).then(r => r.json());\\n    posts = [].concat(...posts.filter(x => x.type === \\\"bp\\\"));\\n    return { posts };\\n  }\\n</script>\\n\\n<script>\\n  import { onMount, onDestroy } from \\\"svelte\\\";\\n  import { fly, fade } from \\\"svelte/transition\\\";\\n  import Tag from \\\"../../components/Tag.svelte\\\";\\n  import Card from \\\"../../components/Card.svelte\\\";\\n  import PostFilter from \\\"../../components/PostFilter.svelte\\\";\\n  import Emoji from \\\"../../components/Emoji.svelte\\\";\\n  export let posts;\\n  let visible = false;\\n  let activeTags = posts\\n    ? new Set([].concat(...posts.map(x => x.tags)))\\n    : undefined;\\n  let tags = posts ? [...activeTags] : undefined;\\n  // Make a post visible if its type is set to visible and one of the tags are present.\\n  $: visible = posts.filter(post => post.tags.some(tag => activeTags.has(tag)));\\n  onMount(() => {\\n    visible = true;\\n  });\\n</script>\\n\\n<style>\\n  .content {\\n    display: flex;\\n    flex-direction: column;\\n    margin: auto;\\n    width: 80vw;\\n    max-width: 40rem;\\n  }\\n  .subtitle {\\n    color: #555;\\n    max-width: 40rem;\\n    margin-bottom: 0.5rem;\\n  }\\n  .title {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n  .title h2 {\\n    margin-left: 0.7rem;\\n  }\\n  h1 {\\n    margin-top: 4rem;\\n    max-width: 58rem;\\n  }\\n\\n  .tags {\\n    display: flex;\\n    flex: 1;\\n    justify-content: space-between;\\n    align-items: center;\\n    flex-wrap: wrap;\\n  }\\n  .postFilter {\\n    margin-bottom: 3rem;\\n  }\\n  .tags span {\\n    display: flex;\\n  }\\n  @media (max-width: 40rem) {\\n    .title h2 {\\n      margin-left: 0.4rem;\\n    }\\n  }\\n</style>\\n\\n{#if visible}\\n  <h1\\n    id=\\\"blog\\\"\\n    in:fade={{ delay: 500, duration: 500 }}\\n    out:fly={{ y: 50, duration: 300 }}>\\n    Explore My work\\n    <Emoji symbol=\\\"💻\\\" />\\n  </h1>\\n  <div\\n    class=\\\"subtitle\\\"\\n    in:fly={{ delay: 550, x: -50, duration: 500 }}\\n    out:fly={{ y: 50, duration: 300 }}>\\n    <p>\\n      AI and network science; politics and policy. Below are some of my\\n      ramblings. This is meant to be a more accessible outlet for the exciting\\n      but all too often inaccessible research done in the world of computational\\n      social science. All opinions are my own.\\n    </p>\\n  </div>\\n  <span\\n    class=\\\"postFilter\\\"\\n    in:fly={{ delay: 550, x: -50, duration: 500 }}\\n    out:fly={{ y: 50, duration: 300 }}>\\n    {#if tags}\\n      <PostFilter {tags} bind:activeTags />\\n    {/if}\\n  </span>\\n  <span\\n    class=\\\"content\\\"\\n    in:fly={{ delay: 575, y: 50, duration: 200 }}\\n    out:fly={{ y: 50, duration: 300 }}>\\n    {#each visible as post, i}\\n      <span>\\n        <span class=\\\"title\\\">\\n          <h3>\\n            <Emoji symbol={post.emoji} />\\n          </h3>\\n          <h2>\\n            <a rel=\\\"prefetch\\\" href=\\\"blog/{post.slug}/\\\">{post.title}</a>\\n          </h2>\\n        </span>\\n        <p class=\\\"subtitle\\\">\\n          {@html post.blurb}\\n          <span class=\\\"tags\\\">\\n            <span>\\n              {#each post.tags as tagId}\\n                <Tag {tagId} />\\n              {/each}\\n            </span>\\n            <p>{post.fullDate}</p>\\n          </span>\\n        </p>\\n      </span>\\n    {/each}\\n  </span>\\n{/if}\\n\\n<svelte:head>\\n  <title>💻Blog - Cameron Raymond💻</title>\\n  <meta\\n    name=\\\"description\\\"\\n    content=\\\"Cameron Raymond's blog. AI and network science; politics and\\n    policy. Below are some of my ramblings. This is meant to be a more\\n    accessible outlet for the exciting but all too often inaccessible research\\n    done in the world of computational social science. All opinions are my own.\\\" />\\n  <meta\\n    name=\\\"keywords\\\"\\n    content=\\\"Cameron Raymond, University of Oxford, Oxford University, Data\\n    Science, Social Data Sience, Data Scientist\\\" />\\n  <link rel=\\\"canonical\\\" href=\\\"https://cameronraymond.me/blog/\\\" />\\n\\n  <!-- Open Graph / Facebook -->\\n  <meta property=\\\"og:type\\\" content=\\\"website\\\" />\\n  <meta property=\\\"og:url\\\" content=\\\"https://cameronraymond.me/blog/\\\" />\\n  <meta property=\\\"og:title\\\" content=\\\"💻Blog - Cameron Raymond💻\\\" />\\n  <meta\\n    name=\\\"og:description\\\"\\n    content=\\\"Cameron Raymond's blog. AI and network science; politics and\\n    policy. Below are some of my ramblings. This is meant to be a more\\n    accessible outlet for the exciting but all too often inaccessible research\\n    done in the world of computational social science. All opinions are my own.\\\" />\\n  <meta property=\\\"og:image\\\" content=\\\"https://cameronraymond.me/networkd.png\\\" />\\n\\n  <!-- Twitter -->\\n  <meta property=\\\"twitter:card\\\" content=\\\"summary\\\" />\\n  <meta property=\\\"twitter:url\\\" content=\\\"https://cameronraymond.me/blog/\\\" />\\n  <meta property=\\\"twitter:title\\\" content=\\\"💻Blog - Cameron Raymond💻\\\" />\\n  <meta\\n    property=\\\"twitter:description\\\"\\n    content=\\\"Cameron Raymond's blog. AI and network science; politics and\\n    policy. Below are some of my ramblings. This is meant to be a more\\n    accessible outlet for the exciting but all too often inaccessible research\\n    done in the world of computational social science. All opinions are my own..\\\" />\\n  <meta\\n    property=\\\"twitter:image\\\"\\n    content=\\\"https://cameronraymond.me/networkd.png\\\" />\\n\\n</svelte:head>\\n\"],\"names\":[],\"mappings\":\"AA6BE,QAAQ,8BAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,AAClB,CAAC,AACD,SAAS,8BAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,aAAa,CAAE,MAAM,AACvB,CAAC,AACD,MAAM,8BAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,AACrB,CAAC,AACD,qBAAM,CAAC,EAAE,eAAC,CAAC,AACT,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,EAAE,8BAAC,CAAC,AACF,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,KAAK,AAClB,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,WAAW,8BAAC,CAAC,AACX,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,oBAAK,CAAC,IAAI,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,AACf,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,qBAAM,CAAC,EAAE,eAAC,CAAC,AACT,WAAW,CAAE,MAAM,AACrB,CAAC,AACH,CAAC\"}"
};

async function preload$2({ params, query }) {
	let posts = await this.fetch(`../index.json`).then(r => r.json());
	posts = [].concat(...posts.filter(x => x.type === "bp"));
	return { posts };
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { posts } = $$props;
	let visible = false;

	let activeTags = posts
	? new Set([].concat(...posts.map(x => x.tags)))
	: undefined;

	let tags = posts ? [...activeTags] : undefined;

	onMount(() => {
		visible = true;
	});

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$7);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;
		visible = posts.filter(post => post.tags.some(tag => activeTags.has(tag)));

		$$rendered = `${visible
		? `<h1 id="${"blog"}" class="${"svelte-1odeufq"}">Explore My work
    ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "💻" }, {}, {})}</h1>
  <div class="${"subtitle svelte-1odeufq"}"><p>AI and network science; politics and policy. Below are some of my
      ramblings. This is meant to be a more accessible outlet for the exciting
      but all too often inaccessible research done in the world of computational
      social science. All opinions are my own.
    </p></div>
  <span class="${"postFilter svelte-1odeufq"}">${tags
			? `${validate_component(PostFilter, "PostFilter").$$render(
					$$result,
					{ tags, activeTags },
					{
						activeTags: $$value => {
							activeTags = $$value;
							$$settled = false;
						}
					},
					{}
				)}`
			: ``}</span>
  <span class="${"content svelte-1odeufq"}">${each(visible, (post, i) => `<span><span class="${"title svelte-1odeufq"}"><h3>${validate_component(Emoji, "Emoji").$$render($$result, { symbol: post.emoji }, {}, {})}</h3>
          <h2 class="${"svelte-1odeufq"}"><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug) + "/"}">${escape(post.title)}</a>
          </h2></span>
        <p class="${"subtitle svelte-1odeufq"}">${post.blurb}
          <span class="${"tags svelte-1odeufq"}"><span class="${"svelte-1odeufq"}">${each(post.tags, tagId => `${validate_component(Tag, "Tag").$$render($$result, { tagId }, {}, {})}`)}</span>
            <p>${escape(post.fullDate)}</p>
          </span></p>
      </span>`)}</span>`
		: ``}

${($$result.head += `${($$result.title = `<title>💻Blog - Cameron Raymond💻</title>`, "")}<meta name="${"description"}" content="${"Cameron Raymond's blog. AI and network science; politics and\n    policy. Below are some of my ramblings. This is meant to be a more\n    accessible outlet for the exciting but all too often inaccessible research\n    done in the world of computational social science. All opinions are my own."}"><meta name="${"keywords"}" content="${"Cameron Raymond, University of Oxford, Oxford University, Data\n    Science, Social Data Sience, Data Scientist"}"><link rel="${"canonical"}" href="${"https://cameronraymond.me/blog/"}"><meta property="${"og:type"}" content="${"website"}"><meta property="${"og:url"}" content="${"https://cameronraymond.me/blog/"}"><meta property="${"og:title"}" content="${"💻Blog - Cameron Raymond💻"}"><meta name="${"og:description"}" content="${"Cameron Raymond's blog. AI and network science; politics and\n    policy. Below are some of my ramblings. This is meant to be a more\n    accessible outlet for the exciting but all too often inaccessible research\n    done in the world of computational social science. All opinions are my own."}"><meta property="${"og:image"}" content="${"https://cameronraymond.me/networkd.png"}"><meta property="${"twitter:card"}" content="${"summary"}"><meta property="${"twitter:url"}" content="${"https://cameronraymond.me/blog/"}"><meta property="${"twitter:title"}" content="${"💻Blog - Cameron Raymond💻"}"><meta property="${"twitter:description"}" content="${"Cameron Raymond's blog. AI and network science; politics and\n    policy. Below are some of my ramblings. This is meant to be a more\n    accessible outlet for the exciting but all too often inaccessible research\n    done in the world of computational social science. All opinions are my own.."}"><meta property="${"twitter:image"}" content="${"https://cameronraymond.me/networkd.png"}">`, "")}`;
	} while (!$$settled);

	return $$rendered;
});

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

function is_date(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}

function get_interpolator(a, b) {
    if (a === b || a !== a)
        return () => a;
    const type = typeof a;
    if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
        throw new Error('Cannot interpolate values of different type');
    }
    if (Array.isArray(a)) {
        const arr = b.map((bi, i) => {
            return get_interpolator(a[i], bi);
        });
        return t => arr.map(fn => fn(t));
    }
    if (type === 'object') {
        if (!a || !b)
            throw new Error('Object cannot be null');
        if (is_date(a) && is_date(b)) {
            a = a.getTime();
            b = b.getTime();
            const delta = b - a;
            return t => new Date(a + t * delta);
        }
        const keys = Object.keys(b);
        const interpolators = {};
        keys.forEach(key => {
            interpolators[key] = get_interpolator(a[key], b[key]);
        });
        return t => {
            const result = {};
            keys.forEach(key => {
                result[key] = interpolators[key](t);
            });
            return result;
        };
    }
    if (type === 'number') {
        const delta = b - a;
        return t => a + t * delta;
    }
    throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
    const store = writable(value);
    let task;
    let target_value = value;
    function set(new_value, opts) {
        if (value == null) {
            store.set(value = new_value);
            return Promise.resolve();
        }
        target_value = new_value;
        let previous_task = task;
        let started = false;
        let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
        if (duration === 0) {
            if (previous_task) {
                previous_task.abort();
                previous_task = null;
            }
            store.set(value = target_value);
            return Promise.resolve();
        }
        const start = now() + delay;
        let fn;
        task = loop(now => {
            if (now < start)
                return true;
            if (!started) {
                fn = interpolate(value, new_value);
                if (typeof duration === 'function')
                    duration = duration(value, new_value);
                started = true;
            }
            if (previous_task) {
                previous_task.abort();
                previous_task = null;
            }
            const elapsed = now - start;
            if (elapsed > duration) {
                store.set(value = new_value);
                return false;
            }
            // @ts-ignore
            store.set(value = fn(easing(elapsed / duration)));
            return true;
        });
        return task.promise;
    }
    return {
        set,
        update: (fn, opts) => set(fn(target_value, value), opts),
        subscribe: store.subscribe
    };
}

/* src/routes/blog/[slug].svelte generated by Svelte v3.32.2 */

const css$8 = {
	code: ".content.svelte-1nd7ur6.svelte-1nd7ur6{display:flex;flex-direction:column;margin:auto;width:80vw;max-width:40rem}.content.svelte-1nd7ur6 code{display:inline-block;width:100%;overflow:auto}.content.svelte-1nd7ur6 img:first-of-type{max-height:initial}.content.svelte-1nd7ur6 img{align-self:center;margin:1rem auto 0.1rem auto;width:auto;height:auto;max-width:100%;max-height:30rem}.content.svelte-1nd7ur6 h2{margin-top:1.5rem}.content.svelte-1nd7ur6 h3{margin-top:1rem}.content.svelte-1nd7ur6 em{text-align:center;color:#555}.content.svelte-1nd7ur6 p > em{color:inherit}.content.svelte-1nd7ur6 ul{position:relative;list-style:none;margin-left:0;padding-left:1.2em}.content.svelte-1nd7ur6 ul li:before{font-size:16.8px;content:\"\\2022\";position:absolute;left:0}.content.svelte-1nd7ur6 blockquote{border-left:2px solid #a7a0a0;padding:0.5em 10px}progress.svelte-1nd7ur6.svelte-1nd7ur6{border:none;border-width:0;background:none;border-radius:1px;margin:-7rem -2rem 0 -2rem;position:fixed;width:100%;height:1.5px;z-index:2;color:#ff3e00}progress.svelte-1nd7ur6.svelte-1nd7ur6::-moz-progress-bar{background:#ff3e00;border-radius:1px}progress.svelte-1nd7ur6.svelte-1nd7ur6::-webkit-progress-bar{background:rgba(255, 255, 255, 0)}progress.svelte-1nd7ur6.svelte-1nd7ur6::-webkit-progress-value{background:#ff3e00;border-radius:1px}.nav.svelte-1nd7ur6.svelte-1nd7ur6{color:#555;margin-top:4rem}h1.svelte-1nd7ur6.svelte-1nd7ur6{margin:-0.7rem 0 0 0;max-width:58rem}.subtitle.svelte-1nd7ur6.svelte-1nd7ur6{color:#555;max-width:40rem}.subtitle.svelte-1nd7ur6 .collab.svelte-1nd7ur6{display:flex;font-size:0.7rem;color:#555}.tags.svelte-1nd7ur6.svelte-1nd7ur6{display:flex;flex:1;justify-content:space-between;align-items:center;flex-wrap:wrap}.tags.svelte-1nd7ur6 span.svelte-1nd7ur6{display:flex}@media(max-width: 40rem){.subtitle.svelte-1nd7ur6 .collab.svelte-1nd7ur6{display:flex;font-size:0.6rem;color:#555}}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  export async function preload({ params, query }) {\\n    // the `slug` parameter is available because\\n    // this file is called [slug].svelte\\n    const res = await this.fetch(`blog/${params.slug}.json`);\\n    const data = await res.json();\\n\\n    if (res.status === 200) {\\n      return { post: data };\\n    } else {\\n      this.error(res.status, data.message);\\n    }\\n  }\\n</script>\\n\\n<script>\\n  import { onMount, onDestroy } from \\\"svelte\\\";\\n  import { fly, fade } from \\\"svelte/transition\\\";\\n  import { tweened } from \\\"svelte/motion\\\";\\n  import { cubicOut } from \\\"svelte/easing\\\";\\n  import Emoji from \\\"../../components/Emoji.svelte\\\";\\n  import Tag from \\\"../../components/Tag.svelte\\\";\\n  export let post;\\n  const progress = tweened(0, {\\n    duration: 500,\\n    easing: cubicOut\\n  });\\n  let y = 0;\\n  let h = 1000;\\n  let visible = false;\\n  // take 500 off of the height to roughly account for header/footer, shift y by 100 so that it starts after header\\n  $: percDone = ((y - 100) / (h - 500)) * 100;\\n  $: prog = progress.set(percDone > 95 ? 100 : Math.max(percDone, 0));\\n\\n  onMount(() => {\\n    visible = true;\\n  });\\n</script>\\n\\n<svelte:window bind:scrollY={y} />\\n\\n<div bind:clientHeight={h}>\\n  {#if visible}\\n    <progress\\n      in:fade={{ delay: 500, duration: 0 }}\\n      value={$progress}\\n      max=\\\"100\\\" />\\n    <p in:fade={{ delay: 200, duration: 500 }} class=\\\"nav\\\">\\n      <a href=\\\"/\\\">home</a>\\n      /\\n      <a href=\\\"/blog/\\\">blog</a>\\n      /\\n      <a href=\\\"/blog/{post.slug}/\\\">{post.slug}</a>\\n    </p>\\n    <h1 in:fade={{ delay: 200, duration: 500 }}>{post.title} {post.emoji}</h1>\\n    <div in:fly={{ delay: 250, x: -50, duration: 500 }} class=\\\"subtitle\\\">\\n      <p>\\n        {@html post.blurb}\\n        {#if post.collaborators}\\n          <span class=\\\"collab\\\">\\n            {#each post.collaborators as collab}\\n              <a aria-label=\\\"collaborator\\\" href=\\\"https://github.com/{collab}/\\\">\\n                @{collab}\\n              </a>\\n              &nbsp;\\n            {/each}\\n          </span>\\n        {/if}\\n        <span class=\\\"tags\\\">\\n          <span>\\n            {#each post.tags as tagId}\\n              <Tag {tagId} />\\n            {/each}\\n          </span>\\n          <p>{post.date}</p>\\n        </span>\\n      </p>\\n    </div>\\n\\n    <div in:fly={{ delay: 200, y: 50, duration: 500 }} class=\\\"content\\\">\\n      {@html post.html}\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  /*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n  .content {\\n    display: flex;\\n    flex-direction: column;\\n    margin: auto;\\n    width: 80vw;\\n    max-width: 40rem;\\n  }\\n  .content :global(code) {\\n    display: inline-block;\\n    width: 100%;\\n    overflow: auto;\\n  }\\n  .content :global(img:first-of-type) {\\n    max-height: initial;\\n  }\\n  .content :global(img) {\\n    align-self: center;\\n    margin: 1rem auto 0.1rem auto;\\n    width: auto;\\n    height: auto;\\n    max-width: 100%;\\n    max-height: 30rem;\\n  }\\n  .content :global(h2) {\\n    margin-top: 1.5rem;\\n  }\\n  .content :global(h3) {\\n    margin-top: 1rem;\\n  }\\n  .content :global(em) {\\n    text-align: center;\\n    color: #555;\\n  }\\n  .content :global(p > em) {\\n    color: inherit;\\n  }\\n  .content :global(ul) {\\n    position: relative;\\n    list-style: none;\\n    margin-left: 0;\\n    padding-left: 1.2em;\\n  }\\n  .content :global(ul li:before) {\\n    font-size: 16.8px;\\n    content: \\\"\\\\2022\\\";\\n    position: absolute;\\n    left: 0;\\n  }\\n  .content :global(blockquote) {\\n    border-left: 2px solid #a7a0a0;\\n    padding: 0.5em 10px;\\n  }\\n\\n  progress {\\n    border: none;\\n    border-width: 0;\\n    background: none;\\n    border-radius: 1px;\\n    margin: -7rem -2rem 0 -2rem;\\n    position: fixed;\\n    width: 100%;\\n    height: 1.5px;\\n    z-index: 2;\\n    color: #ff3e00;\\n  }\\n  progress::-moz-progress-bar {\\n    background: #ff3e00;\\n    border-radius: 1px;\\n  }\\n  progress::-webkit-progress-bar {\\n    background: rgba(255, 255, 255, 0);\\n  }\\n  progress::-webkit-progress-value {\\n    background: #ff3e00;\\n    border-radius: 1px;\\n  }\\n  .nav {\\n    color: #555;\\n    margin-top: 4rem;\\n  }\\n  h1 {\\n    margin: -0.7rem 0 0 0;\\n    max-width: 58rem;\\n  }\\n  .subtitle {\\n    color: #555;\\n    max-width: 40rem;\\n  }\\n  .subtitle .collab {\\n    display: flex;\\n    font-size: 0.7rem;\\n    color: #555;\\n  }\\n  .tags {\\n    display: flex;\\n    flex: 1;\\n    justify-content: space-between;\\n    align-items: center;\\n    flex-wrap: wrap;\\n  }\\n\\n  .tags span {\\n    display: flex;\\n  }\\n  @media (max-width: 40rem) {\\n    .subtitle .collab {\\n      display: flex;\\n      font-size: 0.6rem;\\n      color: #555;\\n    }\\n  }\\n</style>\\n\\n<svelte:head>\\n  <title>{post.emoji}{post.title} - Cameron Raymond{post.emoji}</title>\\n\\n  <link rel=\\\"canonical\\\" href=\\\"https://cameronraymond.me/blog/{post.slug}/\\\" />\\n  <meta name=\\\"description\\\" content={post.blurb} />\\n  <meta\\n    name=\\\"keywords\\\"\\n    content=\\\"Cameron Raymond, University of Oxford, Oxford University, Data\\n    Science, Social Data Sience, Data Scientist\\\" />\\n\\n  <!-- Open Graph / Facebook -->\\n  <meta property=\\\"og:type\\\" content=\\\"website\\\" />\\n  <meta\\n    property=\\\"og:url\\\"\\n    content=\\\"https://cameronraymond.me/blog/{post.slug}/\\\" />\\n  <meta\\n    property=\\\"og:title\\\"\\n    content=\\\"{post.emoji}{post.title} - Cameron Raymond{post.emoji}\\\" />\\n  <meta name=\\\"og:description\\\" content={post.blurb} />\\n  <meta property=\\\"og:image\\\" content=\\\"https://cameronraymond.me/networkd.png\\\" />\\n\\n  <!-- Twitter -->\\n  <meta property=\\\"twitter:card\\\" content=\\\"summary\\\" />\\n  <meta\\n    property=\\\"twitter:url\\\"\\n    content=\\\"https://cameronraymond.me/blog/{post.slug}/\\\" />\\n  <meta\\n    property=\\\"twitter:title\\\"\\n    content=\\\"{post.emoji}{post.title} - Cameron Raymond{post.emoji}\\\" />\\n  <meta property=\\\"twitter:description\\\" content={post.blurb} />\\n  <meta\\n    property=\\\"twitter:image\\\"\\n    content=\\\"https://cameronraymond.me/networkd.png\\\" />\\n</svelte:head>\\n\"],\"names\":[],\"mappings\":\"AA8FE,QAAQ,8BAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,AAClB,CAAC,AACD,uBAAQ,CAAC,AAAQ,IAAI,AAAE,CAAC,AACtB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,IAAI,AAChB,CAAC,AACD,uBAAQ,CAAC,AAAQ,iBAAiB,AAAE,CAAC,AACnC,UAAU,CAAE,OAAO,AACrB,CAAC,AACD,uBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACrB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,MAAM,CAAC,IAAI,CAC7B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,KAAK,AACnB,CAAC,AACD,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,AACb,CAAC,AACD,uBAAQ,CAAC,AAAQ,MAAM,AAAE,CAAC,AACxB,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,uBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,CAAC,CACd,YAAY,CAAE,KAAK,AACrB,CAAC,AACD,uBAAQ,CAAC,AAAQ,YAAY,AAAE,CAAC,AAC9B,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,OAAO,CAChB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,AACT,CAAC,AACD,uBAAQ,CAAC,AAAQ,UAAU,AAAE,CAAC,AAC5B,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC9B,OAAO,CAAE,KAAK,CAAC,IAAI,AACrB,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,CAAC,CACf,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,KAAK,CAC3B,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,sCAAQ,mBAAmB,AAAC,CAAC,AAC3B,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,AACpB,CAAC,AACD,sCAAQ,sBAAsB,AAAC,CAAC,AAC9B,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AACpC,CAAC,AACD,sCAAQ,wBAAwB,AAAC,CAAC,AAChC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,AACpB,CAAC,AACD,IAAI,8BAAC,CAAC,AACJ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,EAAE,8BAAC,CAAC,AACF,MAAM,CAAE,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACrB,SAAS,CAAE,KAAK,AAClB,CAAC,AACD,SAAS,8BAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,AAClB,CAAC,AACD,wBAAS,CAAC,OAAO,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,AACb,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,oBAAK,CAAC,IAAI,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,AACf,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,wBAAS,CAAC,OAAO,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,AACb,CAAC,AACH,CAAC\"}"
};

async function preload$3({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let percDone;
	let prog;
	let $progress, $$unsubscribe_progress;
	let { post } = $$props;
	const progress = tweened(0, { duration: 500, easing: cubicOut });
	$$unsubscribe_progress = subscribe(progress, value => $progress = value);
	let y = 0;
	let h = 1000;
	let visible = false;

	onMount(() => {
		visible = true;
	});

	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$8);
	percDone = (y - 100) / (h - 500) * 100;
	prog = progress.set(percDone > 95 ? 100 : Math.max(percDone, 0));
	$$unsubscribe_progress();

	return `

<div>${visible
	? `<progress${add_attribute("value", $progress, 0)} max="${"100"}" class="${"svelte-1nd7ur6"}"></progress>
    <p class="${"nav svelte-1nd7ur6"}"><a href="${"/"}">home</a>
      /
      <a href="${"/blog/"}">blog</a>
      /
      <a href="${"/blog/" + escape(post.slug) + "/"}">${escape(post.slug)}</a></p>
    <h1 class="${"svelte-1nd7ur6"}">${escape(post.title)} ${escape(post.emoji)}</h1>
    <div class="${"subtitle svelte-1nd7ur6"}"><p>${post.blurb}
        ${post.collaborators
		? `<span class="${"collab svelte-1nd7ur6"}">${each(post.collaborators, collab => `<a aria-label="${"collaborator"}" href="${"https://github.com/" + escape(collab) + "/"}">@${escape(collab)}</a>
               `)}</span>`
		: ``}
        <span class="${"tags svelte-1nd7ur6"}"><span class="${"svelte-1nd7ur6"}">${each(post.tags, tagId => `${validate_component(Tag, "Tag").$$render($$result, { tagId }, {}, {})}`)}</span>
          <p>${escape(post.date)}</p></span></p></div>

    <div class="${"content svelte-1nd7ur6"}">${post.html}</div>`
	: ``}</div>



${($$result.head += `${($$result.title = `<title>${escape(post.emoji)}${escape(post.title)} - Cameron Raymond${escape(post.emoji)}</title>`, "")}<link rel="${"canonical"}" href="${"https://cameronraymond.me/blog/" + escape(post.slug) + "/"}"><meta name="${"description"}"${add_attribute("content", post.blurb, 0)}><meta name="${"keywords"}" content="${"Cameron Raymond, University of Oxford, Oxford University, Data\n    Science, Social Data Sience, Data Scientist"}"><meta property="${"og:type"}" content="${"website"}"><meta property="${"og:url"}" content="${"https://cameronraymond.me/blog/" + escape(post.slug) + "/"}"><meta property="${"og:title"}" content="${escape(post.emoji) + escape(post.title) + " - Cameron Raymond" + escape(post.emoji)}"><meta name="${"og:description"}"${add_attribute("content", post.blurb, 0)}><meta property="${"og:image"}" content="${"https://cameronraymond.me/networkd.png"}"><meta property="${"twitter:card"}" content="${"summary"}"><meta property="${"twitter:url"}" content="${"https://cameronraymond.me/blog/" + escape(post.slug) + "/"}"><meta property="${"twitter:title"}" content="${escape(post.emoji) + escape(post.title) + " - Cameron Raymond" + escape(post.emoji)}"><meta property="${"twitter:description"}"${add_attribute("content", post.blurb, 0)}><meta property="${"twitter:image"}" content="${"https://cameronraymond.me/networkd.png"}">`, "")}`;
});

/* node_modules/svelte-icons/io/IoIosCloseCircleOutline.svelte generated by Svelte v3.32.2 */

const IoIosCloseCircleOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 512 512" }, $$props), {}, {
		default: () => `<path d="${"M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z"}"></path>
<path d="${"M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"}"></path>`
	})}`;
});

/* src/components/NewsLetter.svelte generated by Svelte v3.32.2 */

const css$9 = {
	code: ".margin.svelte-ex3z1i.svelte-ex3z1i{height:3rem}.sign-up-banner.svelte-ex3z1i.svelte-ex3z1i{display:flex;justify-content:center;align-items:center;position:fixed;color:white;background:rgba(255, 62, 0, 0.95);height:3rem;z-index:1000;width:100%;top:0}.subscribe.svelte-ex3z1i.svelte-ex3z1i{background-color:transparent;font-size:16px;cursor:pointer;border:none}.tooltip.svelte-ex3z1i.svelte-ex3z1i{position:relative;display:inline-block}.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i{visibility:hidden;width:120px;background-color:#2a384d;color:#fff;text-align:center;padding:5px 0;border-radius:6px;position:absolute;left:40px;top:-5px;z-index:4}.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i:after,.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i:before{right:100%;top:50%;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i:after{border-color:rgba(136, 183, 213, 0);border-width:8px;margin-top:-8px}.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i:before{border-color:rgba(255, 120, 169, 0);border-right-color:#2a384d;border-width:8px;margin-top:-8px}.tooltip.svelte-ex3z1i:hover .tooltiptext.svelte-ex3z1i{visibility:visible}input.svelte-ex3z1i.svelte-ex3z1i{-webkit-appearance:none;-moz-appearance:none;appearance:none}input.svelte-ex3z1i.svelte-ex3z1i:focus,input.svelte-ex3z1i.svelte-ex3z1i:focus{outline:white}.email.svelte-ex3z1i.svelte-ex3z1i{background-color:transparent;border:none;color:white;border-bottom-color:white;border-bottom-style:solid;border-bottom-width:1px;margin:0em 0.5em 0em 0.5em}#close-sub.svelte-ex3z1i.svelte-ex3z1i{position:absolute;right:1rem;width:1.4rem;height:1.4rem;color:white;cursor:pointer}@media(max-width: 40rem){.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i{width:100px;left:-32px;top:25px}.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i:after,.tooltip.svelte-ex3z1i .tooltiptext.svelte-ex3z1i:before{display:none}}@media(max-width: 27rem){.label.svelte-ex3z1i.svelte-ex3z1i{display:none}}",
	map: "{\"version\":3,\"file\":\"NewsLetter.svelte\",\"sources\":[\"NewsLetter.svelte\"],\"sourcesContent\":[\"<script>\\n  import { IoIosCloseCircleOutline } from \\\"svelte-icons/io\\\";\\n  import { fly } from \\\"svelte/transition\\\";\\n  export let visible = true;\\n  let updateVis = () => (visible = !visible);\\n</script>\\n\\n<style>\\n  .margin {\\n    height: 3rem;\\n  }\\n  .sign-up-banner {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    position: fixed;\\n    color: white;\\n    background: rgba(255, 62, 0, 0.95);\\n    height: 3rem;\\n    z-index: 1000;\\n    width: 100%;\\n    top: 0;\\n  }\\n  .subscribe {\\n    background-color: transparent;\\n    font-size: 16px;\\n    cursor: pointer;\\n    border: none;\\n  }\\n  /* Tooltip container */\\n  .tooltip {\\n    position: relative;\\n    display: inline-block;\\n  }\\n  /* Tooltip text */\\n  .tooltip .tooltiptext {\\n    visibility: hidden;\\n    width: 120px;\\n    background-color: #2a384d;\\n    color: #fff;\\n    text-align: center;\\n    padding: 5px 0;\\n    border-radius: 6px;\\n    /* Position the tooltip text - see examples below! */\\n    position: absolute;\\n    left: 40px;\\n    top: -5px;\\n    z-index: 4;\\n  }\\n\\n  .tooltip .tooltiptext:after,\\n  .tooltip .tooltiptext:before {\\n    right: 100%;\\n    top: 50%;\\n    border: solid transparent;\\n    content: \\\" \\\";\\n    height: 0;\\n    width: 0;\\n    position: absolute;\\n    pointer-events: none;\\n  }\\n\\n  .tooltip .tooltiptext:after {\\n    border-color: rgba(136, 183, 213, 0);\\n    border-width: 8px;\\n    margin-top: -8px;\\n  }\\n  .tooltip .tooltiptext:before {\\n    border-color: rgba(255, 120, 169, 0);\\n    border-right-color: #2a384d;\\n    border-width: 8px;\\n    margin-top: -8px;\\n  }\\n\\n  /* Show the tooltip text when you mouse over the tooltip container */\\n  .tooltip:hover .tooltiptext {\\n    visibility: visible;\\n  }\\n  input {\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    appearance: none;\\n  }\\n  input:focus,\\n  input:focus {\\n    outline: white;\\n  }\\n  .email {\\n    background-color: transparent;\\n    border: none;\\n    color: white;\\n    border-bottom-color: white;\\n    border-bottom-style: solid;\\n    border-bottom-width: 1px;\\n    margin: 0em 0.5em 0em 0.5em;\\n  }\\n  #close-sub {\\n    position: absolute;\\n    right: 1rem;\\n    width: 1.4rem;\\n    height: 1.4rem;\\n    color: white;\\n    cursor: pointer;\\n  }\\n  @media (max-width: 40rem) {\\n    .tooltip .tooltiptext {\\n      width: 100px;\\n      left: -32px;\\n      top: 25px;\\n    }\\n    .tooltip .tooltiptext:after,\\n    .tooltip .tooltiptext:before {\\n      display: none;\\n    }\\n  }\\n  @media (max-width: 27rem) {\\n    .label {\\n      display: none;\\n    }\\n  }\\n</style>\\n\\n<div class=\\\"margin\\\" />\\n<form\\n  class=\\\"sign-up-banner\\\"\\n  action=\\\"https://tinyletter.com/cjkraymond\\\"\\n  method=\\\"post\\\"\\n  target=\\\"popupwindow\\\"\\n  onsubmit=\\\"window.open('https://tinyletter.com/cjkraymond', 'popupwindow',\\n  'scrollbars=yes,width=800,height=600');return true\\\">\\n  <p>\\n    <label class=\\\"label\\\" for=\\\"tlemail\\\">Let's be pals:</label>\\n  </p>\\n  <div class=\\\"signup-input\\\">\\n    <input\\n      type=\\\"text\\\"\\n      name=\\\"email\\\"\\n      class=\\\"email\\\"\\n      placeholder=\\\"my@email.com\\\"\\n      id=\\\"tlemail\\\" />\\n  </div>\\n  <input type=\\\"hidden\\\" value=\\\"1\\\" name=\\\"embed\\\" />\\n  <span class=\\\"tooltip\\\">\\n    <input type=\\\"submit\\\" value=\\\"✉️\\\" class=\\\"subscribe\\\" />\\n    <span class=\\\"tooltiptext\\\">Subscribe!</span>\\n  </span>\\n  <span id=\\\"close-sub\\\" on:click={() => updateVis()}>\\n    <IoIosCloseCircleOutline />\\n  </span>\\n</form>\\n\"],\"names\":[],\"mappings\":\"AAQE,OAAO,4BAAC,CAAC,AACP,MAAM,CAAE,IAAI,AACd,CAAC,AACD,eAAe,4BAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAClC,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,AACR,CAAC,AACD,UAAU,4BAAC,CAAC,AACV,gBAAgB,CAAE,WAAW,CAC7B,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,IAAI,AACd,CAAC,AAED,QAAQ,4BAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,AACvB,CAAC,AAED,sBAAQ,CAAC,YAAY,cAAC,CAAC,AACrB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,GAAG,CAAC,CAAC,CACd,aAAa,CAAE,GAAG,CAElB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,sBAAQ,CAAC,0BAAY,MAAM,CAC3B,sBAAQ,CAAC,0BAAY,OAAO,AAAC,CAAC,AAC5B,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,GAAG,CACR,MAAM,CAAE,KAAK,CAAC,WAAW,CACzB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,CAAC,CACR,QAAQ,CAAE,QAAQ,CAClB,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,sBAAQ,CAAC,0BAAY,MAAM,AAAC,CAAC,AAC3B,YAAY,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACpC,YAAY,CAAE,GAAG,CACjB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,sBAAQ,CAAC,0BAAY,OAAO,AAAC,CAAC,AAC5B,YAAY,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACpC,kBAAkB,CAAE,OAAO,CAC3B,YAAY,CAAE,GAAG,CACjB,UAAU,CAAE,IAAI,AAClB,CAAC,AAGD,sBAAQ,MAAM,CAAC,YAAY,cAAC,CAAC,AAC3B,UAAU,CAAE,OAAO,AACrB,CAAC,AACD,KAAK,4BAAC,CAAC,AACL,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,iCAAK,MAAM,CACX,iCAAK,MAAM,AAAC,CAAC,AACX,OAAO,CAAE,KAAK,AAChB,CAAC,AACD,MAAM,4BAAC,CAAC,AACN,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,mBAAmB,CAAE,KAAK,CAC1B,mBAAmB,CAAE,KAAK,CAC1B,mBAAmB,CAAE,GAAG,CACxB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,AAC7B,CAAC,AACD,UAAU,4BAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,AACjB,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,sBAAQ,CAAC,YAAY,cAAC,CAAC,AACrB,KAAK,CAAE,KAAK,CACZ,IAAI,CAAE,KAAK,CACX,GAAG,CAAE,IAAI,AACX,CAAC,AACD,sBAAQ,CAAC,0BAAY,MAAM,CAC3B,sBAAQ,CAAC,0BAAY,OAAO,AAAC,CAAC,AAC5B,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,MAAM,4BAAC,CAAC,AACN,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC\"}"
};

const NewsLetter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { visible = true } = $$props;
	if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0) $$bindings.visible(visible);
	$$result.css.add(css$9);

	return `<div class="${"margin svelte-ex3z1i"}"></div>
<form class="${"sign-up-banner svelte-ex3z1i"}" action="${"https://tinyletter.com/cjkraymond"}" method="${"post"}" target="${"popupwindow"}" onsubmit="${"window.open('https://tinyletter.com/cjkraymond', 'popupwindow',\n  'scrollbars=yes,width=800,height=600');return true"}"><p><label class="${"label svelte-ex3z1i"}" for="${"tlemail"}">Let&#39;s be pals:</label></p>
  <div class="${"signup-input"}"><input type="${"text"}" name="${"email"}" class="${"email svelte-ex3z1i"}" placeholder="${"my@email.com"}" id="${"tlemail"}"></div>
  <input type="${"hidden"}" value="${"1"}" name="${"embed"}" class="${"svelte-ex3z1i"}">
  <span class="${"tooltip svelte-ex3z1i"}"><input type="${"submit"}" value="${"✉️"}" class="${"subscribe svelte-ex3z1i"}">
    <span class="${"tooltiptext svelte-ex3z1i"}">Subscribe!</span></span>
  <span id="${"close-sub"}" class="${"svelte-ex3z1i"}">${validate_component(IoIosCloseCircleOutline, "IoIosCloseCircleOutline").$$render($$result, {}, {}, {})}</span></form>`;
});

/* src/components/Nav.svelte generated by Svelte v3.32.2 */

const css$a = {
	code: "nav.svelte-1otdzf2{position:sticky;height:4rem;display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-left:2rem;padding-right:2rem;font-weight:300;z-index:3;background-color:white}.links.svelte-1otdzf2{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:14.5rem}.margin.svelte-1otdzf2{margin-bottom:3rem}.icon.svelte-1otdzf2{width:1.2rem;height:1.2rem}a.svelte-1otdzf2{text-decoration:none}.hideIcons.svelte-1otdzf2{display:none}@media(max-width: 40rem){.links.svelte-1otdzf2{width:9.5rem}.icon.svelte-1otdzf2{width:1rem;height:1rem}.hideLinks.svelte-1otdzf2{display:none}.hideIcons.svelte-1otdzf2{display:block}}[aria-current].svelte-1otdzf2{color:rgb(255, 62, 0);position:relative;display:inline-block}.divider.svelte-1otdzf2{height:1.5rem;width:1px;background-color:#333;opacity:0.3}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n  import {\\n    FaLinkedinIn,\\n    FaTwitter,\\n    FaUser,\\n    FaNewspaper,\\n    FaPencilAlt\\n  } from \\\"svelte-icons/fa\\\";\\n  import { getOutboundLink } from \\\"../utils/link.js\\\";\\n  import NewsLetter from \\\"./NewsLetter.svelte\\\"\\n  export let segment;\\n  let visible = true;\\n  $: margin = !visible\\n  let linkedIn = \\\"https://www.linkedin.com/in/CJKRaymond/\\\";\\n  let twitter = \\\"https://twitter.com/CJKRaymond\\\";\\n</script>\\n\\n<style>\\n  nav {\\n    position: sticky;\\n    height: 4rem;\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: center;\\n    padding-left: 2rem;\\n    padding-right: 2rem;\\n    font-weight: 300;\\n    z-index: 3;\\n    background-color: white;\\n  }\\n\\n  .links {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: center;\\n    width: 14.5rem;\\n  }\\n  .margin{\\n    margin-bottom: 3rem;\\n  }\\n\\n  .icon {\\n    width: 1.2rem;\\n    height: 1.2rem;\\n  }\\n  a {\\n    text-decoration: none;\\n  }\\n\\n  .hideIcons {\\n    display: none;\\n  }\\n\\n  @media (max-width: 40rem) {\\n    .links {\\n      width: 9.5rem;\\n    }\\n    .icon {\\n      width: 1rem;\\n      height: 1rem;\\n    }\\n    .hideLinks {\\n      display: none;\\n    }\\n    .hideIcons {\\n      display: block;\\n    }\\n  }\\n\\n  [aria-current] {\\n    color: rgb(255, 62, 0);\\n    position: relative;\\n    display: inline-block;\\n  }\\n  .divider {\\n    height: 1.5rem;\\n    width: 1px;\\n    background-color: #333;\\n    opacity: 0.3;\\n  }\\n</style>\\n\\n{#if visible}\\n  <NewsLetter bind:visible/>\\n{/if}\\n<nav class:margin >\\n  <a\\n    rel=\\\"prefetch\\\"\\n    aria-label=\\\"Home\\\"\\n    aria-current={segment === undefined ? 'page' : undefined}\\n    href=\\\".\\\">\\n    Cameron Raymond\\n  </a>\\n  <div class=\\\"links\\\">\\n    <a\\n      aria-label=\\\"Resume\\\"\\n      target=\\\"_blank\\\"\\n      href=\\\"cameron-raymond-resume.pdf\\\"\\n      on:click={() => getOutboundLink('https://cameronraymond.me/cameron-raymond-resume.pdf')}>\\n      <span class=\\\"hideIcons icon\\\">\\n        <FaNewspaper />\\n      </span>\\n      <span class=\\\"hideLinks\\\">Resume</span>\\n    </a>\\n    <a\\n      aria-label=\\\"Blog\\\"\\n      rel=\\\"prefetch\\\"\\n      aria-current={segment === 'blog' ? 'page' : undefined}\\n      href=\\\"blog/\\\">\\n      <span class=\\\"hideIcons icon\\\">\\n        <FaPencilAlt aria-label=\\\"blog\\\"/>\\n      </span>\\n      <span class=\\\"hideLinks\\\">Blog</span>\\n    </a>\\n    <a\\n      aria-label=\\\"About\\\"\\n      rel=\\\"prefetch\\\"\\n      aria-current={segment === 'about' ? 'page' : undefined}\\n      href=\\\"about/\\\">\\n      <span class=\\\"hideIcons icon\\\">\\n        <FaUser aria-label=\\\"about\\\" />\\n      </span>\\n      <span class=\\\"hideLinks\\\">About</span>\\n    </a>\\n\\n    <div class=\\\"divider\\\" />\\n    <a\\n      aria-label=\\\"LinkedIn\\\"\\n      class=\\\"icon\\\"\\n      href={linkedIn}\\n      on:click={() => getOutboundLink(linkedIn)}>\\n      <FaLinkedinIn aria-label=\\\"linked in\\\"/>\\n    </a>\\n    <a\\n      aria-label=\\\"twitter\\\"\\n      class=\\\"icon\\\"\\n      href={twitter}\\n      on:click={() => getOutboundLink(twitter)}>\\n      <FaTwitter aria-label=\\\"twitter\\\"/>\\n    </a>\\n  </div>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AAkBE,GAAG,eAAC,CAAC,AACH,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,KAAK,AACzB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,sBAAO,CAAC,AACN,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,KAAK,eAAC,CAAC,AACL,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,AAChB,CAAC,AACD,CAAC,eAAC,CAAC,AACD,eAAe,CAAE,IAAI,AACvB,CAAC,AAED,UAAU,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,AACf,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,MAAM,eAAC,CAAC,AACN,KAAK,CAAE,MAAM,AACf,CAAC,AACD,KAAK,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AACD,UAAU,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,AACf,CAAC,AACD,UAAU,eAAC,CAAC,AACV,OAAO,CAAE,KAAK,AAChB,CAAC,AACH,CAAC,AAED,CAAC,YAAY,CAAC,eAAC,CAAC,AACd,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACtB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,AACvB,CAAC,AACD,QAAQ,eAAC,CAAC,AACR,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,GAAG,CACV,gBAAgB,CAAE,IAAI,CACtB,OAAO,CAAE,GAAG,AACd,CAAC\"}"
};

let linkedIn = "https://www.linkedin.com/in/CJKRaymond/";
let twitter = "https://twitter.com/CJKRaymond";

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let margin;
	let { segment } = $$props;
	let visible = true;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$a);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;
		margin = !visible;

		$$rendered = `${visible
		? `${validate_component(NewsLetter, "NewsLetter").$$render(
				$$result,
				{ visible },
				{
					visible: $$value => {
						visible = $$value;
						$$settled = false;
					}
				},
				{}
			)}`
		: ``}
<nav class="${["svelte-1otdzf2", margin ? "margin" : ""].join(" ").trim()}"><a rel="${"prefetch"}" aria-label="${"Home"}"${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} href="${"."}" class="${"svelte-1otdzf2"}">Cameron Raymond
  </a>
  <div class="${"links svelte-1otdzf2"}"><a aria-label="${"Resume"}" target="${"_blank"}" href="${"cameron-raymond-resume.pdf"}" class="${"svelte-1otdzf2"}"><span class="${"hideIcons icon svelte-1otdzf2"}">${validate_component(FaNewspaper, "FaNewspaper").$$render($$result, {}, {}, {})}</span>
      <span class="${"hideLinks svelte-1otdzf2"}">Resume</span></a>
    <a aria-label="${"Blog"}" rel="${"prefetch"}"${add_attribute("aria-current", segment === "blog" ? "page" : undefined, 0)} href="${"blog/"}" class="${"svelte-1otdzf2"}"><span class="${"hideIcons icon svelte-1otdzf2"}">${validate_component(FaPencilAlt, "FaPencilAlt").$$render($$result, { "aria-label": "blog" }, {}, {})}</span>
      <span class="${"hideLinks svelte-1otdzf2"}">Blog</span></a>
    <a aria-label="${"About"}" rel="${"prefetch"}"${add_attribute("aria-current", segment === "about" ? "page" : undefined, 0)} href="${"about/"}" class="${"svelte-1otdzf2"}"><span class="${"hideIcons icon svelte-1otdzf2"}">${validate_component(FaUser, "FaUser").$$render($$result, { "aria-label": "about" }, {}, {})}</span>
      <span class="${"hideLinks svelte-1otdzf2"}">About</span></a>

    <div class="${"divider svelte-1otdzf2"}"></div>
    <a aria-label="${"LinkedIn"}" class="${"icon svelte-1otdzf2"}"${add_attribute("href", linkedIn, 0)}>${validate_component(FaLinkedinIn, "FaLinkedinIn").$$render($$result, { "aria-label": "linked in" }, {}, {})}</a>
    <a aria-label="${"twitter"}" class="${"icon svelte-1otdzf2"}"${add_attribute("href", twitter, 0)}>${validate_component(FaTwitter, "FaTwitter").$$render($$result, { "aria-label": "twitter" }, {}, {})}</a></div></nav>`;
	} while (!$$settled);

	return $$rendered;
});

/* src/components/HiddenLinks.svelte generated by Svelte v3.32.2 */

const css$b = {
	code: "a.svelte-1i4fw52{position:absolute;visibility:hidden;bottom:0;left:0}",
	map: "{\"version\":3,\"file\":\"HiddenLinks.svelte\",\"sources\":[\"HiddenLinks.svelte\"],\"sourcesContent\":[\"<style>\\n  a{\\n    position: absolute;\\n    visibility: hidden;\\n    bottom: 0;\\n    left: 0;\\n  }\\n</style>\\n\\n<a href=\\\"blog/\\\" aria-label=\\\" \\\">blog</a>\\n<a href=\\\"sitemap.xml\\\" aria-label=\\\" \\\">sitemap</a>\"],\"names\":[],\"mappings\":\"AACE,gBAAC,CAAC,AACA,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,AACT,CAAC\"}"
};

const HiddenLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$b);

	return `<a href="${"blog/"}" aria-label="${" "}" class="${"svelte-1i4fw52"}">blog</a>
<a href="${"sitemap.xml"}" aria-label="${" "}" class="${"svelte-1i4fw52"}">sitemap</a>`;
});

const t="http://www.w3.org/2000/svg";class e{constructor(t){this.seed=t;}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function s(t,e,s,i,n){return {type:"path",ops:c$1(t,e,s,i,n)}}function i$1(t,e,i){const n=(t||[]).length;if(n>2){const s=[];for(let e=0;e<n-1;e++)s.push(...c$1(t[e][0],t[e][1],t[e+1][0],t[e+1][1],i));return e&&s.push(...c$1(t[n-1][0],t[n-1][1],t[0][0],t[0][1],i)),{type:"path",ops:s}}return 2===n?s(t[0][0],t[0][1],t[1][0],t[1][1],i):{type:"path",ops:[]}}function n(t,e,s,n,o){return function(t,e){return i$1(t,!0,e)}([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],o)}function o(t,e,s,i,n){return function(t,e,s,i){const[n,o]=l(i.increment,t,e,i.rx,i.ry,1,i.increment*h(.1,h(.4,1,s),s),s);let r=f(n,null,s);if(!s.disableMultiStroke){const[n]=l(i.increment,t,e,i.rx,i.ry,1.5,0,s),o=f(n,null,s);r=r.concat(o);}return {estimatedPoints:o,opset:{type:"path",ops:r}}}(t,e,n,function(t,e,s){const i=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),n=Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*i),o=2*Math.PI/n;let r=Math.abs(t/2),h=Math.abs(e/2);const c=1-s.curveFitting;return r+=a(r*c,s),h+=a(h*c,s),{increment:o,rx:r,ry:h}}(s,i,n)).opset}function r(t){return t.randomizer||(t.randomizer=new e(t.seed||0)),t.randomizer.next()}function h(t,e,s,i=1){return s.roughness*i*(r(s)*(e-t)+t)}function a(t,e,s=1){return h(-t,t,e,s)}function c$1(t,e,s,i,n,o=!1){const r=o?n.disableMultiStrokeFill:n.disableMultiStroke,h=u(t,e,s,i,n,!0,!1);if(r)return h;const a=u(t,e,s,i,n,!0,!0);return h.concat(a)}function u(t,e,s,i,n,o,h){const c=Math.pow(t-s,2)+Math.pow(e-i,2),u=Math.sqrt(c);let f=1;f=u<200?1:u>500?.4:-.0016668*u+1.233334;let l=n.maxRandomnessOffset||0;l*l*100>c&&(l=u/10);const g=l/2,d=.2+.2*r(n);let p=n.bowing*n.maxRandomnessOffset*(i-e)/200,_=n.bowing*n.maxRandomnessOffset*(t-s)/200;p=a(p,n,f),_=a(_,n,f);const m=[],w=()=>a(g,n,f),v=()=>a(l,n,f);return o&&(h?m.push({op:"move",data:[t+w(),e+w()]}):m.push({op:"move",data:[t+a(l,n,f),e+a(l,n,f)]})),h?m.push({op:"bcurveTo",data:[p+t+(s-t)*d+w(),_+e+(i-e)*d+w(),p+t+2*(s-t)*d+w(),_+e+2*(i-e)*d+w(),s+w(),i+w()]}):m.push({op:"bcurveTo",data:[p+t+(s-t)*d+v(),_+e+(i-e)*d+v(),p+t+2*(s-t)*d+v(),_+e+2*(i-e)*d+v(),s+v(),i+v()]}),m}function f(t,e,s){const i=t.length,n=[];if(i>3){const o=[],r=1-s.curveTightness;n.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(r*t[e+1][0]-r*t[e-1][0])/6,s[1]+(r*t[e+1][1]-r*t[e-1][1])/6],o[2]=[t[e+1][0]+(r*t[e][0]-r*t[e+2][0])/6,t[e+1][1]+(r*t[e][1]-r*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]});}if(e&&2===e.length){const t=s.maxRandomnessOffset;n.push({op:"lineTo",data:[e[0]+a(t,s),e[1]+a(t,s)]});}}else 3===i?(n.push({op:"move",data:[t[1][0],t[1][1]]}),n.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&n.push(...c$1(t[0][0],t[0][1],t[1][0],t[1][1],s));return n}function l(t,e,s,i,n,o,r,h){const c=[],u=[],f=a(.5,h)-Math.PI/2;u.push([a(o,h)+e+.9*i*Math.cos(f-t),a(o,h)+s+.9*n*Math.sin(f-t)]);for(let r=f;r<2*Math.PI+f-.01;r+=t){const t=[a(o,h)+e+i*Math.cos(r),a(o,h)+s+n*Math.sin(r)];c.push(t),u.push(t);}return u.push([a(o,h)+e+i*Math.cos(f+2*Math.PI+.5*r),a(o,h)+s+n*Math.sin(f+2*Math.PI+.5*r)]),u.push([a(o,h)+e+.98*i*Math.cos(f+r),a(o,h)+s+.98*n*Math.sin(f+r)]),u.push([a(o,h)+e+.9*i*Math.cos(f+.5*r),a(o,h)+s+.9*n*Math.sin(f+.5*r)]),[u,c]}function g(t,e){return {maxRandomnessOffset:2,roughness:"highlight"===t?3:1.5,bowing:1,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,combineNestedSvgPaths:!1,disableMultiStroke:"double"!==t,disableMultiStrokeFill:!1,seed:e}}function d(e,r,h,a,c,u){const f=[];let l=h.strokeWidth||2;const d=function(t){const e=t.padding;if(e||0===e){if("number"==typeof e)return [e,e,e,e];if(Array.isArray(e)){const t=e;if(t.length)switch(t.length){case 4:return [...t];case 1:return [t[0],t[0],t[0],t[0]];case 2:return [...t,...t];case 3:return [...t,t[1]];default:return [t[0],t[1],t[2],t[3]]}}}return [5,5,5,5]}(h),p=void 0===h.animate||!!h.animate,_=h.iterations||2,m=g("single",u);switch(h.type){case"underline":{const t=r.y+r.h+d[2];for(let e=0;e<_;e++)e%2?f.push(s(r.x+r.w,t,r.x,t,m)):f.push(s(r.x,t,r.x+r.w,t,m));break}case"strike-through":{const t=r.y+r.h/2;for(let e=0;e<_;e++)e%2?f.push(s(r.x+r.w,t,r.x,t,m)):f.push(s(r.x,t,r.x+r.w,t,m));break}case"box":{const t=r.x-d[3],e=r.y-d[0],s=r.w+(d[1]+d[3]),i=r.h+(d[0]+d[2]);for(let o=0;o<_;o++)f.push(n(t,e,s,i,m));break}case"bracket":{const t=Array.isArray(h.brackets)?h.brackets:h.brackets?[h.brackets]:["right"],e=r.x-2*d[3],s=r.x+r.w+2*d[1],n=r.y-2*d[0],o=r.y+r.h+2*d[2];for(const h of t){let t;switch(h){case"bottom":t=[[e,r.y+r.h],[e,o],[s,o],[s,r.y+r.h]];break;case"top":t=[[e,r.y],[e,n],[s,n],[s,r.y]];break;case"left":t=[[r.x,n],[e,n],[e,o],[r.x,o]];break;case"right":t=[[r.x+r.w,n],[s,n],[s,o],[r.x+r.w,o]];}t&&f.push(i$1(t,!1,m));}break}case"crossed-off":{const t=r.x,e=r.y,i=t+r.w,n=e+r.h;for(let o=0;o<_;o++)o%2?f.push(s(i,n,t,e,m)):f.push(s(t,e,i,n,m));for(let o=0;o<_;o++)o%2?f.push(s(t,n,i,e,m)):f.push(s(i,e,t,n,m));break}case"circle":{const t=g("double",u),e=r.w+(d[1]+d[3]),s=r.h+(d[0]+d[2]),i=r.x-d[3]+e/2,n=r.y-d[0]+s/2,h=Math.floor(_/2),a=_-2*h;for(let r=0;r<h;r++)f.push(o(i,n,e,s,t));for(let t=0;t<a;t++)f.push(o(i,n,e,s,m));break}case"highlight":{const t=g("highlight",u);l=.95*r.h;const e=r.y+r.h/2;for(let i=0;i<_;i++)i%2?f.push(s(r.x+r.w,e,r.x,e,t)):f.push(s(r.x,e,r.x+r.w,e,t));break}}if(f.length){const s=function(t){const e=[];for(const s of t){let t="";for(const i of s.ops){const s=i.data;switch(i.op){case"move":t.trim()&&e.push(t.trim()),t=`M${s[0]} ${s[1]} `;break;case"bcurveTo":t+=`C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;break;case"lineTo":t+=`L${s[0]} ${s[1]} `;}}t.trim()&&e.push(t.trim());}return e}(f),i=[],n=[];let o=0;const r=(t,e,s)=>t.setAttribute(e,s);for(const a of s){const s=document.createElementNS(t,"path");if(r(s,"d",a),r(s,"fill","none"),r(s,"stroke",h.color||"currentColor"),r(s,"stroke-width",""+l),p){const t=s.getTotalLength();i.push(t),o+=t;}e.appendChild(s),n.push(s);}if(p){let t=0;for(let e=0;e<n.length;e++){const s=n[e],r=i[e],h=o?c*(r/o):0,u=a+t,f=s.style;f.strokeDashoffset=""+r,f.strokeDasharray=""+r,f.animation=`rough-notation-dash ${h}ms ease-out ${u}ms forwards`,t+=h;}}}}class p{constructor(t,e){this._state="unattached",this._resizing=!1,this._seed=Math.floor(Math.random()*2**31),this._lastSizes=[],this._animationDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{this._resizing=!1,"showing"===this._state&&this.haveRectsChanged()&&this.show();},400));},this._e=t,this._config=JSON.parse(JSON.stringify(e)),this.attach();}get animate(){return this._config.animate}set animate(t){this._config.animate=t;}get animationDuration(){return this._config.animationDuration}set animationDuration(t){this._config.animationDuration=t;}get iterations(){return this._config.iterations}set iterations(t){this._config.iterations=t;}get color(){return this._config.color}set color(t){this._config.color!==t&&(this._config.color=t,this.refresh());}get strokeWidth(){return this._config.strokeWidth}set strokeWidth(t){this._config.strokeWidth!==t&&(this._config.strokeWidth=t,this.refresh());}get padding(){return this._config.padding}set padding(t){this._config.padding!==t&&(this._config.padding=t,this.refresh());}attach(){if("unattached"===this._state&&this._e.parentElement){!function(){if(!window.__rno_kf_s){const t=window.__rno_kf_s=document.createElement("style");t.textContent="@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }",document.head.appendChild(t);}}();const e=this._svg=document.createElementNS(t,"svg");e.setAttribute("class","rough-annotation");const s=e.style;s.position="absolute",s.top="0",s.left="0",s.overflow="visible",s.pointerEvents="none",s.width="100px",s.height="100px";const i="highlight"===this._config.type;if(this._e.insertAdjacentElement(i?"beforebegin":"afterend",e),this._state="not-showing",i){const t=window.getComputedStyle(this._e).position;(!t||"static"===t)&&(this._e.style.position="relative");}this.attachListeners();}}detachListeners(){window.removeEventListener("resize",this._resizeListener),this._ro&&this._ro.unobserve(this._e);}attachListeners(){this.detachListeners(),window.addEventListener("resize",this._resizeListener,{passive:!0}),!this._ro&&"ResizeObserver"in window&&(this._ro=new window.ResizeObserver(t=>{for(const e of t)e.contentRect&&this._resizeListener();})),this._ro&&this._ro.observe(this._e);}haveRectsChanged(){if(this._lastSizes.length){const t=this.rects();if(t.length!==this._lastSizes.length)return !0;for(let e=0;e<t.length;e++)if(!this.isSameRect(t[e],this._lastSizes[e]))return !0}return !1}isSameRect(t,e){const s=(t,e)=>Math.round(t)===Math.round(e);return s(t.x,e.x)&&s(t.y,e.y)&&s(t.w,e.w)&&s(t.h,e.h)}isShowing(){return "not-showing"!==this._state}refresh(){this.isShowing()&&!this.pendingRefresh&&(this.pendingRefresh=Promise.resolve().then(()=>{this.isShowing()&&this.show(),delete this.pendingRefresh;}));}show(){switch(this._state){case"unattached":break;case"showing":this.hide(),this._svg&&this.render(this._svg,!0);break;case"not-showing":this.attach(),this._svg&&this.render(this._svg,!1);}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state="not-showing";}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state="unattached",this.detachListeners();}render(t,e){let s=this._config;e&&(s=JSON.parse(JSON.stringify(this._config)),s.animate=!1);const i=this.rects();let n=0;i.forEach(t=>n+=t.w);const o=s.animationDuration||800;let r=0;for(let e=0;e<i.length;e++){const h=o*(i[e].w/n);d(t,i[e],s,r+this._animationDelay,h,this._seed),r+=h;}this._lastSizes=i,this._state="showing";}rects(){const t=[];if(this._svg)if(this._config.multiline){const e=this._e.getClientRects();for(let s=0;s<e.length;s++)t.push(this.svgRect(this._svg,e[s]));}else t.push(this.svgRect(this._svg,this._e.getBoundingClientRect()));return t}svgRect(t,e){const s=t.getBoundingClientRect(),i=e;return {x:(i.x||i.left)-(s.x||s.left),y:(i.y||i.top)-(s.y||s.top),w:i.width,h:i.height}}}function _(t,e){return new p(t,e)}

/* node_modules/svelte-rough-notation/src/RoughNotation.svelte generated by Svelte v3.32.2 */

const RoughNotation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		"visible","animate","animationDuration","animationDelay","color","strokeWidth","padding","iterations","multiline","brackets","_animationGroupDelay","_animationDelay","show","hide","isShowing","annotation"
	]);

	let container;
	let { visible = false } = $$props;
	let { animate = undefined } = $$props;
	let { animationDuration = undefined } = $$props;
	let { animationDelay = undefined } = $$props;
	let { color = undefined } = $$props;
	let { strokeWidth = undefined } = $$props;
	let { padding = undefined } = $$props;
	let { iterations = undefined } = $$props;
	let { multiline = undefined } = $$props;
	let { brackets = undefined } = $$props;
	let { _animationGroupDelay = undefined } = $$props;
	let { _animationDelay = undefined } = $$props;
	const show = () => visible = true;
	const hide = () => visible = false;
	const isShowing = () => visible;
	let { annotation = undefined } = $$props;

	onMount(() => {
		annotation = _(container, {
			animate,
			animationDuration,
			animationDelay,
			color,
			strokeWidth,
			padding,
			iterations,
			multiline,
			brackets,
			// Graceful fallback for if new props are added
			...$$restProps
		});

		return () => annotation.remove();
	});

	if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0) $$bindings.visible(visible);
	if ($$props.animate === void 0 && $$bindings.animate && animate !== void 0) $$bindings.animate(animate);
	if ($$props.animationDuration === void 0 && $$bindings.animationDuration && animationDuration !== void 0) $$bindings.animationDuration(animationDuration);
	if ($$props.animationDelay === void 0 && $$bindings.animationDelay && animationDelay !== void 0) $$bindings.animationDelay(animationDelay);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
	if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
	if ($$props.iterations === void 0 && $$bindings.iterations && iterations !== void 0) $$bindings.iterations(iterations);
	if ($$props.multiline === void 0 && $$bindings.multiline && multiline !== void 0) $$bindings.multiline(multiline);
	if ($$props.brackets === void 0 && $$bindings.brackets && brackets !== void 0) $$bindings.brackets(brackets);
	if ($$props._animationGroupDelay === void 0 && $$bindings._animationGroupDelay && _animationGroupDelay !== void 0) $$bindings._animationGroupDelay(_animationGroupDelay);
	if ($$props._animationDelay === void 0 && $$bindings._animationDelay && _animationDelay !== void 0) $$bindings._animationDelay(_animationDelay);
	if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
	if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0) $$bindings.hide(hide);
	if ($$props.isShowing === void 0 && $$bindings.isShowing && isShowing !== void 0) $$bindings.isShowing(isShowing);
	if ($$props.annotation === void 0 && $$bindings.annotation && annotation !== void 0) $$bindings.annotation(annotation);

	 {
		if (annotation && animate !== undefined) {
			annotation.animate = animate;
		}
	}

	 {
		if (annotation && animationDuration !== undefined) {
			annotation.animationDuration = animationDuration;
		}
	}

	 {
		if (annotation && animationDelay !== undefined) {
			annotation.animationDelay = animationDelay;
		}
	}

	 {
		if (annotation && color !== undefined) {
			annotation.color = color;
		}
	}

	 {
		if (annotation && strokeWidth !== undefined) {
			annotation.strokeWidth = strokeWidth;
		}
	}

	 {
		if (annotation && padding !== undefined) {
			annotation.padding = padding;
		}
	}

	 {
		if (annotation && iterations !== undefined) {
			annotation.iterations = iterations;
		}
	}

	 {
		if (annotation && brackets !== undefined) {
			annotation.brackets = brackets;
		}
	}

	 {
		if (annotation && _animationGroupDelay !== undefined) {
			annotation._animationGroupDelay = _animationGroupDelay;
		}
	}

	 {
		if (annotation && _animationDelay !== undefined) {
			annotation._animationDelay = _animationDelay;
		}
	}

	 {
		if (annotation) {
			if (visible) {
				annotation.show();
			} else {
				annotation.hide();
			}
		}
	}

	return `
<div style="${"display:inline"}"${add_attribute("this", container, 1)}>${slots.default ? slots.default({}) : ``}</div>`;
});

/* src/components/Footer.svelte generated by Svelte v3.32.2 */

const css$c = {
	code: ".footer.svelte-16irf4m.svelte-16irf4m{position:relative;margin-top:1rem;height:8rem;display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-left:2rem;padding-right:2rem;font-weight:300}.footer.svelte-16irf4m p.svelte-16irf4m{margin-right:1.5rem}.links.svelte-16irf4m.svelte-16irf4m{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:10rem}.divider.svelte-16irf4m.svelte-16irf4m{height:1.5rem;width:1px;background-color:#333;opacity:0.3}.icon.svelte-16irf4m.svelte-16irf4m{width:1.2rem;height:1.2rem}.chat.svelte-16irf4m.svelte-16irf4m{margin-top:6rem;display:flex;justify-content:center}.chat.svelte-16irf4m a.svelte-16irf4m{text-decoration:none}@media(max-width: 40rem){.icon.svelte-16irf4m.svelte-16irf4m{width:1rem;height:1rem}.links.svelte-16irf4m.svelte-16irf4m{width:8rem}.chat.svelte-16irf4m.svelte-16irf4m{margin-top:4rem}}",
	map: "{\"version\":3,\"file\":\"Footer.svelte\",\"sources\":[\"Footer.svelte\"],\"sourcesContent\":[\"<script>\\n  import Emoji from \\\"./Emoji.svelte\\\";\\n  import Annotation from \\\"svelte-rough-notation\\\";\\n  import {\\n    FaLinkedinIn,\\n    FaGithub,\\n    FaMediumM,\\n    FaTwitter\\n  } from \\\"svelte-icons/fa\\\";\\n  import LazyLoad from \\\"./HoC/LazyLoad.svelte\\\";\\n  import { getOutboundLink } from \\\"../utils/link.js\\\";\\n  let year = \\\"21\\\";\\n  let month = \\\"April\\\";\\n  let day = \\\"06\\\";\\n  let linkedIn = \\\"https://www.linkedin.com/in/CJKRaymond/\\\";\\n  let github = \\\"https://github.com/cameron-raymond/\\\";\\n  let email = \\\"mailto:cameron.raymond@hey.com?subject=Let's%20Talk%20Data\\\";\\n  let medium = \\\"https://medium.com/@cameronraymond/\\\";\\n  let twitter = \\\"https://twitter.com/CJKRaymond\\\";\\n</script>\\n\\n<style>\\n  .footer {\\n    position: relative;\\n    margin-top: 1rem;\\n    height: 8rem;\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: center;\\n    padding-left: 2rem;\\n    padding-right: 2rem;\\n    font-weight: 300;\\n  }\\n  .footer p {\\n    margin-right: 1.5rem;\\n  }\\n  .links {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    align-items: center;\\n    width: 10rem;\\n  }\\n  .divider {\\n    height: 1.5rem;\\n    width: 1px;\\n    background-color: #333;\\n    opacity: 0.3;\\n  }\\n  .icon {\\n    width: 1.2rem;\\n    height: 1.2rem;\\n  }\\n  .chat {\\n    margin-top: 6rem;\\n    display: flex;\\n    justify-content: center;\\n  }\\n  .chat a {\\n    /* text-decoration: underline;\\n    text-decoration-color: rgb(255, 62, 0);\\n    text-decoration-thickness: 0.11em; */\\n    text-decoration: none;\\n  }\\n  @media (max-width: 40rem) {\\n    .icon {\\n      width: 1rem;\\n      height: 1rem;\\n    }\\n    .links {\\n      width: 8rem;\\n    }\\n    .chat {\\n      margin-top: 4rem;\\n    }\\n  }\\n</style>\\n\\n<div class=\\\"chat\\\">\\n  <LazyLoad let:visible>\\n    {#if visible}\\n      <h3>\\n        Let's\\n        <a\\n          aria-label=\\\"Email\\\"\\n          href={email}\\n          on:click={() => getOutboundLink(email)}>\\n          <Annotation\\n            visible={true}\\n            type=\\\"underline\\\"\\n            padding={-1}\\n            color=\\\"rgb(255, 62, 0)\\\">\\n            Talk Data\\n          </Annotation>\\n        </a>\\n      </h3>\\n    {/if}\\n  </LazyLoad>\\n\\n</div>\\n<div class=\\\"footer\\\">\\n  <p>\\n    <Emoji symbol=\\\"👨‍🎨\\\" />\\n    +\\n    <Emoji symbol=\\\"👷‍♂️\\\" />\\n    by me\\n    <br />\\n    Last updated\\n    <a\\n      aria-label=\\\"{month}\\n      {day}, {year}\\\"\\n      href=\\\"https://www.onthisday.com/events/{month}/{day}\\\">\\n      {month} {day}, '{year}\\n    </a>\\n  </p>\\n  <div class=\\\"links\\\">\\n    <a\\n      aria-label=\\\"LinkedIn\\\"\\n      href={linkedIn}\\n      class=\\\"icon\\\"\\n      on:click={() => getOutboundLink(linkedIn)}>\\n      <FaLinkedinIn />\\n    </a>\\n    <div class=\\\"divider\\\" />\\n    <a\\n      aria-label=\\\"twitter\\\"\\n      class=\\\"icon\\\"\\n      href={twitter}\\n      on:click={() => getOutboundLink(twitter)}>\\n      <FaTwitter />\\n    </a>\\n    <div class=\\\"divider\\\" />\\n    <a\\n      aria-label=\\\"Github\\\"\\n      href={github}\\n      class=\\\"icon\\\"\\n      on:click={() => getOutboundLink(github)}>\\n      <FaGithub />\\n    </a>\\n    <div class=\\\"divider\\\" />\\n    <a\\n      aria-label=\\\"Medium\\\"\\n      href={medium}\\n      class=\\\"icon\\\"\\n      on:click={() => getOutboundLink(medium)}>\\n      <FaMediumM />\\n    </a>\\n  </div>\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAsBE,OAAO,8BAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,sBAAO,CAAC,CAAC,eAAC,CAAC,AACT,YAAY,CAAE,MAAM,AACtB,CAAC,AACD,MAAM,8BAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,AACd,CAAC,AACD,QAAQ,8BAAC,CAAC,AACR,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,GAAG,CACV,gBAAgB,CAAE,IAAI,CACtB,OAAO,CAAE,GAAG,AACd,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,AAChB,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,oBAAK,CAAC,CAAC,eAAC,CAAC,AAIP,eAAe,CAAE,IAAI,AACvB,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AACD,MAAM,8BAAC,CAAC,AACN,KAAK,CAAE,IAAI,AACb,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,UAAU,CAAE,IAAI,AAClB,CAAC,AACH,CAAC\"}"
};

let year = "21";
let month = "April";
let day = "06";
let linkedIn$1 = "https://www.linkedin.com/in/CJKRaymond/";
let github = "https://github.com/cameron-raymond/";
let email = "mailto:cameron.raymond@hey.com?subject=Let's%20Talk%20Data";
let medium = "https://medium.com/@cameronraymond/";
let twitter$1 = "https://twitter.com/CJKRaymond";

const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$c);

	return `<div class="${"chat svelte-16irf4m"}">${validate_component(LazyLoad, "LazyLoad").$$render($$result, {}, {}, {
		default: ({ visible }) => `${visible
		? `<h3>Let&#39;s
        <a aria-label="${"Email"}"${add_attribute("href", email, 0)} class="${"svelte-16irf4m"}">${validate_component(RoughNotation, "Annotation").$$render(
				$$result,
				{
					visible: true,
					type: "underline",
					padding: -1,
					color: "rgb(255, 62, 0)"
				},
				{},
				{
					default: () => `Talk Data
          `
				}
			)}</a></h3>`
		: ``}`
	})}</div>
<div class="${"footer svelte-16irf4m"}"><p class="${"svelte-16irf4m"}">${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "👨‍🎨" }, {}, {})}
    +
    ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "👷‍♂️" }, {}, {})}
    by me
    <br>
    Last updated
    <a aria-label="${escape(month) + "\n      " + escape(day) + ", " + escape(year)}" href="${"https://www.onthisday.com/events/" + escape(month) + "/" + escape(day)}">${escape(month)} ${escape(day)}, &#39;${escape(year)}</a></p>
  <div class="${"links svelte-16irf4m"}"><a aria-label="${"LinkedIn"}"${add_attribute("href", linkedIn$1, 0)} class="${"icon svelte-16irf4m"}">${validate_component(FaLinkedinIn, "FaLinkedinIn").$$render($$result, {}, {}, {})}</a>
    <div class="${"divider svelte-16irf4m"}"></div>
    <a aria-label="${"twitter"}" class="${"icon svelte-16irf4m"}"${add_attribute("href", twitter$1, 0)}>${validate_component(FaTwitter, "FaTwitter").$$render($$result, {}, {}, {})}</a>
    <div class="${"divider svelte-16irf4m"}"></div>
    <a aria-label="${"Github"}"${add_attribute("href", github, 0)} class="${"icon svelte-16irf4m"}">${validate_component(FaGithub, "FaGithub").$$render($$result, {}, {}, {})}</a>
    <div class="${"divider svelte-16irf4m"}"></div>
    <a aria-label="${"Medium"}"${add_attribute("href", medium, 0)} class="${"icon svelte-16irf4m"}">${validate_component(FaMediumM, "FaMediumM").$$render($$result, {}, {}, {})}</a></div></div>`;
});

const CONTEXT_KEY = {};

/* src/routes/_error.svelte generated by Svelte v3.32.2 */

const css$d = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$d);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-8od9u6"}">${escape(status)}</h1>

<p class="${"svelte-8od9u6"}">${escape(error.message)}</p>

${ ``}`;
});

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.32.2 */

const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = writable(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

const stores = {
	page: page_store({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

stores.session.subscribe(async value => {

	return;
});

const stores$1 = () => getContext(CONTEXT_KEY);

/* src/components/GoogleAnalytics.svelte generated by Svelte v3.32.2 */

const GoogleAnalytics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $page, $$unsubscribe_page;
	const { page } = stores$1();
	$$unsubscribe_page = subscribe(page, value => $page = value);

	 {
		{
			if (typeof gtag !== "undefined") {
				gtag("config", "UA-133541363-2", { page_path: $page.path });
			}
		}
	}

	$$unsubscribe_page();
	return ``;
});

/* src/routes/_layout.svelte generated by Svelte v3.32.2 */

const css$e = {
	code: "main.svelte-y41jpk{display:flex;flex-direction:column;position:relative;padding-left:2rem;padding-right:2rem;min-height:80vh}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n  import Nav from \\\"../components/Nav.svelte\\\";\\n  import Newsletter from \\\"../components/NewsLetter.svelte\\\"\\n  import HiddenLinks from \\\"../components/HiddenLinks.svelte\\\";\\n  import Footer from \\\"../components/Footer.svelte\\\";\\n  import GoogleAnalytics from \\\"../components/GoogleAnalytics.svelte\\\";\\n  export let segment;\\n  let h = 1000;\\n  let y = 0;\\n</script>\\n\\n<style>\\n  main {\\n    display: flex;\\n    flex-direction: column;\\n    position: relative;\\n    padding-left: 2rem;\\n    padding-right: 2rem;\\n    min-height: 80vh;\\n  }\\n</style>\\n\\n<svelte:window bind:scrollY={y} />\\n<GoogleAnalytics />\\n<Nav {segment} />\\n<main bind:clientHeight={h}>\\n  <slot/>\\n</main>\\n<Footer {h} {y} />\\n<HiddenLinks />\\n\"],\"names\":[],\"mappings\":\"AAYE,IAAI,cAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,QAAQ,CAAE,QAAQ,CAClB,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,AAClB,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { segment } = $$props;
	let h = 1000;
	let y = 0;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$e);

	return `
${validate_component(GoogleAnalytics, "GoogleAnalytics").$$render($$result, {}, {}, {})}
${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}
<main class="${"svelte-y41jpk"}">${slots.default ? slots.default({}) : ``}</main>
${validate_component(Footer, "Footer").$$render($$result, { h, y }, {}, {})}
${validate_component(HiddenLinks, "HiddenLinks").$$render($$result, {}, {}, {})}`;
});

// This file is generated by Sapper — do not edit it!

const d$1 = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// index.json.js
			pattern: /^\/index\.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// sitemap.xml.js
			pattern: /^\/sitemap\.xml$/,
			handlers: route_1,
			params: () => ({})
		},

		{
			// about/content.json.js
			pattern: /^\/about\/content\.json$/,
			handlers: route_2,
			params: () => ({})
		},

		{
			// about/intro.json.js
			pattern: /^\/about\/intro\.json$/,
			handlers: route_3,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?)\.json$/,
			handlers: route_4,
			params: match => ({ slug: d$1(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes, preload: preload }
			]
		},

		{
			// about/index.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about/index.svelte", component: About, preload: preload$1 }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload$2 }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D, preload: preload$3, params: match => ({ slug: d$1(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs$2.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs$2.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		let session;
		try {
			session = await session_getter(req, res);
		} catch (err) {
			return bail(req, res, err);
		}

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				opts = Object.assign({}, opts);

				const include_credentials = (
					opts.credentials === 'include' ||
					opts.credentials !== 'omit' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
				);

				if (include_credentials) {
					opts.headers = Object.assign({}, opts.headers);

					const cookies = Object.assign(
						{},
						cookie.parse(req.headers.cookie || ''),
						cookie.parse(opts.headers.cookie || '')
					);

					const set_cookie = res.getHeader('Set-Cookie');
					(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
						const match = /([^=]+)=([^;]+)/.exec(str);
						if (match) cookies[match[1]] = match[2];
					});

					const str = Object.keys(cookies)
						.map(key => `${key}=${cookies[key]}`)
						.join('; ');

					opts.headers.cookie = str;

					if (!opts.headers.authorization && req.headers.authorization) {
						opts.headers.authorization = req.headers.authorization;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && serialize_error(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs$2.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
	if (!error) return null;
	let serialized = try_serialize(error);
	if (!serialized) {
		const { name, message, stack } = error ;
		serialized = try_serialize({ name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs$2.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs$2.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs$2.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		"/",
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
