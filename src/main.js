import { Application, Assets } from "pixi.js";
import {
  setSceneDimensions,
  startScene,
  rerenderActiveScene,
} from "./SceneManager.js";
import { Scenes } from "./enums.js";

const app = new Application();
await app.init({ resizeTo: window, backgroundColor: 0x7e5d59 });
document.body.appendChild(app.canvas);

async function preload() {
  const assets = [
    { alias: "blueButton", src: "/Buttons/Button_Blue_3Slides.png" },
    {
      alias: "blueButtonPressed",
      src: "/Buttons/Button_Blue_3Slides_Pressed.png",
    },
    { alias: "yellowButton", src: "/Buttons/Button_Hover_3Slides.png" },
    { alias: "yellowPannel", src: "/Buttons/Button_Hover_9Slides.png" },
    { alias: "redLittleButton", src: "/Buttons/Button_Red.png" },
    { alias: "bing", src: "sfx/001_Hover_01.wav" },
    { alias: "start", src: "sfx/089_Pause_01.wav" },
    { alias: "avatar", src: "avatar.png" },
    { alias: "lule", src: "lule.avif" },
    { alias: "sade", src: "sade.avif" },
    { alias: "anxel", src: "UI_Assets/Fonts/Anxel.ttf" },
    {
      alias: "bar",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_Bar01a.png",
    },
    {
      alias: "fill",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_Fill01a.png",
    },
    {
      alias: "bookCover",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_BookCover01a.png",
    },
    {
      alias: "bookPageLeft",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_BookPageLeft01a.png",
    },
    {
      alias: "bookPageRight",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_BookPageRight01a.png",
    },
    { alias: "adventurer", src: "adventurer.png" },
    { alias: "adventurer2", src: "adventurer2.png" },
    {
      alias: "itemSlot",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_Slot01a.png",
    },
    {
      alias: "coin",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_IconCoin01a.png",
    },
    {
      alias: "marker",
      src: "UI_Assets/01_TravelBook/Sprites/UI_TravelBook_Marker01a.png",
    },
    { alias: "fireplace", src: "fireplace.png" },
    { alias: "banner", src: "banner.png" },
    { alias: "skillTree", src: "skill_tree.png" },
    { alias: "battleground", src: "/battleground.png" },
    {
      alias: "pixelButton",
      src: "/UI_Assets/03_NoteBook/Sprites/UI_NoteBook_Button01a.png",
    },
  ];
  await Assets.load(assets);
}

await preload();

setSceneDimensions(app);
startScene(app, { sceneKey: Scenes.MainMenu });

let locked = false;
window.addEventListener("resize", () => {
  if (!locked) {
    locked = true;
    setTimeout(() => {
      setSceneDimensions(app);
      rerenderActiveScene(app);
      locked = false;
    }, 1000);
  }
});
