import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getDrivers } from '../async/axios';
import { years, sessions } from '../utils/consts';

const Dropdown = ({ loadData }) => {
  // State and state setters
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

  // grab the driver list on mount to populate dropdowns
  useEffect(() => {
    getDrivers().then(res => {
      setDrivers(res);
    });
  }, []);

  // send requests to backend
  const fireAnalysis = () => {
    if (comparisonType === 'teammate') {
      if (period === 'events') {
        // eventsTeammate
        loadData('eventsTeammate', {
          target: driverA,
          year: year,
          session: sessionType,
        });
      } else {
        // yearlyTeammate
        loadData('yearlyTeammate', {
          target: driverA,
        });
      }
    } else {
      if (period === 'events') {
        // eventsDirect
        loadData('eventsDirect', {
          target: driverA,
          competitor: driverB,
          year: year,
          session: sessionType,
        });
      } else {
        // yearlyDirect
        loadData('yearlyDirect', {
          target: driverA,
          competitor: driverB,
        });
      }
    }
  };

  // change state upon dropdown changes
  const handleDropdownChange = (e, type) => {
    if (type === 'ComparisonType') {
      setPeriod('');
      if (e.target.value === 'teammate') {
        setDriverB('');
      }
    }
    if (type === 'Period' && e.target.value === 'yearly') {
      setYear('');
      setSessionType('');
    }
    eval(`set${type}`)(e.target.value);
  };

  return (
    <DropdownWrapper>
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
          <option value="yearly">Yearly Cumulative</option>
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
            {years.map(year => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            name="sesionType"
            onChange={e => handleDropdownChange(e, 'SessionType')}
          >
            <option diasble="true" value="">
              select a session type
            </option>
            {sessions.map(session => (
              <option value={session} key={session}>
                {session}
              </option>
            ))}
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
        <button onClick={fireAnalysis}>Run</button>
      ) : null}
    </DropdownWrapper>
  );
};

// Styled Components
const DropdownWrapper = styled.div`
  select {
    font-size: 0.9em;
    width: 200px;
    height: 50px;
    border: none;
    margin: 2px;
    cursor: pointer;
    font-family: 'Noto Sans', sans-serif;
    color: rgb(58, 58, 60);
  }

  button {
    font-size: 1em;
    height: 50px;
    width: 50px;
    border: none;
    margin: 2px;
    background: rgb(195, 255, 255);
    border-radius: 2px;
    cursor: pointer;
    font-family: 'Noto Sans', sans-serif;
    color: rgb(58,58,60);
  }
`;

export default Dropdown;
