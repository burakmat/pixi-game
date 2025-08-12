import { Graphics, Text, Texture, Container, Sprite } from "pixi.js";
import { createPixelProgressBar } from "../ProgressBar";


export function AdventurerStatistics(app, {renderWidth, renderHeight}, 
  {
    name,
    status,
    _class,
    race,
    str,
    int,
    dex,
    fth,
    cost,
    wage,
    corruption,
    loyalty
  }
) {
    const scaleMultiplier = renderWidth / 650
  const container = new Container();
  const infoBg = new Graphics();
  infoBg.rect(0, 0, renderWidth, renderHeight).fill(0xf6e6c0);

  const nameText = new Text({
    text: name,
    style: {
      fontFamily: "anxel",
      fill: 0xae8486,
      fontSize: 128,
    },
  });
  nameText.scale.set(0.5 * scaleMultiplier);
  nameText.position.set(renderWidth * 1 / 10, renderHeight * 2 / 18);

  const statusText = new Text({
    text: status,
    style: {
      fontFamily: "anxel",
      fill: 0xa37229,
      fontSize: 128,
    },
  });
  statusText.scale.set(0.3 * scaleMultiplier);
  statusText.position.set(renderWidth * 1 / 10, renderHeight * 5 / 18);


  const classText = new Text({
    text: _class,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  classText.scale.set(0.3 * scaleMultiplier);
  classText.position.set(renderWidth * 1 / 10, renderHeight * 6 / 18);

  const raceText = new Text({
    text: race,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  raceText.scale.set(0.3 * scaleMultiplier);
  raceText.position.set(renderWidth * 1 / 10, renderHeight * 7 / 18);

  const strenghtText = new Text({
    text: `Strength: ${str}`,
    style: {
      fontFamily: "anxel",
      fill: 0xa3292f,
      fontSize: 128,
    },
  });
  strenghtText.scale.set(0.3 * scaleMultiplier);
  strenghtText.anchor.set(1, 0);
  strenghtText.position.set(renderWidth * 9 / 10, renderHeight * 5 / 18);

  const intelligenceText = new Text({
    text: `Intelligence: ${int}`,
    style: {
      fontFamily: "anxel",
      fill: 0x1f79ad,
      fontSize: 128,
    },
  });
  intelligenceText.scale.set(0.3 * scaleMultiplier);
  intelligenceText.anchor.set(1, 0);
  intelligenceText.position.set(renderWidth * 9 / 10, renderHeight * 6 / 18);

  const dexterityText = new Text({
    text: `Dexterity: ${dex}`,
    style: {
      fontFamily: "anxel",
      fill: 0x5d1fad,
      fontSize: 128,
    },
  });
  dexterityText.scale.set(0.3 * scaleMultiplier);
  dexterityText.anchor.set(1, 0);
  dexterityText.position.set(renderWidth * 9 / 10, renderHeight * 7 / 18);

  const faithText = new Text({
    text: `Faith: ${fth}`,
    style: {
      fontFamily: "anxel",
      fill: 0xa4ad1f,
      fontSize: 128,
    },
  });
  faithText.scale.set(0.3 * scaleMultiplier);
  faithText.anchor.set(1, 0);
  faithText.position.set(renderWidth * 9 / 10, renderHeight * 8 / 18);

  const coinTexture = Texture.from("coin");
  coinTexture.source.scaleMode = "nearest";
  const coinSprite = Sprite.from(coinTexture);
  coinSprite.scale.set(4 * scaleMultiplier);
  coinSprite.position.set(renderWidth * 1 / 10, renderHeight * 10 / 18);
  const coinText = new Text({
    text: `Cost: ${cost}        Wage: ${wage}`,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  coinText.scale.set(0.3 * scaleMultiplier);
  coinText.position.set(renderWidth * 2 / 10, renderHeight * 10 / 18);


  const corruptionText = new Text({
    text: "Corruption",
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  corruptionText.scale.set(0.3 * scaleMultiplier);
  corruptionText.position.set(renderWidth * 1 / 10, renderHeight * 13 / 18);
  const corruptionBar = createPixelProgressBar(app, {
    barSrc: "bar",
    fillSrc: "fill",
    progress: corruption,
  });
  corruptionBar.scale.set(4 * scaleMultiplier);
  corruptionBar.position.set(renderWidth * 5 / 10, renderHeight * 13.3 / 18);

  const loyaltyText = new Text({
    text: "Loyalty",
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  loyaltyText.scale.set(0.3 * scaleMultiplier);
  loyaltyText.position.set(renderWidth * 1 / 10, renderHeight * 15 / 18);
  const loyaltyBar = createPixelProgressBar(app, {
    barSrc: "bar",
    fillSrc: "fill",
    progress: loyalty,
  });
    loyaltyBar.scale.set(4 * scaleMultiplier);
  loyaltyBar.position.set(renderWidth * 5 / 10, renderHeight * 15.3 / 18);

  container.addChild(infoBg);
  container.addChild(nameText);
  container.addChild(statusText);
  container.addChild(classText);
  container.addChild(raceText);
  container.addChild(strenghtText);
  container.addChild(intelligenceText);
  container.addChild(dexterityText);
  container.addChild(faithText);
  container.addChild(coinSprite);
  container.addChild(coinText);
  container.addChild(corruptionText);
  container.addChild(corruptionBar);
  container.addChild(loyaltyText);
  container.addChild(loyaltyBar);
  return container;
}
