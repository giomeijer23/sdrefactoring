import Dungeon from './Dungeon.js';

const game: Dungeon = new Dungeon(document.getElementById('game') as HTMLCanvasElement);
window.addEventListener('load', () => {
  game.start();
});
