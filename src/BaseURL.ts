import axios from 'axios';

const instance = axios.create({baseURL: 'http://vehicledoctor.us-east-2.elasticbeanstalk.com'});
export default instance