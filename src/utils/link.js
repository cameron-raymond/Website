let getOutboundLink = (url) => {
  if (gtag !== undefined) {
    gtag("event", "click", {
      event_category: "outbound",
      event_label: url,
      transport_type: "beacon"
    });
  }
};

function fade(node, { delay = 0, duration = 400, offset=window.scrollY }) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    offset,
    css: t => `opacity: ${t * o}; margin-top: -${offset}px`
  };
}
export { getOutboundLink, fade };
