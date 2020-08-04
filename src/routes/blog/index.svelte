<script context="module">
  export async function preload({ params, query }) {
    let posts = await this.fetch(`../index.json`).then(r => r.json());
    posts = [].concat(...posts.filter(x => x.type === "bp"));
    return { posts };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Tag from "../../components/Tag.svelte";
  import Card from "../../components/Card.svelte";
  import PostFilter from "../../components/PostFilter.svelte";
  import Emoji from "../../components/Emoji.svelte";
  export let posts;
  let visible = false;
  let activeTags = posts
    ? new Set([].concat(...posts.map(x => x.tags)))
    : undefined;
  let tags = posts ? [...activeTags] : undefined;
  // Make a post visible if its type is set to visible and one of the tags are present.
  $: visible = posts.filter(post => post.tags.some(tag => activeTags.has(tag)));
  onMount(() => {
    visible = true;
  });
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80vw;
    max-width: 40rem;
  }
  .subtitle {
    color: #555;
    max-width: 40rem;
    margin-bottom: 0.5rem;
  }
  .title {
    display: flex;
    flex-direction: row;
  }
  .title h2 {
    margin-left: 0.7rem;
  }
  h1 {
    margin-top: 4rem;
    max-width: 58rem;
  }

  .tags {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .postFilter {
    margin-bottom: 3rem;
  }
  .tags span {
    display: flex;
  }
  @media (max-width: 40rem) {
    .title h2 {
      margin-left: 0.4rem;
    }
  }
</style>

{#if visible}
  <h1
    id="blog"
    in:fade={{ delay: 500, duration: 500 }}
    out:fly={{ y: 50, duration: 300 }}>
    Explore My work
    <Emoji symbol="💻" />
  </h1>
  <div
    class="subtitle"
    in:fly={{ delay: 550, x: -50, duration: 500 }}
    out:fly={{ y: 50, duration: 300 }}>
    <p>
      AI and network science; politics and policy. Below are some of my
      ramblings. This is meant to be a more accessible outlet for the exciting
      but all too often inaccessible research done in the world of computational
      social science. All opinions are my own.
    </p>
  </div>
  <span
    class="postFilter"
    in:fly={{ delay: 550, x: -50, duration: 500 }}
    out:fly={{ y: 50, duration: 300 }}>
    {#if tags}
      <PostFilter {tags} bind:activeTags />
    {/if}
  </span>
  <span class="content">
    {#each visible as post, i}
      <span
        in:fly={{ delay: 500+(i*75), y: 50, duration: 500 }}
        out:fly={{ y: 50, duration: 300 }}>
        <span class="title">
          <h3>
            <Emoji symbol={post.emoji} />
          </h3>

          <h2>
            <a rel="prefetch" href="blog/{post.slug}/">{post.title}</a>
          </h2>
        </span>
        <p class="subtitle">
          {@html post.blurb}
          <span class="tags">
            <span>
              {#each post.tags as tagId}
                <Tag {tagId} />
              {/each}
            </span>
            <p>{post.fullDate}</p>
          </span>
        </p>
      </span>
    {/each}
  </span>
{/if}

<svelte:head>
  <title>💻Blog - Cameron Raymond💻</title>
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
  <meta property="og:title" content="💻Blog - Cameron Raymond💻" />
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
  <meta property="twitter:title" content="💻About - Cameron Raymond💻" />
  <meta
    property="twitter:description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science." />
  <meta
    property="twitter:image"
    content="https://cameronraymond.me/summary_about_large.png" />

</svelte:head>
