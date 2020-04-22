<script>
  import { FaLinkedinIn, FaGithub } from "svelte-icons/fa";
  export let segment;
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
  @media (max-width: 40rem) {
    .icon {
      width: 1rem;
      height: 1rem;
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
    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <a
      rel="prefetch"
      aria-current={segment === 'blog' ? 'page' : undefined}
      href="blog">
      Resume
    </a>
    <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
      About
    </a>
    <div class="divider" />
    <a class="icon" href="https://www.linkedin.com/in/cameron-raymond/">
      <FaLinkedinIn />
    </a>
    <a class="icon" href="https://github.com/cameron-raymond">
      <FaGithub />
    </a>
  </div>

</nav>
