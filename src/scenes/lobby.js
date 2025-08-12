import { Sprite, Container, Graphics, Text } from "pixi.js";
import { Scenes } from "../enums";
import { createPixelButton } from "../components/Button";
import { startAdventurerWindow, startScene, startEventWindow } from "../SceneManager";
import BackToFront from "../../../guild-react/src/backToFront/index"
import { green, lightBrown } from "../colors";

export function LobbyScene(app, { scene, sceneWidth, sceneHeight }) {
  const lobbyBg = Sprite.from("lobby");
  lobbyBg.texture.source.scaleMode = "nearest";
  lobbyBg.setSize(sceneWidth, sceneHeight);
  scene.addChild(lobbyBg);

  // const clickableArea = new Graphics();
  // clickableArea.rect(
  //   0, 0,
  //   sceneWidth * 0.93,
  //   sceneHeight * 0.52
  // ).fill({
  //   color: 0xff0000,
  //   alpha: 0.3,
  // });
  // clickableArea.position.set(
  //   (sceneWidth - clickableArea.width) / 2,
  //   sceneHeight * 0.28
  // )
  // scene.addChild(clickableArea);

  function rerenderLobbyElements() {
    const data = BackToFront.getMainMenuData().data;
    day.text = data.turn;
    money.text = data.money;
    level.text = data.level;
    reputation.text = data.reputation;
  }

  function triggerEvents() {
    const event = BackToFront.getCurrentEvent();
    if (event) {
      startEventWindow(app, event.currentEvent.type, event.currentEvent.event, triggerEvents);
    }
  }

  const clickableArea = new Graphics();
  clickableArea.rect(
    0, 0,
    sceneWidth * 0.16,
    sceneHeight * 0.15
  ).fill({
    color: "red",
    alpha: 0.3,
  });
  clickableArea.position.set(
    sceneWidth * 0.035,
    sceneHeight * 0.55
  )
  clickableArea.eventMode = "static";
  clickableArea.cursor = "pointer";
  clickableArea.on("click", () => {
    startAdventurerWindow(app);
  })
  scene.addChild(clickableArea);

  const bannersClickable = new Graphics();
  bannersClickable.rect(
    0, 0,
    sceneWidth * 0.1,
    sceneHeight * 0.18
  ).fill({
    color: "red",
    alpha: 0.3,
  });
  bannersClickable.position.set(
    sceneWidth * 0.47,
    sceneHeight * 0.1
  )
  bannersClickable.eventMode = "static";
  bannersClickable.cursor = "pointer";
  bannersClickable.on("click", () => {
    startScene(app, { sceneKey: Scenes.Banners });
  })
  scene.addChild(bannersClickable);

  const battleClickable = new Graphics();
  battleClickable.rect(
    0, 0,
    sceneWidth * 0.085,
    sceneHeight * 0.18
  ).fill({
    color: "red",
    alpha: 0.3,
  });
  battleClickable.position.set(
    sceneWidth * 0.68,
    sceneHeight * 0.1
  )
  battleClickable.eventMode = "static";
  battleClickable.cursor = "pointer";
  battleClickable.on("click", () => {
    startScene(app, { sceneKey: Scenes.Battle });
  })
  scene.addChild(battleClickable);

  const character = Sprite.from("character");
  character.texture.source.scaleMode = "nearest";
  character.anchor.set(1, 0);
  character.scale.set(-1, 0);
  character.setSize(sceneHeight * 0.15, sceneHeight * 0.15);
  character.position.set(sceneWidth * 0.73, sceneHeight * 0.5);
  scene.addChild(character);

  const dayIndicator = new Container();
  const dayBg = new Graphics();
  dayBg.rect(0, 0, sceneWidth * 0.16, sceneHeight * 0.15)
    .fill({ color: "black", alpha: 0.5 });
  dayIndicator.addChild(dayBg);
  const dayLabel = new Text({
    text: "Day",
    style: {
      fontSize: sceneHeight * 0.04,
      fill: "#ffffff",
      fontFamily: "anxel",
    },
  });
  dayLabel.anchor.set(0.5, 0);
  dayLabel.position.set(dayIndicator.width * 0.5, dayIndicator.height * 0.05);
  dayIndicator.addChild(dayLabel);
  const day = new Text({
    text: BackToFront.getMainMenuData().turn,
    style: {
      fontSize: sceneHeight * 0.08,
      fill: "#ffffff",
      fontFamily: "anxel",
    }
  });
  day.anchor.set(0.5, 0);
  day.position.set(dayIndicator.width * 0.5, dayIndicator.height * 0.3);
  dayIndicator.addChild(day);
  dayIndicator.position.set(0, sceneHeight * 0.85);
  scene.addChild(dayIndicator);

  const moneyIndicator = new Container();
  const moneyBg = new Graphics();
  moneyBg.rect(0, 0, sceneWidth * 0.16, sceneHeight * 0.15)
    .fill({ color: "black", alpha: 0.5 });
  moneyIndicator.addChild(moneyBg);
  const moneyLabel = new Text({
    text: "Money",
    style: {
      fontSize: sceneHeight * 0.04,
      fill: "#ffffff",
      fontFamily: "anxel",
    },
  });
  moneyLabel.anchor.set(0.5, 0);
  moneyLabel.position.set(moneyIndicator.width * 0.5, moneyIndicator.height * 0.05);
  moneyIndicator.addChild(moneyLabel);
  const money = new Text({
    text: BackToFront.getMainMenuData().money,
    style: {
      fontSize: sceneHeight * 0.08,
      fill: "#ffffff",
      fontFamily: "anxel",
    }
  });
  money.anchor.set(0.5, 0);
  money.position.set(moneyIndicator.width * 0.5, moneyIndicator.height * 0.3);
  moneyIndicator.addChild(money);
  moneyIndicator.position.set(sceneWidth * 0.16, sceneHeight * 0.85);
  scene.addChild(moneyIndicator);

  const levelIndicator = new Container();
  const levelBg = new Graphics();
  levelBg.rect(0, 0, sceneWidth * 0.16, sceneHeight * 0.15)
    .fill({ color: "black", alpha: 0.5 });
  levelIndicator.addChild(levelBg);
  const levelLabel = new Text({
    text: "Level",
    style: {
      fontSize: sceneHeight * 0.04,
      fill: "#ffffff",
      fontFamily: "anxel",
    },
  });
  levelLabel.anchor.set(0.5, 0);
  levelLabel.position.set(levelIndicator.width * 0.5, levelIndicator.height * 0.05);
  levelIndicator.addChild(levelLabel);
  const level = new Text({
    text: BackToFront.getMainMenuData().level,
    style: {
      fontSize: sceneHeight * 0.08,
      fill: "#ffffff",
      fontFamily: "anxel",
    }
  });
  level.anchor.set(0.5, 0);
  level.position.set(levelIndicator.width * 0.5, levelIndicator.height * 0.3);
  levelIndicator.addChild(level);
  levelIndicator.position.set(sceneWidth * 0.48, sceneHeight * 0.85);
  scene.addChild(levelIndicator);

  const reputationIndicator = new Container();
  const reputationBg = new Graphics();
  reputationBg.rect(0, 0, sceneWidth * 0.16, sceneHeight * 0.15)
    .fill({ color: "black", alpha: 0.5 });
  reputationIndicator.addChild(reputationBg);
  const reputationLabel = new Text({
    text: "Reputation",
    style: {
      fontSize: sceneHeight * 0.04,
      fill: "#ffffff",
      fontFamily: "anxel",
    },
  });
  reputationLabel.anchor.set(0.5, 0);
  reputationLabel.position.set(reputationIndicator.width * 0.5, reputationIndicator.height * 0.05);
  reputationIndicator.addChild(reputationLabel);
  const reputation = new Text({
    text: BackToFront.getMainMenuData().reputation,
    style: {
      fontSize: sceneHeight * 0.08,
      fill: "#ffffff",
      fontFamily: "anxel",
    }
  });
  reputation.anchor.set(0.5, 0);
  reputation.position.set(reputationIndicator.width * 0.5, reputationIndicator.height * 0.3);
  reputationIndicator.addChild(reputation);
  reputationIndicator.position.set(sceneWidth * 0.64, sceneHeight * 0.85);
  scene.addChild(reputationIndicator);

  const nextDayButton = new Container()
  const nextDayButtonBg = new Graphics();
  nextDayButtonBg.rect(0, 0, sceneWidth * 0.2, sceneHeight * 0.15)
    .fill({color: green });
  nextDayButton.addChild(nextDayButtonBg);
  const nextDayLabel = new Text({
    text: "Next Day",
    style: {
      fontSize: sceneHeight * 0.08,
      fill: "#ffffff",
      fontFamily: "anxel",
    },
  });
  nextDayLabel.anchor.set(0.5, 0.5);
  nextDayLabel.position.set(nextDayButton.width * 0.5, nextDayButton.height * 0.5);
  nextDayButton.addChild(nextDayLabel);
  nextDayButton.position.set(sceneWidth * 0.8, sceneHeight * 0.85);
  nextDayButton.eventMode = "static";
  nextDayButton.cursor = "pointer";
  nextDayButton.on("click", () => {
    BackToFront.passTurn();
    rerenderLobbyElements();
    triggerEvents();
  });
  scene.addChild(nextDayButton);

  const backButton = createPixelButton(app, {
    labelText: "Back",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.MainMenu });
    },
  });
  backButton.position.set(sceneWidth * 0.85, sceneHeight * 0.05)
  scene.addChild(backButton);
}