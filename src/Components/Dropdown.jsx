import React, { useState, useEffect } from 'react';
import { getDrivers } from '../async/axios';

const Dropdown = () => {
  const initState = {
    drivers: [],
    driverA: '',
    driverB: '',
    comparisonType: '',
    period: '',
    year: '',
    sessionType: '',
  };

  const [drivers, setDrivers] = useState(initState.drivers);
  const [driverA, setDriverA] = useState(initState.driverA);
  const [driverB, setDriverB] = useState(initState.driverB);
  const [comparisonType, setComparisonType] = useState(
    initState.comparisonType,
  );
  const [period, setPeriod] = useState(initState.period);
  const [year, setYear] = useState(initState.year);
  const [sessionType, setSessionType] = useState(initState.sessionType);

  useEffect(() => {
    // get list of drivers on mount
    getDrivers().then(res => {
      setDrivers(res);
    });
  }, []);

  const handleDropdownChange = (e, type) => {
    if (type === 'ComparisonType' && e.target.value === 'teammate') {
      setDriverB('');
    }
    eval(`set${type}`)(e.target.value);
  };

  return (
    <div>
      {drivers.length ? (
        <>
          <select
            name="driverA"
            onChange={e => handleDropdownChange(e, 'DriverA')}
          >
            <option diasble="true" value="">
              select a driver
            </option>
            {drivers.map(driver => (
              <option value={driver} key={driver}>
                {driver}
              </option>
            ))}
          </select>
          <select
            name="comparisonType"
            onChange={e => handleDropdownChange(e, 'ComparisonType')}
          >
            <option disable="true" value="">
              select a comparison
            </option>
            <option value="teammate">Teammate</option>
            <option value="other">Other Driver</option>
          </select>
        </>
      ) : (
        <div>Loading...</div>
      )}
      {driverA && comparisonType === 'other' ? (
        <select
          name="driverB"
          onChange={e => handleDropdownChange(e, 'DriverB')}
        >
          <option diasble="true" value="">
            select a competitor
          </option>
          {drivers
            .filter(driver => driver !== driverA)
            .map(driver => (
              <option value={driver} key={driver}>
                {driver}
              </option>
            ))}
        </select>
      ) : null}
      {comparisonType === 'teammate' || driverB ? (
        <select name="period" onChange={e => handleDropdownChange(e, 'Period')}>
          <option diasble="true" value="">
            select a period
          </option>
          <option value="events">Event Specific</option>
          <option value="yearly">Yearly Average</option>
        </select>
      ) : null}
      {period === 'events' &&
      ((comparisonType === 'other' && driverB) ||
        comparisonType === 'teammate') ? (
        <>
          <select name="year" onChange={e => handleDropdownChange(e, 'Year')}>
            <option diasble="true" value="">
              select a year
            </option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2016">2017</option>
            <option value="2016">2018</option>
            <option value="2016">2019</option>
          </select>
          <select
            name="sesionType"
            onChange={e => handleDropdownChange(e, 'SessionType')}
          >
            <option diasble="true" value="">
              select a session type
            </option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="Qu">Qu</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Race">Race</option>
          </select>
        </>
      ) : null}
      {(driverA && comparisonType === 'teammate' && period === 'yearly') ||
      (driverA &&
        comparisonType === 'teammate' &&
        period === 'events' &&
        year &&
        sessionType) ||
      (driverA &&
        comparisonType === 'other' &&
        driverB &&
        period === 'yearly') ||
      (driverA &&
        comparisonType === 'other' &&
        driverB &&
        period === 'events' &&
        year &&
        sessionType) ? (
        <button>Run</button>
      ) : null}
    </div>
  );
};

export default Dropdown;
