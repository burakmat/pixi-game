import { Graphics, Text } from "pixi.js";
import { createPixelButton } from "../components/Button.js";
import { startAdventurerWindow, startEventWindow, startScene } from "../SceneManager.js";
import { PopupWindows, Scenes } from "../enums.js";
import gameStore from "../../../guild-react/src/store/gameStore";

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

  const lobbyButton = createPixelButton(app, {
    labelText: "Play",
    width: sceneWidth / 8,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.Lobby });
    },
  });
  lobbyButton.position.set(
    (sceneWidth - lobbyButton.width) / 2,
    (sceneHeight * 70) / 100
  );

  const adventurerButton = createPixelButton(app, {
    labelText: "Adventurers",
    width: sceneWidth / 8,
    onClick: () => {
      startAdventurerWindow(app);
    },
  });
  adventurerButton.position.set(
    sceneWidth / 2 + adventurerButton.width,
    (sceneHeight * 80) / 100
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
    sceneWidth / 2 - 2 * bannersButton.width,
    (sceneHeight * 80) / 100
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

  const triggerEventButton = createPixelButton(app, {
    labelText: "Trigger Event",
    width: sceneWidth / 8,
    onClick: () => {
      const event = gameStore.frCurrentEvent();
      console.log(event);
      startEventWindow(app, event.type, event.event);
    }
  });
  triggerEventButton.position.set(
    sceneWidth / 2 - 2 * triggerEventButton.width,
    sceneHeight * 70 / 100
  );

  scene.addChild(lobbyButton);
  scene.addChild(adventurerButton);
  scene.addChild(battleButton);
  scene.addChild(bannersButton);
  scene.addChild(questsButton);
  scene.addChild(triggerEventButton);
}
