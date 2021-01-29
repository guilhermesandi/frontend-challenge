import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/name/aruba?fullText=true',
});

export default api;
