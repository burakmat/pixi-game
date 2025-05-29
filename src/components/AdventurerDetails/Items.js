import { Container, Graphics, Sprite } from "pixi.js";
import { lightBrown } from "../../colors";

export function Items(app, { renderWidth, renderHeigth }) {
    const container = new Container()
    const bg = new Graphics()
    bg.rect(0, 0, renderWidth, renderHeigth).fill(lightBrown)
    container.addChild(bg)

    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 8; ++j) {
            const slot = Sprite.from("itemSlot")
            slot.setSize(renderWidth / 8)
            slot.position.set(j * slot.width, i * slot.height)
            container.addChild(slot)
        }
    }    

    return container
}
