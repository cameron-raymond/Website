<script context="module">
  export async function preload({ params, query }) {
    const overview = await this.fetch(`about/overview.json`).then(r =>
      r.json()
    );
    const intro = await this.fetch(`about/intro.json`).then(r => r.json());
    return { overview: overview, intro: intro };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Emoji from "../../components/Emoji.svelte";
  import Overview from "../../components/Overview.svelte";
  let visible = false;
  export let overview;
  export let intro;

  onMount(() => {
    visible = true;
  });
</script>

<style>
  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 3.45rem;
    margin-left: 7rem;
    margin-right: 7rem;
    overflow: hidden;
    margin-bottom: 2rem;
    max-width: 60em;
  }
  .intro {
    padding-right: 1rem;
    max-width: 40em;
  }
  img {
    width: 20rem;
    height: auto;
    object-fit: contain;
    overflow: hidden;
  }
  @media (max-width: 60rem) {
    span {
      margin-top: 3rem;
      margin-left: 0;
      margin-right: 0;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-self: center;
      align-items: center;
    }
    .intro {
      padding-right: 0;
    }
    img {
      margin-bottom: 0.5rem;
    }
  }
</style>

<svelte:head>
  <title>💭About - Cameron Raymond💭</title>
  <meta
    name="description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science. His broad areas of interest include network
    science, machine learning, and computational social science." />
  <meta
    name="keywords"
    content="Cameron Raymond, University of Oxford, Oxford University, Data
    Science, Social Data Sience, Data Scientist" />
  <link rel="canonical" href="https://cameronraymond.me/about/" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cameronraymond.me/about/" />
  <meta property="og:title" content="💭About - Cameron Raymond💭" />
  <meta
    name="og:description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science. His broad areas of interest include network
    science, machine learning, and computational social science." />
  <meta
    property="og:image"
    content="https://cameronraymond.me/summary_about_large.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://cameronraymond.me/about/" />
  <meta property="twitter:title" content="💭About - Cameron Raymond💭" />
  <meta
    property="twitter:description"
    content="Cameron Raymond is a 21 year old data scienist from Toronto,
    Ontario. In the fall he will be joining the University of Oxford to do his
    MSc in Social Data Science." />
  <meta
    property="twitter:image"
    content="https://cameronraymond.me/summary_about_large.png" />

</svelte:head>

{#if visible}
  <span>
    <div class="intro">
      
     <h1 in:fly={{ delay: 500, y: 50, duration: 500 }}>
        {intro.title}
        <Emoji symbol={intro.emoji} />
      </h1>
      <div in:fly={{ delay: 800, y: 50, duration: 500 }}> 
      {@html intro.html}
      </div>
       <!-- 
      <p in:fly={{ delay: 800, y: 50, duration: 500 }}>
        I'm Cameron - a data scientist from Toronto, and recent CS and PoliSci
        graduate from
        <a aria-label="Queen’s University" href="https://www.queensu.ca/">
          Queen’s University.
        </a>
        In the fall I'll be joining
        <a aria-label="University of Oxford" href="http://www.ox.ac.uk/">
          Oxford
        </a>
        and the
        <a
          aria-label="Oxford Internet Institute"
          href="https://www.oii.ox.ac.uk/">
          Oxford Internet Institute
        </a>
        to do my MSc in
        <a
          aria-label="Social Data Science"
          href="https://www.oii.ox.ac.uk/study/msc-in-social-data-science/">
          Social Data Science.
        </a>
        At Oxford I'll continue studying network science, machine learning, and
        computational social science.
      </p>
      <p in:fly={{ delay: 850, y: 50, duration: 500 }}>
        Right now I'm a research scientist at the
        <a aria-label="UToronto" href="https://www.utoronto.ca/">
          University of Toronto
        </a>
        working on
        <a
          aria-label="community embeddings demo"
          href="http://csslab.cs.toronto.edu/gs/">
          community embeddings
        </a>
        with
        <a
          aria-label="Ashton Anderson Website"
          href="http://www.cs.toronto.edu/~ashton/">
          Dr. Ashton Anderson.
        </a>
      </p>
      <p in:fly={{ delay: 900, y: 50, duration: 500 }}>
        With previous coursework and research studying the Politics of
        Artificial Intelligence;
        <a
          aria-label="Neural and Genetic Computing"
          href="https://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-452.html">
          Neural and Genetic Computing;
        </a>
        and
        <a
          aria-label="Reinforcement Learning"
          href="https://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-474.html">
          Reinforcement Learning
        </a>
        I'm passionate about the intersection of technology and society.
      </p>
      <p in:fly={{ delay: 950, y: 50, duration: 500 }}>
        If you want to chat, know of a good trail near Toronto or have a recent
        read you want to share, reach out at the link below
        <Emoji symbol="😇" />
      </p>

      <p in:fly={{ delay: 1000, y: 50, duration: 500 }}>
        <Emoji symbol="✌️" />
        <br />
        Cameron
      </p> -->

    </div>
    <picture rel="preload" in:fade={{ delay: 600, duration: 200 }}>
      <source type="image/webp" srcset="{intro.image}.webp" />
      <source type="image/jpeg" srcset="{intro.image}.png" />
      <img src="{intro.image}.webp" alt="{intro.image}" />
    </picture>
  </span>
  <div in:fade={{ delay: 1050, duration: 500 }}>
    <Overview elements={overview} title="Me Through Lists" />
  </div>
{/if}
