import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, a as space, t as text, c as claim_element, b as children, f as claim_space, g as detach_dev, h as claim_text, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, n as set_data_dev, o as noop } from './client.a7ceaf21.js';

const tagLabels = {
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
const file = "src/components/Tag.svelte";

function create_fragment(ctx) {
	let code;
	let picture;
	let source0;
	let source0_srcset_value;
	let t0;
	let source1;
	let source1_srcset_value;
	let t1;
	let img;
	let img_src_value;
	let img_alt_value;
	let t2;
	let div;
	let t3;

	const block = {
		c: function create() {
			code = element("code");
			picture = element("picture");
			source0 = element("source");
			t0 = space();
			source1 = element("source");
			t1 = space();
			img = element("img");
			t2 = space();
			div = element("div");
			t3 = text(/*tagString*/ ctx[1]);
			this.h();
		},
		l: function claim(nodes) {
			code = claim_element(nodes, "CODE", { class: true });
			var code_nodes = children(code);
			picture = claim_element(code_nodes, "PICTURE", {});
			var picture_nodes = children(picture);
			source0 = claim_element(picture_nodes, "SOURCE", { srcset: true, type: true });
			t0 = claim_space(picture_nodes);
			source1 = claim_element(picture_nodes, "SOURCE", { srcset: true, type: true });
			t1 = claim_space(picture_nodes);
			img = claim_element(picture_nodes, "IMG", { src: true, alt: true, class: true });
			picture_nodes.forEach(detach_dev);
			t2 = claim_space(code_nodes);
			div = claim_element(code_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			t3 = claim_text(div_nodes, /*tagString*/ ctx[1]);
			div_nodes.forEach(detach_dev);
			code_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(source0, "srcset", source0_srcset_value = "tags/" + /*tagId*/ ctx[0] + ".webp");
			attr_dev(source0, "type", "image/webp");
			add_location(source0, file, 48, 4, 1123);
			attr_dev(source1, "srcset", source1_srcset_value = "tags/" + /*tagId*/ ctx[0] + ".png");
			attr_dev(source1, "type", "image/png");
			add_location(source1, file, 49, 4, 1183);
			if (img.src !== (img_src_value = "tags/" + /*tagId*/ ctx[0] + ".png")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", img_alt_value = `${/*tagString*/ ctx[1]} logo`);
			attr_dev(img, "class", "svelte-4q3zai");
			add_location(img, file, 50, 4, 1241);
			add_location(picture, file, 47, 2, 1109);
			attr_dev(div, "class", "tagLabel svelte-4q3zai");
			add_location(div, file, 52, 2, 1313);
			attr_dev(code, "class", "svelte-4q3zai");
			add_location(code, file, 46, 0, 1100);
		},
		m: function mount(target, anchor) {
			insert_dev(target, code, anchor);
			append_dev(code, picture);
			append_dev(picture, source0);
			append_dev(picture, t0);
			append_dev(picture, source1);
			append_dev(picture, t1);
			append_dev(picture, img);
			append_dev(code, t2);
			append_dev(code, div);
			append_dev(div, t3);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*tagId*/ 1 && source0_srcset_value !== (source0_srcset_value = "tags/" + /*tagId*/ ctx[0] + ".webp")) {
				attr_dev(source0, "srcset", source0_srcset_value);
			}

			if (dirty & /*tagId*/ 1 && source1_srcset_value !== (source1_srcset_value = "tags/" + /*tagId*/ ctx[0] + ".png")) {
				attr_dev(source1, "srcset", source1_srcset_value);
			}

			if (dirty & /*tagId*/ 1 && img.src !== (img_src_value = "tags/" + /*tagId*/ ctx[0] + ".png")) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*tagString*/ 2 && img_alt_value !== (img_alt_value = `${/*tagString*/ ctx[1]} logo`)) {
				attr_dev(img, "alt", img_alt_value);
			}

			if (dirty & /*tagString*/ 2) set_data_dev(t3, /*tagString*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(code);
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

function instance($$self, $$props, $$invalidate) {
	let tagString;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Tag", slots, []);
	let { tagId } = $$props;
	const writable_props = ["tagId"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tag> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("tagId" in $$props) $$invalidate(0, tagId = $$props.tagId);
	};

	$$self.$capture_state = () => ({ tagLabels, typeLabels, tagId, tagString });

	$$self.$inject_state = $$props => {
		if ("tagId" in $$props) $$invalidate(0, tagId = $$props.tagId);
		if ("tagString" in $$props) $$invalidate(1, tagString = $$props.tagString);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*tagId*/ 1) {
			 $$invalidate(1, tagString = tagLabels[tagId] || typeLabels[tagId] || tagId);
		}
	};

	return [tagId, tagString];
}

class Tag extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { tagId: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Tag",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*tagId*/ ctx[0] === undefined && !("tagId" in props)) {
			console.warn("<Tag> was created without expected prop 'tagId'");
		}
	}

	get tagId() {
		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set tagId(value) {
		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Tag as T, typeLabels as a, tagLabels as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFnLmUzZDg3NjgwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvdGFncy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RhZy5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0ICB0YWdMYWJlbHMgPSB7XG4gICAgcmw6IFwiUmVpbmZvcmNlbWVudCBMZWFybmluZ1wiLFxuICAgIGd0OiBcIkdyYXBoIFRoZW9yeVwiLFxuICAgIG1sOiBcIk1hY2hpbmUgTGVhcm5pbmdcIixcbiAgICBubHA6IFwiTkxQXCIsXG4gICAgcGw6IFwiUG9saXRpY3NcIixcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHR5cGVMYWJlbHMgPSB7XG4gIGJwOiBcIkJsb2cgUG9zdFwiLFxuICBycDogXCJSZXNlYXJjaCBQYXBlclwiLFxuICBzcDogXCJTY2hvb2wgUHJvai5cIlxufSIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IHRhZ0xhYmVscywgdHlwZUxhYmVscyB9IGZyb20gXCIuLi91dGlscy90YWdzLmpzXCI7XG4gIGV4cG9ydCBsZXQgdGFnSWQ7XG5cbiAgJDogdGFnU3RyaW5nID0gdGFnTGFiZWxzW3RhZ0lkXSB8fCB0eXBlTGFiZWxzW3RhZ0lkXSB8fHRhZ0lkO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgY29kZSB7XG4gICAgbWFyZ2luOiAwLjJyZW0gMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDEuMnJlbTtcbiAgICBwYWRkaW5nOiAwIDAuM3JlbTtcbiAgICBmb250LXNpemU6IDAuN3JlbTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLyogaU9TIFNhZmFyaSAqL1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIFNhZmFyaSAqL1xuICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgLyogS29ucXVlcm9yIEhUTUwgKi9cbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKiBPbGQgdmVyc2lvbnMgb2YgRmlyZWZveCAqL1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSW50ZXJuZXQgRXhwbG9yZXIvRWRnZSAqL1xuICAgIHVzZXItc2VsZWN0OiBub25lOyAvKiBOb24tcHJlZml4ZWQgdmVyc2lvbiwgY3VycmVudGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkIGJ5IENocm9tZSwgRWRnZSwgT3BlcmEgYW5kIEZpcmVmb3ggKi9cbiAgfVxuICBpbWcge1xuICAgIGhlaWdodDogMC44NXJlbTtcbiAgICB3aWR0aDogMC44NXJlbTtcbiAgICBtYXJnaW46IDAuMnJlbSAwLjJyZW0gMCAwO1xuICB9XG4gIC50YWdMYWJlbCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQwcmVtKSB7XG4gICAgY29kZSB7XG4gICAgICBmb250LXNpemU6IDAuNnJlbTtcbiAgICB9XG4gICAgaW1nIHtcbiAgICAgIGhlaWdodDogMC42cmVtO1xuICAgICAgd2lkdGg6IDAuNnJlbTtcbiAgICAgIG1hcmdpbi1yaWdodDogMC4xcmVtO1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cblxuPGNvZGU+XG4gIDxwaWN0dXJlPlxuICAgIDxzb3VyY2Ugc3Jjc2V0PVwidGFncy97dGFnSWR9LndlYnBcIiB0eXBlPVwiaW1hZ2Uvd2VicFwiIC8+XG4gICAgPHNvdXJjZSBzcmNzZXQ9XCJ0YWdzL3t0YWdJZH0ucG5nXCIgdHlwZT1cImltYWdlL3BuZ1wiIC8+XG4gICAgPGltZyBzcmM9XCJ0YWdzL3t0YWdJZH0ucG5nXCIgYWx0PXtgJHt0YWdTdHJpbmd9IGxvZ29gfSAvPlxuICA8L3BpY3R1cmU+XG4gIDxkaXYgY2xhc3M9XCJ0YWdMYWJlbFwiPnt0YWdTdHJpbmd9PC9kaXY+XG48L2NvZGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxNQUFDLFNBQVMsR0FBRztBQUMxQixJQUFJLEVBQUUsRUFBRSx3QkFBd0I7QUFDaEMsSUFBSSxFQUFFLEVBQUUsY0FBYztBQUN0QixJQUFJLEVBQUUsRUFBRSxrQkFBa0I7QUFDMUIsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksRUFBRSxFQUFFLFVBQVU7QUFDbEIsSUFBSTtBQUNKO0FBQ1ksTUFBQyxVQUFVLEdBQUc7QUFDMUIsRUFBRSxFQUFFLEVBQUUsV0FBVztBQUNqQixFQUFFLEVBQUUsRUFBRSxnQkFBZ0I7QUFDdEIsRUFBRSxFQUFFLEVBQUUsY0FBYztBQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDd0N5QixHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FBVCxHQUFTOzs7Ozs7MEVBSlIsR0FBSzs7OzBFQUNMLEdBQUs7Ozt3REFDWCxHQUFLO3lEQUFlLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUdBRnZCLEdBQUs7Ozs7bUdBQ0wsR0FBSzs7OzsrRUFDWCxHQUFLOzs7O3NGQUFlLEdBQVM7Ozs7K0RBRXhCLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWxEckIsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBRWhCLGlCQUFHLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxLQUFLLEtBQUksS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
