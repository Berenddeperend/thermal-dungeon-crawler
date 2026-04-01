const html = (): JSX.Element => (
	<html>
		<p>hoi</p>
	</html>
);

const server = Bun.serve({
	// `routes` requires Bun v1.2.3+
	routes: {
		// Static routes
		"/webview": () => {
			return new Response("asdf");
		},

		// Dynamic routes
		"/users/:id": (req) => {
			return new Response(`Hello User ${req.params.id}!`);
		},
	},
});

console.log(`bun server running at ${server.url}`);
