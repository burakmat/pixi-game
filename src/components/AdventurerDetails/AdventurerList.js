import {
  Container,
  Graphics,
} from "pixi.js";
import { AdventurerBanner } from "./AdventurerBanner";

export function AdventurerList(app, {renderWidth, renderHeight, setActiveAdventurer}) {
  const container = new Container();

  const bg = new Graphics();
  bg.rect(0, 0, renderWidth, renderHeight).fill(0xf6e6c0);

  const gap = (renderHeight * 1) / 20;
  const height = (renderHeight * 3) / 20;

  const banner1 = AdventurerBanner(app, {
    bannerWidth: (renderWidth * 3) / 4,
    bannerHeight: (renderHeight * 3) / 20,
    avatarSrc: "lule",
    name: "Borako Mata",
    level: Math.floor(Math.random() * 20),
    str: Math.floor(Math.random() * 20),
    int: Math.floor(Math.random() * 20),
    dex: Math.floor(Math.random() * 20),
    fth: Math.floor(Math.random() * 20),
    race: "Elf",
    _class: "Mage"
  });
  banner1.position.set(renderWidth / 8, renderHeight / 8);
  banner1.on("click", () => {
    setActiveAdventurer(0)
  })

  const banner2 = AdventurerBanner(app, {
    bannerWidth: (renderWidth * 3) / 4,
    bannerHeight: (renderHeight * 3) / 20,
    avatarSrc: "lule",
    name: "Ozuman Yalakin",
    level: Math.floor(Math.random() * 20),
    str: Math.floor(Math.random() * 20),
    int: Math.floor(Math.random() * 20),
    dex: Math.floor(Math.random() * 20),
    fth: Math.floor(Math.random() * 20),
    race: "Dwarf",
    _class: "Warrior"
  });
  banner2.position.set(renderWidth / 8, renderHeight / 8 + (gap + height) * 1);
  banner2.on("click", () => {
    setActiveAdventurer(1)
  })

  const banner3 = AdventurerBanner(app, {
    bannerWidth: (renderWidth * 3) / 4,
    bannerHeight: (renderHeight * 3) / 20,
    avatarSrc: "lule",
    name: "Eko Imaro",
    level: Math.floor(Math.random() * 20),
    str: Math.floor(Math.random() * 20),
    int: Math.floor(Math.random() * 20),
    dex: Math.floor(Math.random() * 20),
    fth: Math.floor(Math.random() * 20),
    race: "Orc",
    _class: "Cleric"
  });
  banner3.position.set(renderWidth / 8, renderHeight / 8 + (gap + height) * 2);
  banner3.on("click", () => {
    setActiveAdventurer(2)
  })

  const banner4 = AdventurerBanner(app, {
    bannerWidth: (renderWidth * 3) / 4,
    bannerHeight: (renderHeight * 3) / 20,
    avatarSrc: "lule",
    name: "Amodi Selmi Ozaka",
    level: Math.floor(Math.random() * 20),
    str: Math.floor(Math.random() * 20),
    int: Math.floor(Math.random() * 20),
    dex: Math.floor(Math.random() * 20),
    fth: Math.floor(Math.random() * 20),
    race: "Human",
    _class: "Rogue"
  });
  banner4.position.set(renderWidth / 8, renderHeight / 8 + (gap + height) * 3);
  banner4.on("click", () => {
    setActiveAdventurer(3)
  })

  container.addChild(bg);
  container.addChild(banner1);
  container.addChild(banner2);
  container.addChild(banner3);
  container.addChild(banner4);
  return container;
}
