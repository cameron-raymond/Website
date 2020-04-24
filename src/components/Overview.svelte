<script>
  import Emoji from "./Emoji.svelte";
  export let elements;
  export let title = "List time!!";
</script>

<style>
  span {
    display: flex;
    flex: 1;
    align-self: stretch;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 80em;
  }
  li {
    list-style-type: none;
  }
  @media (max-width: 40rem) {
    span {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
</style>

<h2>{title}</h2>
<span>
  {#each elements as element}
    <div>
      <h3>
        {@html element.header} {#if element.emoji} <Emoji symbol={element.emoji}/>{/if}
      </h3>
      <ul>
        {#each element.list as item}
          <li>
            {@html item}
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</span>
