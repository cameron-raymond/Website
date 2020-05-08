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
  import Emoji from "../../components/Emoji.svelte";
  import Tag from "../../components/Tag.svelte";
  export let post;

  let visible = false;
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
  .hideFooter {
    min-height: 90vh;
  }
  .content {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 40rem;
  }
  .content :global(img) {
    display: flex;
    align-self: center;
    margin: auto;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 20rem;
  }
  .content :global(em) {
    margin: auto;
  }
  h1 {
    margin-top: 4rem;
  }
  .subtitle {
    color: #555;
    max-width: 40rem;
  }
  .tags {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .tags span {
    display: flex;
  }
  /* .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
   */
</style>

<svelte:head>
  <title>{post.emoji}{post.title} - Cameron Raymond{post.emoji}</title>

  <meta name="description" content={post.blurb} />
  <meta
    name="keywords"
    content="Cameron Raymond, University of Oxford, Oxford University, Data
    Science, Social Data Sience, Data Scientist" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://cameronraymond.me/blog/{post.slug}" />
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
    content="https://cameronraymond.me/blog/{post.slug}" />
  <meta
    property="twitter:title"
    content="{post.emoji}{post.title} - Cameron Raymond{post.emoji}" />
  <meta property="twitter:description" content={post.blurb} />
  <meta
    property="twitter:image"
    content="https://cameronraymond.me/summary_large_image.png" />
</svelte:head>
<div class="hideFooter">
  {#if visible}
    <h1 in:fade={{ delay: 500, duration: 500 }}>{post.title} {post.emoji}</h1>
    <p in:fly={{ delay: 550, x: -50, duration: 500 }} class="subtitle">
      {@html post.blurb}
      <span class="tags">
        <span>
          {#each post.tags as tagId}
            <Tag {tagId} />
          {/each}
        </span>
        <p>{post.date}</p>
      </span>
    </p>

    <div in:fly={{ delay: 800, y: 50, duration: 500 }} class="content">
      {@html post.html}
    </div>
  {/if}
</div>
