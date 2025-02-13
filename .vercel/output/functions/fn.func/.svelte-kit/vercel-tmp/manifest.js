export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.AX1AqAtI.js",app:"_app/immutable/entry/app.C1p96JHm.js",imports:["_app/immutable/entry/start.AX1AqAtI.js","_app/immutable/chunks/4_Ujj8xY.js","_app/immutable/chunks/DFfzNZs_.js","_app/immutable/chunks/qyiz6PpH.js","_app/immutable/entry/app.C1p96JHm.js","_app/immutable/chunks/DFfzNZs_.js","_app/immutable/chunks/CNIrhmfG.js","_app/immutable/chunks/50tq0GLg.js","_app/immutable/chunks/D7bmBnQz.js","_app/immutable/chunks/DjEgrkBV.js","_app/immutable/chunks/qyiz6PpH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
