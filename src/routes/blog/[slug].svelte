<script context="module">
  export async function preload({ params, query }) {
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
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import Emoji from "../../components/Emoji.svelte";
  import Tag from "../../components/Tag.svelte";
  export let post;
  const progress = tweened(0, {
    duration: 500,
    easing: cubicOut
  });
  let y = 0;
  let h = 1000;
  let visible = false;
  // take 500 off of the height to roughly account for header/footer, shift y by 100 so that it starts after header
  $: percDone = ((y - 100) / (h - 500)) * 100;
  $: prog = progress.set(percDone > 95 ? 100 : Math.max(percDone, 0));

  onMount(() => {
    visible = true;
  });
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 40rem;
  }
  .content :global(img:first-of-type){
    max-height: initial;
  }
  .content :global(img) {
    display: flex;
    align-self: center;
    margin: auto;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 30rem;
  }
  .content :global(h2) {
    margin-top: 1.5rem;
  }
  .content :global(h3) {
    margin-top: 1rem;
  }
  .content :global(em){
    text-align: center;
    color: #555;
  }
  .content :global(p > em){
    color: inherit;
  }
  .content :global(ul) {
    position: relative;
    list-style: none;
    margin-left: 0;
    padding-left: 1.2em;
  }
  .content :global(ul li:before) {
    font-size: 16.8px;
    content: "\2022";
    position: absolute;
    left: 0;
  }

  progress {
    border: none;
    border-width: 0;
    background: none;
    border-radius: 1px;
    margin: -4rem -2rem 0 -2rem;
    position: fixed;
    width: 100%;
    height: 1.5px;
    z-index: 2;
    color: #ff3e00;
  }
  progress::-moz-progress-bar {
    background: #ff3e00;
    border-radius: 1px;
  }
  progress::-webkit-progress-bar {
    background: rgba(255, 255, 255, 0);
  }
  progress::-webkit-progress-value {
    background: #ff3e00;
    border-radius: 1px;
  }

  h1 {
    margin-top: 4rem;
  }
  .subtitle {
    color: #555;
    max-width: 40rem;
  }
  .subtitle .collab {
    display: flex;
    font-size: 0.7rem;
    color: #555;
  }
  .tags {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .tags span {
    display: flex;
  }
  @media (max-width: 40rem) {
    .subtitle .collab {
      display: flex;
      font-size: 0.6rem;
      color: #555;
    }
  }
</style>

<svelte:head>
  <title>{post.emoji}{post.title} - Cameron Raymond{post.emoji}</title>

  <link rel="canonical" href="https://cameronraymond.me/blog/{post.slug}/" />
  <meta name="description" content={post.blurb} />
  <meta
    name="keywords"
    content="Cameron Raymond, University of Oxford, Oxford University, Data
    Science, Social Data Sience, Data Scientist" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://cameronraymond.me/blog/{post.slug}/" />
  <meta
    property="og:title"
    content="{post.emoji}{post.title} - Cameron Raymond{post.emoji}" />
  <meta name="og:description" content={post.blurb} />
  <meta
    property="og:image"
    content="https://cameronraymond.me/summary_large_image.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:url"
    content="https://cameronraymond.me/blog/{post.slug}/" />
  <meta
    property="twitter:title"
    content="{post.emoji}{post.title} - Cameron Raymond{post.emoji}" />
  <meta property="twitter:description" content={post.blurb} />
  <meta
    property="twitter:image"
    content="https://cameronraymond.me/summary_large_image.png" />
</svelte:head>

<svelte:window bind:scrollY={y} />

<div bind:clientHeight={h}>
  {#if visible}
    <progress
      in:fade={{ delay: 500, duration: 0 }}
      value={$progress}
      max="100" />
    <h1 in:fade={{ delay: 200, duration: 500 }}>{post.title} {post.emoji}</h1>
    <div in:fly={{ delay: 250, x: -50, duration: 500 }} class="subtitle">
      <p>
        {@html post.blurb}
        {#if post.collaborators}
          <span class="collab">
            {#each post.collaborators as collab}
              {@html collab}
              &nbsp;
            {/each}
          </span>
        {/if}
        <span class="tags">
          <span>
            {#each post.tags as tagId}
              <Tag {tagId} />
            {/each}
          </span>
          <p>{post.date}</p>
        </span>
      </p>

    </div>

    <div in:fly={{ delay: 200, y: 50, duration: 500 }} class="content">
      {@html post.html}
    </div>
  {/if}
</div>
