export const getLeads = async (query: string = '') => {
    try {
        const statusResponse = await fetch(`http://localhost:3000/api/leads${query !== '' ? "?query=" + query : ''}`);
        return await statusResponse.json();
    } catch (error) {
        console.log(error)
    }
}