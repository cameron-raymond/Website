import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, T as onMount, U as onDestroy, M as fly, N as fade, E as Emoji, e as element, t as text, a as space, y as create_component, c as claim_element, b as children, h as claim_text, f as claim_space, z as claim_component, g as detach_dev, k as add_location, j as attr_dev, l as insert_dev, m as append_dev, A as mount_component, n as set_data_dev, p as transition_in, J as add_render_callback, R as create_in_transition, r as transition_out, P as create_out_transition, B as destroy_component, O as query_selector_all, u as check_outros, q as group_outros } from './client.bd49902d.js';

/* src/routes/about/index.svelte generated by Svelte v3.32.2 */
const file = "src/routes/about/index.svelte";

// (100:0) {#if visible}
function create_if_block(ctx) {
	let div3;
	let span;
	let div1;
	let h1;
	let t0_value = /*intro*/ ctx[0].title + "";
	let t0;
	let t1;
	let emoji;
	let h1_intro;
	let h1_outro;
	let t2;
	let div0;
	let raw0_value = /*intro*/ ctx[0].html + "";
	let div0_intro;
	let div0_outro;
	let t3;
	let picture;
	let source0;
	let source0_srcset_value;
	let t4;
	let source1;
	let source1_srcset_value;
	let t5;
	let img;
	let img_src_value;
	let img_alt_value;
	let picture_intro;
	let picture_outro;
	let t6;
	let div2;
	let raw1_value = /*content*/ ctx[1].html + "";
	let div2_intro;
	let div2_outro;
	let current;

	emoji = new Emoji({
			props: { symbol: /*intro*/ ctx[0].emoji },
			$$inline: true
		});

	const block = {
		c: function create() {
			div3 = element("div");
			span = element("span");
			div1 = element("div");
			h1 = element("h1");
			t0 = text(t0_value);
			t1 = space();
			create_component(emoji.$$.fragment);
			t2 = space();
			div0 = element("div");
			t3 = space();
			picture = element("picture");
			source0 = element("source");
			t4 = space();
			source1 = element("source");
			t5 = space();
			img = element("img");
			t6 = space();
			div2 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			span = claim_element(div3_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			div1 = claim_element(span_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h1 = claim_element(div1_nodes, "H1", {});
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, t0_value);
			t1 = claim_space(h1_nodes);
			claim_component(emoji.$$.fragment, h1_nodes);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", {});
			var div0_nodes = children(div0);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t3 = claim_space(span_nodes);
			picture = claim_element(span_nodes, "PICTURE", { rel: true });
			var picture_nodes = children(picture);
			source0 = claim_element(picture_nodes, "SOURCE", { type: true, srcset: true });
			t4 = claim_space(picture_nodes);
			source1 = claim_element(picture_nodes, "SOURCE", { type: true, srcset: true });
			t5 = claim_space(picture_nodes);
			img = claim_element(picture_nodes, "IMG", { src: true, alt: true, class: true });
			picture_nodes.forEach(detach_dev);
			span_nodes.forEach(detach_dev);
			t6 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", {});
			var div2_nodes = children(div2);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file, 103, 8, 2047);
			add_location(div0, file, 109, 8, 2240);
			attr_dev(div1, "class", "intro svelte-3y3qkx");
			add_location(div1, file, 102, 6, 2019);
			attr_dev(source0, "type", "image/webp");
			attr_dev(source0, "srcset", source0_srcset_value = "" + (/*intro*/ ctx[0].image + ".webp"));
			add_location(source0, file, 119, 8, 2541);
			attr_dev(source1, "type", "image/jpeg");
			attr_dev(source1, "srcset", source1_srcset_value = "" + (/*intro*/ ctx[0].image + ".png"));
			add_location(source1, file, 120, 8, 2606);
			if (img.src !== (img_src_value = "" + (/*intro*/ ctx[0].image + ".webp"))) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", img_alt_value = /*intro*/ ctx[0].image);
			attr_dev(img, "class", "svelte-3y3qkx");
			add_location(img, file, 121, 8, 2670);
			attr_dev(picture, "rel", "preload");
			add_location(picture, file, 115, 6, 2410);
			attr_dev(span, "class", "svelte-3y3qkx");
			add_location(span, file, 101, 4, 2006);
			add_location(div2, file, 124, 4, 2754);
			attr_dev(div3, "class", "container svelte-3y3qkx");
			add_location(div3, file, 100, 2, 1978);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, span);
			append_dev(span, div1);
			append_dev(div1, h1);
			append_dev(h1, t0);
			append_dev(h1, t1);
			mount_component(emoji, h1, null);
			append_dev(div1, t2);
			append_dev(div1, div0);
			div0.innerHTML = raw0_value;
			append_dev(span, t3);
			append_dev(span, picture);
			append_dev(picture, source0);
			append_dev(picture, t4);
			append_dev(picture, source1);
			append_dev(picture, t5);
			append_dev(picture, img);
			append_dev(div3, t6);
			append_dev(div3, div2);
			div2.innerHTML = raw1_value;
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*intro*/ 1) && t0_value !== (t0_value = /*intro*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
			const emoji_changes = {};
			if (dirty & /*intro*/ 1) emoji_changes.symbol = /*intro*/ ctx[0].emoji;
			emoji.$set(emoji_changes);
			if ((!current || dirty & /*intro*/ 1) && raw0_value !== (raw0_value = /*intro*/ ctx[0].html + "")) div0.innerHTML = raw0_value;
			if (!current || dirty & /*intro*/ 1 && source0_srcset_value !== (source0_srcset_value = "" + (/*intro*/ ctx[0].image + ".webp"))) {
				attr_dev(source0, "srcset", source0_srcset_value);
			}

			if (!current || dirty & /*intro*/ 1 && source1_srcset_value !== (source1_srcset_value = "" + (/*intro*/ ctx[0].image + ".png"))) {
				attr_dev(source1, "srcset", source1_srcset_value);
			}

			if (!current || dirty & /*intro*/ 1 && img.src !== (img_src_value = "" + (/*intro*/ ctx[0].image + ".webp"))) {
				attr_dev(img, "src", img_src_value);
			}

			if (!current || dirty & /*intro*/ 1 && img_alt_value !== (img_alt_value = /*intro*/ ctx[0].image)) {
				attr_dev(img, "alt", img_alt_value);
			}

			if ((!current || dirty & /*content*/ 2) && raw1_value !== (raw1_value = /*content*/ ctx[1].html + "")) div2.innerHTML = raw1_value;		},
		i: function intro(local) {
			if (current) return;
			transition_in(emoji.$$.fragment, local);

			add_render_callback(() => {
				if (h1_outro) h1_outro.end(1);
				if (!h1_intro) h1_intro = create_in_transition(h1, fly, { delay: 500, y: 50, duration: 500 });
				h1_intro.start();
			});

			add_render_callback(() => {
				if (div0_outro) div0_outro.end(1);
				if (!div0_intro) div0_intro = create_in_transition(div0, fly, { delay: 800, y: 50, duration: 500 });
				div0_intro.start();
			});

			add_render_callback(() => {
				if (picture_outro) picture_outro.end(1);
				if (!picture_intro) picture_intro = create_in_transition(picture, fade, { delay: 600, duration: 200 });
				picture_intro.start();
			});

			add_render_callback(() => {
				if (div2_outro) div2_outro.end(1);
				if (!div2_intro) div2_intro = create_in_transition(div2, fade, { delay: 1100, duration: 500 });
				div2_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			transition_out(emoji.$$.fragment, local);
			if (h1_intro) h1_intro.invalidate();
			h1_outro = create_out_transition(h1, fly, { y: 50, duration: 300 });
			if (div0_intro) div0_intro.invalidate();
			div0_outro = create_out_transition(div0, fly, { y: 50, duration: 300 });
			if (picture_intro) picture_intro.invalidate();
			picture_outro = create_out_transition(picture, fly, { y: 50, duration: 100 });
			if (div2_intro) div2_intro.invalidate();
			div2_outro = create_out_transition(div2, fly, { y: 50, duration: 300 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			destroy_component(emoji);
			if (detaching && h1_outro) h1_outro.end();
			if (detaching && div0_outro) div0_outro.end();
			if (detaching && picture_outro) picture_outro.end();
			if (detaching && div2_outro) div2_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(100:0) {#if visible}",
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
	let if_block = /*visible*/ ctx[2] && create_if_block(ctx);

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
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1nvna92\"]", document.head);
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
			document.title = "💭About - Cameron Raymond💭";
			attr_dev(meta0, "name", "description");
			attr_dev(meta0, "content", "Cameron Raymond is a 21 year old data scienist from Toronto,\n    Ontario. In the fall he will be joining the University of Oxford to do his\n    MSc in Social Data Science. His broad areas of interest include network\n    science, machine learning, and computational social science.");
			add_location(meta0, file, 133, 2, 2962);
			attr_dev(meta1, "name", "keywords");
			attr_dev(meta1, "content", "Cameron Raymond, University of Oxford, Oxford University, Data\n    Science, Social Data Sience, Data Scientist");
			add_location(meta1, file, 139, 2, 3291);
			attr_dev(link, "rel", "canonical");
			attr_dev(link, "href", "https://cameronraymond.me/about/");
			add_location(link, file, 143, 2, 3447);
			attr_dev(meta2, "property", "og:type");
			attr_dev(meta2, "content", "website");
			add_location(meta2, file, 146, 2, 3548);
			attr_dev(meta3, "property", "og:url");
			attr_dev(meta3, "content", "https://cameronraymond.me/about/");
			add_location(meta3, file, 147, 2, 3596);
			attr_dev(meta4, "property", "og:title");
			attr_dev(meta4, "content", "💭About - Cameron Raymond💭");
			add_location(meta4, file, 148, 2, 3668);
			attr_dev(meta5, "name", "og:description");
			attr_dev(meta5, "content", "Cameron Raymond is a 21 year old data scienist from Toronto,\n    Ontario. In the fall he will be joining the University of Oxford to do his\n    MSc in Social Data Science. His broad areas of interest include network\n    science, machine learning, and computational social science.");
			add_location(meta5, file, 149, 2, 3737);
			attr_dev(meta6, "property", "og:image");
			attr_dev(meta6, "content", "https://cameronraymond.me/summary_about_large.png");
			add_location(meta6, file, 155, 2, 4069);
			attr_dev(meta7, "property", "twitter:card");
			attr_dev(meta7, "content", "summary_large_image");
			add_location(meta7, file, 160, 2, 4188);
			attr_dev(meta8, "property", "twitter:url");
			attr_dev(meta8, "content", "https://cameronraymond.me/about/");
			add_location(meta8, file, 161, 2, 4253);
			attr_dev(meta9, "property", "twitter:title");
			attr_dev(meta9, "content", "💭About - Cameron Raymond💭");
			add_location(meta9, file, 162, 2, 4330);
			attr_dev(meta10, "property", "twitter:description");
			attr_dev(meta10, "content", "Cameron Raymond is a 21 year old data scienist from Toronto,\n    Ontario. In the fall he will be joining the University of Oxford to do his\n    MSc in Social Data Science.");
			add_location(meta10, file, 163, 2, 4404);
			attr_dev(meta11, "property", "twitter:image");
			attr_dev(meta11, "content", "https://cameronraymond.me/summary_about_large.png");
			add_location(meta11, file, 168, 2, 4636);
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
			if (/*visible*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*visible*/ 4) {
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
	const intro = await this.fetch(`about/intro.json`).then(r => r.json());
	const content = await this.fetch(`about/content.json`).then(r => r.json());
	return { intro, content };
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("About", slots, []);
	let visible = false;
	let { intro } = $$props;
	let { content } = $$props;

	onMount(() => {
		$$invalidate(2, visible = true);
	});

	const writable_props = ["intro", "content"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("intro" in $$props) $$invalidate(0, intro = $$props.intro);
		if ("content" in $$props) $$invalidate(1, content = $$props.content);
	};

	$$self.$capture_state = () => ({
		preload,
		onMount,
		onDestroy,
		fly,
		fade,
		Emoji,
		visible,
		intro,
		content
	});

	$$self.$inject_state = $$props => {
		if ("visible" in $$props) $$invalidate(2, visible = $$props.visible);
		if ("intro" in $$props) $$invalidate(0, intro = $$props.intro);
		if ("content" in $$props) $$invalidate(1, content = $$props.content);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [intro, content, visible];
}

class About extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { intro: 0, content: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "About",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*intro*/ ctx[0] === undefined && !("intro" in props)) {
			console.warn("<About> was created without expected prop 'intro'");
		}

		if (/*content*/ ctx[1] === undefined && !("content" in props)) {
			console.warn("<About> was created without expected prop 'content'");
		}
	}

	get intro() {
		throw new Error("<About>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set intro(value) {
		throw new Error("<About>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get content() {
		throw new Error("<About>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set content(value) {
		throw new Error("<About>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default About;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYWMyYTU3NzIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYWJvdXQvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcywgcXVlcnkgfSkge1xuICAgIGNvbnN0IGludHJvID0gYXdhaXQgdGhpcy5mZXRjaChgYWJvdXQvaW50cm8uanNvbmApLnRoZW4ociA9PiByLmpzb24oKSk7XG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuZmV0Y2goYGFib3V0L2NvbnRlbnQuanNvbmApLnRoZW4ociA9PlxuICAgICAgci5qc29uKClcbiAgICApO1xuICAgIHJldHVybiB7aW50cm8sIGNvbnRlbnQgfTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQsIG9uRGVzdHJveSB9IGZyb20gXCJzdmVsdGVcIjtcbiAgaW1wb3J0IHsgZmx5LCBmYWRlIH0gZnJvbSBcInN2ZWx0ZS90cmFuc2l0aW9uXCI7XG4gIGltcG9ydCBFbW9qaSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FbW9qaS5zdmVsdGVcIjtcbiAgbGV0IHZpc2libGUgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBpbnRybztcbiAgZXhwb3J0IGxldCBjb250ZW50O1xuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIHZpc2libGUgPSB0cnVlO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgd2lkdGg6IDgwdnc7XG4gICAgbWF4LXdpZHRoOiA2MmVtO1xuICAgIG1hcmdpbi10b3A6IDMuNDVyZW07XG4gIH1cbiAgc3BhbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gIH1cbiAgLmludHJvIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xuICAgIG1heC13aWR0aDogNDBlbTtcbiAgfVxuICBpbWcge1xuICAgIHdpZHRoOiAyMHJlbTtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIDpnbG9iYWwoaW1nKXtcbiAgICAgIHdpZHRoOiAxMDAlXG4gIH1cbiAgOmdsb2JhbChvbCkge1xuICAgIHBhZGRpbmctbGVmdDogMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgbWF4LXdpZHRoOiA4MGVtO1xuICB9XG4gIDpnbG9iYWwoaDIpe1xuICAgICAgbWFyZ2luOiAxLjVlbSAwIDAuNWVtIDA7XG4gIH1cbiAgOmdsb2JhbChsaSA+IG9sKSB7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIDpnbG9iYWwobGkpIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDYwcmVtKSB7XG4gICAgc3BhbiB7XG4gICAgICBtYXJnaW4tdG9wOiAzcmVtO1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgLmludHJvIHtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuICAgIGltZyB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgfVxuICAgIDpnbG9iYWwoaDIpe1xuICAgICAgbWFyZ2luOiAuNzVlbSAwIDAuMjVlbSAwO1xuICB9XG4gICAgOmdsb2JhbChvbCkge1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cblxueyNpZiB2aXNpYmxlfVxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPHNwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW50cm9cIj5cbiAgICAgICAgPGgxXG4gICAgICAgICAgaW46Zmx5PXt7IGRlbGF5OiA1MDAsIHk6IDUwLCBkdXJhdGlvbjogNTAwIH19XG4gICAgICAgICAgb3V0OmZseT17eyB5OiA1MCwgZHVyYXRpb246IDMwMCB9fT5cbiAgICAgICAgICB7aW50cm8udGl0bGV9XG4gICAgICAgICAgPEVtb2ppIHN5bWJvbD17aW50cm8uZW1vaml9IC8+XG4gICAgICAgIDwvaDE+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBpbjpmbHk9e3sgZGVsYXk6IDgwMCwgeTogNTAsIGR1cmF0aW9uOiA1MDAgfX1cbiAgICAgICAgICBvdXQ6Zmx5PXt7IHk6IDUwLCBkdXJhdGlvbjogMzAwIH19PlxuICAgICAgICAgIHtAaHRtbCBpbnRyby5odG1sfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHBpY3R1cmVcbiAgICAgICAgcmVsPVwicHJlbG9hZFwiXG4gICAgICAgIGluOmZhZGU9e3sgZGVsYXk6IDYwMCwgZHVyYXRpb246IDIwMCB9fVxuICAgICAgICBvdXQ6Zmx5PXt7IHk6IDUwLCBkdXJhdGlvbjogMTAwIH19PlxuICAgICAgICA8c291cmNlIHR5cGU9XCJpbWFnZS93ZWJwXCIgc3Jjc2V0PVwie2ludHJvLmltYWdlfS53ZWJwXCIgLz5cbiAgICAgICAgPHNvdXJjZSB0eXBlPVwiaW1hZ2UvanBlZ1wiIHNyY3NldD1cIntpbnRyby5pbWFnZX0ucG5nXCIgLz5cbiAgICAgICAgPGltZyBzcmM9XCJ7aW50cm8uaW1hZ2V9LndlYnBcIiBhbHQ9e2ludHJvLmltYWdlfSAvPlxuICAgICAgPC9waWN0dXJlPlxuICAgIDwvc3Bhbj5cbiAgICA8ZGl2XG4gICAgICBpbjpmYWRlPXt7IGRlbGF5OiAxMTAwLCBkdXJhdGlvbjogNTAwIH19XG4gICAgICBvdXQ6Zmx5PXt7IHk6IDUwLCBkdXJhdGlvbjogMzAwIH19PlxuICAgICAge0BodG1sIGNvbnRlbnQuaHRtbH1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG57L2lmfVxuPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+8J+SrUFib3V0IC0gQ2FtZXJvbiBSYXltb25k8J+SrTwvdGl0bGU+XG4gIDxtZXRhXG4gICAgbmFtZT1cImRlc2NyaXB0aW9uXCJcbiAgICBjb250ZW50PVwiQ2FtZXJvbiBSYXltb25kIGlzIGEgMjEgeWVhciBvbGQgZGF0YSBzY2llbmlzdCBmcm9tIFRvcm9udG8sXG4gICAgT250YXJpby4gSW4gdGhlIGZhbGwgaGUgd2lsbCBiZSBqb2luaW5nIHRoZSBVbml2ZXJzaXR5IG9mIE94Zm9yZCB0byBkbyBoaXNcbiAgICBNU2MgaW4gU29jaWFsIERhdGEgU2NpZW5jZS4gSGlzIGJyb2FkIGFyZWFzIG9mIGludGVyZXN0IGluY2x1ZGUgbmV0d29ya1xuICAgIHNjaWVuY2UsIG1hY2hpbmUgbGVhcm5pbmcsIGFuZCBjb21wdXRhdGlvbmFsIHNvY2lhbCBzY2llbmNlLlwiIC8+XG4gIDxtZXRhXG4gICAgbmFtZT1cImtleXdvcmRzXCJcbiAgICBjb250ZW50PVwiQ2FtZXJvbiBSYXltb25kLCBVbml2ZXJzaXR5IG9mIE94Zm9yZCwgT3hmb3JkIFVuaXZlcnNpdHksIERhdGFcbiAgICBTY2llbmNlLCBTb2NpYWwgRGF0YSBTaWVuY2UsIERhdGEgU2NpZW50aXN0XCIgLz5cbiAgPGxpbmsgcmVsPVwiY2Fub25pY2FsXCIgaHJlZj1cImh0dHBzOi8vY2FtZXJvbnJheW1vbmQubWUvYWJvdXQvXCIgLz5cblxuICA8IS0tIE9wZW4gR3JhcGggLyBGYWNlYm9vayAtLT5cbiAgPG1ldGEgcHJvcGVydHk9XCJvZzp0eXBlXCIgY29udGVudD1cIndlYnNpdGVcIiAvPlxuICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnVybFwiIGNvbnRlbnQ9XCJodHRwczovL2NhbWVyb25yYXltb25kLm1lL2Fib3V0L1wiIC8+XG4gIDxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwi8J+SrUFib3V0IC0gQ2FtZXJvbiBSYXltb25k8J+SrVwiIC8+XG4gIDxtZXRhXG4gICAgbmFtZT1cIm9nOmRlc2NyaXB0aW9uXCJcbiAgICBjb250ZW50PVwiQ2FtZXJvbiBSYXltb25kIGlzIGEgMjEgeWVhciBvbGQgZGF0YSBzY2llbmlzdCBmcm9tIFRvcm9udG8sXG4gICAgT250YXJpby4gSW4gdGhlIGZhbGwgaGUgd2lsbCBiZSBqb2luaW5nIHRoZSBVbml2ZXJzaXR5IG9mIE94Zm9yZCB0byBkbyBoaXNcbiAgICBNU2MgaW4gU29jaWFsIERhdGEgU2NpZW5jZS4gSGlzIGJyb2FkIGFyZWFzIG9mIGludGVyZXN0IGluY2x1ZGUgbmV0d29ya1xuICAgIHNjaWVuY2UsIG1hY2hpbmUgbGVhcm5pbmcsIGFuZCBjb21wdXRhdGlvbmFsIHNvY2lhbCBzY2llbmNlLlwiIC8+XG4gIDxtZXRhXG4gICAgcHJvcGVydHk9XCJvZzppbWFnZVwiXG4gICAgY29udGVudD1cImh0dHBzOi8vY2FtZXJvbnJheW1vbmQubWUvc3VtbWFyeV9hYm91dF9sYXJnZS5wbmdcIiAvPlxuXG4gIDwhLS0gVHdpdHRlciAtLT5cbiAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIC8+XG4gIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjp1cmxcIiBjb250ZW50PVwiaHR0cHM6Ly9jYW1lcm9ucmF5bW9uZC5tZS9hYm91dC9cIiAvPlxuICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6dGl0bGVcIiBjb250ZW50PVwi8J+SrUFib3V0IC0gQ2FtZXJvbiBSYXltb25k8J+SrVwiIC8+XG4gIDxtZXRhXG4gICAgcHJvcGVydHk9XCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCJcbiAgICBjb250ZW50PVwiQ2FtZXJvbiBSYXltb25kIGlzIGEgMjEgeWVhciBvbGQgZGF0YSBzY2llbmlzdCBmcm9tIFRvcm9udG8sXG4gICAgT250YXJpby4gSW4gdGhlIGZhbGwgaGUgd2lsbCBiZSBqb2luaW5nIHRoZSBVbml2ZXJzaXR5IG9mIE94Zm9yZCB0byBkbyBoaXNcbiAgICBNU2MgaW4gU29jaWFsIERhdGEgU2NpZW5jZS5cIiAvPlxuICA8bWV0YVxuICAgIHByb3BlcnR5PVwidHdpdHRlcjppbWFnZVwiXG4gICAgY29udGVudD1cImh0dHBzOi8vY2FtZXJvbnJheW1vbmQubWUvc3VtbWFyeV9hYm91dF9sYXJnZS5wbmdcIiAvPlxuPC9zdmVsdGU6aGVhZD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzswQkEwR1csR0FBSyxJQUFDLEtBQUs7Ozs7Ozs7OzRCQU1MLEdBQUssSUFBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBZWQsR0FBTyxJQUFDLElBQUk7Ozs7Ozs4QkFwQkEsR0FBSyxJQUFDLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0VBWU8sR0FBSyxJQUFDLEtBQUs7OztzRUFDWCxHQUFLLElBQUMsS0FBSzs7b0RBQ25DLEdBQUssSUFBQyxLQUFLO2tEQUFhLEdBQUssSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrRUFmM0MsR0FBSyxJQUFDLEtBQUs7OzZEQUNHLEdBQUssSUFBQyxLQUFLOzttRkFLbkIsR0FBSyxJQUFDLElBQUk7MkdBT2dCLEdBQUssSUFBQyxLQUFLOzs7OzJHQUNYLEdBQUssSUFBQyxLQUFLOzs7O3VGQUNuQyxHQUFLLElBQUMsS0FBSzs7Ozt1RkFBYSxHQUFLLElBQUMsS0FBSzs7Ozt1RkFNekMsR0FBTyxJQUFDLElBQUk7Ozs7Ozs7OERBdkJMLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRzs7Ozs7O29FQU1oQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUc7Ozs7Ozs4RUFPakMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRzs7Ozs7O3FFQVEzQixLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7Ozs7Ozs7K0NBcEJ0QixDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzttREFNcEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRzs7eURBT3RCLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUc7O21EQVF0QixDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQTNCaEMsR0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUFQLEdBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBbEdZLE9BQU8sR0FBRyxNQUFNLEVBQUUsS0FBSztPQUNyQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUsscUJBQXFCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7T0FDN0QsT0FBTyxTQUFTLElBQUksQ0FBQyxLQUFLLHVCQUF1QixJQUFJLENBQUMsQ0FBQyxJQUMzRCxDQUFDLENBQUMsSUFBSTtVQUVBLEtBQUssRUFBRSxPQUFPOzs7Ozs7S0FRcEIsT0FBTyxHQUFHLEtBQUs7T0FDUixLQUFLO09BQ0wsT0FBTzs7Q0FFbEIsT0FBTztrQkFDTCxPQUFPLEdBQUcsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
