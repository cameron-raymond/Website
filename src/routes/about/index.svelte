<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Emoji from "../../components/Emoji.svelte";
  import Overview from "../../components/Overview.svelte";
  let visible = false;
  onMount(() => {
    visible = true;
  });

  let aboutMe = [
    {
      emoji: "📖",
      header: "All Time Books",
      list: [
        `<a aria-label="Freakonomics" 
        href="https://www.nytimes.com/2005/05/15/books/review/freakonomics-everything-he-always-wanted-to-know.html">Freakonomics</a>`,
        `<a aria-label="Thinking Fast and Slow" 
        href="https://www.nytimes.com/2011/11/27/books/review/thinking-fast-and-slow-by-daniel-kahneman-book-review.html">
          Thinking Fast and Slow
        </a>`,
        `<a aria-label="Future Politics" 
        href="https://www.theguardian.com/books/2018/sep/17/future-politics-living-together-in-world-transformed-by-tech-jamie-susskind-review">
          Future Politics
        </a>`,
        `<a aria-label="Bowling Alone" 
        href="https://www.nytimes.com/2000/05/06/arts/lonely-bowlers-unite-mend-social-fabric-political-scientist-renews-his-alarm.html">
          Bowling Alone
        </a>`
      ]
    },
    {
      emoji: "📚",
      header: `Quarantine Books`,
      list: [
        `<a aria-label="The Address Book" 
        href="https://www.nytimes.com/2020/04/14/books/review/deirdre-mask-the-address-book.html">
          The Address Book
        </a>`,
        `<a aria-label="Winners Take All" 
        href="https://www.nytimes.com/2018/08/20/books/review/winners-take-all-anand-giridharadas.html">
          Winners Take All
        </a>`,
        `<a aria-label="Scarcity" 
        href="https://www.theguardian.com/books/2013/sep/07/scarcity-sendhil-mullainathan-shafir-review">
          Scarcity
        </a>`,
        `<a aria-label="Social Physics" 
        href="https://www.technologyreview.com/2014/03/04/173783/social-physics/">
          Social Physics
        </a>`,
        `<a aria-label="The Age of Surveillance Capitalism" 
        href="https://www.nytimes.com/2019/01/16/books/review-age-of-surveillance-capitalism-shoshana-zuboff.html">
          The Age of Surveillance Capitalism
        </a>`,
        `<a aria-label="Grit"
          
          href="https://www.newyorker.com/culture/culture-desk/the-limits-of-grit"
        >
          Grit
        </a>`,
        `<a aria-label="The Privileged Poor"
          
          href="https://www.newyorker.com/recommends/read/the-privileged-poor-a-refreshing-antidote-to-our-obsession-with-the-college-admissions-scandal"
        >
          The Privileged Poor
        </a>`,
        `<a aria-label="Naked Statistics"
          
          href="https://www.nytimes.com/2013/01/29/science/naked-statistics-by-charles-wheelan-review.html"
        >
          Naked Statistics
        </a>`,
        `<a aria-label="Poor Economics"
           href="https://economics.mit.edu/faculty/eduflo/pooreconomics"
        >
          Poor Economics
        </a>`,
        `<a aria-label="Americanah"
          
          href="https://www.nytimes.com/2013/06/09/books/review/americanah-by-chimamanda-ngozi-adichie.html"
        >
          Americanah
        </a>`
      ]
    },
    {
      emoji: "👨‍🎤",
      header: "Quarantine Albums",
      list: [
        `<a aria-label="Alfredo" href="https://pitchfork.com/news/freddie-gibbs-and-the-alchemist-announce-new-album-alfredo-share-new-song-1985-listen/">Alfredo</a>`,
        `<a aria-label="Un Canto Por México Vol. 1" href="https://www.theneedledrop.com/articles/2020/5/natalia-lafourcade-un-canto-por-mxico-vol-1">Un Canto Por México Vol. 1</a>`,
        `<a aria-label="Everything is Beautiful" 
        href="https://pitchfork.com/reviews/albums/princess-nokia-everything-is-beautiful-everything-sucks/">
        Everything is Beautiful </a> `,
        `<a aria-label="Cubafonia"
         href="https://pitchfork.com/reviews/albums/22957-cubafonia/">
          Cubafonia
        </a>`,
        `<a aria-label="Unlocked"
          
          href="https://pitchfork.com/reviews/albums/denzel-curry-kenny-beats-unlocked/"
        >
          Unlocked
        </a>`,
        `<a aria-label="SAWAYAMA"
          
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
        `<a aria-label="The Miseducation of Lauryn Hill"
          key={1}
          href="https://pitchfork.com/reviews/albums/22035-the-miseducation-of-lauryn-hill/"
        >
          The Miseducation of Lauryn Hill
        </a>`,
        `<a aria-label="All Eyez on Me"
          key={2}
          href="https://pitchfork.com/reviews/albums/2pac-all-eyez-on-me/"
        >
          All Eyez on Me
        </a>`,
        `<a aria-label="This Old Dog"
          key={3}
          href="https://pitchfork.com/reviews/albums/23125-this-old-dog/"
        >
          This Old Dog
        </a>`,
        `<a aria-label="To Pimp a Butterfly"
          key={4}
          href="https://pitchfork.com/reviews/albums/20390-to-pimp-a-butterfly/"
        >
          To Pimp a Butterfly
        </a>`,
        `<a aria-label="Pet Sounds"
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

<div>
  {#if visible}
    <span>
      <div class="intro">
        <h1 in:fly={{ delay: 500, y: 50, duration: 500 }}>
          Nice to meet you
          <Emoji symbol="🙋‍♂️" />
        </h1>
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
          At Oxford I'll continue studying network science, machine learning,
          and computational social science.
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
          If you want to chat, know of a good trail near Toronto or have a
          recent read you want to share, reach out at the link below
          <Emoji symbol="😇" />
        </p>

        <p in:fly={{ delay: 1000, y: 50, duration: 500 }}>
          <Emoji symbol="✌️" />
          <br />
          Cameron
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
</div>