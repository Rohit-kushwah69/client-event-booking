import axios from 'axios';

const API = axios.create({
  baseURL: 'https://server-event-booking.onrender.com',
  withCredentials: true, // for cookies
});

export default API;
