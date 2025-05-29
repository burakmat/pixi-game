import { Sprite, Graphics } from "pixi.js";
import { lightBrown } from "../colors";
import { createButton } from "../components/Button";
import { ColorOverlayFilter } from "pixi-filters";
import { Scenes } from "../enums";
import { startScene } from "../SceneManager";

const allyTeam = [1];
const enemyTeam = [1, 1, 1, 1, 1];
const allies = [];
const enemies = [];

export function BattleScene(app, { scene, sceneWidth, sceneHeight }) {
  const bannerHeight = (sceneHeight * 2) / 15;
  const bannerWidth = (sceneWidth * 5) / 16;
  const allyStartOffset = (sceneHeight - allyTeam.length * bannerHeight) / 2;
  const enemyStartOffset = (sceneHeight - enemyTeam.length * bannerHeight) / 2;
  const damageFilter = new ColorOverlayFilter({ color: 0xff0000, alpha: 0.5 });
  let counter = 0;
  let attacker = 0;
  let targets = [0, 1];
  let attackerStartX;

  function prepareAttack(time) {
    const step = time.deltaTime * 0.1;
    allies[attacker].x += step * (sceneWidth / 16);
    targets.forEach((target) => {
      enemies[target].x -= step * (sceneWidth / 16);
    });
    counter += step;
    if (counter >= 1) {
      app.ticker.remove(prepareAttack);
      counter = 0;
      setTimeout(() => {
        attackerStartX = allies[attacker].x;
        app.ticker.add(attack);
      }, 600);
    }
  }

  function attack(time) {
    counter += 9;
    allies[attacker].x =
      attackerStartX +
      Math.floor(
        ((1 - Math.abs(Math.cos((counter * Math.PI) / 180))) *
          (4 * sceneWidth)) /
          16
      );
    if (counter === 90) {
      targets.forEach((target) => {
        enemies[target].filters = [damageFilter];
      });
      setTimeout(() => {
        targets.forEach((target) => {
          enemies[target].filters = [];
        });
      }, 200);
    }
    if (counter === 180) {
      app.ticker.remove(attack);
      counter = 0;
      setTimeout(() => {
        app.ticker.add(endAttack);
      }, 500);
    }
  }

  function endAttack(time) {
    const step = time.deltaTime * 0.1;
    allies[attacker].x -= step * (sceneWidth / 16);
    targets.forEach((target) => {
      enemies[target].x += step * (sceneWidth / 16);
    });
    counter += step;
    if (counter >= 1) {
      app.ticker.remove(endAttack);
      counter = 0;
      allies[attacker].x = 0;
      targets.forEach((target) => {
        enemies[target].x = sceneWidth - bannerWidth;
      });
    }
  }

  const bg = Sprite.from("battleground");
  bg.setSize(sceneWidth, sceneHeight);
  scene.addChild(bg);

  let i = 0;
  allyTeam.forEach((ally) => {
    const unitBanner = new Graphics();
    unitBanner
      .rect(0, 0, bannerWidth, bannerHeight)
      .fill(lightBrown)
      .stroke({ width: 2, color: 0 });
    unitBanner.position.set(0, i++ * bannerHeight + allyStartOffset);
    allies.push(unitBanner);
    scene.addChild(unitBanner);
  });
  i = 0;
  enemyTeam.forEach((enemy) => {
    const unitBanner = new Graphics();
    unitBanner
      .rect(0, 0, bannerWidth, bannerHeight)
      .fill(lightBrown)
      .stroke({ width: 2, color: 0 });
    unitBanner.position.set(
      sceneWidth - bannerWidth,
      i++ * bannerHeight + enemyStartOffset
    );
    enemies.push(unitBanner);
    scene.addChild(unitBanner);
  });
  const startButton = createButton(app, {
    labelText: "Start",
    x: sceneWidth / 2,
    y: sceneHeight / 2,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      app.ticker.add(prepareAttack);
    },
  });
  scene.addChild(startButton);

  const backButton = createButton(app, {
    labelText: "Back",
    x: 50,
    y: 50,
    alignCenterX: false,
    alignCenterY: false,
    textureSrc: "blueButton",
    pressedTextureSrc: "blueButtonPressed",
    onClick: () => {
      startScene(app, { sceneKey: Scenes.MainMenu });
    },
  });
  scene.addChild(backButton)
  return () => {
    allies.length = 0;
    enemies.length = 0;
  };
}
