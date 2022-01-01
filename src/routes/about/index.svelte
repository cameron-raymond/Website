<script context="module">
  export async function preload({ params, query }) {
    const intro = await this.fetch(`about/intro.json`).then(r => r.json());
    const content = await this.fetch(`about/content.json`).then(r => r.json());
    return { intro, content };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte"
  import Emoji from "../../components/Emoji.svelte";
  let visible = false;
  export let intro;
  export let content;

  onMount(() => {
    visible = true;
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 62em;
    margin-top: 3.45rem;
  }
  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  .intro {
    padding-right: 1rem;
    max-width: 40em;
  }
  img {
    width: 20rem;
    height: auto;
    object-fit: contain;
    overflow: hidden;
  }
  :global(img) {
    width: 100%;
  }
  :global(ol) {
    padding-left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 80em;
    list-style: none;
  }
  :global(h2) {
    margin: 1.5em 0 0.5em 0;
  }
  :global(li > ol) {
    padding-left: 20px;
    display: block;
    max-width: 15rem;
    list-style: initial
  }

  @media (max-width: 60rem) {
    span {
      margin-top: 3rem;
      margin-left: 0;
      margin-right: 0;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-self: center;
      align-items: center;
    }
    .intro {
      padding-right: 0;
    }
    img {
      margin-bottom: 0.5rem;
    }
    :global(h2) {
      margin: 0.75em 0 0.25em 0;
    }
    :global(ol) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
</style>

{#if visible}
  <div class="container">
    <span>
      <div class="intro">
        <h1
          in:fly={{ delay: 500, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 300 }}>
          {intro.title}
          <Emoji symbol={intro.emoji} />
        </h1>
        <div
          in:fly={{ delay: 800, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 300 }}>
          {@html intro.html}
        </div>
      </div>
      <picture
        rel="preload"
        in:fade={{ delay: 600, duration: 200 }}
        out:fly={{ y: 50, duration: 100 }}>
        <source type="image/webp" srcset="{intro.image}.webp" />
        <source type="image/jpeg" srcset="{intro.image}.png" />
        <img src="{intro.image}.webp" alt={intro.image} />
      </picture>
    </span>
    <div
      in:fade={{ delay: 1100, duration: 500 }}
      out:fly={{ y: 50, duration: 300 }}>
      {@html content.html}
    </div>
  </div>
{/if}

<Head/>
