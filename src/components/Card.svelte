<script>
  import Tag from "./Tag.svelte";
  import Emoji from "./Emoji.svelte";
  export let post;
  export let onHome = true;
</script>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
    width: 30rem;
    border: 1px solid #d1d5da;
    border-radius: 8px;
    transition: 0.3s;
    overflow: hidden;
  }
  p {
    text-align: left;
    padding: 0 1.5rem 0 1.5rem;
  }
  .card:hover {
    transform: translatey(-0.5em);
    transition: 0.3s;
    box-shadow: 2px 10px 10px 2px rgba(0, 0, 0, 0.12);
  }

  .head {
    display: flex;
    align-self: stretch;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(238, 238, 238, 0.5);
    height: 4.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    text-align: right;
  }
  .head .emoji {
    text-align: center;
    margin-right: 1.5rem;
    font-size: 0.7rem;
  }
  .head .title {
    text-align: right;
    /* margin-right: 1.5rem; */
    font-size: 0.7rem;
  }

  .head h4 {
    font-size: initial;
  }
  .link {
    text-decoration: underline;
    text-decoration-color: rgb(255, 62, 0);
  }
  .foot {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    padding: 0 0.5rem 0 1.5rem;
  }
  .foot span {
    display: flex;
  }

  @media (max-width: 40rem) {
    .card {
      width: 100vw;
      align-self: center;
      border-radius: 0;
      margin: 0rem;
      border: none;
      padding-bottom: 1rem;
      box-shadow: 0 0 0 0;
    }
    .foot {
      height: 1rem;
    }
  }
</style>

<div class="card">
  <div class="head">
    <div class="emoji">
      <h4>
        <Emoji symbol={post.emoji} />
      </h4>
      {#if post.link}
        <span class="link">
          {@html post.link}
        </span>
      {/if}
    </div>
    <div class="title">
      <h4>{post.title}</h4>
      {#if post.date}{post.date}{/if}
    </div>
  </div>

  <p>
    {@html post.blurb}
  </p>

  {#if post.tags || post.slug}
    <div class="foot">
      {#if post.tags}
        <span>
          {#each post.tags as tagId}
            <Tag {tagId} />
          {/each}
        </span>
      {/if}
      {#if post.slug}
        <a
          rel="prefetch"
          href="blog/{post.slug}"
          class="link"
          on:click={() => (onHome = false)}
          sapper-noscroll>
          Read More
        </a>
      {/if}
    </div>
  {/if}
</div>
