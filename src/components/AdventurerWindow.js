import { createPixelButton } from "./Button";
import {
  createBookBackground,
  destroyBookBackground,
  markers,
} from "./AdventurerDetails/BookBackground";
import { AdventurerList } from "./AdventurerDetails/AdventurerList";
import { AdventurerStatistics } from "./AdventurerDetails/Statistics";
import { SkillTree } from "./AdventurerDetails/SkillTree";
import { Appearance } from "./AdventurerDetails/Appearance";
import { AdventurerDetailsTabs } from "../enums";
import { Items } from "./AdventurerDetails/Items";
import { Container, Graphics } from "pixi.js";

const BOOK_ASPECT_RATIO = 7 / 5;

const adventurers = [
  {
    avatarSrc: "adventurer",
  },
  {
    avatarSrc: "adventurer2",
  },
];

const tabs = [];

export function AdventurerWindow(
  app,
  { sceneWidth, sceneHeight },
  onCloseHandler
)
{
  let activeAdventurer = undefined;

  let activeTab = AdventurerDetailsTabs.Statistics;

  const container = new Container();

  const blocker = new Graphics();
  blocker
    .rect(0, 0, sceneWidth, sceneHeight)
    .fill({ color: 0x000000, alpha: 0 });
  blocker.eventMode = "static";
  container.addChild(blocker);

  const innerContainer = new Container();

  function setActiveTab(newTab) {
    if (activeTab !== undefined) {
      markers[activeTab].y = -3;
      markers[activeTab].mask.y = -7;
      innerContainer.removeChild(tabs[activeTab]);
    }
    activeTab = newTab;
    markers[activeTab].y = -5;
    markers[activeTab].mask.y = -5;
    innerContainer.addChild(tabs[newTab]);
  }

  let appearance;

  function setActiveAdventurer(newAdventurer) {
    if (activeAdventurer && newAdventurer.id !== activeAdventurer.id) {
      const statsTab = tabs[AdventurerDetailsTabs.Statistics];
      const skillTreeTab = tabs[AdventurerDetailsTabs.SkillTree];
      innerContainer.removeChild(statsTab);
      innerContainer.removeChild(skillTreeTab);
      innerContainer.removeChild(appearance);
      statsTab.destroy({ children: true });
      skillTreeTab.destroy({ children: true });
      appearance.destroy({ children: true });
    }
    if (activeAdventurer === undefined || activeAdventurer.id !== newAdventurer.id) {
      activeAdventurer = newAdventurer;
      appearance = Appearance(app, {
        renderWidth: sceneWidth * 0.27,
        renderHeight: sceneHeight * 0.6,
        spriteSrc: "adventurer",
      });
      appearance.position.set(
        bookBackground.width * 0.55,
        sceneHeight * 0.18
      );

      tabs[AdventurerDetailsTabs.Statistics] = AdventurerStatistics(
        app,
        {
          renderWidth: sceneWidth * 0.27,
          renderHeight: sceneHeight * 0.6,
        },
        {
          name: activeAdventurer.name,
          status: activeAdventurer.activityStatus,
          _class: activeAdventurer.class,
          race: activeAdventurer.race,
          str: activeAdventurer.stats.Strength,
          int: activeAdventurer.stats.Intelligence,
          dex: activeAdventurer.stats.Dexterity,
          fth: activeAdventurer.stats.Faith,
          cost: activeAdventurer.value,
          wage: activeAdventurer.costOfLiving,
          corruption: activeAdventurer.corruption,
          loyalty: activeAdventurer.loyalty,
        }
      );
      tabs[AdventurerDetailsTabs.Statistics].position.set(
        bookBackground.width * 0.07,
        sceneHeight * 0.18
      );

      tabs[AdventurerDetailsTabs.SkillTree] = SkillTree(app, {
        renderWidth: sceneWidth * 0.27,
        renderHeight: sceneHeight * 0.6,
      });
      tabs[AdventurerDetailsTabs.SkillTree].position.set(
        bookBackground.width * 0.07,
        sceneHeight * 0.18
      );

      tabs[AdventurerDetailsTabs.Items] = Items(app, {
        renderWidth: sceneWidth * 0.27,
        renderHeigth: sceneHeight * 0.6,
      });
      tabs[AdventurerDetailsTabs.Items].position.set(
        bookBackground.width * 0.07,
        sceneHeight * 0.18
      );

      innerContainer.addChild(appearance);
      setActiveTab(AdventurerDetailsTabs.Statistics);
    }
  }

  const bookBackground = createBookBackground(
    {
      renderWidth: sceneWidth * 0.70,
      renderHeight: sceneWidth * 0.70 / BOOK_ASPECT_RATIO,
    },
    setActiveTab
  );
  bookBackground.position.set(
    0,
    (sceneHeight - bookBackground.height) / 2
  );
  innerContainer.addChild(bookBackground);
  
  const adventurerList = AdventurerList(app, {
    renderWidth: sceneWidth * 0.25,
    renderHeight: sceneHeight * 0.755,
    setActiveAdventurer,
  });
  adventurerList.pivot.set(0, adventurerList.height / 2);
  adventurerList.position.set(sceneWidth * 0.69, sceneHeight * 0.49);
  adventurerList.zIndex = -1;
  innerContainer.addChild(adventurerList);
  
  
  
  setActiveTab(AdventurerDetailsTabs.Statistics);



  innerContainer.position.set(
    0,
    app.screen.height - (app.screen.height - sceneHeight) / 2
  );
  container.addChild(innerContainer);

  const backButton = createPixelButton(app, {
    labelText: "Back",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: () => {
      app.ticker.add(unmountTicker);
    },
  });
  backButton.pivot.set(backButton.width, 0);
  backButton.position.set(sceneWidth, 0);
  innerContainer.addChild(backButton);

 const treshold = app.screen.height - (app.screen.height - sceneHeight) / 2;
 const step = sceneHeight / 15;

  function mountTicker(time) {
    if (!innerContainer) {
      app.ticker.remove(mountTicker);
      return ;
    }
    if (innerContainer.y <= step) {
      app.ticker.remove(mountTicker);
      innerContainer.y = 0;
      return ;
    }
    innerContainer.y -= time.deltaTime * step;
  }

  function unmountTicker(time) {
    if (!innerContainer) {
      app.ticker.remove(unmountTicker);
      return ;
    }
    if (innerContainer.y >= treshold) {
      app.ticker.remove(unmountTicker);
      onCloseHandler();
      return ;
    }
    innerContainer.y += time.deltaTime * step;
  }

  return [
    container,
    mountTicker,
    () => {
      tabs.forEach((tab) => {
        tab.destroy({ children: true });
      })
      tabs.length = 0;
      destroyBookBackground();
    }
  ]
}
