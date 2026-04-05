import { Database } from "bun:sqlite";
import {stage} from './src/render';

const db = new Database("dungeon-crawler.db");
const query = db.query("select 'Hello world' as message;");
query.get();



Bun.serve({
	port: 3000,
	fetch(req) {
		const url = new URL(req.url);
		const name = url.searchParams.get("name") ?? "world";

		return new Response(`<h1>Hello, ${name}!</h1>
${stage.toJSON()}

`, {
			headers: { "Content-Type": "text/html; charset=utf-8" },
		});
	},
});
