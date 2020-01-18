import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevFrom from './components/DevForm';
import DevItem from './components/DevItem'; 

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(newDev) {
    const response = await api.post('/devs', newDev);
    setDevs([...devs, response.data]);
  }
  
  return (
    <div>
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevFrom onSubmit={handleAddDev}/>
        </aside>

        <main>
          <ul>
          { devs.map(dev => <DevItem key={dev._id} dev={dev} />) }
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;