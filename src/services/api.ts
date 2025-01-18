import axios from "axios";

const API_URL = 'https://www.anapioficeandfire.com/api';

export const fetchBooks = async (page: number) => {
    try {
        const response = await axios.get(`${API_URL}/books?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const fetchCharacter = async (searchTerm: string) => {
    try {
        const response = await axios.get(`${API_URL}/characters?name=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
};