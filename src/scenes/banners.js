import { Sprite } from "pixi.js";
import { createPixelButton } from "../components/Button";
import { startScene } from "../SceneManager";
import { Scenes } from "../enums";

export function createBannersScene(app, { scene, sceneWidth, sceneHeight }) {
  const backButton = createPixelButton(app, {
    labelText: "Back",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.MainMenu });
    },
  });
  backButton.position.set(sceneWidth / 20, sceneHeight / 10)


  const fireplaceBg = Sprite.from("fireplace");
  fireplaceBg.scale.set(sceneHeight / 1024);
  fireplaceBg.position.set((sceneWidth - fireplaceBg.width) / 2, 0);

  const banner1 = Sprite.from("banner");
  banner1.scale.set(sceneHeight / 4096);
  banner1.anchor.set(0.5, 0);
  banner1.position.set(sceneWidth / 5, 0);
  const banner2 = Sprite.from("banner");
  banner2.scale.set(sceneHeight / 4096);
  banner2.anchor.set(0.5, 0);
  banner2.position.set((sceneWidth * 2) / 5, 0);
  const banner3 = Sprite.from("banner");
  banner3.scale.set(sceneHeight / 4096);
  banner3.anchor.set(0.5, 0);
  banner3.position.set((sceneWidth * 3) / 5, 0);
  const banner4 = Sprite.from("banner");
  banner4.scale.set(sceneHeight / 4096);
  banner4.anchor.set(0.5, 0);
  banner4.position.set((sceneWidth * 4) / 5, 0);

  scene.addChild(fireplaceBg);
  scene.addChild(banner1);
  scene.addChild(banner2);
  scene.addChild(banner3);
  scene.addChild(banner4);
  scene.addChild(backButton);
}
