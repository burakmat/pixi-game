import { Sprite, Container, Texture, Graphics } from "pixi.js";

const FILL_WIDTH = 58;

export function createPixelProgressBar(
  app,
  { barSrc, fillSrc, progress }
) {
  const barTexture = Texture.from(barSrc);
  barTexture.source.scaleMode = "nearest";
  const fillTexture = Texture.from(fillSrc);
  fillTexture.source.scaleMode = "nearest";
  const bar = Sprite.from(barTexture);
  const fill = Sprite.from(fillTexture);
  fill.y = 1;
  fill.x = 2;
  fill.width = Math.round(FILL_WIDTH / 100 * progress);
  const container = new Container();
  container.addChild(bar);
  container.addChild(fill);
  return container;
}

export function createHealthBar() {
  function updateHealthBar(health, shield, maxHealth) {
    const [hPer, sPer] = calculateFillPercent(health, shield, maxHealth);
    healthBar.width = hPer;
    shieldBar.width = sPer;
    shieldBar.x = healthBar.width;
  }

  const container = new Container();
  const bar = new Graphics();
  bar.rect(0, 0, 100, 10).fill({ color: "white" });
  const healthBar = new Graphics();
  healthBar.rect(0, 0, 100, 10).fill({ color: "green" });
  const shieldBar = new Graphics();
  shieldBar.rect(0, 0, 100, 10).fill("blue");
  container.addChild(bar, healthBar, shieldBar);
  return [container, updateHealthBar]
}

function calculateFillPercent(health, shield, maxHealth) {
  if (health < 0) {
    health = 0;
  }
  if (health + shield > maxHealth) {
    return [health / (health + shield) * 100, shield / (health + shield) * 100]
  } else {
    return [health / maxHealth * 100, shield / maxHealth * 100]
  }
}