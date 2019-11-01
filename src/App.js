import React, { useState } from 'react';
import { analyse } from './async/axios';
import Dropdown from './Components/Dropdown';
import Chart from './Components/Chart';

function App() {
  const initState = {
    data: '',
  };
  const [data, setData] = useState(initState.data);

  const loadData = (type, body) => {
    analyse(type, body).then(res => {
      setData(res);
    });
  };

  return (
    <div>
      <Dropdown loadData={loadData} />
      <Chart data={data} />
    </div>
  );
}

export default App;
