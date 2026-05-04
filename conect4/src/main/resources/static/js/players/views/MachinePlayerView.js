import { ENDPOINTS } from "../../api/endpoints.js";

class MachinePlayerView {

async playTurn() {
    const response = await fetch(ENDPOINTS.RESOLVE_TURN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: 0 })
    });
    return await response.json();
}
 


}
export default MachinePlayerView;