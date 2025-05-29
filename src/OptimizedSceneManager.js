import { Container } from "pixi.js";
import { Scenes } from "./scenes";
import { createAdventurersScene } from "./scenes/adventurers";
import { createMenuContainer } from "./MenuContainer";

const SCREEN_RATIO = 16 / 9;
let sceneWidth;
let sceneHeight;
let passiveScenes = [];
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

export function switchScene(app, { sceneKey }) {
  if (!activeScene) {
    createNewActiveScene();
  } else if (sceneKey === activeScene.sceneKey) return;
  else {
    const requestedScene = passiveScenes.find(
      (elem) => elem.sceneKey === sceneKey
    );
    if (requestedScene) {
      passiveScenes.push(activeScene);
      passiveScenes = passiveScenes.filter(
        (elem) => elem.sceneKey !== sceneKey
      );
      app.stage.removeChild(activeScene.scene);
      app.stage.addChild(requestedScene.scene);
      activeScene = requestedScene;
    } else {
      passiveScenes.push(activeScene);
      app.stage.removeChild(activeScene.scene);
      createNewActiveScene();
    }
  }

  function createNewActiveScene() {
    const scene = createScene(app);
    fillOutSceneContent(sceneKey, app, {scene, sceneWidth, sceneHeight});
    app.stage.addChild(scene);
    activeScene = { scene, sceneKey };
  }
}

function fillOutSceneContent(sceneKey, app, sceneConfig) {
  switch (sceneKey) {
    case Scenes.MainMenu:
      createMenuContainer(app, sceneConfig);
      break;
    case Scenes.Adventurers:
      createAdventurersScene(app, sceneConfig);
      break;

    default:
      break;
  }
}
