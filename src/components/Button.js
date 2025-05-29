import { Container, Sprite, Texture, Text, Filter } from "pixi.js";
import { sound } from "@pixi/sound";
import { ColorOverlayFilter } from "pixi-filters";

export function createPixelButton(
  app,
  {
    labelText,
    width,
    height,
    onClick,
    hoverTextureSrc,
    hoverAudioSrc,
    onClickAudioSrc,
  }
) {
  const container = new Container();
  container.eventMode = "static";
  container.cursor = "pointer";

  const sprite = Sprite.from("pixelButton");
  sprite.texture.source.scaleMode = "nearest"
  if (width) {
      sprite.setSize(width, width * sprite.height / sprite.width);
  }
  container.addChild(sprite);

  const label = new Text({
    text: labelText,
    style: { fill: 0x0, fontSize: 128, fontFamily: "anxel" },
  });
  label.scale.set(width / 1000)
  label.anchor.set(0.5);
  label.position.set(container.width / 2, container.height * 4 / 11);
  container.addChild(label);

  container.on("click", () => {
    container.filters = []
    if (onClickAudioSrc) {
      sound.play(onClickAudioSrc);
    }
    if (onClick) {
      onClick();
    }
  });
  container.on("pointerdown", () => {
    container.filters = [new ColorOverlayFilter({color: 0x0, alpha: 0.2})]
  });
  container.on("pointerupoutside", () => {
    container.filters = []
  });

  if (hoverTextureSrc) {
    container.on("mouseenter", () => {
      sprite.texture = Texture.from(hoverTextureSrc);
    });
    container.on("mouseleave", () => {
      sprite.texture = Texture.from(textureSrc);
    });
  }
  if (hoverAudioSrc) {
    container.on("mouseenter", () => {
      sound.play(hoverAudioSrc);
    });
  }
  return container;
}
