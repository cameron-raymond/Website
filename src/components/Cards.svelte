<script>
  import Card from "./Card.svelte";
  import PostFilter from "./PostFilter.svelte";
  import Emoji from "./Emoji.svelte";
  export let posts;
  export let onHome;
  let active = posts
    ? new Set([].concat(...posts.map(x => x.tags)))
    : undefined;
  let tags = posts ? [...active] : undefined;
  $: visible = posts.filter(post => post.tags.every(tag => active.has(tag)));
</script>

<style>
  h2 {
    margin-top: 2rem;
    margin-bottom: 3.5rem;
  }
  .postFilter {
    margin-bottom: 0.5rem;
  }
  .cont {
    display: flex;
    flex: 1;
    align-self: stretch;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 1rem;
    max-width: 80em;
  }
  .placeholder {
    visibility: hidden;
    width: 30rem;
    height: 0;
    margin-left: 1rem;
    margin-right: 1rem;
    border: 1px solid #fff;
  }
  @media (max-width: 40rem) {
    h2 {
      margin-bottom: 2rem;
    }
    .cont {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-left: -2rem;
      margin-right: -2rem;
    }
    .placeholder {
      display: none;
    }
  }
</style>

<h2 id="blog">
  What I'm Working On
  <Emoji symbol="👨‍🔧" />
</h2>
{#if tags}
  <PostFilter {tags} bind:active />
{/if}
<span class="postFilter" />

{#if visible}
  <span class="cont">
    {#each visible as post}
      <Card {post} bind:onHome />
    {/each}
    {#if visible.length % 2 != 0}
      <span class="placeholder" />
    {/if}
  </span>
{/if}
