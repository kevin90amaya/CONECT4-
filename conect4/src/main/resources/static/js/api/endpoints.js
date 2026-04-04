import { API_CONFIG } from './config.js';

const BASE = API_CONFIG.BASE_URL;

export const ENDPOINTS = {
    GAME: `${BASE}/api/game`,
    BOARD: `${BASE}/api/board`,
    PLAYERS: `${BASE}/api/players`,
    GAME_MODES: `${BASE}/api/players/game-modes`,
    MODE: `${BASE}/api/players/mode`
};
