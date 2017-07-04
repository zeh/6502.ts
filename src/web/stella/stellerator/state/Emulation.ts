/*
 *   This file is part of 6502.ts, an emulator for 6502 based systems built
 *   in Typescript.
 *
 *   Copyright (C) 2014 - 2017 Christian Speckner & contributors
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License along
 *   with this program; if not, write to the Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import EmulationServiceInterface from '../../service/EmulationServiceInterface';
import Cartridge from '../model/Cartridge';

export default class EmulationState implements Changeset {

    constructor(changes?: Changeset, old?: EmulationState) {
        Object.assign(this, old, changes);
    }

    cartridge: Cartridge = null;
    emulationState = EmulationServiceInterface.State.stopped;

    difficultyPlayer0 = true;
    difficultyPlayer1 = true;
    tvMode = false;

    enforceRateLimit = true;

    frequency = 0;
    gamepadCount = 0;

    pausedByUser = false;
}

interface Changeset {
    cartridge?: Cartridge;
    emulationState?: EmulationServiceInterface.State;

    difficultyPlayer0?: boolean;
    difficultyPlayer1?: boolean;
    tvMode?: boolean;

    enforceRateLimit?: boolean;

    frequency?: number;
    gamepadCount?: number;

    pausedByUser?: boolean;
}
