import axios from 'axios';

const instance = axios.create({baseURL: 'https://vehicledr.online/'});
export default instance