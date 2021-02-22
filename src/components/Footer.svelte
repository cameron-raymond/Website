<script>
  import Emoji from "./Emoji.svelte";
  import Annotation from "svelte-rough-notation";
  import {
    FaLinkedinIn,
    FaGithub,
    FaMediumM,
    FaTwitter
  } from "svelte-icons/fa";
  import LazyLoad from "./HoC/LazyLoad.svelte";
  import { getOutboundLink } from "../utils/link.js";
  let year = "21";
  let month = "February";
  let day = "20";
  let linkedIn = "https://www.linkedin.com/in/CJKRaymond/";
  let github = "https://github.com/cameron-raymond/";
  let email = "mailto:cameron.raymond@hey.com?subject=Let's%20Talk%20Data";
  let medium = "https://medium.com/@cameronraymond/";
  let twitter = "https://twitter.com/CJKRaymond";
</script>

<style>
  .footer {
    position: relative;
    margin-top: 1rem;
    height: 8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    font-weight: 300;
  }
  .footer p {
    margin-right: 1.5rem;
  }
  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 10rem;
  }
  .divider {
    height: 1.5rem;
    width: 1px;
    background-color: #333;
    opacity: 0.3;
  }
  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }
  .chat {
    margin-top: 6rem;
    display: flex;
    justify-content: center;
  }
  .chat a {
    /* text-decoration: underline;
    text-decoration-color: rgb(255, 62, 0);
    text-decoration-thickness: 0.11em; */
    text-decoration: none;
  }
  @media (max-width: 40rem) {
    .icon {
      width: 1rem;
      height: 1rem;
    }
    .links {
      width: 8rem;
    }
    .chat {
      margin-top: 4rem;
    }
  }
</style>

<div class="chat">
  <LazyLoad let:visible>
    {#if visible}
      <h3>
        Let's
        <a
          aria-label="Email"
          href={email}
          on:click={() => getOutboundLink(email)}>
          <Annotation
            visible={true}
            type="underline"
            padding={-1}
            color="rgb(255, 62, 0)">
            Talk Data
          </Annotation>
        </a>
      </h3>
    {/if}
  </LazyLoad>

</div>
<div class="footer">
  <p>
    <Emoji symbol="👨‍🎨" />
    +
    <Emoji symbol="👷‍♂️" />
    by me
    <br />
    Last updated
    <a
      aria-label="{month}
      {day}, {year}"
      href="https://www.onthisday.com/events/{month}/{day}">
      {month} {day}, '{year}
    </a>
  </p>
  <div class="links">
    <a
      aria-label="LinkedIn"
      href={linkedIn}
      class="icon"
      on:click={() => getOutboundLink(linkedIn)}>
      <FaLinkedinIn />
    </a>
    <div class="divider" />
    <a
      aria-label="twitter"
      class="icon"
      href={twitter}
      on:click={() => getOutboundLink(twitter)}>
      <FaTwitter />
    </a>
    <div class="divider" />
    <a
      aria-label="Github"
      href={github}
      class="icon"
      on:click={() => getOutboundLink(github)}>
      <FaGithub />
    </a>
    <div class="divider" />
    <a
      aria-label="Medium"
      href={medium}
      class="icon"
      on:click={() => getOutboundLink(medium)}>
      <FaMediumM />
    </a>
  </div>
</div>
