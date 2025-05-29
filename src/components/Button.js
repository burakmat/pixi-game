import { Container, Sprite, Texture, Text } from "pixi.js";
import { sound } from "@pixi/sound";

export function createButton(
  app,
  {
    labelText,
    x,
    y,
    alignCenterX,
    alignCenterY,
    textureSrc,
    pressedTextureSrc,
    onClick,
    hoverTextureSrc,
    hoverAudioSrc,
    onClickAudioSrc,
  }
) {
  const sprite = Sprite.from(textureSrc);

  const label = new Text({
    text: labelText,
    style: { fill: 0x0 },
    position: { x: sprite.width / 2, y: sprite.height / 2 - 8 },
  });
  label.anchor.set(0.5);

  const buttonContainer = new Container();
  buttonContainer.eventMode = "static";
  buttonContainer.cursor = "pointer";
  buttonContainer.addChild(sprite);
  buttonContainer.addChild(label);
  if (alignCenterX) {
    buttonContainer.x = (app.screen.width - buttonContainer.width) / 2 + x;
  } else {
    buttonContainer.x = x;
  }
  if (alignCenterY) {
    buttonContainer.y = (app.screen.height - buttonContainer.height) / 2 + y;
  } else {
    buttonContainer.y = y;
  }
  buttonContainer.on("click", () => {
    sprite.texture = Texture.from(textureSrc);
    label.y -= 4;
    if (onClickAudioSrc) {
      sound.play(onClickAudioSrc);
    }
    if (onClick) {
      onClick();
    }
  });
  buttonContainer.on("pointerdown", () => {
    sprite.texture = Texture.from(pressedTextureSrc);
    label.y += 4;
  });
  buttonContainer.on("pointerupoutside", () => {
    sprite.texture = Texture.from(textureSrc);
    label.y -= 4;
  });

  if (hoverTextureSrc) {
    buttonContainer.on("mouseenter", () => {
      sprite.texture = Texture.from(hoverTextureSrc);
    });
    buttonContainer.on("mouseleave", () => {
      sprite.texture = Texture.from(textureSrc);
    });
  }
  if (hoverAudioSrc) {
    buttonContainer.on("mouseenter", () => {
      sound.play(hoverAudioSrc);
    });
  }
  return buttonContainer;
}
