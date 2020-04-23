<script>
  import Emoji from "./Emoji.svelte";
  import { FaLinkedinIn, FaGithub } from "svelte-icons/fa";
  import IoIosMail from "svelte-icons/io/IoIosMail.svelte";
  let year = "2020";
  let month = "April";
  let day = "23";
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
    width: 8em;
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
      width: 6.5em;
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
    <a href="https://www.onthisday.com/events/{month}/{day}">
      {month} {day}, {year}
    </a>
    .
  </p>
  <div class="links">
    <a href="mailto:cameronraymond534@gmail.com" class="icon">
      <IoIosMail />
    </a>
    <div class="divider" />
    <a href="https://linkedin.com/in/cameron-raymond/" class="icon">
      <FaLinkedinIn />
    </a>
    <div class="divider" />
    <a href="https://github.com/cameron-raymond" class="icon">
      <FaGithub />
    </a>
  </div>
</div>
