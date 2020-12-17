<script>
  import { IoIosCloseCircleOutline } from "svelte-icons/io";
  import { fly } from "svelte/transition";
  let visible = true;
  let updateVis = () => (visible = !visible);
</script>

<style>
  .margin{
    height:3rem;
  }
  .sign-up-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    color: white;
    background: rgba(255, 62, 0, 0.95);
    height: 3rem;
    z-index: 1000;
    width: 100%;
    top: 0;
  }
  .subscribe {
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
    border: none;
  }
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
  }
  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #2a384d;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    left: 40px;
    top: -5px;
    z-index: 4;
  }

  .tooltip .tooltiptext:after,
  .tooltip .tooltiptext:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .tooltip .tooltiptext:after {
    border-color: rgba(136, 183, 213, 0);
    border-width: 8px;
    margin-top: -8px;
  }
  .tooltip .tooltiptext:before {
    border-color: rgba(255, 120, 169, 0);
    border-right-color: #2a384d;
    border-width: 8px;
    margin-top: -8px;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
  input:focus, input:focus{
    outline: white;
}
  .email {
    background-color: transparent;
    border: none;
    color: white;
    border-bottom-color: white;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    margin: 0em 0.5em 0em 0.5em;
  }
  #close-sub {
    position: absolute;
    right: 1rem;
    width: 1.4rem;
    height: 1.4rem;
    color: white;
    cursor: pointer;
  }
  @media (max-width: 40rem) {
    .tooltip .tooltiptext {
      width: 100px;
      left: -32px;
      top: 25px;
    }
    .tooltip .tooltiptext:after,
    .tooltip .tooltiptext:before {
      display: none;
    }
  }
  @media (max-width: 27rem) {
    .label {
      display: none;
    }
  }
</style>

{#if visible}
  <div class="margin"/>
  <form
    class="sign-up-banner"
    action="https://tinyletter.com/cjkraymond"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://tinyletter.com/cjkraymond', 'popupwindow',
    'scrollbars=yes,width=800,height=600');return true">
    <p>
      <label class="label" for="tlemail">Let's be pals:</label>
    </p>
    <div class="signup-input">
      <input
        type="text"
        name="email"
        class="email"
        placeholder="my@email.com"
        id="tlemail" />
    </div>
    <input type="hidden" value="1" name="embed" />
    <span class="tooltip">
      <input type="submit" value="✉️" class="subscribe" />
      <span class="tooltiptext">Subscribe!</span>
    </span>
    <span id="close-sub" on:click={() => updateVis()}>
      <IoIosCloseCircleOutline />
    </span>
  </form>
{/if}

<!-- <link
    href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css"
    rel="stylesheet"
    type="text/css" />
  <div id="mc_embed_signup">
    <form
      action="https://cameronraymond.us10.list-manage.com/subscribe/post?u=d4654442d7398748f6cba3e51&amp;id=129b2a12c1"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate>
      <div id="mc_embed_signup_scroll">
        <label for="mce-EMAIL">Let's be pals:</label>
        <input
          type="email"
          value=""
          name="EMAIL"
          class="email"
          id="mce-EMAIL"
          placeholder="my@email.com"
          required />
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
          <input
            type="text"
            name="b_d4654442d7398748f6cba3e51_129b2a12c1"
            tabindex="-1"
            value="" />
        </div>
        <div class="clear">
        <span class="tooltip">
          <input
            type="submit"
            value="✉️"
            name="subscribe"
            id="mc-embedded-subscribe"
            class="button" />
          <span class="tooltiptext">Subscribe!</span>
        </span>

        </div>
      </div>
    </form>
    <span id="close-sub" on:click={() => updateVis()}>
      <IoIosCloseCircleOutline />
    </span>
  </div> -->
