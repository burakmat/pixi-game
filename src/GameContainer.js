import { Container, Sprite, Text, Graphics, Texture } from "pixi.js";
import { ScrollBox } from "@pixi/ui";
import { Scenes } from "./enums.js";
import { startScene } from "./SceneManager.js";

export default function createGameContainer(app, {scene, sceneWidth, sceneHeight}) {
  const text = new Text({
    text: "In Game",
    style: { fill: 0xffffff },
    position: { x: app.screen.width / 2, y: app.screen.height / 2 - 100 },
  });
  text.anchor.set(0.5);

  const scroller = new ScrollBox({
    background: 0xff,
    //   width: 600,
    height: 700,
    globalScroll: false,
    shiftScroll: true,
    type: "bidirectional",
    items: createListItems(10),
  });

  scroller.x = (app.screen.width - scroller.width) / 2;
  scroller.y = (app.screen.height - scroller.height) / 2;

  const button1 = Sprite.from("blueButton");
  button1.anchor.set(0.5);
  button1.x = 100;
  button1.y = 100;
  button1.interactive = true;
  button1.cursor = "pointer";
  button1.on("pointerdown", () => {
    button1.texture = Texture.from("blueButtonPressed");
  });
  button1.on("pointerup", () => {
    button1.texture = Texture.from("blueButton");
  });
  button1.on("click", () => {
    startScene(app, { sceneKey: Scenes.MainMenu });
  });

  scene.addChild(scroller);
  scene.addChild(text);
  scene.addChild(button1);
}

function createListItems(number) {
  const items = [];
  for (let i = 0; i < number; ++i) {
    const item = Sprite.from("yellowButton");
    item.scale.set(3);
    items.push(item);
  }
  return items;
}
