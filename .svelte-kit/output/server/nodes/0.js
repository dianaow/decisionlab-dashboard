

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BYajUPJD.js","_app/immutable/chunks/50tq0GLg.js","_app/immutable/chunks/DFfzNZs_.js"];
export const stylesheets = [];
export const fonts = [];
