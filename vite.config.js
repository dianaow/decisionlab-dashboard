import { sveltekit } from '@sveltejs/kit/vite';
export default {
  plugins: [sveltekit()],
  assetsInclude: ['**/*.geojson'] // Add this line
};
