import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PagInicio, Login } from './components/index/Index';
import { Inicio } from './components/inicio/Inicio';
import { Footer, Header } from './components/encabezado/Main';
import { FiltroVehiculos } from './components/vehiculos/FiltroVehiculos';
import CompGeneralVehiculo from './components/vehiculos/CompGeneralVehiculo';
import Chofer from './components/chofer/Chofer';
import CompGeneralChofer from './components/chofer/CompGeneralChofer';

function ComponentesCombinados() {


  return (
    <>
      <PagInicio />
      <Login  />
    </>
  );
}
function PagPrincipal() {
  return (
    <>
    <Header />
    <Inicio />
    </>
  );
}

function FiltroVehiculo() {
  return (
    <>
    <Header/>
    <FiltroVehiculos />
    </>
  );
}

function CompGeneralVehiculos() {
  return (
    <>
    <Header />
    <CompGeneralVehiculo />
    </>
  );
}

function Choferes() {
  return (
    <>
    <Header />
    <CompGeneralChofer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponentesCombinados />} />
          <Route path="/inicio/:id" element={<PagPrincipal/>} />    
          <Route path="/filtrovehiculos" element={<FiltroVehiculo/>} />
          <Route path="/vehiculo/:placa" element={<CompGeneralVehiculos/>} /> 
          <Route path="/choferes/" element={<Choferes/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
