export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","data/.DS_Store","data/canada_provinces.geojson"]),
	mimeTypes: {".geojson":"application/geo+json"},
	_: {
		client: {start:"_app/immutable/entry/start.BmnGcUhr.js",app:"_app/immutable/entry/app.BBFIsEnY.js",imports:["_app/immutable/entry/start.BmnGcUhr.js","_app/immutable/chunks/B8s_yuC2.js","_app/immutable/chunks/DUKe3tHL.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/B__n4pWK.js","_app/immutable/entry/app.BBFIsEnY.js","_app/immutable/chunks/DUKe3tHL.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BijB-hok.js","_app/immutable/chunks/D8v46FJ-.js","_app/immutable/chunks/Bg9kRutz.js","_app/immutable/chunks/Dg12nDQp.js","_app/immutable/chunks/B__n4pWK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/compare",
				pattern: /^\/compare\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
