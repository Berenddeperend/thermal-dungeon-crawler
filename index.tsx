import { getState, updateState } from "./src/db";
import { renderLevel } from "./src/render";
import admin from "./src/admin.html";

Bun.serve({
	port: 3001,
	routes: {
		"/": admin,

		"/image": {
			GET: () => {
				const state = getState();
				const buffer = renderLevel(state);
				return new Response(buffer, {
					headers: { "Content-Type": "image/png" },
				});
			},
		},

		"/debug": {
			GET: () => {
				return new Response(
					`<!DOCTYPE html>
<html>
<head><title>Debug View</title></head>
<body style="background:#111;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0">
	<img id="img" src="/image" style="border:1px solid #333; width: 288px;" >
<!--	<script>setInterval(() => document.getElementById('img').src = '/image?' + Date.now(), 1000)</script>-->
</body>
</html>`,
					{ headers: { "Content-Type": "text/html" } },
				);
			},
		},

		"/api/state": {
			GET: () => {
				return Response.json(getState());
			},
			POST: async (req) => {
				const body = await req.json();
				const updated = updateState(body);
				return Response.json(updated);
			},
		},
	},
});

console.log("Server running at http://localhost:3001");
