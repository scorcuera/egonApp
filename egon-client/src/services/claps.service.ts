import { ClapForm } from "../interfaces/clap.interface";

const clapService = {
    async getAllReceivedClaps(data: any) {
        const {id, authToken} = data;
        const response = await fetch(`http://localhost:3000/claps/receivedClaps/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const claps = await response.json();
        return claps;
    },
    async sendClaps(data: any) {
        const {claps, authToken} = data;
        const response = await fetch('http://localhost:3000/claps/', {
            method: 'POST',
            body: JSON.stringify(claps),
            headers: {
                'Authorization': `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        return result;
    }
}

export default clapService;