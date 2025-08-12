import { Container, Texture, Sprite, Graphics } from "pixi.js";

const MARKER_POSITIONS = [
  [17, -3],
  [36, -3],
  [55, -3],
];
export const markers = [];

export function createBookBackground({renderWidth, renderHeight}, setActiveTab) {
  //, { adventurerIdentifier }
  const container = new Container();


  const markerTexture = Texture.from("marker");
  markerTexture.source.scaleMode = "nearest";

  const bookCover = Sprite.from("bookCover");
  bookCover.texture.source.scaleMode = "nearest";
  const bookPageLeft = Sprite.from("bookPageLeft");
  bookPageLeft.texture.source.scaleMode = "nearest"
  const bookPageRight = Sprite.from("bookPageRight");
  bookPageRight.texture.source.scaleMode = "nearest"
  bookPageLeft.position.set(8, 7);
  bookPageRight.position.set(112, 7);
  container.addChild(bookCover);
  container.addChild(bookPageLeft);
  container.addChild(bookPageRight);

  for (let i = 0; i < MARKER_POSITIONS.length; ++i) {
    const marker = Sprite.from(markerTexture);
    marker.position.set(MARKER_POSITIONS[i][0], MARKER_POSITIONS[i][1]);
    marker.eventMode = "static";
    marker.cursor = "pointer";
    marker.mask = new Graphics();
    marker.mask.rect(0, 0, markerTexture.width, markerTexture.height).fill();
    marker.mask.position.set(
      MARKER_POSITIONS[i][0],
      MARKER_POSITIONS[i][1] - 4
    );
    marker.on("click", () => {
      setActiveTab(i);
    });
    markers.push(marker);
    container.addChild(marker);
    container.addChild(marker.mask);
  }


  container.setSize(renderWidth, renderHeight)
  return container;
}

export function destroyBookBackground() {
  markers.length = 0;
}
