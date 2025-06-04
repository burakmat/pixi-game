import { Container, Sprite, Text, Graphics } from "pixi.js";
import { ScrollBox } from "@pixi/ui";

let PopupContainers = [];
export function openPopupWindow(
  app,
  { key, closeOnClickOutside, resetViewOnClose }
) {
  const found = PopupContainers.find((elem) => elem.key === key);
  if (found) {
    console.log(`${found.key} already exists`);
    if (
      found.config.closeOnClickOutside === closeOnClickOutside &&
      found.config.resetViewOnClose === resetViewOnClose
    ) {
      app.stage.addChild(found.container);
      found.container.renderable = true;
      return;
    } else {
      found.container.destroy();
      PopupContainers = PopupContainers.filter(
        (popupContainer) => popupContainer.key !== key
      );
    }
  }

  const container = new Container();

  const blocker = new Graphics()
    .rect(0, 0, app.screen.width, app.screen.height)
    .fill(0x0000ff);
  blocker.alpha = 0;
  blocker.eventMode = "static";
  if (closeOnClickOutside) {
    blocker.on("click", () => {
      app.stage.removeChild(container);
      if (resetViewOnClose) {
        PopupContainers = PopupContainers.filter(
          (popupContainer) => popupContainer.key !== key
        );
        container.destroy();
      } else {
        container.renderable = false;
      }
    });
  }

  const popupWindow = new Container();

  const pannel = Sprite.from("yellowPannel");
  pannel.scale.set(4);

  const text = new Text({
    text: "Settings",
    style: { fill: 0xffffff },
    position: { x: pannel.width / 2, y: 100 },
  });
  text.anchor.set(0.5);

  const scroller = new ScrollBox({
    background: 0xff,
    //   width: 600,
    height: 700,
    globalScroll: false,
    shiftScroll: true,
    type: "bidirectional",
    items: createListItems(10),
  });

  //   scroller.x = (app.screen.width - scroller.width) / 2;
  //   scroller.y = (app.screen.height - scroller.height) / 2;

  const closeButton = Sprite.from("redLittleButton");
  closeButton.anchor.set(0.5);
  closeButton.x = pannel.width - 100;
  closeButton.y = 100;
  closeButton.eventMode = "static";
  closeButton.cursor = "pointer";
  closeButton.on("click", () => {
    app.stage.removeChild(container);
    if (resetViewOnClose) {
      PopupContainers = PopupContainers.filter(
        (popupContainer) => popupContainer.key !== key
      );
      container.destroy();
    } else {
      container.renderable = false;
    }
  });

  popupWindow.eventMode = "static";
  popupWindow.addChild(pannel);
  popupWindow.addChild(text);
  popupWindow.addChild(closeButton);
  popupWindow.addChild(scroller);
  popupWindow.x = (app.screen.width - popupWindow.width) / 2;
  popupWindow.y = (app.screen.height - popupWindow.height) / 2;

  container.addChild(blocker);
  container.addChild(popupWindow);

  PopupContainers.push({
    key: key,
    container: container,
    config: {
      closeOnClickOutside: closeOnClickOutside,
      resetViewOnClose: resetViewOnClose,
    },
  });
  app.stage.addChild(container);
}

function createListItems(number) {
  const items = [];
  for (let i = 0; i < number; ++i) {
    const item = Sprite.from("yellowButton");
    item.scale.set(3);
    items.push(item);
  }
  return items;
}
