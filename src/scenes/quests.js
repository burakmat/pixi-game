import { Container, Sprite } from "pixi.js";
import { createPixelButton } from "../components/Button";
import { startScene } from "../SceneManager";
import { Scenes } from "../enums";

export function Quests(app, { scene, sceneWidth, sceneHeight }) {
  const questBoard = new Container();
  const board = Sprite.from("questBoard");
  board.setSize(sceneHeight, sceneHeight);
  questBoard.addChild(board);
  questBoard.position.set(sceneWidth - questBoard.width, 0);

  const paper1 = Sprite.from("questPaper");
  paper1.setSize(sceneHeight / 5, sceneHeight / 5);
  paper1.anchor.set(0.5, 0.5);
  paper1.position.set(questBoard.width / 3, questBoard.height / 3);
  paper1.rotation = (Math.PI / 180) * 10;
  questBoard.addChild(paper1);

  const paper2 = Sprite.from("questPaper");
  paper2.setSize(sceneHeight / 5, sceneHeight / 5);
  paper2.anchor.set(0.5, 0.5);
  paper2.position.set((questBoard.width * 2) / 3, questBoard.height / 3);
  paper2.rotation = (Math.PI / 180) * -5;
  questBoard.addChild(paper2);

  const paper3 = Sprite.from("questPaper");
  paper3.setSize(sceneHeight / 5, sceneHeight / 5);
  paper3.anchor.set(0.5, 0.5);
  paper3.position.set(questBoard.width / 3, (questBoard.height * 2) / 3);
  paper3.rotation = (Math.PI / 180) * -2;
  questBoard.addChild(paper3);

  scene.addChild(questBoard);

  const backButton = createPixelButton(app, {
    labelText: "Back",
    textureSrc: "pixelButton",
    width: sceneWidth / 8,
    onClick: () => {
      startScene(app, { sceneKey: Scenes.MainMenu });
    },
  });
  backButton.position.set(sceneWidth / 20, sceneHeight / 10);
  scene.addChild(backButton);
}
