import { Container, Sprite, Texture, Graphics } from "pixi.js";

export function Appearance(app, { renderWidth, renderHeight, spriteSrc }) {
  const container = new Container();
  const bg = new Graphics();
  bg.rect(0, 0, renderWidth, renderHeight).fill(0xf6e6c0);

  const adventurer = Sprite.from(spriteSrc);
  adventurer.width = renderWidth / 2;
  adventurer.height = (renderWidth * 3) / 4;
  adventurer.anchor.set(0.5);
  adventurer.x = renderWidth / 2;
  adventurer.y = renderHeight / 2;

  const slotTexture = Texture.from("itemSlot");
  slotTexture.source.scaleMode = "nearest";

  const slot1 = Sprite.from(slotTexture);
  slot1.width = renderWidth / 8;
  slot1.height = renderWidth / 8;
  slot1.anchor.set(0.5);
  slot1.position.set(
    renderWidth / 8,
    Math.floor(renderHeight / 2 - (renderWidth * 3) / 8 + renderWidth / 16)
  );
  const slot2 = Sprite.from(slotTexture);
  slot2.width = renderWidth / 8;
  slot2.height = renderWidth / 8;
  slot2.anchor.set(0.5);
  slot2.position.set(
    renderWidth / 8,
    Math.floor(renderHeight / 2 -
      (renderWidth * 3) / 8 +
      (renderWidth * 3) / 16 +
      renderWidth / 32)
  );
  const slot3 = Sprite.from(slotTexture);
  slot3.width = renderWidth / 8;
  slot3.height = renderWidth / 8;
  slot3.anchor.set(0.5);
  slot3.position.set(
    renderWidth / 8,
    Math.floor(renderHeight / 2 -
      (renderWidth * 3) / 8 +
      (renderWidth * 5) / 16 +
      (renderWidth * 2) / 32)
  );
  const slot4 = Sprite.from(slotTexture);
  slot4.width = renderWidth / 8;
  slot4.height = renderWidth / 8;
  slot4.anchor.set(0.5);
  slot4.position.set(
    renderWidth / 8,
    Math.floor(renderHeight / 2 -
      (renderWidth * 3) / 8 +
      (renderWidth * 7) / 16 +
      (renderWidth * 3) / 32)
  );
  const slot5 = Sprite.from(slotTexture);
  slot5.width = renderWidth / 8;
  slot5.height = renderWidth / 8;
  slot5.anchor.set(0.5);
  slot5.position.set(
    renderWidth / 8,
    Math.floor(renderHeight / 2 - (renderWidth * 3) / 8 + (renderWidth * 11) / 16)
  );
  const slot6 = Sprite.from(slotTexture);
  slot6.width = renderWidth / 8;
  slot6.height = renderWidth / 8;
  slot6.anchor.set(0.5);
  slot6.position.set(
    renderWidth - renderWidth / 8,
    Math.floor(renderHeight / 2 - (renderWidth * 3) / 8 + renderWidth / 16)
  );
  const slot7 = Sprite.from(slotTexture);
  slot7.width = renderWidth / 8;
  slot7.height = renderWidth / 8;
  slot7.anchor.set(0.5);
  slot7.position.set(
    renderWidth - renderWidth / 8,
    Math.floor(renderHeight / 2 -
      (renderWidth * 3) / 8 +
      (renderWidth * 3) / 16 +
      renderWidth / 32)
  );
  const slot8 = Sprite.from(slotTexture);
  slot8.width = renderWidth / 8;
  slot8.height = renderWidth / 8;
  slot8.anchor.set(0.5);
  slot8.position.set(
    renderWidth - renderWidth / 8,
    Math.floor(renderHeight / 2 - (renderWidth * 3) / 8 + (renderWidth * 11) / 16)
  );

  container.addChild(bg);
  container.addChild(slot1);
  container.addChild(slot2);
  container.addChild(slot3);
  container.addChild(slot4);
  container.addChild(slot5);
  container.addChild(slot6);
  container.addChild(slot7);
  container.addChild(slot8);
  container.addChild(adventurer);
  return container;
}
