import { Container, Graphics, Sprite, Text } from "pixi.js";
import { lightBrown } from "../colors";
import { createPixelButton } from "./Button";


export function PopupWindow(app, { sceneWidth, sceneHeight }, { closeOnClickOutside, onCloseHandler }, { name, text, image, choices }) {
  const POPUP_WIDTH = sceneWidth * 70 / 100;
  const POPUP_HEIGHT = sceneHeight * 80 / 100;
  const container = new Container();

  const blocker = new Graphics();
  blocker.rect(0, 0, app.screen.width, app.screen.height).fill("black");
  blocker.alpha = 0.7
  blocker.eventMode = "static";
  if (closeOnClickOutside) {
    blocker.on("click", onCloseHandler)
  }

  const window = new Container();
  window.position.set((app.screen.width - POPUP_WIDTH) / 2, (app.screen.height - POPUP_HEIGHT) / 2);

  const windowBg = new Graphics();
  windowBg.rect(0, 0, POPUP_WIDTH, POPUP_HEIGHT).fill(lightBrown);
  windowBg.eventMode = "static";
  window.addChild(windowBg);

  const banner = Sprite.from(image);
  banner.scale.set(window.height / banner.height * 4 / 10);
  banner.x = (window.width - banner.width) / 2;
  window.addChild(banner);

  const title = new Text({
    text: name,
    style: {
      fontFamily: "anxel",
      fill: 0xae8486,
      fontSize: 128,
    },
  });
  title.scale.set(window.height / title.height / 10);
  title.position.set((window.width - title.width) / 2, window.height * 4 / 10);
  window.addChild(title);

  const eventText = new Text({
    text: text,
    style: {
      // fontFamily: "anxel",
      // fill: 0xae8486,
      fontSize: Math.floor(window.width / 50),
      wordWrap: true,
      wordWrapWidth: window.width * 9 / 10,
    },
  })
  eventText.position.set((window.width - eventText.width) / 2, window.height * 55 / 100);
  window.addChild(eventText);

  choices.forEach((choice, idx) => {
    const choiceButton = createPixelButton(app, {
      labelText: choice.text,
      width: window.width * 2 / 10,
      onClick: choice.action,
    });
    
    choiceButton.position.set((idx + 1) * (window.width - choices.length * choiceButton.width) / (choices.length + 1) + choiceButton.width * idx, window.height * 85 / 100);
    window.addChild(choiceButton);
  });

  container.addChild(blocker);
  container.addChild(window);
  return [container, undefined];
}

export function DialogueWindow(app, { sceneWidth, sceneHeight }, { left, right, lines, onClose }, onCloseHandler) {
  const DIALOGUE_WIDTH = sceneWidth * 80 / 100;
  const DIALOGUE_HEIGHT = sceneHeight * 25 / 100;
  const DIALOGUE_Y_START = sceneHeight / 2 + sceneHeight * 20 / 100;
  const CHARACTER_SIZE = sceneWidth / 4;
  const spriteScales = [];
  let lineIdx = -1;
  let activeTickerHandler;

  const container = new Container();

    const dialogueText = new Text({
    text: "",
    style: {
      // fontFamily: "anxel",
      // fill: 0xae8486,
      fontSize: Math.floor(sceneWidth / 50),
      wordWrap: true,
      wordWrapWidth: DIALOGUE_WIDTH * 9 / 10,
    },    
  });
  dialogueText.anchor.set(0, 0.5);
  dialogueText.position.set(sceneWidth * 10 / 100 + DIALOGUE_WIDTH * 5 / 100, DIALOGUE_Y_START + DIALOGUE_HEIGHT / 2);

  const sceneFrame = new Container();
  sceneFrame.position.set((app.screen.width - sceneWidth) / 2, (app.screen.height - sceneHeight) / 2);

  const leftSprite = Sprite.from(left.image);
  leftSprite.texture.source.scaleMode = "nearest";
  spriteScales[0] = CHARACTER_SIZE / leftSprite.width
  leftSprite.anchor.set(0, 1);
  leftSprite.position.set(sceneWidth * 10 / 100, DIALOGUE_Y_START);
  sceneFrame.addChild(leftSprite);

  const rightSprite = Sprite.from(right.image);
  rightSprite.texture.source.scaleMode = "nearest";
  spriteScales[1] = CHARACTER_SIZE / rightSprite.width;
  rightSprite.anchor.set(1, 1);
  rightSprite.position.set(sceneWidth * 90 / 100, DIALOGUE_Y_START);
  sceneFrame.addChild(rightSprite);

  let currentIndex = 0;
  const textSpeed = 0.8;
  function dialogueTicker(time) {
    currentIndex += textSpeed * time.deltaTime;
    dialogueText.text = lines[lineIdx].text.slice(0, Math.floor(currentIndex));
    if (currentIndex >= lines[lineIdx].text.length) {
      currentIndex = 0;
      app.ticker.remove(dialogueTicker);
      activeTickerHandler = undefined;
    }
  }

  function updateDialogue() {
    const SCALE_MULTIPLIER = 1.2;
    if (activeTickerHandler) {
      app.ticker.remove(activeTickerHandler);
      activeTickerHandler = undefined;
      dialogueText.text = lines[lineIdx].text;
      currentIndex = 0;
      return ;
    }
    lineIdx += 1;
    if (lineIdx >= lines.length) {
      onClose();
      onCloseHandler();
    } else {
      if (lines[lineIdx].isLeftTalking) {
        rightSprite.scale.set(spriteScales[1]);
        leftSprite.scale.set(spriteScales[0] * SCALE_MULTIPLIER);
      } else {
        rightSprite.scale.set(spriteScales[1] * SCALE_MULTIPLIER);
        leftSprite.scale.set(spriteScales[0]);
      }
      activeTickerHandler = dialogueTicker;
      app.ticker.add(dialogueTicker)
    }
  }

  const blocker = new Graphics();
  blocker.rect(0, 0, app.screen.width, app.screen.height).fill("black");
  blocker.alpha = 0.7;
  blocker.eventMode = "static";
  blocker.on("click", updateDialogue);
  container.addChild(blocker);

  const dialogueBox = new Container();
  dialogueBox.position.set((sceneWidth - DIALOGUE_WIDTH) / 2, DIALOGUE_Y_START);

  const boxBg = new Graphics();
  boxBg.rect(0, 0, DIALOGUE_WIDTH, DIALOGUE_HEIGHT).fill(lightBrown);
  dialogueBox.addChild(boxBg);

  sceneFrame.addChild(dialogueBox);

  const leftLabel = new Container();
  const leftName = new Text({
    text: left.name,
    style: {
      fontFamily: "anxel",
      fill: 0xae8486,
      fontSize: Math.floor(sceneWidth / 50),
    },
  });
  const leftLabelBg = new Graphics();
  leftLabelBg.rect(0, 0, leftName.width, leftName.height).fill(lightBrown);
  leftLabelBg.pivot.set(leftLabelBg.width / 2, leftLabelBg.height / 2);
  leftLabelBg.position.set(leftLabelBg.width / 2, leftLabelBg.height / 2);
  leftLabelBg.scale.set(1.2);
  leftLabel.addChild(leftLabelBg, leftName);
  leftLabel.pivot.set(0, leftLabel.height / 2);
  leftLabel.position.set(sceneWidth * 15 / 100, DIALOGUE_Y_START);
  sceneFrame.addChild(leftLabel);

  const rightLabel = new Container();
  const rightName = new Text({
    text: right.name,
    style: {
      fontFamily: "anxel",
      fill: 0xae8486,
      fontSize: Math.floor(sceneWidth / 45),
    },
  });
  const rightLabelBg = new Graphics();
  rightLabelBg.rect(0, 0, rightName.width, rightName.height).fill(lightBrown);
  rightLabelBg.pivot.set(rightLabelBg.width / 2, rightLabelBg.height / 2);
  rightLabelBg.position.set(rightLabelBg.width / 2, rightLabelBg.height / 2);
  rightLabelBg.scale.set(1.2);
  rightLabel.addChild(rightLabelBg, rightName);
  rightLabel.pivot.set(rightLabel.width, rightLabel.height / 2);
  rightLabel.position.set(sceneWidth * 85 / 100, DIALOGUE_Y_START);
  sceneFrame.addChild(rightLabel);

  sceneFrame.addChild(dialogueText);
  updateDialogue();

  container.addChild(sceneFrame);
  return [container, () => {
    if (activeTickerHandler) {
      app.ticker.remove(activeTickerHandler);
    }
  }];
}
