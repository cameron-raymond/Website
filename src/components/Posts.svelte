<script>
  import Emoji from "./Emoji.svelte";
  import Tag from "./Tag.svelte";
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
  .post {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
    width: 30rem;
    border: 1px solid #d1d5da;
    /* box-shadow: 0 2px 44px 0 rgba(0, 0, 0, 0.14); */
    border-radius: 8px;
    transition: 0.3s;
    overflow: hidden;
  }
  p {
    text-align: left;
    padding: 0 1.5rem 0 1.5rem;
  }
  .post:hover {
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
  .head .link {
    text-decoration: underline;
    text-decoration-color: rgb(255, 62, 0);
  }
  .foot {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: flex-end;
    align-items: center;
    height: 2rem;
    padding-right: 0.5rem;
    text-align: right;
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
    .post {
      width: 100vw;
      align-self: center;
      border-radius: 0;
      margin: 0rem;
      border: none;
      padding-bottom: 1rem;
      box-shadow: 0 0 0 0;
    }
    .head {
      height: 3.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    .foot {
      height: 1rem;
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
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <div class="post">
      <!-- <a rel="prefetch" href="blog/{post.slug}">{post.title}</a> -->
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

      {#if post.tags}
        <div class="foot">
          {#each post.tags as tagId}
            <Tag {tagId} />
          {/each}
        </div>
      {/if}
    </div>
  {/each}
  {#if posts.length % 2 != 0}
    <span class="placeholder" />
  {/if}
</span>
