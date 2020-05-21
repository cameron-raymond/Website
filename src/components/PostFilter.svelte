<script>
  export let tags;
  let current = new Set(tags);

  let tagLabels = {
    rl: "Reinforcement Learning",
    gt: "Graph Theory",
    ml: "Machine Learning",
    bp: "Blog Post",
    nlp: "Natural Lang. Processing",
    nt: "Networkd"
  };
</script>

<style>
  code {
    margin: 0.2rem 0;
    margin-right: 0.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1.2rem;
    padding: 0 0.3rem;
    font-size: 0.7rem;
  }
  .active {
    background-color: #ff3e00;
    color: white;
  }
  span {
    display: flex;
  }
  img {
    height: 0.85rem;
    width: 0.85rem;
    margin: 0.2rem 0.2rem 0 0;
  }
  .tagLabel {
    text-transform: capitalize;
  }
  @media (max-width: 40rem) {
    code {
      font-size: 0.6rem;
    }
    img {
      height: 0.6rem;
      width: 0.6rem;
      margin-right: 0.1rem;
    }
  }
</style>

<h3>Filter by</h3>
<span>
  {#each tags as tagId}
    <code class:active={current.has(tagId)} on:click={() => current.has(tagId) ? current.add(tagId) : current.delete(tagId)}>
      <picture>
        <source srcset="tags/{tagId}.webp" type="image/webp" />
        <source srcset="tags/{tagId}.png" type="image/png" />
        <img src="tags/{tagId}.png" alt={`${tagLabels[tagId] || tagId} logo`} />
      </picture>
      <div class="tagLabel">{tagLabels[tagId] || tagId}</div>
    </code>
  {/each}
</span>
