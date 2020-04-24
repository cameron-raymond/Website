<script>
  import { FaLinkedinIn, FaGithub, FaUser, FaNewspaper } from "svelte-icons/fa";
  import { getOutboundLink } from "../utils/getOutboundLink.js";
  export let segment;
  let linkedIn = "https://www.linkedin.com/in/cameron-raymond/"
  let github = "https://github.com/cameron-raymond"
</script>

<style>
  nav {
    position: sticky;
    height: 4em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 2em;
    padding-right: 2em;
    font-weight: 300;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 12em;
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
  <a aria-current={segment === undefined ? 'page' : undefined} href=".">
    Cameron Raymond
  </a>
  <div class="links">
    <a
      href="CRaymondResume2020.pdf"
      on:click={() => getOutboundLink('https://cameronraymond.me/CRaymondResume2020.pdf')}>
      <span class="hideIcons icon">
        <FaNewspaper />
      </span>
      <span class="hideLinks">Resume</span>
    </a>
    <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
      <span class="hideIcons icon">
        <FaUser />
      </span>
      <span class="hideLinks">About</span>
    </a>
    <div class="divider" />
    <a
      class="icon"
      href={linkedIn}
      on:click={() => getOutboundLink(linkedIn)}>
      <FaLinkedinIn />
    </a>
    <a
      class="icon"
      href={github}
      on:click={() => getOutboundLink(github)}
      >
      <FaGithub />
    </a>
    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- <a
      class="icon"
      rel="prefetch"
      aria-current={segment === 'blog' ? 'page' : undefined}
      href="blog">
      <FaGithub />
    </a> -->
  </div>

</nav>
