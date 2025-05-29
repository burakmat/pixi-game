import { Container, Graphics, Sprite, Text } from "pixi.js";

export function AdventurerBanner(
  app,
  {
    bannerWidth,
    bannerHeight,
    avatarSrc,
    name,
    level,
    str,
    int,
    dex,
    fth,
    race,
    _class,
  }
) {
  const container = new Container();
  container.eventMode = "static";
  container.cursor = "pointer";

  const frame = new Graphics();
  frame
    .rect(0, 0, bannerWidth, bannerHeight)
    .stroke({ color: 0x000000, width: 2 })
    .fill(0xf6e6c0);

  const avatar = Sprite.from(avatarSrc);
  avatar.height = (bannerHeight * 6) / 10;
  avatar.width = avatar.height;
  avatar.position.set(bannerHeight / 10, bannerHeight / 10);

  const nameText = new Text({
    text: name,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  nameText.scale.set(bannerWidth / 2000);
  nameText.anchor.set(0, 1);
  nameText.position.set(bannerHeight / 10, (bannerHeight * 9) / 10);

  const levelText = new Text({
    text: level,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  levelText.scale.set(bannerWidth / 1200);
  levelText.anchor.set(1, 1);
  levelText.position.set((bannerWidth * 19) / 20, (bannerHeight * 9) / 10);

  const statText = new Text({
    text: `STR: ${str}\tINT: ${int}\nDEX: ${dex}\tFTH: ${fth}`,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  statText.scale.set(bannerWidth / 2000);
  statText.position.set((bannerHeight * 4) / 5, (bannerHeight * 3) / 10);

  const classRaceText = new Text({
    text: `${_class} ${race}`,
    style: {
      fontFamily: "anxel",
      fill: 0x412a2b,
      fontSize: 128,
    },
  });
  classRaceText.scale.set(bannerWidth / 1800);
  classRaceText.position.set((bannerHeight * 4) / 5, bannerHeight / 10);

  container.addChild(frame);
  container.addChild(avatar);
  container.addChild(nameText);
  container.addChild(levelText);
  container.addChild(statText);
  container.addChild(classRaceText);
  return container;
}
