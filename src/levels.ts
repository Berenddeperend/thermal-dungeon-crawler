import { monsters } from "./monsters.ts";
import { stages } from "./stages.ts";

export const levels = {
	1: {
		monster: monsters.spider,
		monsterPositions: [
			[1, 1],
			[2, 3],
		],
		stage: stages["1"],
	},
	2: {
		monster: monsters.skeleton,
		monsterPositions: [
			[1, 1],
			[2, 3],
		],
	},
};
