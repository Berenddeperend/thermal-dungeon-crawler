import { floorTiles } from "./tiles.ts";

const { floor: o, wall: X, stairs: S } = floorTiles;

export const stages = {
	1: [
		[o, o, o, o, S],
		[o, o, o, X, o],
		[o, o, o, o, o],
		[o, X, o, X, o],
		[S, o, o, o, o],
	],

	2: [
		[o, o, o, o, S],
		[o, o, o, X, o],
		[o, o, o, o, o],
		[o, o, X, o, o],
		[S, o, o, o, o],
	],
};

