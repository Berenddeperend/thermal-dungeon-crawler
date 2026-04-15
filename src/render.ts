import Konva from "konva";
import "konva/canvas-backend";
import type { GameState } from "./db";
import { levels } from "./levels";

export function renderLevel(gameState: GameState): Buffer {
	const level = levels[gameState.level as keyof typeof levels];
	const stage = new Konva.Stage({
		width: 576,
		height: 800,
	});



	const layer = new Konva.Layer();


	level.stage.forEach((row, y) => {
		row.forEach((cell, x) => {
			const cellSize = stage.width() / row.length;

			Konva.Image.fromURL(cell.sprite, (KonvaImage) => {

				console.log(KonvaImage);
				KonvaImage.setAttrs({
						image: KonvaImage.image(),
						x: x * cellSize,
						y: y * cellSize,
				})

				layer.add(KonvaImage)
			})

		});
	});


	// TODO: render the level grid, monsters, player, etc.
	stage.add(layer) ;

	const dataURL = stage.toDataURL({ mimeType: "image/png" });
	const base64 = dataURL.replace(/^data:image\/png;base64,/, "");
	return Buffer.from(base64, "base64");
}
