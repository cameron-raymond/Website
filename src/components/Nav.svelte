<script>
  import { FaLinkedinIn, FaGithub, FaUser, FaNewspaper } from "svelte-icons/fa";
  import { getOutboundLink } from "../utils/link.js";
  export let segment;
  let linkedIn = "https://www.linkedin.com/in/cameron-raymond/"
  let github = "https://github.com/cameron-raymond/"
</script>

<style>
  nav {
    position: sticky;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    font-weight: 300;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 12rem;
  }

  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  .hideIcons {
    display: none;
  }

  @media (max-width: 40rem) {
    .links {
      width: 9rem;
    }
    .icon {
      width: 1rem;
      height: 1rem;
    }
    .hideLinks {
      display: none;
    }
    .hideIcons {
      display: block;
    }
  }

  [aria-current] {
    color: rgb(255, 62, 0);
    position: relative;
    display: inline-block;
  }
  .divider {
    height: 1.5rem;
    width: 1px;
    background-color: #333;
    opacity: 0.3;
  }
</style>

<nav>
  <a aria-label="Home" aria-current={segment === undefined ? 'page' : undefined} href=".">
    Cameron Raymond
  </a>
  <div class="links">
    <a aria-label="Resume"
      href="CRaymondResume2020.pdf/"
      on:click={() => getOutboundLink('https://cameronraymond.me/CRaymondResume2020.pdf')}>
      <span class="hideIcons icon">
        <FaNewspaper />
      </span>
      <span class="hideLinks">Resume</span>
    </a>
    <a aria-label="About" aria-current={segment === 'about' ? 'page' : undefined} href="about/">
      <span class="hideIcons icon">
        <FaUser />
      </span>
      <span class="hideLinks">About</span>
    </a>
    <div class="divider" />
    <a aria-label="LinkedIn"
      class="icon"
      href={linkedIn}
      on:click={() => getOutboundLink(linkedIn)}>
      <FaLinkedinIn />
    </a>
    <a aria-label="Github"
      class="icon"
      href={github}
      on:click={() => getOutboundLink(github)}
      >
      <FaGithub />
    </a>
    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- <a aria-label=""
      class="icon"
      rel="prefetch"
      aria-current={segment === 'blog' ? 'page' : undefined}
      href="blog">
      <FaGithub />
    </a> -->
  </div>

</nav>
