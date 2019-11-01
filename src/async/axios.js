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

export const yearlyDirect = async body => {
  try {
    const res = await axios.post(`${paths.main}${paths.yearlyDirect}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const yearlyTeammate = async body => {
  try {
    const res = await axios.post(`${paths.main}${paths.yearlyTeammate}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const eventsDirect = async body => {
  try {
    const res = await axios.post(`${paths.main}${paths.eventsDirect}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const eventsTeammate = async body => {
  try {
    const res = await axios.post(`${paths.main}${paths.eventsTeammate}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};
