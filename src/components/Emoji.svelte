<script>
  export let label="Emoji";
  export let symbol;
</script>

<span
  role="img"
  aria-label={label ? label : ''}
  aria-hidden={label ? 'false' : 'true'}>
  {symbol}
</span>
