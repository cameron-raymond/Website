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
  @media (min-width: 400) {
    h1 {
      font-size: 4em;
    }
    .intro {
      padding-right: 0rem;
    }
  }
  .intro-svg {
    position: absolute;
    bottom: 0;
    right: -1rem;
    width: 100%;
    max-width: 42rem;
    min-width: 35rem;
    overflow: hidden;
    z-index: -1;
  }
  .down-arrow {
    position: absolute;
    bottom: 4rem;
    left: calc(50vw - 4em);
    color: rgb(255, 62, 0);
    height: 2.5rem;
    width: 2.5rem;
  }
</style>

<svelte:window bind:scrollY={y} />

<div class="cont">
  <LazyLoad let:hasBeenVisible let:visible>
    {#if hasBeenVisible && onHome}
      {#if visible}
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
            and graduate student
            <Emoji symbol="🧑‍💻" />
            at the
            <a aria-label="University of Oxford" href="http://www.ox.ac.uk/">
              University of Oxford
            </a>
            <Emoji symbol="🏫🏯" />
          </p>
          <p
            in:fly={{ delay: 350, y: 50, duration: 500 }}
            out:fly={{ y: 50, duration: 500 }}>
            Previously a research scientist at the University of Toronto's
            <a
              aria-label="University of Toronto"
              href="http://csslab.cs.toronto.edu/">
              Computational Social Science Lab
            </a>
          </p>
          <p
            in:fly={{ delay: 400, y: 50, duration: 500 }}
            out:fly={{ y: 50, duration: 500 }}>
            And an incoming research fellow at
            <a
              aria-label="Stanford Law School"
              href="https://law.stanford.edu/">
              Stanford Law School
            </a>
          </p>
        </div>
      {/if}
      <span
        in:fade={{ duration: 500, delay: 3000 }}
        out:fade={{ duration: 500 }}
        style="opacity: {1 - Math.max(0, y / 500)}"
        class="down-arrow">
        <FaAngleDown />
      </span>
      <img
        src="intro.svg"
        alt=""
        class="intro-svg"
        out:fade={{ duration: 100, delay: 100 }} />
    {/if}
  </LazyLoad>
</div>
<Cards {posts} bind:onHome />
<svelte:head>
  <title>🤯Cameron Raymond🤯</title>

  <meta
    name="description"
    content="Cameron Raymond is a data scientist and incoming graduate student
    at the University of Oxford. His broad areas of interest include network
    science, machine learning, and computational social science." />
  <meta
    name="keywords"
    content="Cameron Raymond, University of Oxford, Oxford University, Data
    Science, Social Data Sience, Data Scientist" />
  <link rel="canonical" href="https://cameronraymond.me" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cameronraymond.me" />
  <meta property="og:title" content="🤯Cameron Raymond🤯" />
  <meta
    name="og:description"
    content="Cameron Raymond is a data scientist and incoming graduate student
    at the University of Oxford. His broad areas of interest include network
    science, machine learning, and computational social science." />
  <meta
    property="og:image"
    content="https://cameronraymond.me/summary_large_image.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://cameronraymond.me" />
  <meta property="twitter:title" content="🤯Cameron Raymond🤯" />
  <meta
    property="twitter:description"
    content="Cameron Raymond is a data scientist and incoming graduate student
    at the University of Oxford." />
  <meta
    property="twitter:image"
    content="https://cameronraymond.me/summary_large_image.png" />
</svelte:head>
