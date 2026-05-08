import { API_CONFIG } from './config.js';

const BASE = API_CONFIG.BASE_URL;

export const ENDPOINTS = {
    GAME: `${BASE}/api/game`,
    RESOLVE_TURN: `${BASE}/api/game/resolve-turn`,
    RESET: `${BASE}/api/game/reset`,
    
    BOARD: `${BASE}/api/board`,
    BOARD_CREATE: `${BASE}/api/board/create`,
    BOARD_RESET: `${BASE}/api/board/reset`,

    CONECT_TO_WIN: `${BASE}/api/setting-menu/conect-to-win`,
    ROWS: `${BASE}/api/setting-menu/rows`,
    COLUMNS: `${BASE}/api/setting-menu/columns`,
    
    PLAYERS: `${BASE}/api/players`,
    GAME_MODES: `${BASE}/api/players/game-modes`,
    MODE: `${BASE}/api/players/mode`,
    LIST_PLAYERS: `${BASE}/api/players/list-players`,
    CURRENT_PLAYER: `${BASE}/api/players/current-player`,
};
