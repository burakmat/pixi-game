import { Container, Graphics } from "pixi.js";
import { PopupWindows, Scenes } from "./enums";
import { AdventurerWindow } from "./components/AdventurerWindow";
import { createBannersScene } from "./scenes/banners";
import { BattleScene } from "./scenes/battle";
import { MainMenuScene } from "./scenes/mainMenu";
import { Quests } from "./scenes/quests";
import { DialogueWindow, PopupWindow } from "./components/Popup";
import { LobbyScene } from "./scenes/lobby";

export const SCREEN_RATIO = 16 / 9;
const highlightMasks = [];
let sceneWidth;
let sceneHeight;
let activeScene;
let activePopup;
let adventurerPopup;;

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
    if (highlightMasks.length) {
      addHighlightMask(app, highlightMasks[0]);
      highlightMasks.length = 0;
    }
    activeScene = { scene, sceneKey, cleaner };
  }

  function fillOutSceneContent(app, sceneConfig) {
    switch (sceneKey) {
      case Scenes.MainMenu:
        return MainMenuScene(app, sceneConfig);
      case Scenes.Lobby:
        return LobbyScene(app, sceneConfig);
      case Scenes.Banners:
        createBannersScene(app, sceneConfig);
        break;
      case Scenes.Battle:
        return BattleScene(app, sceneConfig);
      case Scenes.Quests:
        return Quests(app, sceneConfig);
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

  if (activePopup) {
    app.stage.removeChild(activePopup.popup);
    if (activePopup.cleaner) {
      activePopup.cleaner();
    }
    activePopup.popup.destroy({ children: true });
    startEventWindow(app, activePopup.type, activePopup.config);
  }

  if (adventurerPopup) {
    app.stage.removeChild(adventurerPopup.popup);
    if (adventurerPopup.cleaner) {
      adventurerPopup.cleaner();
    }
    adventurerPopup.popup.destroy({ children: true });
    startAdventurerWindow(app);
  }
}

function destroyActiveScene() {
  if (activeScene) {
    app.stage.removeChild(activeScene.scene);
    activeScene.scene.destroy({ children: true });
  }
}

function addHighlightMask(app, targetContainer) {
  const padding = app.screen.width / 80;
  const containerPoint = targetContainer.getGlobalPosition();
  const targetX =
    containerPoint.x -
    (targetContainer.anchor ? targetContainer.anchor.x : 0) *
      targetContainer.width -
    padding / 2;
  const targetY =
    containerPoint.y -
    (targetContainer.anchor ? targetContainer.anchor.y : 0) *
      targetContainer.height -
    padding / 2;
  const cover = new Graphics();
  cover
    .rect(0, 0, app.screen.width, app.screen.height)
    .fill(0x000000).alpha = 0.8;
  const inverseMask = new Graphics();
  inverseMask
    .rect(
      0,
      0,
      targetContainer.width + padding,
      targetContainer.height + padding
    )
    .fill();
  inverseMask.position.set(targetX, targetY);
  cover.setMask({ mask: inverseMask, inverse: true });
  cover.zIndex = 1;
  inverseMask.zIndex = 1;
  app.stage.addChild(cover);
  app.stage.addChild(inverseMask);
}

export function queueHighlightMask(targetContainer) {
  highlightMasks.push(targetContainer);
}

export function startEventWindow(app, eventType, eventConfig, next) {
  let popupLayer;
  let cleaner;
  if (eventType === "Event") {
    [popupLayer, cleaner] = PopupWindow(
      app,
      { sceneWidth, sceneHeight },
      {
        closeOnClickOutside: false,
        onCloseHandler: () => {
          app.stage.removeChild(popupLayer);
          popupLayer.destroy({ children: true });
          activePopup = undefined
          next();
        },
      },
      eventConfig
    );
  } else if (eventType === "Dialogue") {
    [popupLayer, cleaner] = DialogueWindow(
      app,
      { sceneWidth, sceneHeight },
      eventConfig,
      () => {
        app.stage.removeChild(popupLayer);
        popupLayer.destroy({ children: true });
        activePopup = undefined
        next();
      }
    );
  } else {
    return ;
  }
  app.stage.addChild(popupLayer);
  activePopup = { popup: popupLayer, type: eventType, config: eventConfig, cleaner: cleaner }
}

export function startAdventurerWindow(app) {
  const [contentContainer, mountTicker, cleaner] = AdventurerWindow(
    app,
    { sceneWidth, sceneHeight },
    () => {
      app.stage.removeChild(contentContainer);
      cleaner();
      contentContainer.destroy({ children: true });
      adventurerPopup = undefined;
    }
  );
  contentContainer.position.set(
    (app.screen.width - sceneWidth) / 2,
    (app.screen.height - sceneHeight) / 2
  )
  app.stage.addChild(contentContainer);
  app.ticker.add(mountTicker);
  adventurerPopup = { popup: contentContainer, cleaner: cleaner };
}
