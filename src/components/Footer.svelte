<script>
  import Emoji from "./Emoji.svelte";
  import { FaLinkedinIn, FaGithub, FaMediumM } from "svelte-icons/fa";
  import { getOutboundLink } from "../utils/getOutboundLink.js";
  import IoIosMail from "svelte-icons/io/IoIosMail.svelte";
  let year = "2020";
  let month = "May";
  let day = "07";
  let linkedIn = "https://www.linkedin.com/in/cameron-raymond/";
  let github = "https://github.com/cameron-raymond";
  let email = "mailto:cameronraymond534@gmail.com";
  let medium = "https://medium.com/networkd";
</script>

<style>
  .footer {
    position: relative;
    margin-top: 3rem;
    height: 8rem;
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
    width: 10em;
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
  @media (max-width: 40rem) {
    .icon {
      width: 1rem;
      height: 1rem;
    }
    .links {
      width: 8em;
    }
  }
</style>

<div class="footer">
  <p>
    <Emoji symbol="👨‍🎨" />
    and
    <Emoji symbol="👷‍♂️" />
    by me.
    <br />
    Last updated
    <a
      aria-label="{month}
      {day}, {year}"
      href="https://www.onthisday.com/events/{month}/{day}">
      {month} {day}, {year}
    </a>
    .
  </p>
  <div class="links">
    <a
      aria-label="Email"
      href={email}
      class="icon"
      on:click={() => getOutboundLink(email)}>
      <IoIosMail />
    </a>
    <div class="divider" />
    <a
      aria-label="LinkedIn"
      href={linkedIn}
      class="icon"
      on:click={() => getOutboundLink(linkedIn)}>
      <FaLinkedinIn />
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
