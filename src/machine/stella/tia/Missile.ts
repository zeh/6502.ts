import {decodesMissile} from './drawCounterDecodes';

import Player from './Player';

const enum Count {
    renderCounterOffset = -4
}

class Missile {

    constructor(private _collisionMask: number) {
        this.reset();
    }

    reset(): void {
        this.color = 0xFFFFFFFF;
        this._width = 1;
        this._enabled = false;
        this._counter = 0;
        this._rendering = false;
        this._renderCounter = Count.renderCounterOffset;
        this._moving = false;
        this._hmmClocks = 0;
        this._decodes = decodesMissile[0];
        this._resmp = -1;
        this._enam = false;
    }

    enam(value: number): void {
        this._enam = (value & 2) > 0;
        this._enabled = this._enam && (this._resmp === 0);
    }

    hmm(value: number): void {
        // Shift and flip the highest bit --- this gives us the necessary movement to the right
        this._hmmClocks = (value >>> 4) ^ 0x8;
    }

    resm(hblank: boolean): void {
        this._counter = hblank ? 159 : 157;
    }

    resmp(value: number, player: Player) {
        const resmp = value & 0x02;

        if (resmp === this._resmp) {
            return;
        }

        this._resmp = resmp;

        if (resmp > 0) {
            this._enabled = false;
        } else {
            this._enabled = this._enam;
            this._counter = player.getRespClock();
        }
    }

    nusiz(value: number): void {
        this._width = this._widths[(value & 0x30) >>> 4];
        this._decodes = decodesMissile[value & 0x07];

        if (this._rendering && this._renderCounter >= this._width) {
            this._rendering = false;
        }
    }

    startMovement(): void {
        this._moving = true;
    }

    movementTick(clock: number, apply: boolean): boolean {
        // Stop movement only if the clock matches exactly --- this is crucial for cosmic ark type hacks
        if (clock === this._hmmClocks) {
            this._moving = false;
        }

        if (this._moving && apply) {
            this.render();
            this.tick();
        }

        return this._moving;
    }

    render(): void {
        this.collision = (this._rendering && this._renderCounter >= 0 && this._enabled) ? this._collisionMask : 0;
    }

    tick(): void {
        if (this._decodes[this._counter]) {
            this._rendering = true;
            this._renderCounter = Count.renderCounterOffset;
        } else if (this._rendering && ++this._renderCounter >= this._width) {
            this._rendering = false;
        }

        if (++this._counter >= 160) {
            this._counter = 0;
        }
    }

    getPixel(colorIn: number): number {
        return this.collision > 0 ? this.color : colorIn;
    }

    color = 0xFFFFFFFF;
    collision = 0;

    private _enabled = false;
    private _enam = false;
    private _resmp = -1;

    private _hmmClocks = 0;
    private _counter = 0;
    private _moving = false;
    private _width = 1;

    private _rendering = false;
    private _renderCounter = Count.renderCounterOffset;

    private _decodes: Uint8Array;
    private _widths = new Uint8Array([1, 2, 4, 8]);
}

export default Missile;
