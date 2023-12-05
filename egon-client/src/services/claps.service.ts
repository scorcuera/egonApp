const clapService = {
    async getAllReceivedClaps(id: string) {
        const response = await fetch(`http://localhost:3000/claps/receivedClaps/${id}`);
        const claps = await response.json();
        return claps;
    }
}

export default clapService;