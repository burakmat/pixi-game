import { Sprite, Container, Texture } from "pixi.js";

const FILL_WIDTH = 58;

export function createProgressBar(
  app,
  { barSrc, fillSrc, progress }
) {
  const barTexture = Texture.from(barSrc);
  barTexture.source.scaleMode = "nearest";
  const fillTexture = Texture.from(fillSrc);
  fillTexture.source.scaleMode = "nearest";
  const bar = Sprite.from(barTexture);
  const fill = Sprite.from(fillTexture);
  fill.y = 1;
  fill.x = 2;
  fill.width = Math.round(FILL_WIDTH / 100 * progress);
  const container = new Container();
  container.addChild(bar);
  container.addChild(fill);
  return container;
}
