console.log("Hello via Bun!");

import Konva from "konva";
import "konva/canvas-backend"; // or 'konva/skia-backend'

// Create a stage
const stage = new Konva.Stage({
	width: 800,
	height: 600,
});

const layer = new Konva.Layer();

layer.add(
	new Konva.Text({
		text: "wolla je bent een boef",
	}),
);

stage.add(layer);

// ... the rest of your konva code

// Export as data URL
const dataURL = stage.toDataURL();

console.log(dataURL);
