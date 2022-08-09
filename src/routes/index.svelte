<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import Head from "../components/Head.svelte";
  import Emoji from "../components/Emoji.svelte";
  import Cards from "../components/Cards.svelte";
  import LazyLoad from "../components/HoC/LazyLoad.svelte";
  import { FaAngleDown } from "svelte-icons/fa";
  import { fly, fade } from "svelte/transition";
  // When you click on the "Read More" section of a card, it sets onHome from
  // true to false and removes the intro content from the DOM
  let y;
  let onHome = true;
  export let posts;
</script>

<style>
  .cont {
    position: relative;
    min-height: 25rem;
    height: calc(100vh - 4em);
    width: calc(100vw - 4em);
  }
  .intro {
    padding-left: 1rem;
    padding-top: 10rem;
    padding-right: 8rem;
  }
  @media (max-width: 40rem) {
    .intro {
      padding-right: 0rem;
      padding-top: 5rem;
    }
  }
  .intro-svg {
    position: absolute;
    bottom: -3rem;
    right: -1rem;
    width: 100%;
    max-width: 42rem;
    min-width: 35rem;
    overflow: hidden;
    z-index: -1;
  }
  .down-arrow {
    position: absolute;
    bottom: 2rem;
    left: calc(50vw - 4em);
    color: rgb(255, 62, 0);
    height: 2.5rem;
    width: 2.5rem;
  }
</style>

<svelte:window bind:scrollY={y} />

<div class="cont">
  <LazyLoad let:hasBeenVisible let:visible>
    {#if visible && onHome}
      <div class="intro">
        <h1
          in:fly={{ y: 50, duration: 500 }}
          out:fly={{ delay: 50, y: 50, duration: 500 }}>
          Hello
          <Emoji symbol="👋" />
        </h1>
        <p
          in:fly={{ delay: 300, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 500 }}>
          I'm Cameron - a data scientist
          <Emoji symbol="📈" />
          and incoming Trust & Safety Analyst at
          <a aria-label="OpenAI" href="https://openai.com/">OpenAI</a>
          <Emoji symbol="🧠" />
        </p>
        <p
          in:fly={{ delay: 350, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 500 }}>
          Currently a research fellow at Stanford Law School's
          <a
            aria-label="Stanford Law School"
            href="https://reglab.stanford.edu/">
            RegLab
          </a>
          <Emoji symbol="⚖️" />
        </p>
        <p
          in:fly={{ delay: 400, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 500 }}>
          Previously a graduate student
          <Emoji symbol="🧑‍💻" />
          at the
          <a aria-label="University of Oxford" href="http://www.ox.ac.uk/">
            University of Oxford
          </a>
          <Emoji symbol="🏫🏯" />
        </p>
      </div>
      <span
        in:fade={{ duration: 500, delay: 3000 }}
        out:fade={{ duration: 500 }}
        style="opacity: {1 - Math.max(0, y / 500)}"
        class="down-arrow">
        <FaAngleDown />
      </span>
    {/if}
  </LazyLoad>

  <img
    src="intro.svg"
    alt=""
    class="intro-svg"
    out:fade={{ duration: 100, delay: 100 }} />
</div>
<Cards {posts} bind:onHome />
<Head />
