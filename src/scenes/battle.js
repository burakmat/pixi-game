import { Sprite, Graphics, Container, Text } from "pixi.js";
import { lightBrown } from "../colors";
import { createPixelButton } from "../components/Button";
import { ColorOverlayFilter, GrayscaleFilter } from "pixi-filters";
import { Scenes } from "../enums";
import { startScene } from "../SceneManager";
import { encounter } from "../../../guild-react/src/static/encounter"
import { createHealthBar } from "../components/ProgressBar";

const ALLY_IDX = 0;
const ENEMY_IDX = 1;

export function BattleScene(app, { scene, sceneWidth, sceneHeight }) {
  const bannerHeight = (sceneHeight * 2) / 15;
  const bannerWidth = (sceneWidth * 5) / 16;
  const teams = [encounter.adventurers, encounter.enemies]
  const allyStartOffset = (sceneHeight - teams[ALLY_IDX].length * bannerHeight) / 2;
  const enemyStartOffset = (sceneHeight - teams[ENEMY_IDX].length * bannerHeight) / 2;
  const damageFilter = new ColorOverlayFilter({ color: 0xff0000, alpha: 0.5 });
  const healFilter = new ColorOverlayFilter({ color: 0x00ff00, alpha: 0.5 });
  const shieldFilter = new ColorOverlayFilter({ color: 0x0000ff, alpha: 0.5 });
  const deathFilter = new GrayscaleFilter();
  const allies = [];
  const enemies = [];
  const healthBarUpdaters = [[], []];
  const healthTexts = [[], []];
  let activeTickerHandler;
  let counter = 0;
  let attackerStartX;
  let turn;
  let attacker;
  let target;
  let actingTeam;
  let idleTeam;
  let timeoutId;

  function prepareAttack(time) {
    const step = time.deltaTime * 0.1;
    // allies[encounter.combatHistory[historyIdx].from.fightIndex].x += step * (sceneWidth / 16);
    // enemies[encounter.combatHistory[historyIdx].to.fightIndex].x -= step * (sceneWidth / 16);
      // targets.forEach((target) => {
      //   enemies[target].x -= step * (sceneWidth / 16);
      // });
    actingTeam[attacker].x += step * (sceneWidth / 16) * turn;
    counter += step;
    if (counter >= 1) {
      app.ticker.remove(prepareAttack);
      counter = 0;
      attackerStartX = actingTeam[attacker].x;
      playNextMove()
    }
  }

  function endAttack(time) {
    const step = time.deltaTime * 0.1;
    actingTeam[attacker].x -= turn * step * (sceneWidth / 16);
    counter += step;
    if (counter >= 1) {
      app.ticker.remove(endAttack);
      counter = 0;
      actingTeam[attacker].x = (sceneWidth - turn * sceneWidth) / 2;
      playNextMove();
    }
  }

  function prepareDamage(time) {
    const step = time.deltaTime * 0.1;
    idleTeam[target].x -= step * (sceneWidth / 16) * turn;
    counter += step;
    if (counter >= 1) {
      app.ticker.remove(prepareDamage);
      counter = 0;
      timeoutId = setTimeout(() => {
        activeTickerHandler = damage;
        app.ticker.add(damage);
      }, 600);
    }
  }

  function damage(time) {
    counter += 9;
    actingTeam[attacker].x =
      attackerStartX +
      turn * Math.floor(
        ((1 - Math.abs(Math.cos((counter * Math.PI) / 180))) *
          (4 * sceneWidth)) /
          16
      );
    if (counter === 90) {
      idleTeam[target].filters = [damageFilter];
    }
    if (counter === 180) {
        idleTeam[target].filters = [];
      app.ticker.remove(damage);
      counter = 0;
      timeoutId = setTimeout(() => {
        activeTickerHandler = endDamage
        app.ticker.add(endDamage);
      }, 600);
    }
  }

  function endDamage(time) {
    const step = time.deltaTime * 0.1;
    idleTeam[target].x += turn * step * (sceneWidth / 16);
    counter += step;
    if (counter >= 1) {
      app.ticker.remove(endDamage);
      counter = 0;
      idleTeam[target].x = (sceneWidth + sceneWidth * turn) / 2;
      playNextMove();
    }
  }

  function healStart(time) {
    if (counter === 0) {
      actingTeam[target].filters = [healFilter]
    }
    actingTeam[attacker].scale.set(1 + counter / 100);
    if (counter < 20) {
      counter += 2;
    } else {
      app.ticker.remove(healStart)
      activeTickerHandler = healEnd
      app.ticker.add(healEnd)
    }
  }

  function healEnd(time) {
    actingTeam[attacker].scale.set(1 + counter / 100);
    if (counter > 0) {
      counter -= 2;
    } else {
      actingTeam[target].filters = []
      app.ticker.remove(healEnd)
      playNextMove()
    }
  }

  function shieldStart(time) {
    if (counter === 0) {
      actingTeam[target].filters = [shieldFilter]
    }
    actingTeam[attacker].scale.set(1 + counter / 100);
    if (counter < 20) {
      counter += 2;
    } else {
      app.ticker.remove(shieldStart)
      activeTickerHandler = shieldEnd
      app.ticker.add(shieldEnd)
    }
  }

  function shieldEnd(time) {
    actingTeam[attacker].scale.set(1 + counter / 100);
    if (counter > 0) {
      counter -= 2;
    } else {
      actingTeam[target].filters = []
      app.ticker.remove(shieldEnd)
      playNextMove()
    }
  }

  function stunUnit() {
    const stunSprite = Sprite.from("stun");
    stunSprite.texture.source.scaleMode = "nearest";
    stunSprite.label = "stunSprite";
    stunSprite.scale.set(bannerHeight / stunSprite.height / 2);
    stunSprite.anchor.set(1, 0.5);
    stunSprite.position.set(bannerWidth, bannerHeight / 2);
    idleTeam[target].addChild(stunSprite);
    playNextMove();
  }

  function endStun() {
    const stunSprite = actingTeam[attacker].getChildByLabel("stunSprite");
    actingTeam[attacker].removeChild(stunSprite);
    stunSprite.destroy();
    playNextMove();
  }

  function killUnit() {
    idleTeam[target].filters = [deathFilter];
    // idleTeam[target].scale.set(3)
    playNextMove();
  }

  function playNextMove() {
    teams[ALLY_IDX].forEach((unit, idx) => {
      healthBarUpdaters[ALLY_IDX][idx](unit.currentHP, unit.shield, unit.maxHP);
      healthTexts[ALLY_IDX][idx].text = `${unit.currentHP}/${unit.maxHP}`;
    })
    teams[ENEMY_IDX].forEach((unit, idx) => {
      healthBarUpdaters[ENEMY_IDX][idx](unit.currentHP, unit.shield, unit.maxHP);
      healthTexts[ENEMY_IDX][idx].text = `${unit.currentHP}/${unit.maxHP}`;
    })
    setTimeout(() => {
    const nextAction = encounter.nextAction();
    if (nextAction) {
      turn = nextAction.from.isAdventurer ? 1 : -1;
      actingTeam = nextAction.from.isAdventurer ? allies : enemies;
      idleTeam = nextAction.from.isAdventurer ? enemies : allies;
      attacker = nextAction.from.fightIndex;
      target = nextAction.to.fightIndex;
      console.log(nextAction.action)
      if (nextAction.action === "attack") {
        activeTickerHandler = prepareAttack
        app.ticker.add(prepareAttack)
      } else if (nextAction.action === "endTurn") {
        activeTickerHandler = endAttack
        app.ticker.add(endAttack)
      } else if (nextAction.action === "damage") {
        activeTickerHandler = prepareDamage;
        app.ticker.add(prepareDamage);
      } else if (nextAction.action === "heal") {
        activeTickerHandler = healStart;
        app.ticker.add(healStart);
      } else if (nextAction.action === "shield") {
        activeTickerHandler = shieldStart;
        app.ticker.add(shieldStart);
      } else if (nextAction.action === "stun") {
        stunUnit();
      } else if (nextAction.action === "endStun") {
        endStun();
      } else if (nextAction.action === "kill") {
        killUnit();
      } else {
          console.log("skipped");
        playNextMove()
      }
    } else {
      console.log("END");
    }
    }, 1000);
  }

  const bg = Sprite.from("battleground");
  bg.setSize(sceneWidth, sceneHeight);
  scene.addChild(bg);

  let i = 0;
  teams[ALLY_IDX].forEach((ally) => {
    const bannerContainer = new Container();
    const unitBanner = new Graphics();
    unitBanner
      .rect(0, 0, bannerWidth, bannerHeight)
      .fill(lightBrown)
      .stroke({ width: 2, color: 0 });
    bannerContainer.addChild(unitBanner);
    bannerContainer.position.set(0, i++ * bannerHeight + allyStartOffset);
    bannerContainer.pivot.set(0, bannerContainer.height / 2);
    const [healthBar, updateHealthBar] = createHealthBar();
    updateHealthBar(ally.currentHP, ally.shield, ally.maxHP);
    healthBar.width = bannerWidth;
    bannerContainer.addChild(healthBar);
    const healthText = new Text({
      text: `${ally.currentHP}/${ally.maxHP}`,
      style: { fill: 0x0, fontSize: 128 },
    });
    healthText.scale.set(bannerHeight / healthText.height / 2);
    bannerContainer.addChild(healthText);
    healthTexts[ALLY_IDX].push(healthText);
    allies.push(bannerContainer);
    healthBarUpdaters[ALLY_IDX].push(updateHealthBar);
    scene.addChild(bannerContainer);
  });
  i = 0;
  teams[ENEMY_IDX].forEach((enemy) => {
    const bannerContainer = new Container();
    const unitBanner = new Graphics();
    unitBanner
      .rect(0, 0, bannerWidth, bannerHeight)
      .fill(lightBrown)
      .stroke({ width: 2, color: 0 });
    bannerContainer.addChild(unitBanner);
    bannerContainer.position.set(
      // sceneWidth - bannerWidth,
      sceneWidth,
      i++ * bannerHeight + enemyStartOffset
    );
    bannerContainer.pivot.set(bannerContainer.width, bannerContainer.height / 2);
    const [healthBar, updateHealthBar] = createHealthBar();
    updateHealthBar(enemy.currentHP, enemy.shield, enemy.maxHP);
    healthBar.width = bannerWidth;
    bannerContainer.addChild(healthBar);
    const healthText = new Text({
      text: `${enemy.currentHP}/${enemy.maxHP}`,
      style: { fill: 0x0, fontSize: 128 },
    });
    healthText.scale.set(bannerHeight / healthText.height / 2);
    bannerContainer.addChild(healthText);
    healthTexts[ENEMY_IDX].push(healthText);
    enemies.push(bannerContainer);
    healthBarUpdaters[ENEMY_IDX].push(updateHealthBar);
    scene.addChild(bannerContainer);
  });

  const startButton = createPixelButton(app, {
    labelText: "Start",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: async () => {
      playNextMove();
    },
  });
  startButton.position.set((sceneWidth - startButton.width) / 2, (sceneHeight - startButton.height) / 2)
  scene.addChild(startButton);

  const healthButton = createPixelButton(app, {
    labelText: "Halve Healths",
    width: sceneWidth / 8,
    onClick: () => {
      healthBarUpdaters[ALLY_IDX].forEach(fnc => {
        fnc(50, 200, 100)
      })
      healthBarUpdaters[ENEMY_IDX].forEach(fnc => {
        fnc(0, 50, 150)
      })
    }
  })
  healthButton.pivot.set(healthButton.width / 2, healthButton.height / 2);
  healthButton.position.set(sceneWidth / 2, sceneHeight * 6 / 10);
  scene.addChild(healthButton);

  const backButton = createPixelButton(app, {
    labelText: "Back",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: () => {
      if (activeTickerHandler) {
        console.log("removed handler")
        app.ticker.remove(activeTickerHandler);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      startScene(app, { sceneKey: Scenes.Lobby });
    },
  });
  backButton.position.set(sceneWidth / 20, sceneHeight / 10)

  scene.addChild(backButton)
  return () => {
    allies.length = 0;
    enemies.length = 0;
  };
}
