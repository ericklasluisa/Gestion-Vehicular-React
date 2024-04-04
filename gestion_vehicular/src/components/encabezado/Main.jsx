import React from 'react'
import { Link } from 'react-router-dom';
import LogoInsta from '../../img/LogoInsta.png'
import LogoFacebook from '../../img/LogoFacebook.png'
import LogoTwitter from '../../img/LogoTwitter.png'
import LogoEmpresa from '../../img/LogoGestionVehicular.png'
import LogoCerrarSesion from '../../img/LogoCerrarSesion.png'
import '../../styles/main.css'
import { useParams } from 'react-router'


const links = [
  

  {
    name: "Vehiculos",
    href: "/filtrovehiculos",
  },
  {
    name: "Choferes",
    href: "/choferes",
  },
];
export const Header = () => {
  
  return (
    <header className="inicioHeader">
      <section className="logoNav">
        <Link to={`/inicio/1`} className="logo" id="header">Gestión</Link>
        <img className="logoEmpresa" src={LogoEmpresa} alt="Logo Gestion Vehicular" />
        <Link to={`/inicio/1`} className="logo" id="header"> Vehicular</Link>
      </section>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}><Link to={link.href}>{link.name}</Link></li>
          ))}
          <li><Link to="/"><img className='logoSalir' src={LogoCerrarSesion} alt="CerrarSesion" /></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export const Footer = () => {
  return (
    <footer>
      <p>© Sistema de Gestión Vehicular</p>
      <a href="https://www.facebook.com/zuck?locale=es_LA"><img width="2%" src={LogoFacebook} alt="LogoInsta" /></a>
      <a href="https://www.instagram.com/zuck/"><img width="2%" src={LogoInsta} alt="LogoInsta" /></a>
      <a href="https://twitter.com/MarkCrtlC"><img width="2%" src={LogoTwitter} alt="LogoInsta" /></a>
    </footer>
  )
}

const Main = { Footer, Header };

export default Main;