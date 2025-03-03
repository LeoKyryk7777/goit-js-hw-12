import axios from 'axios';

export async function getAllImages(message, page, perPage) {
  const baseURL = 'https://pixabay.com/api/';

  const params = {
    key: '49003886-a24f9c3a0fd607f8ed8b1fc56',
    q: message,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  };
  const result = await axios.get(baseURL, { params });

  return result.data;
}
