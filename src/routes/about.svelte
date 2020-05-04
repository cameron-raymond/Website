<script>
  import Emoji from "../components/Emoji.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Overview from "../components/Overview.svelte";
  let visible = false;
  onMount(() => {
    visible = true;
  });

  let aboutMe = [
    {
      emoji: "📖",
      header: "All Time Books",
      list: [
        `<a key={1} href="https://www.nytimes.com/2005/05/15/books/review/freakonomics-everything-he-always-wanted-to-know.html">Freakonomics</a>`,
        `<a key={3} href="https://www.nytimes.com/2011/11/27/books/review/thinking-fast-and-slow-by-daniel-kahneman-book-review.html">
          Thinking Fast and Slow
        </a>`,
        `<a key={4} href="https://www.theguardian.com/books/2018/sep/17/future-politics-living-together-in-world-transformed-by-tech-jamie-susskind-review">
          Future Politics
        </a>`,
        `<a key={5} href="https://www.nytimes.com/2000/05/06/arts/lonely-bowlers-unite-mend-social-fabric-political-scientist-renews-his-alarm.html">
          Bowling Alone
        </a>`
      ]
    },
    {
      emoji: "📚",
      header: `Quarantine Books`,
      list: [
        `<a
          key={1}
          href="https://www.nytimes.com/2013/06/09/books/review/americanah-by-chimamanda-ngozi-adichie.html"
        >
          Americanah
        </a>`,
        `<a
          key={2}
          href="https://economics.mit.edu/faculty/eduflo/pooreconomics"
        >
          Poor Economics
        </a>`,
        `<a
          key={3}
          href="https://www.nytimes.com/2013/01/29/science/naked-statistics-by-charles-wheelan-review.html"
        >
          Naked Statistics
        </a>`,
        `<a
          key={4}
          href="https://www.newyorker.com/recommends/read/the-privileged-poor-a-refreshing-antidote-to-our-obsession-with-the-college-admissions-scandal"
        >
          The Privileged Poor
        </a>`,
        `<a
          key={5}
          href="https://www.newyorker.com/culture/culture-desk/the-limits-of-grit"
        >
          Grit
        </a>`,
        `<a key={6}
        href="https://www.nytimes.com/2019/01/16/books/review-age-of-surveillance-capitalism-shoshana-zuboff.html">
          The Age of Surveillance Capitalism
        </a>`
      ]
    },
    {
      emoji: "👨‍🎤",
      header: "Quarantine Albums",
      list: [
        `<a key={0}
        href="https://pitchfork.com/thepitch/5-takeaways-from-drakes-new-mixtape-dark-lane-demo-tapes/">
        Dark Lane Demo Tapes
        </a>u
        `,
        `<a key={1} href="https://pitchfork.com/reviews/albums/22957-cubafonia/">
          Cubafonia
        </a>`,
        `<a
          key={2}
          href="https://pitchfork.com/reviews/albums/denzel-curry-kenny-beats-unlocked/"
        >
          Unlocked
        </a>`,
        `<a
          key={3}
          href="https://pitchfork.com/reviews/albums/medhane-full-circle/"
        >
          Full Circle
        </a>`,
        `<a
          key={4}
          href="https://pitchfork.com/reviews/albums/rina-sawayama-sawayama/"
        >
          SAWAYAMA
        </a>`
      ]
    },
    {
      emoji: "💃🕺",
      header: "All Time Albums",
      list: [
        `<a
          key={1}
          href="https://pitchfork.com/reviews/albums/22035-the-miseducation-of-lauryn-hill/"
        >
          The Miseducation of Lauryn Hill
        </a>`,
        `<a
          key={2}
          href="https://pitchfork.com/reviews/albums/2pac-all-eyez-on-me/"
        >
          All Eyez on Me
        </a>`,
        `<a
          key={3}
          href="https://pitchfork.com/reviews/albums/23125-this-old-dog/"
        >
          This Old Dog
        </a>`,
        `<a
          key={4}
          href="https://pitchfork.com/reviews/albums/20390-to-pimp-a-butterfly/"
        >
          To Pimp a Butterfly
        </a>`,
        `<a
          key={5}
          href="https://pitchfork.com/reviews/albums/9371-pet-sounds-40th-anniversary/"
        >
          Pet Sounds
        </a>`
      ]
    }
  ];
</script>

<style>
  span {
    display: flex;
    flex: 1;
    align-self: center;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 3.45rem;
    margin-left: 7rem;
    margin-right: 7rem;
    overflow: hidden;
    margin-bottom: 2rem;
    max-width: 65em;
  }
  .intro {
    flex: 4/7;
    padding-right: 1rem;
    max-width: 40em;
  }
  img {
    width: 20rem;
    height: auto;
    object-fit: contain;
    overflow: hidden;
  }
  /* .about-left-blob-svg {
    position: absolute;
    top: 40vh;
    left: -3rem;
    height: 30rem;
    overflow: hidden;
    z-index: -1;
  }
  .about-right-blob-svg {
    position: absolute;
    bottom: 2rem;
    right: 0rem;
    width: 50%;
    overflow: hidden;
    z-index: -1;
  } */
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
    <meta name="description" content="Cameron Raymond is a 21 year old data
    scienist from Toronto, Ontario. In the fall he will be joining the
    University of Oxford to do his MSc in Social Data Science." />
    <meta name="keywords" content="Cameron Raymond, University of Oxford, Oxford
    University, Data Science, Social Data Sience, Data Scientist"/>

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://cameronraymond.me/about">
    <meta property="og:title" content="💭About - Cameron Raymond💭">
    <meta name="og:description" content="Cameron Raymond is a 21 year old data
    scienist from Toronto, Ontario. In the fall he will be joining the
    University of Oxford to do his MSc in Social Data Science." />
    <meta property="og:image" content="summary_about_large">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_about_large">
    <meta property="twitter:url" content="https://cameronraymond.me/about">
    <meta property="twitter:title" content="💭About - Cameron Raymond💭">
    <meta property="twitter:description" content="Cameron Raymond is a 21 year old data
    scienist from Toronto, Ontario. In the fall he will be joining the
    University of Oxford to do his MSc in Social Data Science.">
</svelte:head>
{#if visible}
  <!-- <img src="about-left-blob.svg" alt="" class="about-left-blob-svg" />
  <img src="about-right-blob.svg" alt="" class="about-right-blob-svg" /> -->
  <span>
    <div class="intro">
      <h1 in:fly={{ delay: 500, y: 50, duration: 500 }}>
        Nice to meet you
        <Emoji symbol="🙋‍♂️" />
      </h1>
      <p in:fly={{ delay: 800, y: 50, duration: 500 }}>
        I’m a 21 year old data scientist from Toronto, Ontario - and a recent
        computer science and political science graduate from
        <a href="https://www.queensu.ca/">Queen’s University.</a>
        In the fall I'll be joining the
        <a href="http://www.ox.ac.uk/">University of Oxford</a>
        and the
        <a href="https://www.oii.ox.ac.uk/">Oxford Internet Institute</a>
        to do my MSc in
        <a href="https://www.oii.ox.ac.uk/study/msc-in-social-data-science/">
          Social Data Science.
        </a>
        My broad areas of interest include network science, machine learning,
        and computational social science.
      </p>
      <p in:fly={{ delay: 850, y: 50, duration: 500 }}>
        With previous coursework and research studying the Politics of
        Artificial Intelligence;
        <a
          href="https://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-452.html">
          Neural and Genetic Computing;
        </a>
        and
        <a
          href="https://www.cs.queensu.ca/students/undergraduate/courses/desc/CISC-474.html">
          Reinforcement Learning
        </a>
        I am passionate about the intersection of technology and society.
      </p>
      <p in:fly={{ delay: 900, y: 50, duration: 500 }}>
        In my spare time I love reading, exercising and hanging out with loved
        ones.
      </p>
    </div>
    <picture in:fade={{ delay: 600, duration: 200 }}>
      <source type="image/webp" srcset="portrait.webp" />
      <source type="image/jpeg" srcset="portrait.png" />
      <img src="portrait.webp" alt="portrait" />
    </picture>
  </span>
  <Overview elements={aboutMe} title="Me Through Lists" />
{/if}
