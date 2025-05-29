import { Container } from "pixi.js";
import { Scenes } from "./enums";
import { createAdventurersScene } from "./scenes/adventurers";
import { createMenuContainer } from "./MenuContainer";
import createGameContainer from "./GameContainer";
import { createAdventurerDetailsScene } from "./scenes/adventurerDetails";
import { createBannersScene } from "./scenes/banners";
import { AdventurerList } from "./components/AdventurerDetails/AdventurerList";
import { BattleScene } from "./scenes/battle";

export const SCREEN_RATIO = 16 / 9;
let sceneWidth;
let sceneHeight;
let activeScene;

export function setSceneDimensions(app) {
  if (app.screen.width / app.screen.height > SCREEN_RATIO) {
    sceneWidth = app.screen.height * SCREEN_RATIO;
    sceneHeight = app.screen.height;
  } else {
    sceneWidth = app.screen.width;
    sceneHeight = app.screen.width * (1 / SCREEN_RATIO);
  }
}

export function createScene(app) {
  const scene = new Container();
  if (app.screen.width / app.screen.height > SCREEN_RATIO) {
    scene.x = (app.screen.width - sceneWidth) / 2;
    scene.y = 0;
  } else {
    scene.x = 0;
    scene.y = (app.screen.height - sceneHeight) / 2;
  }
  return scene;
}

export function startScene(app, { sceneKey }) {
  if (!activeScene) {
    createNewActiveScene();
  } else if (sceneKey === activeScene.sceneKey) return;
  else {
    app.stage.removeChild(activeScene.scene);
    activeScene.scene.destroy({ children: true });
    if (activeScene.cleaner) {
      activeScene.cleaner();
    }
    createNewActiveScene();
  }

  function createNewActiveScene() {
    const scene = createScene(app);
    const cleaner = fillOutSceneContent(app, {
      scene,
      sceneWidth,
      sceneHeight,
    });
    app.stage.addChild(scene);
    activeScene = { scene, sceneKey, cleaner };
  }

  function fillOutSceneContent(app, sceneConfig) {
    switch (sceneKey) {
      case Scenes.MainMenu:
        createMenuContainer(app, sceneConfig);
        break;
      case Scenes.Adventurers:
        createAdventurersScene(app, sceneConfig);
        break;
      case Scenes.InGame:
        createGameContainer(app, sceneConfig);
        break;
      case Scenes.AdventurerDetails:
        return createAdventurerDetailsScene(app, sceneConfig);
      case Scenes.Banners:
        createBannersScene(app, sceneConfig);
        break;
      case Scenes.Battle:
        return BattleScene(app, sceneConfig);
      default:
        break;
    }
  }
}

export function rerenderActiveScene(app) {
  const sceneKey = activeScene.sceneKey;
  app.stage.removeChild(activeScene.scene);
  activeScene.scene.destroy({ children: true });
  if (activeScene.cleaner) {
    activeScene.cleaner();
  }
  activeScene = undefined;
  startScene(app, { sceneKey });
}
function destroyActiveScene() {
  if (activeScene) {
    app.stage.removeChild(activeScene.scene);
    activeScene.scene.destroy({ children: true });
  }
}
