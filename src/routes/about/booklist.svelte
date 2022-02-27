<script context="module">
  export async function preload({ params, query }) {
    const booklist = await this.fetch(`about/booklist.json`).then(r =>
      r.json()
    );
    return { booklist };
  }
</script>

<script>
  export let booklist;
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
  :global(ol) {
    padding-left: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 80em;
    list-style: none;
  }
  :global(li > ol) {
    padding-left: 20px;
    display: block;
    max-width: 15rem;
    list-style: initial;
  }

  @media (max-width: 60rem) {
    :global(ol) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
</style>

<div class="container">
  <span>
    {@html booklist.html}
  </span>

</div>
