import React, { useState } from 'react';
import { analyse } from './async/axios';
import Dropdown from './Components/Dropdown';
import Chart from './Components/Chart';

function App() {
  const initState = {
    data: '',
    req: '',
  };
  const [data, setData] = useState(initState.data);
  const [req, setReq] = useState(initState.req);

  const loadData = (type, body) => {
    analyse(type, body).then(res => {
      setData(res);
      setReq({...body,type});
    });
  };

  return (
    <div>
      <Dropdown loadData={loadData} />
      <Chart data={data} req={req}/>
    </div>
  );
}

export default App;
