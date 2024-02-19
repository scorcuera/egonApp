const clapService = {
    async getAllReceivedClaps(id: number) {
        const response = await fetch(`http://localhost:3000/claps/receivedClaps/${id}`);
        const claps = await response.json();
        return claps;
    },
    async sendClaps(claps) {
        const response = await fetch('http://localhost:3000/claps/', {
            method: 'POST',
            body: JSON.stringify(claps),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    }
}

export default clapService;