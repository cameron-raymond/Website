<script context="module">
  export async function preload({ params, query }) {
    const intro = await this.fetch(`about/intro.json`).then(r => r.json());
    const content = await this.fetch(`about/content.json`).then(r =>
      r.json()
    );
    return {intro, content };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
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
  :global(ol) {
    padding-left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 80em;
  }
  :global(li > ol) {
    padding-left: 20px;
    display: block;
  }
  :global(li) {
    list-style-type: none;
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
<svelte:head>
  <title>💭About - Cameron Raymond💭</title>
  <meta
    name="description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science. His broad areas of interest include network
    science, machine learning, and computational social science." />
  <meta
    name="keywords"
    content="Cameron Raymond, University of Oxford, Oxford University, Data
    Science, Social Data Sience, Data Scientist" />
  <link rel="canonical" href="https://cameronraymond.me/about/" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cameronraymond.me/about/" />
  <meta property="og:title" content="💭About - Cameron Raymond💭" />
  <meta
    name="og:description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science. His broad areas of interest include network
    science, machine learning, and computational social science." />
  <meta
    property="og:image"
    content="https://cameronraymond.me/summary_about_large.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://cameronraymond.me/about/" />
  <meta property="twitter:title" content="💭About - Cameron Raymond💭" />
  <meta
    property="twitter:description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science." />
  <meta
    property="twitter:image"
    content="https://cameronraymond.me/summary_about_large.png" />
</svelte:head>
