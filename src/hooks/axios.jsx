import axios from 'axios';
import { constants } from '../utility/constants';



const axiosPrivate = axios.create({
  baseURL: constants.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});





export {
  axiosPrivate,


};
