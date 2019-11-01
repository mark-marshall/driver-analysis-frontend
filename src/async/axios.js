import axios from 'axios';
import paths from '../utils/consts';

export const getDrivers = async () => {
  try {
    const res = await axios.get(`${paths.main}${paths.drivers}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
