import { createButton } from "../components/Button";
import { Scenes } from "../enums";
import { startScene } from "../SceneManager";
import {
  createBookBackground,
  destroyBookBackground,
} from "../components/AdventurerDetails/BookBackground";
import { AdventurerList } from "../components/AdventurerDetails/AdventurerList";
import { AdventurerStatistics } from "../components/AdventurerDetails/Statistics";
import { SkillTree } from "../components/AdventurerDetails/SkillTree";
import { Appearance } from "../components/AdventurerDetails/Appearance";
import { AdventurerDetailsTabs } from "../enums";
import { markers } from "../components/AdventurerDetails/BookBackground";
import { Items } from "../components/AdventurerDetails/Items";

const bookAspectRatio = 7 / 5;

const adventurers = [
  {
    avatarSrc: "adventurer",
  },
  {
    avatarSrc: "adventurer2",
  },
];

const tabs = [];

export function createAdventurerDetailsScene(
  app,
  { scene, sceneWidth, sceneHeight }
) {
  let activeAdventurer;
  let appearance;

  let activeTab = AdventurerDetailsTabs.Statistics;
  function setActiveTab(newTab) {
    if (activeTab !== undefined) {
      markers[activeTab].y = -3;
      markers[activeTab].mask.y = -7;
      scene.removeChild(tabs[activeTab]);
    }
    activeTab = newTab;
    markers[activeTab].y = -5;
    markers[activeTab].mask.y = -5;
    scene.addChild(tabs[newTab]);
  }

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

  function setActiveAdventurer(newId) {
    if (newId !== activeAdventurer) {
      if (activeAdventurer !== undefined) {
        scene.removeChild(appearance);
        appearance.destroy();
      }
      activeAdventurer = newId;
      appearance = Appearance(app, {
        renderWidth: Math.floor(sceneHeight / 2),
        renderHeight: Math.floor((sceneHeight * 6) / 10),
        spriteSrc: adventurers[activeAdventurer].avatarSrc,
      });
      appearance.position.set(
        sceneWidth - bookBackground.width + (bookBackground.width * 54) / 100,
        Math.floor(bookBackground.y + (bookBackground.height * 22) / 160)
      );

      scene.addChild(appearance);
    }
  }

  const adventurerList = AdventurerList(app, {
    renderWidth: sceneWidth / 4,
    renderHeight: (sceneWidth * 7) / 16,
    setActiveAdventurer,
  });
  adventurerList.position.set(sceneWidth / 40, sceneHeight / 8);
  scene.addChild(adventurerList);

  const bookBackground = createBookBackground(
    app,
    {
      renderWidth: ((sceneHeight * 9) / 10) * bookAspectRatio,
      renderHeight: (sceneHeight * 9) / 10,
    },
    setActiveTab
  );
  bookBackground.position.set(
    sceneWidth - bookBackground.width,
    (sceneHeight - bookBackground.height) / 2
  );
  scene.addChild(bookBackground);

  const statistics = AdventurerStatistics(app, {
    renderWidth: Math.floor(sceneHeight / 2),
    renderHeight: Math.floor((sceneHeight * 6) / 10),
  });
  tabs.push(statistics);
  statistics.position.set(
    sceneWidth - bookBackground.width + (bookBackground.width * 7) / 100,
    bookBackground.y + (bookBackground.height * 14) / 100
  );

  const skillTree = SkillTree(app, {
    renderWidth: Math.floor(sceneHeight / 2),
    renderHeight: Math.floor((sceneHeight * 6) / 10),
  });
  tabs.push(skillTree);
  skillTree.position.set(
    sceneWidth - bookBackground.width + (bookBackground.width * 7) / 100,
    Math.floor(bookBackground.y + (bookBackground.height * 14) / 100)
  );

  const items = Items(app, {
    renderWidth: Math.floor(sceneHeight / 2),
    renderHeigth: Math.floor((sceneHeight * 6) / 10),
  });
  tabs.push(items);
  items.position.set(
    sceneWidth - bookBackground.width + (bookBackground.width * 7) / 100,
    bookBackground.y + (bookBackground.height * 14) / 100
  );

  setActiveTab(AdventurerDetailsTabs.Statistics);
  setActiveAdventurer(0);

  scene.addChild(backButton);
  return () => {
    tabs.length = 0;
    destroyBookBackground();
  };
}
