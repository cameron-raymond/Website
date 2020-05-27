<script>
  import { tagLabels } from "../utils/tags.js";
  export let tags;
  export let active;
  let updateCurrent = tagId => {
    active.has(tagId) ? active.delete(tagId) : active.add(tagId);
    active = active.size == 0 ? new Set(tags) : active;
  };
</script>

<style>
  span {
    max-width: 35rem;
    display: flex;
    flex-wrap: wrap;
  }
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
    transition: 0.2s;
  }
  code:hover {
    transition: 0.2s;
    background-color: rgba(213, 213, 213, 0.5);
  }
  .active {
    background-color: #ff3e00;
    color: white;
    transition: 0.2s;
  }
  .active:hover {
    background-color: #fa3e00;
    transition: 0.2s;
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
