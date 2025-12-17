<script lang="ts">
  import { icons, type IconName } from './icons';

  interface Props {
    name: IconName;
    size?: number | string;
    class?: string;
  }

  let { name, size = '1em', class: className = '' }: Props = $props();

  const sizeValue = $derived(typeof size === 'number' ? `${size}px` : size);
  
  // Extract the inner content from the SVG (everything between <svg> tags)
  const svgContent = $derived(() => {
    const svg = icons[name];
    const match = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    return match ? match[1] : '';
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 256 256"
  fill="currentColor"
  width={sizeValue}
  height={sizeValue}
  class={className}
  aria-hidden="true"
>
  {@html svgContent()}
</svg>
