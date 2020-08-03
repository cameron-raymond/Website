<script>
  import { tagLabels, typeLabels } from "../utils/tags.js";
  export let tags = [];
  export let types = [];
  export let activeTypes = [];
  export let activeTags = [];
  let updateType = typeId => {
    activeTypes.has(typeId)
      ? activeTypes.delete(typeId)
      : activeTypes.add(typeId);
    activeTypes = activeTypes.size == 0 ? new Set(types) : activeTypes;
  };
  let updateTag = tagId => {
    activeTags.has(tagId) ? activeTags.delete(tagId) : activeTags.add(tagId);
    activeTags = activeTags.size == 0 ? new Set(tags) : activeTags;
  };
  let pluralize = label =>
    label.endsWith(".") ? label.slice(0, -1) + "s." : label + "s";
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
    white-space: nowrap;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
  h3 {
    margin-top: 0.5rem;
  }

  .activeTags {
    background-color: #689dd1;
    color: white;
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

{#if tags && types}
  {#if types.length}
    <h3>Include</h3>
    <span>
      {#each types as typeId}
        <code
          class:activeTags={activeTypes.has(typeId)}
          on:click={() => updateType(typeId)}>
          <picture>
            <source srcset="tags/{typeId}.webp" type="image/webp" />
            <source srcset="tags/{typeId}.png" type="image/png" />
            <img
              src="tags/{typeId}.png"
              alt={`${tagLabels[typeId] || typeId} logo`} />
          </picture>
          <div class="tagLabel">
            {pluralize(typeLabels[typeId]) || pluralize(typeId)}
          </div>
        </code>
      {/each}
    </span>
  {/if}
  {#if tags.length}
    {#if types.length}
      <h3>About</h3>
    {:else}
      <h3>Include</h3>
    {/if}
    <span>
      {#each tags as tagId}
        <code
          class:activeTags={activeTags.has(tagId)}
          on:click={() => updateTag(tagId)}>
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
{/if}
