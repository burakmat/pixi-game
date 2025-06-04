import { Container, Graphics } from "pixi.js";
import { lightBrown } from "../colors";

export function PopupWindow(app, { sceneWidth, sceneHeight }, { key, closeOnClickOutside, onCloseHandler }) {
  const container = new Container();

  const blocker = new Graphics();
  blocker.rect(0, 0, app.screen.width, app.screen.height).fill("transparent");
//   blocker.alpha = 0.7
  blocker.eventMode = "static";
  if (closeOnClickOutside) {
    blocker.on("click", onCloseHandler)
  }

  const window = new Graphics();
  window.rect(0, 0, sceneWidth / 2, sceneHeight / 2).fill(lightBrown);
  window.position.set((app.screen.width - window.width) / 2, (app.screen.height - window.height) / 2);
  window.eventMode = "static";

  container.addChild(blocker);
  container.addChild(window);
  return container;
}
