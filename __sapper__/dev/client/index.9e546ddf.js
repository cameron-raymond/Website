import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, T as onMount, U as onDestroy, M as fly, N as fade, E as Emoji, w as validate_each_argument, e as element, t as text, y as create_component, a as space, c as claim_element, b as children, h as claim_text, z as claim_component, g as detach_dev, f as claim_space, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, A as mount_component, p as transition_in, r as transition_out, u as check_outros, J as add_render_callback, R as create_in_transition, P as create_out_transition, B as destroy_component, x as destroy_each, G as binding_callbacks, H as bind, I as add_flush_callback, n as set_data_dev, O as query_selector_all, q as group_outros, V as HtmlTag } from './client.7c89f680.js';
import { T as Tag } from './Tag.2ba650d9.js';
import { C as Card, P as PostFilter } from './PostFilter.273b24d9.js';

/* src/routes/blog/index.svelte generated by Svelte v3.32.2 */
const file = "src/routes/blog/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	child_ctx[7] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (74:0) {#if visible}
function create_if_block(ctx) {
	let h1;
	let t0;
	let emoji;
	let h1_intro;
	let h1_outro;
	let t1;
	let div;
	let p;
	let t2;
	let div_intro;
	let div_outro;
	let t3;
	let span0;
	let span0_intro;
	let span0_outro;
	let t4;
	let span1;
	let span1_intro;
	let span1_outro;
	let current;
	emoji = new Emoji({ props: { symbol: "💻" }, $$inline: true });
	let if_block = /*tags*/ ctx[2] && create_if_block_1(ctx);
	let each_value = /*visible*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text("Explore My work\n    ");
			create_component(emoji.$$.fragment);
			t1 = space();
			div = element("div");
			p = element("p");
			t2 = text("AI and network science; politics and policy. Below are some of my\n      ramblings. This is meant to be a more accessible outlet for the exciting\n      but all too often inaccessible research done in the world of computational\n      social science. All opinions are my own.");
			t3 = space();
			span0 = element("span");
			if (if_block) if_block.c();
			t4 = space();
			span1 = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", { id: true, class: true });
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Explore My work\n    ");
			claim_component(emoji.$$.fragment, h1_nodes);
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			p = claim_element(div_nodes, "P", {});
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, "AI and network science; politics and policy. Below are some of my\n      ramblings. This is meant to be a more accessible outlet for the exciting\n      but all too often inaccessible research done in the world of computational\n      social science. All opinions are my own.");
			p_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			span0 = claim_element(nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			if (if_block) if_block.l(span0_nodes);
			span0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			span1 = claim_element(nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(span1_nodes);
			}

			span1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "id", "blog");
			attr_dev(h1, "class", "svelte-1odeufq");
			add_location(h1, file, 74, 2, 1672);
			add_location(p, file, 85, 4, 1951);
			attr_dev(div, "class", "subtitle svelte-1odeufq");
			add_location(div, file, 81, 2, 1830);
			attr_dev(span0, "class", "postFilter svelte-1odeufq");
			add_location(span0, file, 92, 2, 2254);
			attr_dev(span1, "class", "content svelte-1odeufq");
			add_location(span1, file, 100, 2, 2455);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t0);
			mount_component(emoji, h1, null);
			insert_dev(target, t1, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, p);
			append_dev(p, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, span0, anchor);
			if (if_block) if_block.m(span0, null);
			insert_dev(target, t4, anchor);
			insert_dev(target, span1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span1, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*tags*/ ctx[2]) if_block.p(ctx, dirty);

			if (dirty & /*visible*/ 2) {
				each_value = /*visible*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(span1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(emoji.$$.fragment, local);

			add_render_callback(() => {
				if (h1_outro) h1_outro.end(1);
				if (!h1_intro) h1_intro = create_in_transition(h1, fade, { delay: 500, duration: 500 });
				h1_intro.start();
			});

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);
				if (!div_intro) div_intro = create_in_transition(div, fly, { delay: 550, x: -50, duration: 500 });
				div_intro.start();
			});

			transition_in(if_block);

			add_render_callback(() => {
				if (span0_outro) span0_outro.end(1);
				if (!span0_intro) span0_intro = create_in_transition(span0, fly, { delay: 550, x: -50, duration: 500 });
				span0_intro.start();
			});

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			add_render_callback(() => {
				if (span1_outro) span1_outro.end(1);
				if (!span1_intro) span1_intro = create_in_transition(span1, fly, { delay: 575, y: 50, duration: 200 });
				span1_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			transition_out(emoji.$$.fragment, local);
			if (h1_intro) h1_intro.invalidate();
			h1_outro = create_out_transition(h1, fly, { y: 50, duration: 300 });
			if (div_intro) div_intro.invalidate();
			div_outro = create_out_transition(div, fly, { y: 50, duration: 300 });
			transition_out(if_block);
			if (span0_intro) span0_intro.invalidate();
			span0_outro = create_out_transition(span0, fly, { y: 50, duration: 300 });
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			if (span1_intro) span1_intro.invalidate();
			span1_outro = create_out_transition(span1, fly, { y: 50, duration: 300 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			destroy_component(emoji);
			if (detaching && h1_outro) h1_outro.end();
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div);
			if (detaching && div_outro) div_outro.end();
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(span0);
			if (if_block) if_block.d();
			if (detaching && span0_outro) span0_outro.end();
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(span1);
			destroy_each(each_blocks, detaching);
			if (detaching && span1_outro) span1_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(74:0) {#if visible}",
		ctx
	});

	return block;
}

// (97:4) {#if tags}
function create_if_block_1(ctx) {
	let postfilter;
	let updating_activeTags;
	let current;

	function postfilter_activeTags_binding(value) {
		/*postfilter_activeTags_binding*/ ctx[4](value);
	}

	let postfilter_props = { tags: /*tags*/ ctx[2] };

	if (/*activeTags*/ ctx[0] !== void 0) {
		postfilter_props.activeTags = /*activeTags*/ ctx[0];
	}

	postfilter = new PostFilter({ props: postfilter_props, $$inline: true });
	binding_callbacks.push(() => bind(postfilter, "activeTags", postfilter_activeTags_binding));

	const block = {
		c: function create() {
			create_component(postfilter.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(postfilter.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(postfilter, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const postfilter_changes = {};

			if (!updating_activeTags && dirty & /*activeTags*/ 1) {
				updating_activeTags = true;
				postfilter_changes.activeTags = /*activeTags*/ ctx[0];
				add_flush_callback(() => updating_activeTags = false);
			}

			postfilter.$set(postfilter_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(postfilter.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(postfilter.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(postfilter, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(97:4) {#if tags}",
		ctx
	});

	return block;
}

// (119:14) {#each post.tags as tagId}
function create_each_block_1(ctx) {
	let tag;
	let current;

	tag = new Tag({
			props: { tagId: /*tagId*/ ctx[8] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(tag.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(tag.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(tag, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const tag_changes = {};
			if (dirty & /*visible*/ 2) tag_changes.tagId = /*tagId*/ ctx[8];
			tag.$set(tag_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(tag.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(tag.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(tag, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(119:14) {#each post.tags as tagId}",
		ctx
	});

	return block;
}

// (105:4) {#each visible as post, i}
function create_each_block(ctx) {
	let span3;
	let span0;
	let h3;
	let emoji;
	let t0;
	let h2;
	let a;
	let t1_value = /*post*/ ctx[5].title + "";
	let t1;
	let a_href_value;
	let t2;
	let p1;
	let html_tag;
	let raw_value = /*post*/ ctx[5].blurb + "";
	let t3;
	let span2;
	let span1;
	let t4;
	let p0;
	let t5_value = /*post*/ ctx[5].fullDate + "";
	let t5;
	let t6;
	let current;

	emoji = new Emoji({
			props: { symbol: /*post*/ ctx[5].emoji },
			$$inline: true
		});

	let each_value_1 = /*post*/ ctx[5].tags;
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			span3 = element("span");
			span0 = element("span");
			h3 = element("h3");
			create_component(emoji.$$.fragment);
			t0 = space();
			h2 = element("h2");
			a = element("a");
			t1 = text(t1_value);
			t2 = space();
			p1 = element("p");
			t3 = space();
			span2 = element("span");
			span1 = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			p0 = element("p");
			t5 = text(t5_value);
			t6 = space();
			this.h();
		},
		l: function claim(nodes) {
			span3 = claim_element(nodes, "SPAN", {});
			var span3_nodes = children(span3);
			span0 = claim_element(span3_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			h3 = claim_element(span0_nodes, "H3", {});
			var h3_nodes = children(h3);
			claim_component(emoji.$$.fragment, h3_nodes);
			h3_nodes.forEach(detach_dev);
			t0 = claim_space(span0_nodes);
			h2 = claim_element(span0_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			a = claim_element(h2_nodes, "A", { rel: true, href: true });
			var a_nodes = children(a);
			t1 = claim_text(a_nodes, t1_value);
			a_nodes.forEach(detach_dev);
			h2_nodes.forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			t2 = claim_space(span3_nodes);
			p1 = claim_element(span3_nodes, "P", { class: true });
			var p1_nodes = children(p1);
			t3 = claim_space(p1_nodes);
			span2 = claim_element(p1_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			span1 = claim_element(span2_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(span1_nodes);
			}

			span1_nodes.forEach(detach_dev);
			t4 = claim_space(span2_nodes);
			p0 = claim_element(span2_nodes, "P", {});
			var p0_nodes = children(p0);
			t5 = claim_text(p0_nodes, t5_value);
			p0_nodes.forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			p1_nodes.forEach(detach_dev);
			t6 = claim_space(span3_nodes);
			span3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h3, file, 107, 10, 2654);
			attr_dev(a, "rel", "prefetch");
			attr_dev(a, "href", a_href_value = "blog/" + /*post*/ ctx[5].slug + "/");
			add_location(a, file, 111, 12, 2744);
			attr_dev(h2, "class", "svelte-1odeufq");
			add_location(h2, file, 110, 10, 2727);
			attr_dev(span0, "class", "title svelte-1odeufq");
			add_location(span0, file, 106, 8, 2623);
			html_tag = new HtmlTag(t3);
			attr_dev(span1, "class", "svelte-1odeufq");
			add_location(span1, file, 117, 12, 2936);
			add_location(p0, file, 122, 12, 3070);
			attr_dev(span2, "class", "tags svelte-1odeufq");
			add_location(span2, file, 116, 10, 2904);
			attr_dev(p1, "class", "subtitle svelte-1odeufq");
			add_location(p1, file, 114, 8, 2844);
			add_location(span3, file, 105, 6, 2608);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span3, anchor);
			append_dev(span3, span0);
			append_dev(span0, h3);
			mount_component(emoji, h3, null);
			append_dev(span0, t0);
			append_dev(span0, h2);
			append_dev(h2, a);
			append_dev(a, t1);
			append_dev(span3, t2);
			append_dev(span3, p1);
			html_tag.m(raw_value, p1);
			append_dev(p1, t3);
			append_dev(p1, span2);
			append_dev(span2, span1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span1, null);
			}

			append_dev(span2, t4);
			append_dev(span2, p0);
			append_dev(p0, t5);
			append_dev(span3, t6);
			current = true;
		},
		p: function update(ctx, dirty) {
			const emoji_changes = {};
			if (dirty & /*visible*/ 2) emoji_changes.symbol = /*post*/ ctx[5].emoji;
			emoji.$set(emoji_changes);
			if ((!current || dirty & /*visible*/ 2) && t1_value !== (t1_value = /*post*/ ctx[5].title + "")) set_data_dev(t1, t1_value);

			if (!current || dirty & /*visible*/ 2 && a_href_value !== (a_href_value = "blog/" + /*post*/ ctx[5].slug + "/")) {
				attr_dev(a, "href", a_href_value);
			}

			if ((!current || dirty & /*visible*/ 2) && raw_value !== (raw_value = /*post*/ ctx[5].blurb + "")) html_tag.p(raw_value);

			if (dirty & /*visible*/ 2) {
				each_value_1 = /*post*/ ctx[5].tags;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(span1, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if ((!current || dirty & /*visible*/ 2) && t5_value !== (t5_value = /*post*/ ctx[5].fullDate + "")) set_data_dev(t5, t5_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(emoji.$$.fragment, local);

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(emoji.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span3);
			destroy_component(emoji);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(105:4) {#each visible as post, i}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let meta0;
	let meta1;
	let link;
	let meta2;
	let meta3;
	let meta4;
	let meta5;
	let meta6;
	let meta7;
	let meta8;
	let meta9;
	let meta10;
	let meta11;
	let current;
	let if_block = /*visible*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			t = space();
			meta0 = element("meta");
			meta1 = element("meta");
			link = element("link");
			meta2 = element("meta");
			meta3 = element("meta");
			meta4 = element("meta");
			meta5 = element("meta");
			meta6 = element("meta");
			meta7 = element("meta");
			meta8 = element("meta");
			meta9 = element("meta");
			meta10 = element("meta");
			meta11 = element("meta");
			this.h();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			t = claim_space(nodes);
			const head_nodes = query_selector_all("[data-svelte=\"svelte-12fjclh\"]", document.head);
			meta0 = claim_element(head_nodes, "META", { name: true, content: true });
			meta1 = claim_element(head_nodes, "META", { name: true, content: true });
			link = claim_element(head_nodes, "LINK", { rel: true, href: true });
			meta2 = claim_element(head_nodes, "META", { property: true, content: true });
			meta3 = claim_element(head_nodes, "META", { property: true, content: true });
			meta4 = claim_element(head_nodes, "META", { property: true, content: true });
			meta5 = claim_element(head_nodes, "META", { name: true, content: true });
			meta6 = claim_element(head_nodes, "META", { property: true, content: true });
			meta7 = claim_element(head_nodes, "META", { property: true, content: true });
			meta8 = claim_element(head_nodes, "META", { property: true, content: true });
			meta9 = claim_element(head_nodes, "META", { property: true, content: true });
			meta10 = claim_element(head_nodes, "META", { property: true, content: true });
			meta11 = claim_element(head_nodes, "META", { property: true, content: true });
			head_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "💻Blog - Cameron Raymond💻";
			attr_dev(meta0, "name", "description");
			attr_dev(meta0, "content", "Cameron Raymond's blog. AI and network science; politics and\n    policy. Below are some of my ramblings. This is meant to be a more\n    accessible outlet for the exciting but all too often inaccessible research\n    done in the world of computational social science. All opinions are my own.");
			add_location(meta0, file, 132, 2, 3227);
			attr_dev(meta1, "name", "keywords");
			attr_dev(meta1, "content", "Cameron Raymond, University of Oxford, Oxford University, Data\n    Science, Social Data Sience, Data Scientist");
			add_location(meta1, file, 138, 2, 3566);
			attr_dev(link, "rel", "canonical");
			attr_dev(link, "href", "https://cameronraymond.me/blog/");
			add_location(link, file, 142, 2, 3722);
			attr_dev(meta2, "property", "og:type");
			attr_dev(meta2, "content", "website");
			add_location(meta2, file, 145, 2, 3822);
			attr_dev(meta3, "property", "og:url");
			attr_dev(meta3, "content", "https://cameronraymond.me/blog/");
			add_location(meta3, file, 146, 2, 3870);
			attr_dev(meta4, "property", "og:title");
			attr_dev(meta4, "content", "💻Blog - Cameron Raymond💻");
			add_location(meta4, file, 147, 2, 3941);
			attr_dev(meta5, "name", "og:description");
			attr_dev(meta5, "content", "Cameron Raymond's blog. AI and network science; politics and\n    policy. Below are some of my ramblings. This is meant to be a more\n    accessible outlet for the exciting but all too often inaccessible research\n    done in the world of computational social science. All opinions are my own.");
			add_location(meta5, file, 148, 2, 4009);
			attr_dev(meta6, "property", "og:image");
			attr_dev(meta6, "content", "https://cameronraymond.me/networkd.png");
			add_location(meta6, file, 154, 2, 4351);
			attr_dev(meta7, "property", "twitter:card");
			attr_dev(meta7, "content", "summary");
			add_location(meta7, file, 157, 2, 4451);
			attr_dev(meta8, "property", "twitter:url");
			attr_dev(meta8, "content", "https://cameronraymond.me/blog/");
			add_location(meta8, file, 158, 2, 4504);
			attr_dev(meta9, "property", "twitter:title");
			attr_dev(meta9, "content", "💻Blog - Cameron Raymond💻");
			add_location(meta9, file, 159, 2, 4580);
			attr_dev(meta10, "property", "twitter:description");
			attr_dev(meta10, "content", "Cameron Raymond's blog. AI and network science; politics and\n    policy. Below are some of my ramblings. This is meant to be a more\n    accessible outlet for the exciting but all too often inaccessible research\n    done in the world of computational social science. All opinions are my own..");
			add_location(meta10, file, 160, 2, 4653);
			attr_dev(meta11, "property", "twitter:image");
			attr_dev(meta11, "content", "https://cameronraymond.me/networkd.png");
			add_location(meta11, file, 166, 2, 5005);
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, t, anchor);
			append_dev(document.head, meta0);
			append_dev(document.head, meta1);
			append_dev(document.head, link);
			append_dev(document.head, meta2);
			append_dev(document.head, meta3);
			append_dev(document.head, meta4);
			append_dev(document.head, meta5);
			append_dev(document.head, meta6);
			append_dev(document.head, meta7);
			append_dev(document.head, meta8);
			append_dev(document.head, meta9);
			append_dev(document.head, meta10);
			append_dev(document.head, meta11);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*visible*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*visible*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(t);
			detach_dev(meta0);
			detach_dev(meta1);
			detach_dev(link);
			detach_dev(meta2);
			detach_dev(meta3);
			detach_dev(meta4);
			detach_dev(meta5);
			detach_dev(meta6);
			detach_dev(meta7);
			detach_dev(meta8);
			detach_dev(meta9);
			detach_dev(meta10);
			detach_dev(meta11);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload({ params, query }) {
	let posts = await this.fetch(`../index.json`).then(r => r.json());
	posts = [].concat(...posts.filter(x => x.type === "bp"));
	return { posts };
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Blog", slots, []);
	let { posts } = $$props;
	let visible = false;

	let activeTags = posts
	? new Set([].concat(...posts.map(x => x.tags)))
	: undefined;

	let tags = posts ? [...activeTags] : undefined;

	onMount(() => {
		$$invalidate(1, visible = true);
	});

	const writable_props = ["posts"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Blog> was created with unknown prop '${key}'`);
	});

	function postfilter_activeTags_binding(value) {
		activeTags = value;
		$$invalidate(0, activeTags);
	}

	$$self.$$set = $$props => {
		if ("posts" in $$props) $$invalidate(3, posts = $$props.posts);
	};

	$$self.$capture_state = () => ({
		preload,
		onMount,
		onDestroy,
		fly,
		fade,
		Tag,
		Card,
		PostFilter,
		Emoji,
		posts,
		visible,
		activeTags,
		tags
	});

	$$self.$inject_state = $$props => {
		if ("posts" in $$props) $$invalidate(3, posts = $$props.posts);
		if ("visible" in $$props) $$invalidate(1, visible = $$props.visible);
		if ("activeTags" in $$props) $$invalidate(0, activeTags = $$props.activeTags);
		if ("tags" in $$props) $$invalidate(2, tags = $$props.tags);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*posts, activeTags*/ 9) {
			// Make a post visible if its type is set to visible and one of the tags are present.
			 $$invalidate(1, visible = posts.filter(post => post.tags.some(tag => activeTags.has(tag))));
		}
	};

	return [activeTags, visible, tags, posts, postfilter_activeTags_binding];
}

class Blog extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { posts: 3 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Blog",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*posts*/ ctx[3] === undefined && !("posts" in props)) {
			console.warn("<Blog> was created without expected prop 'posts'");
		}
	}

	get posts() {
		throw new Error("<Blog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set posts(value) {
		throw new Error("<Blog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Blog;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOWU1NDZkZGYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCBxdWVyeSB9KSB7XG4gICAgbGV0IHBvc3RzID0gYXdhaXQgdGhpcy5mZXRjaChgLi4vaW5kZXguanNvbmApLnRoZW4ociA9PiByLmpzb24oKSk7XG4gICAgcG9zdHMgPSBbXS5jb25jYXQoLi4ucG9zdHMuZmlsdGVyKHggPT4geC50eXBlID09PSBcImJwXCIpKTtcbiAgICByZXR1cm4geyBwb3N0cyB9O1xuICB9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCwgb25EZXN0cm95IH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBpbXBvcnQgeyBmbHksIGZhZGUgfSBmcm9tIFwic3ZlbHRlL3RyYW5zaXRpb25cIjtcbiAgaW1wb3J0IFRhZyBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9UYWcuc3ZlbHRlXCI7XG4gIGltcG9ydCBDYXJkIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0NhcmQuc3ZlbHRlXCI7XG4gIGltcG9ydCBQb3N0RmlsdGVyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1Bvc3RGaWx0ZXIuc3ZlbHRlXCI7XG4gIGltcG9ydCBFbW9qaSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FbW9qaS5zdmVsdGVcIjtcbiAgZXhwb3J0IGxldCBwb3N0cztcbiAgbGV0IHZpc2libGUgPSBmYWxzZTtcbiAgbGV0IGFjdGl2ZVRhZ3MgPSBwb3N0c1xuICAgID8gbmV3IFNldChbXS5jb25jYXQoLi4ucG9zdHMubWFwKHggPT4geC50YWdzKSkpXG4gICAgOiB1bmRlZmluZWQ7XG4gIGxldCB0YWdzID0gcG9zdHMgPyBbLi4uYWN0aXZlVGFnc10gOiB1bmRlZmluZWQ7XG4gIC8vIE1ha2UgYSBwb3N0IHZpc2libGUgaWYgaXRzIHR5cGUgaXMgc2V0IHRvIHZpc2libGUgYW5kIG9uZSBvZiB0aGUgdGFncyBhcmUgcHJlc2VudC5cbiAgJDogdmlzaWJsZSA9IHBvc3RzLmZpbHRlcihwb3N0ID0+IHBvc3QudGFncy5zb21lKHRhZyA9PiBhY3RpdmVUYWdzLmhhcyh0YWcpKSk7XG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIHZpc2libGUgPSB0cnVlO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIC5jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIHdpZHRoOiA4MHZ3O1xuICAgIG1heC13aWR0aDogNDByZW07XG4gIH1cbiAgLnN1YnRpdGxlIHtcbiAgICBjb2xvcjogIzU1NTtcbiAgICBtYXgtd2lkdGg6IDQwcmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgfVxuICAudGl0bGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgfVxuICAudGl0bGUgaDIge1xuICAgIG1hcmdpbi1sZWZ0OiAwLjdyZW07XG4gIH1cbiAgaDEge1xuICAgIG1hcmdpbi10b3A6IDRyZW07XG4gICAgbWF4LXdpZHRoOiA1OHJlbTtcbiAgfVxuXG4gIC50YWdzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXg6IDE7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICB9XG4gIC5wb3N0RmlsdGVyIHtcbiAgICBtYXJnaW4tYm90dG9tOiAzcmVtO1xuICB9XG4gIC50YWdzIHNwYW4ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQwcmVtKSB7XG4gICAgLnRpdGxlIGgyIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjRyZW07XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG57I2lmIHZpc2libGV9XG4gIDxoMVxuICAgIGlkPVwiYmxvZ1wiXG4gICAgaW46ZmFkZT17eyBkZWxheTogNTAwLCBkdXJhdGlvbjogNTAwIH19XG4gICAgb3V0OmZseT17eyB5OiA1MCwgZHVyYXRpb246IDMwMCB9fT5cbiAgICBFeHBsb3JlIE15IHdvcmtcbiAgICA8RW1vamkgc3ltYm9sPVwi8J+Su1wiIC8+XG4gIDwvaDE+XG4gIDxkaXZcbiAgICBjbGFzcz1cInN1YnRpdGxlXCJcbiAgICBpbjpmbHk9e3sgZGVsYXk6IDU1MCwgeDogLTUwLCBkdXJhdGlvbjogNTAwIH19XG4gICAgb3V0OmZseT17eyB5OiA1MCwgZHVyYXRpb246IDMwMCB9fT5cbiAgICA8cD5cbiAgICAgIEFJIGFuZCBuZXR3b3JrIHNjaWVuY2U7IHBvbGl0aWNzIGFuZCBwb2xpY3kuIEJlbG93IGFyZSBzb21lIG9mIG15XG4gICAgICByYW1ibGluZ3MuIFRoaXMgaXMgbWVhbnQgdG8gYmUgYSBtb3JlIGFjY2Vzc2libGUgb3V0bGV0IGZvciB0aGUgZXhjaXRpbmdcbiAgICAgIGJ1dCBhbGwgdG9vIG9mdGVuIGluYWNjZXNzaWJsZSByZXNlYXJjaCBkb25lIGluIHRoZSB3b3JsZCBvZiBjb21wdXRhdGlvbmFsXG4gICAgICBzb2NpYWwgc2NpZW5jZS4gQWxsIG9waW5pb25zIGFyZSBteSBvd24uXG4gICAgPC9wPlxuICA8L2Rpdj5cbiAgPHNwYW5cbiAgICBjbGFzcz1cInBvc3RGaWx0ZXJcIlxuICAgIGluOmZseT17eyBkZWxheTogNTUwLCB4OiAtNTAsIGR1cmF0aW9uOiA1MDAgfX1cbiAgICBvdXQ6Zmx5PXt7IHk6IDUwLCBkdXJhdGlvbjogMzAwIH19PlxuICAgIHsjaWYgdGFnc31cbiAgICAgIDxQb3N0RmlsdGVyIHt0YWdzfSBiaW5kOmFjdGl2ZVRhZ3MgLz5cbiAgICB7L2lmfVxuICA8L3NwYW4+XG4gIDxzcGFuXG4gICAgY2xhc3M9XCJjb250ZW50XCJcbiAgICBpbjpmbHk9e3sgZGVsYXk6IDU3NSwgeTogNTAsIGR1cmF0aW9uOiAyMDAgfX1cbiAgICBvdXQ6Zmx5PXt7IHk6IDUwLCBkdXJhdGlvbjogMzAwIH19PlxuICAgIHsjZWFjaCB2aXNpYmxlIGFzIHBvc3QsIGl9XG4gICAgICA8c3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgIDxFbW9qaSBzeW1ib2w9e3Bvc3QuZW1vaml9IC8+XG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8aDI+XG4gICAgICAgICAgICA8YSByZWw9XCJwcmVmZXRjaFwiIGhyZWY9XCJibG9nL3twb3N0LnNsdWd9L1wiPntwb3N0LnRpdGxlfTwvYT5cbiAgICAgICAgICA8L2gyPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxwIGNsYXNzPVwic3VidGl0bGVcIj5cbiAgICAgICAgICB7QGh0bWwgcG9zdC5ibHVyYn1cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZ3NcIj5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICB7I2VhY2ggcG9zdC50YWdzIGFzIHRhZ0lkfVxuICAgICAgICAgICAgICAgIDxUYWcge3RhZ0lkfSAvPlxuICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8cD57cG9zdC5mdWxsRGF0ZX08L3A+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICA8L3NwYW4+XG4gICAgey9lYWNofVxuICA8L3NwYW4+XG57L2lmfVxuXG48c3ZlbHRlOmhlYWQ+XG4gIDx0aXRsZT7wn5K7QmxvZyAtIENhbWVyb24gUmF5bW9uZPCfkrs8L3RpdGxlPlxuICA8bWV0YVxuICAgIG5hbWU9XCJkZXNjcmlwdGlvblwiXG4gICAgY29udGVudD1cIkNhbWVyb24gUmF5bW9uZCdzIGJsb2cuIEFJIGFuZCBuZXR3b3JrIHNjaWVuY2U7IHBvbGl0aWNzIGFuZFxuICAgIHBvbGljeS4gQmVsb3cgYXJlIHNvbWUgb2YgbXkgcmFtYmxpbmdzLiBUaGlzIGlzIG1lYW50IHRvIGJlIGEgbW9yZVxuICAgIGFjY2Vzc2libGUgb3V0bGV0IGZvciB0aGUgZXhjaXRpbmcgYnV0IGFsbCB0b28gb2Z0ZW4gaW5hY2Nlc3NpYmxlIHJlc2VhcmNoXG4gICAgZG9uZSBpbiB0aGUgd29ybGQgb2YgY29tcHV0YXRpb25hbCBzb2NpYWwgc2NpZW5jZS4gQWxsIG9waW5pb25zIGFyZSBteSBvd24uXCIgLz5cbiAgPG1ldGFcbiAgICBuYW1lPVwia2V5d29yZHNcIlxuICAgIGNvbnRlbnQ9XCJDYW1lcm9uIFJheW1vbmQsIFVuaXZlcnNpdHkgb2YgT3hmb3JkLCBPeGZvcmQgVW5pdmVyc2l0eSwgRGF0YVxuICAgIFNjaWVuY2UsIFNvY2lhbCBEYXRhIFNpZW5jZSwgRGF0YSBTY2llbnRpc3RcIiAvPlxuICA8bGluayByZWw9XCJjYW5vbmljYWxcIiBocmVmPVwiaHR0cHM6Ly9jYW1lcm9ucmF5bW9uZC5tZS9ibG9nL1wiIC8+XG5cbiAgPCEtLSBPcGVuIEdyYXBoIC8gRmFjZWJvb2sgLS0+XG4gIDxtZXRhIHByb3BlcnR5PVwib2c6dHlwZVwiIGNvbnRlbnQ9XCJ3ZWJzaXRlXCIgLz5cbiAgPG1ldGEgcHJvcGVydHk9XCJvZzp1cmxcIiBjb250ZW50PVwiaHR0cHM6Ly9jYW1lcm9ucmF5bW9uZC5tZS9ibG9nL1wiIC8+XG4gIDxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwi8J+Su0Jsb2cgLSBDYW1lcm9uIFJheW1vbmTwn5K7XCIgLz5cbiAgPG1ldGFcbiAgICBuYW1lPVwib2c6ZGVzY3JpcHRpb25cIlxuICAgIGNvbnRlbnQ9XCJDYW1lcm9uIFJheW1vbmQncyBibG9nLiBBSSBhbmQgbmV0d29yayBzY2llbmNlOyBwb2xpdGljcyBhbmRcbiAgICBwb2xpY3kuIEJlbG93IGFyZSBzb21lIG9mIG15IHJhbWJsaW5ncy4gVGhpcyBpcyBtZWFudCB0byBiZSBhIG1vcmVcbiAgICBhY2Nlc3NpYmxlIG91dGxldCBmb3IgdGhlIGV4Y2l0aW5nIGJ1dCBhbGwgdG9vIG9mdGVuIGluYWNjZXNzaWJsZSByZXNlYXJjaFxuICAgIGRvbmUgaW4gdGhlIHdvcmxkIG9mIGNvbXB1dGF0aW9uYWwgc29jaWFsIHNjaWVuY2UuIEFsbCBvcGluaW9ucyBhcmUgbXkgb3duLlwiIC8+XG4gIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9jYW1lcm9ucmF5bW9uZC5tZS9uZXR3b3JrZC5wbmdcIiAvPlxuXG4gIDwhLS0gVHdpdHRlciAtLT5cbiAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeVwiIC8+XG4gIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjp1cmxcIiBjb250ZW50PVwiaHR0cHM6Ly9jYW1lcm9ucmF5bW9uZC5tZS9ibG9nL1wiIC8+XG4gIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjp0aXRsZVwiIGNvbnRlbnQ9XCLwn5K7QmxvZyAtIENhbWVyb24gUmF5bW9uZPCfkrtcIiAvPlxuICA8bWV0YVxuICAgIHByb3BlcnR5PVwidHdpdHRlcjpkZXNjcmlwdGlvblwiXG4gICAgY29udGVudD1cIkNhbWVyb24gUmF5bW9uZCdzIGJsb2cuIEFJIGFuZCBuZXR3b3JrIHNjaWVuY2U7IHBvbGl0aWNzIGFuZFxuICAgIHBvbGljeS4gQmVsb3cgYXJlIHNvbWUgb2YgbXkgcmFtYmxpbmdzLiBUaGlzIGlzIG1lYW50IHRvIGJlIGEgbW9yZVxuICAgIGFjY2Vzc2libGUgb3V0bGV0IGZvciB0aGUgZXhjaXRpbmcgYnV0IGFsbCB0b28gb2Z0ZW4gaW5hY2Nlc3NpYmxlIHJlc2VhcmNoXG4gICAgZG9uZSBpbiB0aGUgd29ybGQgb2YgY29tcHV0YXRpb25hbCBzb2NpYWwgc2NpZW5jZS4gQWxsIG9waW5pb25zIGFyZSBteSBvd24uLlwiIC8+XG4gIDxtZXRhXG4gICAgcHJvcGVydHk9XCJ0d2l0dGVyOmltYWdlXCJcbiAgICBjb250ZW50PVwiaHR0cHM6Ly9jYW1lcm9ucmF5bW9uZC5tZS9uZXR3b3JrZC5wbmdcIiAvPlxuXG48L3N2ZWx0ZTpoZWFkPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBZ0dTLEdBQUk7OEJBUUYsR0FBTzs7OztnQ0FBWixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFSRCxHQUFJOzs7NkJBUUYsR0FBTzs7OzsrQkFBWixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7O3dCQUFKLE1BQUk7Ozs7Ozs7Ozs7Ozs7K0RBNUJLLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUc7Ozs7OztpRUFPMUIsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7Ozs7Ozt1RUFXakMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7O2tDQVV6QyxNQUFJOzs7Ozs7dUVBRkksS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7Ozs7Ozs7K0NBekIvQixDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOztpREFPcEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRzs7O3FEQVdwQixDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7Ozs7OztxREFRcEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBUXFCLEdBQUksSUFBQyxLQUFLOzs7Ozs7MEJBSWpELEdBQUksSUFBQyxLQUFLOzs7Ozs7eUJBT1gsR0FBSSxJQUFDLFFBQVE7Ozs7Ozs2QkFkRixHQUFJLElBQUMsS0FBSzs7Ozs2QkFVaEIsR0FBSSxJQUFDLElBQUk7Ozs7a0NBQWQsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eURBUHNCLEdBQUksSUFBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4REFIeEIsR0FBSSxJQUFDLEtBQUs7O2dGQUdtQixHQUFJLElBQUMsS0FBSzs7Z0dBQXhCLEdBQUksSUFBQyxJQUFJOzs7O2tGQUlsQyxHQUFJLElBQUMsS0FBSzs7OzRCQUdOLEdBQUksSUFBQyxJQUFJOzs7O2lDQUFkLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQUosTUFBSTs7Ozs7OztnRkFJSixHQUFJLElBQUMsUUFBUTs7Ozs7O29DQUpiLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQTdDZixHQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBQVAsR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF4RVksT0FBTyxHQUFHLE1BQU0sRUFBRSxLQUFLO0tBQ3ZDLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxrQkFBa0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtDQUM5RCxLQUFLLE1BQU0sTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSTtVQUM3QyxLQUFLOzs7Ozs7T0FXTCxLQUFLO0tBQ1osT0FBTyxHQUFHLEtBQUs7O0tBQ2YsVUFBVSxHQUFHLEtBQUs7T0FDZCxHQUFHLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0dBQzFDLFNBQVM7O0tBQ1QsSUFBSSxHQUFHLEtBQUssT0FBTyxVQUFVLElBQUksU0FBUzs7Q0FHOUMsT0FBTztrQkFDTCxPQUFPLEdBQUcsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUZiLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
