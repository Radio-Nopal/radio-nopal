import React, { useState, useEffect } from 'react';
import './Shows.scss';

function Shows() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://radionopal-cms.herokuapp.com/programas')
      .then((response) => response.json())
      .then((jsonResponse) => setData(jsonResponse))
      .catch((err) => {
        console.error('Oh no, error occured: ', err);
      });
  }, []);
  console.log(data);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((item) => (
        <div key={item.nombre} className="show">
          <h1 className="show__title text-4xl">{item.nombre}</h1>
          <span className="show__host">
            Por:
            {item.host}
          </span>
          <h2 className="show__description text-gray-400">{item.descripcion}</h2>
          <img src={item.imagen[0].url} alt={item.descripcion} />
        </div>
      ))}
    </div>
  );
}

export default Shows;
