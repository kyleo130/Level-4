import { Sprite } from "./sprite.js"
export const Door = function(ctx, x, y) {

    const sequences = { 
        closed:  { x: 0, y: 512, width: 64, height: 32, count: 1, timing: 100, loop: false },
        open: { x: 128, y: 512, width: 64, height: 32, count: 12, timing: 100, loop: false }
     };

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.closed)
          .useSheet("asset/Props and Items/props and items x1.png");

    const close = function() {
        sprite.setSequence(sequences.closed);
    };

    const open = function() {
        sprite.setSequence(sequences.open);
    };

    return {
        close: close,
        open: open,
        draw: sprite.draw,
        update: sprite.update
    };
};