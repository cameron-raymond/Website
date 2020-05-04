<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  let visible = false;
  onMount(() => {
    visible = true;
  });
</script>

<style>
  .cont {
    position: relative;
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
    /* ! Change to this once more content is added */
    position: absolute;
    bottom: -5rem;
    right: -1rem;
    width: 100%;
    max-width: 55rem;
    min-width: 40rem;
    overflow: hidden;
    z-index: -1;
  }
</style>

<svelte:head>
  <title>🤯Cameron Raymond🤯</title>

  <meta name="description" content="Cameron Raymond is a data scientist and incoming graduate student at the University of Oxford." />
  <meta name="keywords" content="Cameron Raymond, University of Oxford, Oxford
  University, Data Science, Social Data Sience, Data Scientist"/>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://cameronraymond.me/">
  <meta property="og:title" content="🤯Cameron Raymond🤯">
  <meta name="og:description" content="Cameron Raymond is a data scientist and incoming graduate student at the University of Oxford." />
  <!-- <meta property="og:image" content="summary_large_image"> -->

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://cameronraymond.me/">
  <meta property="twitter:title" content="🤯Cameron Raymond🤯">
  <meta property="twitter:description" content="Cameron Raymond is a data scientist and incoming graduate student at the University of Oxford.">
  <meta property="twitter:image" content="https://cameronraymond.me/summary_large_image.png">
</svelte:head>

<div class="cont">
  {#if visible}
    <div class="intro">
      <h1
        in:fly={{y: 50, duration: 500 }}
        out:fly={{delay: 50, y: 50, duration: 500 }}>
        Hello
        <Emoji symbol="👋" />
      </h1>
      <p
        in:fly={{ delay: 300, y: 50, duration: 500 }}
        out:fly={{ y: 50, duration: 500 }}>
        I'm Cameron - a data scientist
        <Emoji symbol="📈" />
        and incoming graduate student
        <Emoji symbol="🧑‍💻" />
        at the University of Oxford
        <Emoji symbol="🏫🏯" />
      </p>
      <p
        in:fly={{ delay: 350, y: 50, duration: 500 }}
        out:fly={{  y: 50, duration: 500 }}>
        This is a new version of my portfolio, so be sure to check back for more posts on my work!
      </p>
    </div>
  {/if}
  <img
    src="intro.svg"
    alt=""
    class="intro-svg"
    out:fade={{ duration: 50, delay: 100 }} />
</div>
