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
    SET_NUMBER_OF_PLAYERS: `${BASE}/api/setting-menu/number-of-players`,
    SET_LIST_PLAYERS: `${BASE}/api/setting-menu/list-players`,
    RESET_PLAYERS: `${BASE}/api/setting-menu/reset-players`,
    
    PLAYERS: `${BASE}/api/players`,
    CURRENT_MODE: `${BASE}/api/players/current-mode`,
    GAME_MODES: `${BASE}/api/players/game-modes`,
    MODE: `${BASE}/api/players/mode`,
    LIST_PLAYERS: `${BASE}/api/players/list-players`,
    CURRENT_PLAYER: `${BASE}/api/players/current-player`,
    NUMBER_OF_PLAYERS: `${BASE}/api/players/number-of-players`,

    TOGGLE_COLUMN: `${BASE}/api/ToggleButton/column`,
    TOGGLE_ROW: `${BASE}/api/ToggleButton/row`,
    TOGGLE_RESET: `${BASE}/api/ToggleButton/reset`
    
};
