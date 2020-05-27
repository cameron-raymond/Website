<script>
  import { tagLabels } from "../utils/tags.js";
  export let tagId;

  $: tagString = tagLabels[tagId] || tagId;
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

<code>
  <picture>
    <source srcset="tags/{tagId}.webp" type="image/webp" />
    <source srcset="tags/{tagId}.png" type="image/png" />
    <img src="tags/{tagId}.png" alt={`${tagString} logo`} />
  </picture>
  <div class="tagLabel">{tagString}</div>
</code>
