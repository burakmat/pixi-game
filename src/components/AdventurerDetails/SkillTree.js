import { Container, Sprite } from "pixi.js";

export function SkillTree(app, {renderWidth, renderHeight}) {
    const container = new Container()

    const skillTree = Sprite.from("skillTree")
    skillTree.setSize(renderWidth, renderHeight)

    container.addChild(skillTree)
    return container
}