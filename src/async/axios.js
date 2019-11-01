import axios from 'axios';
import paths from '../utils/consts';

export const getDrivers = async () => {
  try {
    const res = await axios.get(`${paths.main}${paths.drivers}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const analyse = async (type, body) => {
  try {
    const res = await axios.post(`${paths.main}${paths[type]}`, body);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};
