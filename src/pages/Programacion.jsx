import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Shows from '../components/Shows/Shows';
import PageTitle from '../components/PageTitle/PageTitle';
import './Programacion.scss';

function Programacion() {
  return (
    <div className="programacion">
      <Header />
      <PageTitle
        title="Programación"
        subtitle="Agosto-Septiembre"
        description="Quisque sodales nunc id justo eleifend ullamcorper. Maecenas malesuada feugiat neque, sit amet eleifend mauris consequat nec"
      />
      <div className="max-w-4xl m-auto p-8">
        <Shows />
      </div>
      <Footer />
    </div>
  );
}

export default Programacion;
