// services/deepl.js
import axios from 'axios';

const apiKey = '292f9890-f7b0-4f5b-8283-e3d940d06e98:fx';

const apiClient = axios.create({
  baseURL: 'https://api.deepl.com/v2',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default {
  translateText(text, targetLang) {
    return apiClient.post('/translate', `auth_key=${apiKey}&text=${text}&target_lang=${targetLang}`);
  },
};
