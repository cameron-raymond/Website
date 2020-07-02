<script context="module">
  export function preload({ params, query }) {
    this.fetch(`sitemap.xml`);
    return this.fetch(`../index.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import Home from "../index.svelte"
  import { onMount } from "svelte";
  export let posts;
  onMount(() => {
    let el = document.getElementById("blog");
    setTimeout(() => {
       el.scrollIntoView({behavior: "smooth"});
    }, 5);
   
  });
</script>

<Home {posts}/>