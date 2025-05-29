import { Container, Sprite, Texture, Text, Graphics } from "pixi.js";
import switchToGameContainer from "./GameContainer.js";
import { openPopupWindow } from "./components/Popup.js";
import { sound } from "@pixi/sound";
import { createButton } from "./components/Button.js";
import { createAdventurerDetailsScene } from "./scenes/adventurerDetails.js";
import { startScene } from "./SceneManager.js";
import { Scenes } from "./enums.js";
import { createProgressBar } from "./components/ProgressBar.js";

export function createMenuContainer(app, { scene, sceneWidth, sceneHeight }) {
  const text = new Text({
    text: "LULE",
    style: { fill: 0xffffff, fontSize: 260, fontFamily: "anxel" },
    position: { x: app.screen.width / 2, y: app.screen.height / 2 - 100 },
  });
  text.anchor.set(0.5);
  //   text.width /= 10
  //   text.height /= 10
  app.stage.addChild(text);

  //   CONTAINER 1
  const container1 = new Container();
  const button1 = Sprite.from("blueButton");
  button1.interactive = true;
  button1.cursor = "pointer";
  button1.on("click", () => {
    sound.play("start");
    app.ticker.add(animateSwitchToGame);
  });

  container1.addChild(button1);
  const label1 = new Text({
    text: "Play",
    style: { fill: 0x0 },
    position: { x: container1.width / 2, y: container1.height / 2 - 8 },
  });
  label1.anchor.set(0.5);

  //   button1.on("pointerdown", () => {
  //     button1.texture = Texture.from("blueButtonPressed");
  //     label1.y += 4;
  //   });
  //   button1.on("pointerupoutside", () => {
  //     button1.texture = Texture.from("blueButton");
  //     label1.y -= 4;
  //   });
  button1.on("mouseenter", () => {
    sound.play("bing");
    button1.texture = Texture.from("blueButtonPressed");
    label1.y += 4;
  });
  button1.on("mouseleave", () => {
    button1.texture = Texture.from("blueButton");
    label1.y -= 4;
  });

  container1.addChild(label1);
  container1.x = (app.screen.width - container1.width) / 2;
  container1.y = (app.screen.height - container1.height) / 2 + 100;
  // //////////////////

  // CONTAINER 2
  const button2 = createButton(app, {
    labelText: "Settings",
    x: 0,
    y: 200,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      openPopupWindow(app, {
        key: "settings",
        closeOnClickOutside: true,
        resetViewOnClose: true,
      });
    },
    onClickAudioSrc: "bing",
  });

  // CONTAINER 3
  const button3 = createButton(app, {
    labelText: "Settings",
    x: 0,
    y: 300,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      openPopupWindow(app, { key: "settings" });
    },
    onClickAudioSrc: "bing",
  });

  const button4 = createButton(app, {
    labelText: "Adventurers",
    x: -300,
    y: 200,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      //   app.stage.removeChild(scene);
      //   createAdventurersScene(app);
      startScene(app, { sceneKey: Scenes.Adventurers });
    },
  });

  const button5 = createButton(app, {
    labelText: "Adv. Detail",
    x: -300,
    y: 100,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      startScene(app, { sceneKey: Scenes.AdventurerDetails });
    },
  });

  const button6 = createButton(app, {
    labelText: "Banners",
    x: -300,
    y: 300,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Banners });
    },
  });

  const button7 = createButton(app, {
    labelText: "Dev",
    x: 300,
    y: 100,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
        startScene(app, {sceneKey: Scenes.Development})
    }
  })

  const button8 = createButton(app, {
    labelText: "Battleground",
    x: 300,
    y: 200,
    alignCenterX: true,
    alignCenterY: true,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
        startScene(app, {sceneKey: Scenes.Battle})
    }
  })

  const rectangle = new Graphics().rect(0, 0, 100, 100).fill(0xff0000);
  rectangle.eventMode = "static";
  rectangle.cursor = "pointer";

  scene.addChild(text);
  scene.addChild(container1);
  scene.addChild(button2);
  scene.addChild(button3);
  scene.addChild(button4);
  scene.addChild(button5);
  scene.addChild(button6);
  scene.addChild(button7);
  scene.addChild(button8);
  scene.addChild(rectangle);

  function animateSwitchToGame(time) {
    scene.x += 3;
    scene.alpha -= 0.02;
    if (scene.alpha <= 0) {
      app.ticker.remove(animateSwitchToGame);
      startScene(app, { sceneKey: Scenes.InGame });
    }
  }
}
