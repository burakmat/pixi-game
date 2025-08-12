import {
  Container,
  Graphics,
  Texture,
} from "pixi.js";
import { AdventurerBanner } from "./AdventurerBanner";
import { Sprite } from "pixi.js";
import { markerColor } from "../../colors";
import BackToFront from "../../../../guild-react/src/backToFront";
import { AdventurerListMode } from "../../enums";

export function AdventurerList(app, {renderWidth, renderHeight, setActiveAdventurer}) {
  const gap = (renderHeight * 1) / 20;
  const height = (renderHeight * 3) / 20;
  const banners = [];
  let currentPage = 1;
  const adventurers = BackToFront.getAdventurers().data;
  console.log("adventurers:", adventurers);
  const maxNumberPage = Math.ceil(adventurers.length / 4);

  const container = new Container();

  const bg = new Graphics();
  bg.rect(0, 0, renderWidth, renderHeight).fill(markerColor);


  function pageUp() {
    if (currentPage === 1) {
      currentPage = maxNumberPage;
    } else {
      currentPage -= 1;
    }
    updateBanners()
  }

  function pageDown() {
    if (currentPage === maxNumberPage) {
      currentPage = 1;
    } else {
      currentPage += 1;
    }
    updateBanners();
  }

  function updateBanners() {
    banners.forEach((banner) => {
      container.removeChild(banner);
    })
    for (let i = 0; i < 4; ++i) {
      const index = (currentPage - 1) * 4 + i;
      if (index < adventurers.length) {
        banners[index].position.set(renderWidth / 8, renderHeight / 8 + (gap + height) * i);
        container.addChild(banners[index]);
      }
    }
  }

  let currentListMode = AdventurerListMode.Inventory;

  function setListMode(newMode) {
    let markerPicked;
    let markerLeft;
    if (newMode === currentListMode) {
      return ;
    } else if (newMode === AdventurerListMode.Inventory) {
      markerPicked = marker1;
      markerLeft = marker2;
      currentListMode = AdventurerListMode.Inventory;
    } else if (newMode === AdventurerListMode.Market) {
      markerPicked = marker2;
      markerLeft = marker1;
      currentListMode = AdventurerListMode.Market;
    }
    markerPicked.texture = markerBTexture;
    markerLeft.texture = markerATexture;
    markerPicked.position.set(renderWidth - markerPicked.width * 1 / 3, renderHeight * 0.5);
    markerLeft.position.set(renderWidth, renderHeight * 0.5);
  }

  const markerATexture = Texture.from("marker2a");
  markerATexture.source.scaleMode = 'nearest'
  const markerBTexture = Texture.from("marker2b");
  markerBTexture.source.scaleMode = 'nearest'

  for (let i = 0; i < adventurers.length; ++i) {
    const banner = new AdventurerBanner(app, {
      bannerWidth: (renderWidth * 3) / 4,
      bannerHeight: (renderHeight * 3) / 20,
      avatarSrc: "lule",
      name: adventurers[i].name,
      level: adventurers[i].level,
      str: adventurers[i].stats.Strength,
      int: adventurers[i].stats.Intelligence,
      dex: adventurers[i].stats.Dexterity,
      fth: adventurers[i].stats.Faith,
      race: adventurers[i].race,
      _class: adventurers[i].class
    });
    banner.on("click", () => {
      setActiveAdventurer(adventurers[i]);
    })
    banners.push(banner);
  }

  const arrowTexture = Texture.from("downArrow");
  arrowTexture.source.scaleMode = "nearest";
  const renderScale = renderWidth / 75;

  const upButton = Sprite.from(arrowTexture);
  upButton.anchor.set(0.5);
  upButton.position.set(renderWidth / 2, renderHeight * 0.06);
  upButton.eventMode = "static";
  upButton.cursor = "pointer";
  upButton.scale.set(renderScale, -renderScale);
  upButton.zIndex = 1;
  upButton.on("click", pageUp);
  container.addChild(upButton);

  const downButton = Sprite.from(arrowTexture);
  downButton.anchor.set(0.5);
  downButton.position.set(renderWidth / 2, renderHeight * 0.94);
  downButton.eventMode = "static";
  downButton.cursor = "pointer";
  downButton.scale.set(renderScale);
  downButton.zIndex = 1;
  downButton.on("click", pageDown);
  container.addChild(downButton);
  

  const markerScale = renderWidth / 100;

  const marker1 = Sprite.from(markerBTexture);
  marker1.anchor.set(1, 0);
  marker1.angle = 180;
  marker1.scale.set(markerScale);
  marker1.position.set(renderWidth - marker1.width * 10 / 30, renderHeight * 0.5);
  marker1.zIndex = 1;
  marker1.eventMode = 'static';
  marker1.cursor = 'pointer';
  marker1.on("click", () => {
    setListMode(AdventurerListMode.Inventory);
  });
  container.addChild(marker1);
  
  const marker2 = Sprite.from(markerATexture);
  marker2.anchor.set(1, 1);
  marker2.angle = 180;
  marker2.scale.set(markerScale);
  marker2.position.set(renderWidth, renderHeight * 0.5);
  marker2.zIndex = 1;
  marker2.eventMode = "static"
  marker2.cursor = 'pointer'
  marker2.on("click", () => {
    setListMode(AdventurerListMode.Market)
  });
  container.addChild(marker2);

  container.addChild(bg);
  updateBanners();
  if (adventurers.length > 0) {
    setActiveAdventurer(adventurers[0])
  }
  return container;
}
