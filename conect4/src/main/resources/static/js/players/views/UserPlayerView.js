import { ENDPOINTS } from "../../api/endpoints.js";

class UserPlayerView {

async playTurn() {
    const col = await this.getColumnFromClick();       
    return await fetch(ENDPOINTS.RESOLVE_TURN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: col })
    });
}

getColumnFromClick() {
    return new Promise((resolve) => {
      const handler = (event) => {
        document.removeEventListener("board-column-selected", handler);
        resolve(event.detail.value);
      };
      document.addEventListener("board-column-selected", handler);
    });
  }
}
export default UserPlayerView;