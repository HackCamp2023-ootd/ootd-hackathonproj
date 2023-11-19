const API_BASE_URL = 'http://yourapi.com';

export const scanOutfit = async (outfitData) => {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: outfitData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};