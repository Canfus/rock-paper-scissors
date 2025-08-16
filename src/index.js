import { Canvas } from "./entities/canvas.js";
import { Settings } from "./utils/apply-settings.js";
import { createElements } from "./utils/create-elements.js";

const canvas = new Canvas();
const objects = createElements(canvas);

let GAME_STATUS = "PLAYING";

function init() {
  canvas.backgroundColor = Settings.BACKGROUND_COLOR;
  canvas.width = "100vw";
  canvas.height = "100vh";

  main();
}

function draw(elements) {
  const { context } = canvas;
  const { rock, scissors, paper } = elements;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const objs = Object.values(elements);

  const isFinished = objs.filter((obj) => obj.length).length <= 1;

  if (isFinished) {
    const { context, width, height } = canvas;

    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.fillText(`Победитель: ${objects[0].value}`, width / 2, height / 2);

    GAME_STATUS = "FINISHED";

    return;
  }

  objects.forEach((object) => {
    context.font = `${Settings.SIZE}px Arial`;
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.fillText(object.label, object.position.x, object.position.y + 4);
  });

  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.textAlign = "start";
  context.fillText(`Камень: ${rock.length}`, 10, 20);
  context.fillText(`Ножницы: ${scissors.length}`, 10, 60);
  context.fillText(`Бумага: ${paper.length}`, 10, 40);
}

function update() {
  objects.forEach((object) => {
    object.move(canvas.width, canvas.height, objects);
  });
}

function main() {
  const elements = objects.reduce(
    (acc, item) => {
      if (!item || !acc[item.value]) return acc;

      acc[item.value].push(item);
      return acc;
    },
    { rock: [], paper: [], scissors: [] },
  );

  update();
  draw(elements);

  if (GAME_STATUS !== "FINISHED") {
    requestAnimationFrame(main);
  }
}

init();
