<script lang="ts">
  import { icons, type IconName } from './icons';

  interface Props {
    name: IconName;
    size?: number | string;
    class?: string;
  }

  let { name, size = '1em', class: className = '' }: Props = $props();

  const sizeValue = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 32 32"
  width={sizeValue}
  height={sizeValue}
  class={className}
  aria-hidden="true"
>
  {@html icons[name]}
</svg>

