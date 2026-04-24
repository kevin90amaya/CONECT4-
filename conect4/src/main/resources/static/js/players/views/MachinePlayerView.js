import { ENDPOINTS } from "../../api/endpoints.js";

class MachinePlayerView {

async playTurn() {
    return await fetch(ENDPOINTS.RESOLVE_TURN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}) 
    });
  }
 


}
export default MachinePlayerView;