import Konva from 'konva';
import 'konva/canvas-backend';
import type { GameState } from './db';
import { levels } from './levels';
import { monsters } from './monsters';
import ImageConfig = Konva.ImageConfig;

export function renderLevel(gameState: GameState): Buffer {
  const level = levels[gameState.level as keyof typeof levels];
  const stage = new Konva.Stage({
    width: 576,
    height: 800
  });

  const cellSize = stage.width() / level.stage[0].length;

  const layer = new Konva.Layer();

  const promises = []

  level.stage.forEach((row, y) => {
    row.forEach( (cell, x) => {

      const promise = drawImageToKonva(`src/${cell.sprite}`, layer, {
        x: x * cellSize,
        y: y * cellSize
      });

      promises.push(promise)

    });
  });

  Promise.all(promises)


  // TODO: render the level grid, monsters, player, etc.
  stage.add(layer);

  const dataURL = stage.toDataURL({ mimeType: 'image/png' });
  const base64 = dataURL.replace(/^data:image\/png;base64,/, '');
  return Buffer.from(base64, 'base64');
}


  async function drawImageToKonva(path: string, layer: Konva.Layer, attrs: Omit<ImageConfig, 'image'>) {
  return new Promise<void>(resolve => {
    Konva.Image.fromURL(path, (KonvaImage => {
      KonvaImage.setAttrs({
        image: KonvaImage.image(),
        ...attrs
      });
      layer.add(KonvaImage)
      resolve();
    }));
  });
}
