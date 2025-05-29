import { Container, Graphics, Sprite, Text } from "pixi.js";
import { createPixelButton } from "../components/Button";
import { ProgressBar } from "@pixi/ui";
import { startScene } from "../SceneManager";
import { Scenes } from "../enums";
import { createProgressBar } from "../components/ProgressBar";

const CLASSES = ["Warrior", "Mage", "Rogue", "Cleric"];
const RACES = ["Human", "Elf", "Dwarf", "Orc"];

export function createAdventurersScene(
  app,
  { scene, sceneWidth, sceneHeight }
) {
  const backButton = createPixelButton(app, {
    labelText: "Back",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.MainMenu });
    },
  });
  backButton.position.set(sceneWidth / 20, sceneHeight / 10)

  const bg = new Graphics();

  const gridWidth = sceneWidth / 4;
  const gridHeight = sceneHeight / 6;
  bg.rect(0, 0, sceneWidth, sceneHeight);
  bg.fill(0xca9863);

  bg.rect(0, 0, sceneWidth, gridHeight);
  bg.fill(0x7c4e38);

  let avatar;
  scene.addChild(bg);
  scene.addChild(backButton);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      bg.rect(
        i * gridWidth,
        gridHeight + j * gridHeight,
        gridWidth,
        gridHeight
      );
      bg.stroke({ color: 0, width: 4 });
      avatar = 0.5 > Math.random() ? Sprite.from("lule") : Sprite.from("sade");
      const mask = new Graphics();
      mask
        .rect(
          0,
          0,
          j % 2 == 0 ? gridWidth / 6 : gridWidth / 3,
          (gridHeight * 4) / 5
        )
        .fill();
      mask.x = i * gridWidth + 10;
      mask.y = gridHeight + j * gridHeight + 10;
      avatar.width = gridWidth / 3;
      avatar.height = (gridHeight * 4) / 5;
      avatar.x = i * gridWidth + 10;
      avatar.y = gridHeight + j * gridHeight + 10;
    //   avatar.mask = mask;
      scene.addChild(avatar);
    //   scene.addChild(mask);
      const name = new Text({
        text: "Adventurer " + (i * 5 + j + 1),
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      name.anchor.set(0.5);
      name.x = i * gridWidth + gridWidth / 2;
      name.y = gridHeight + j * gridHeight + 20;
      scene.addChild(name);
      const classText = new Text({
        text: "Class: " + CLASSES[Math.floor(Math.random() * CLASSES.length)],
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      classText.x = (i + 1) * gridWidth - (10 + classText.width);
      classText.y = gridHeight + j * gridHeight + 20;
      scene.addChild(classText);
      const raceText = new Text({
        text: "Race: " + RACES[Math.floor(Math.random() * RACES.length)],
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      raceText.x = (i + 1) * gridWidth - (10 + raceText.width);
      raceText.y = gridHeight + j * gridHeight + 45;
      scene.addChild(raceText);

      const stats = new Text({
        text: "Strength: " + Math.floor(Math.random() * 100 + 1),
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      stats.x = i * gridWidth + gridWidth / 3 + 20;
      stats.y = gridHeight + j * gridHeight + 40;
      scene.addChild(stats);
      const stats2 = new Text({
        text: "Dexterity: " + Math.floor(Math.random() * 100 + 1),
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      stats2.x = i * gridWidth + gridWidth / 3 + 20;
      stats2.y = gridHeight + j * gridHeight + 70;
      scene.addChild(stats2);
      const stats3 = new Text({
        text: "Intelligence: " + Math.floor(Math.random() * 100 + 1),
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      stats3.x = i * gridWidth + gridWidth / 3 + 20;
      stats3.y = gridHeight + j * gridHeight + 100;
      scene.addChild(stats3);
      const stats4 = new Text({
        text: "Faith: " + Math.floor(Math.random() * 100 + 1),
        style: {
          fontSize: 20,
          fill: 0x000000,
          fontFamily: "anxel",
        },
      });
      stats4.x = i * gridWidth + gridWidth / 3 + 20;
      stats4.y = gridHeight + j * gridHeight + 130;
      scene.addChild(stats4);

      const level = createProgressBar(app, {
        barSrc: "bar",
        fillSrc: "fill",
        progress: Math.floor(Math.random() * 100 + 1),
      });
      level.width = gridWidth / 3;
      level.height = 10;
      level.x = i * gridWidth + 10;
      level.y = gridHeight + j * gridHeight + gridHeight - 20;
      scene.addChild(level);
      const corruption = createProgressBar(app, {
        barSrc: "bar",
        fillSrc: "fill",
        progress: Math.floor(Math.random() * 100 + 1),
      });
      corruption.width = gridWidth / 3;
      corruption.height = 10;
      corruption.x = (i + 1) * gridWidth - (10 + corruption.width);
      corruption.y = gridHeight + j * gridHeight + gridHeight - 20;
      scene.addChild(corruption);
    }
  }
}
