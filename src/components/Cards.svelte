<script>
  import Card from "./Card.svelte";
  import Emoji from "./Emoji.svelte";
  export let posts;
</script>

<style>
  h2 {
    margin-top: 2rem;
    margin-bottom: 4rem;
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
    display: hidden;
    width: 30rem;
    height: 0;
    margin-left: 2rem;
    margin-right: 2rem;
  }
  @media (max-width: 40rem) {
    h2 {
      margin-bottom: 2rem;
    }
    .cont {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-left: -2em;
      margin-right: -2em;
    }
    .placeholder {
      display: none;
    }
  }
</style>

<h2>
  What I'm Working On
  <Emoji symbol="👨‍🔧" />
</h2>
<span class="cont">
  {#each posts as post}
    <Card {post} />
  {/each}
  {#if posts.length % 2 != 0}
    <span class="placeholder" />
  {/if}
</span>
