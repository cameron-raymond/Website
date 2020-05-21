<script>
  export let tags;
  export let active;

  let tagLabels = {
    rl: "Reinforcement Learning",
    gt: "Graph Theory",
    ml: "Machine Learning",
    bp: "Blog Post",
    nlp: "NLP",
    nt: "Networkd"
  };
  let updateCurrent = tagId => {
    // active = active.includes(tagId)
    //   ? active.filter(x => x != tagId)
    //   : [...active, tagId];
    active.has(tagId) ? active.delete(tagId) : active.add(tagId);
    active = active;
    // console.log(active);
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
    cursor: pointer;
  }
  .active {
    background-color: #ff3e00;
    color: white;
  }
  span {
    max-width: 40rem;
    display: flex;
    flex-wrap: wrap;
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

{#if tags}
  <h3>Include</h3>
  <span>
    {#each tags as tagId}
      <code
        class:active={active.has(tagId)}
        on:click={() => updateCurrent(tagId)}>
        <picture>
          <source srcset="tags/{tagId}.webp" type="image/webp" />
          <source srcset="tags/{tagId}.png" type="image/png" />
          <img
            src="tags/{tagId}.png"
            alt={`${tagLabels[tagId] || tagId} logo`} />
        </picture>
        <div class="tagLabel">{tagLabels[tagId] || tagId}</div>
      </code>
    {/each}
  </span>
{/if}
