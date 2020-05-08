let getOutboundLink = (url) => {
  if (gtag !== undefined) {
    gtag("event", "click", {
      event_category: "outbound",
      event_label: url,
      transport_type: "beacon"
    });
  }
};


export { getOutboundLink };
