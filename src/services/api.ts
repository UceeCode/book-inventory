import axios from "axios";

// Base API URL
const API_URL = 'https://www.anapioficeandfire.com/api';

// Fetch books based on search term and filters
export const fetchBooks = async (
  page: number,
  searchTerm: string = '',
  publisher: string = '',
  name: string = '',
  isbn: string = '',
  authors: string = '',
  endDate: string = ''
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: '10', // Limit results per page
    search: searchTerm, // General search term
    publisher: publisher,
    name: name,
    isbn: isbn,
    authors: authors,
    endDate: endDate
  });

  const response = await axios.get(`${API_URL}/books?${params.toString()}`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch books');
  }

  return response.data;
};

// Fetch characters based on search term and filters
export const fetchCharacter = async (
  searchTerm: string = '',
  characterName: string = '',
  characterCulture: string = ''
) => {
  try {
    const params = new URLSearchParams({
      name: characterName,
      culture: characterCulture,
      search: searchTerm
    });

    const response = await axios.get(`${API_URL}/characters?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
