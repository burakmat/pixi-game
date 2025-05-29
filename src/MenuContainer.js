import { Container, Sprite, Texture, Text, Graphics } from "pixi.js";
import { openPopupWindow } from "./components/Popup.js";
import { sound } from "@pixi/sound";
import { createPixelButton } from "./components/Button.js";
import { startScene } from "./SceneManager.js";
import { Scenes } from "./enums.js";

export function createMenuContainer(app, { scene, sceneWidth, sceneHeight }) {
  const text = new Text({
    text: "LULE",
    style: { fill: 0xffffff, fontSize: 260, fontFamily: "anxel" },
    position: { x: sceneWidth / 2, y: sceneHeight / 2 - 100 },
  });
  text.anchor.set(0.5);
  scene.addChild(text);

  // CONTAINER 2
//   const button2 = createButton(app, {
//     labelText: "Settings",
//     x: 0,
//     y: 200,
//     alignCenterX: true,
//     alignCenterY: true,
//     textureSrc: "blueButton",
//     pressedTextureSrc: "blueButtonPressed",
//     onClick: () => {
//       openPopupWindow(app, {
//         key: "settings",
//         closeOnClickOutside: true,
//         resetViewOnClose: true,
//       });
//     },
//     onClickAudioSrc: "bing",
//   });

  // CONTAINER 3
//   const button3 = createButton(app, {
//     labelText: "Settings",
//     x: 0,
//     y: 300,
//     alignCenterX: true,
//     alignCenterY: true,
//     textureSrc: "blueButton",
//     pressedTextureSrc: "blueButtonPressed",
//     onClick: () => {
//       openPopupWindow(app, { key: "settings" });
//     },
//     onClickAudioSrc: "bing",
//   });


  const adventurerButton = createPixelButton(app, {
    labelText: "Adventurers",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.AdventurerDetails });
    },
  });
  adventurerButton.position.set((sceneWidth - adventurerButton.width) / 2, sceneHeight * 70 / 100)

  const adventurerGrid = createPixelButton(app, {
    labelText: "Adventurer Grid",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Adventurers });
    },
  });
  adventurerGrid.position.set((sceneWidth - adventurerGrid.width) * 70 / 100, sceneHeight * 70 / 100)

  const bannersButton = createPixelButton(app, {
    labelText: "Banners",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Banners });
    },
  });
  bannersButton.position.set((sceneWidth - bannersButton.width) / 2, sceneHeight * 90 / 100)

  const battleButton = createPixelButton(app, {
    labelText: "Battleground",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
        startScene(app, {sceneKey: Scenes.Battle})
    }
  })
  battleButton.position.set((sceneWidth - battleButton.width) / 2, sceneHeight * 80 / 100)

  const rectangle = new Graphics().rect(0, 0, 100, 100).fill(0xff0000);
  rectangle.eventMode = "static";
  rectangle.cursor = "pointer";

  scene.addChild(text);
  scene.addChild(adventurerButton);
  scene.addChild(bannersButton);
  scene.addChild(adventurerGrid);
  scene.addChild(battleButton);
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
