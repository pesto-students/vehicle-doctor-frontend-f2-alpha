import axios from 'axios';

const instance = axios.create({baseURL: 'https://vehicledoctor.us-east-2.elasticbeanstalk.com'});
export default instance