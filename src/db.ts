import { Database } from "bun:sqlite";

const db = new Database("dungeon-crawler.db");

db.run(`
	CREATE TABLE IF NOT EXISTS game_state (
		id INTEGER PRIMARY KEY CHECK (id = 1),
		level INTEGER NOT NULL DEFAULT 1,
		player_hp INTEGER NOT NULL DEFAULT 10,
		player_attack INTEGER NOT NULL DEFAULT 5,
		player_defence INTEGER NOT NULL DEFAULT 5,
		monster_positions TEXT NOT NULL DEFAULT '[]',
		updated_at TEXT NOT NULL DEFAULT (datetime('now'))
	)
`);

db.run(`
	INSERT OR IGNORE INTO game_state (id, level, player_hp, player_attack, player_defence, monster_positions)
	VALUES (1, 1, 10, 5, 5, '[[1,1],[2,3]]')
`);

export type GameState = {
	id: number;
	level: number;
	player_hp: number;
	player_attack: number;
	player_defence: number;
	monster_positions: string;
	updated_at: string;
};

export function getState(): GameState {
	return db.query("SELECT * FROM game_state WHERE id = 1").get() as GameState;
}

export function updateState(
	partial: Partial<Omit<GameState, "id" | "updated_at">>,
) {
	const current = getState();
	const merged = { ...current, ...partial };
	db.run(
		`UPDATE game_state SET
			level = ?,
			player_hp = ?,
			player_attack = ?,
			player_defence = ?,
			monster_positions = ?,
			updated_at = datetime('now')
		WHERE id = 1`,
		[
			merged.level,
			merged.player_hp,
			merged.player_attack,
			merged.player_defence,
			merged.monster_positions,
		],
	);
	return getState();
}
