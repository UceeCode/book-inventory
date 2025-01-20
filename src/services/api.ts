import axios from 'axios';

const API_URL = 'https://www.anapioficeandfire.com/api';

// Fetch all books across multiple pages
export const fetchBooks = async () => {
  const response = await axios.get(`${API_URL}/books?pageSize=50`);
  if (response.status === 200) {
    return response.data;
  }
  return [];
};


// Fetch characters based on search term and filters
export const fetchCharacter = async (
  searchTerm: string = '',
  characterName: string = '',
  characterCulture: string = ''
) => {
  const params = new URLSearchParams();

  if (searchTerm) params.append('search', searchTerm);
  if (characterName) params.append('name', characterName);
  if (characterCulture) params.append('culture', characterCulture);

  let page = 1;
  let characters: any[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(`${API_URL}/characters?${params.toString()}&page=${page}&pageSize=50`);
    if (response.status === 200 && response.data.length > 0) {
      characters = characters.concat(response.data);
      page++;
    } else {
      hasMore = false; 
    }
  }

  return characters; 
};
