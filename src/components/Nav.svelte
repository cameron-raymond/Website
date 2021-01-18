<script>
  import {
    FaLinkedinIn,
    FaTwitter,
    FaUser,
    FaNewspaper,
    FaPencilAlt
  } from "svelte-icons/fa";
  import { getOutboundLink } from "../utils/link.js";
  export let segment;
  let linkedIn = "https://www.linkedin.com/in/CJKRaymond/";
  let twitter = "https://twitter.com/CJKRaymond";
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
    z-index: 3;
    background-color: white;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 14.5rem;
  }

  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }
  a {
    text-decoration: none;
  }

  .hideIcons {
    display: none;
  }

  @media (max-width: 40rem) {
    .links {
      width: 9.5rem;
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
  <a
    rel="prefetch"
    aria-label="Home"
    aria-current={segment === undefined ? 'page' : undefined}
    href=".">
    Cameron Raymond
  </a>
  <div class="links">
    <a
      aria-label="Resume"
      target="_blank"
      href="cameron-raymond-resume.pdf"
      on:click={() => getOutboundLink('https://cameronraymond.me/cameron-raymond-resume.pdf')}>
      <span class="hideIcons icon">
        <FaNewspaper />
      </span>
      <span class="hideLinks">Resume</span>
    </a>
    <a
      aria-label="Blog"
      rel="prefetch"
      aria-current={segment === 'blog' ? 'page' : undefined}
      href="blog/">
      <span class="hideIcons icon">
        <FaPencilAlt />
      </span>
      <span class="hideLinks">Blog</span>
    </a>
    <a
      aria-label="About"
      rel="prefetch"
      aria-current={segment === 'about' ? 'page' : undefined}
      href="about/">
      <span class="hideIcons icon">
        <FaUser />
      </span>
      <span class="hideLinks">About</span>
    </a>

    <div class="divider" />
    <a
      aria-label="LinkedIn"
      class="icon"
      href={linkedIn}
      on:click={() => getOutboundLink(linkedIn)}>
      <FaLinkedinIn />
    </a>
    <a
      aria-label="twitter"
      class="icon"
      href={twitter}
      on:click={() => getOutboundLink(twitter)}>
      <FaTwitter />
    </a>
  </div>

</nav>
