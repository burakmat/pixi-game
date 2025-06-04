import { Graphics, Text } from "pixi.js";
import { createPixelButton } from "../components/Button.js";
import { startPopupWindow, startScene } from "../SceneManager.js";
import { PopupWindows, Scenes } from "../enums.js";

export function MainMenuScene(app, { scene, sceneWidth, sceneHeight }) {
  const text = new Text({
    text: "LULE",
    style: {
      fill: 0xffffff,
      fontSize: 260,
      fontFamily: "anxel",
    },
    position: { x: sceneWidth / 2, y: (sceneHeight * 4) / 10 },
  });
  text.anchor.set(0.5);
  scene.addChild(text);

  const adventurerButton = createPixelButton(app, {
    labelText: "Adventurers",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Adventurers });
    },
  });
  adventurerButton.position.set(
    (sceneWidth - adventurerButton.width) / 2,
    (sceneHeight * 70) / 100
  );

  const battleButton = createPixelButton(app, {
    labelText: "Battleground",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Battle });
    },
  });
  battleButton.position.set(
    (sceneWidth - battleButton.width) / 2,
    (sceneHeight * 80) / 100
  );

  const bannersButton = createPixelButton(app, {
    labelText: "Banners",
    width: sceneWidth / 8,
    height: sceneHeight / 10,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Banners });
    },
  });
  bannersButton.position.set(
    (sceneWidth - bannersButton.width) / 2,
    (sceneHeight * 90) / 100
  );

  const questsButton = createPixelButton(app, {
    labelText: "Quests",
    width: sceneWidth / 8,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Quests });
    },
  });
  questsButton.position.set(
    sceneWidth / 2 + questsButton.width,
    (sceneHeight * 70) / 100
  );

  const popupToggleButton = createPixelButton(app, {
    labelText: "Toggle Popup",
    width: sceneWidth / 8,
    onClick: () => {
      startPopupWindow(app, PopupWindows.SimpleInfo);
    },
  });
  popupToggleButton.position.set(
    sceneWidth / 2 + popupToggleButton.width,
    (sceneHeight * 80) / 100
  );

  scene.addChild(adventurerButton);
  scene.addChild(battleButton);
  scene.addChild(bannersButton);
  scene.addChild(questsButton);
  scene.addChild(popupToggleButton);
}
