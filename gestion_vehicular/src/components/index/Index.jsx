  import React, { useEffect, useState } from 'react';
  import '../../styles/index.css';
  import imagen1 from '../../img/LogoGestionVehicular.png';
  import gps from '../../img/ubitec-vehículos-por-GPS.jpg';
  import chofer from '../../img/chofer.jpg';
  import flota from '../../img/flota.jpg';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { useParams } from 'react-router-dom'; 


  const PagInicio = () => {

    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener("scroll", function () {
      let header = document.querySelector("header");
      header.classList.toggle("abajo", window.scrollY > 0);
    })


    useEffect(() => {
      // Encapsula toda la lógica del carrusel dentro de una función
      function initCarousel() {
        let nextDom = document.getElementById('next');
        let prevDom = document.getElementById('prev');
        let carouselDom = document.querySelector('.carousel');
        let SliderDom = carouselDom.querySelector('.carousel .list');
        let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        let timeRunning = 100;
        let timeAutoNext = 5000;
        let runTimeOut;
        let runNextAuto;

        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

        nextDom.onclick = function () {
          showSlider('next');
        }

        prevDom.onclick = function () {
          showSlider('prev');
        }
        function showSlider(type) {
          let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
          let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
        
          if (type === 'next') {
            if (SliderItemsDom.length > 0 && thumbnailItemsDom.length > 0) {
              SliderDom.appendChild(SliderItemsDom[0]);
              thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
              carouselDom.classList.add('next');
            }
          } else {
            if (SliderItemsDom.length > 0 && thumbnailItemsDom.length > 0) {
              SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
              thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
              carouselDom.classList.add('prev');
            }
          }
        
          clearTimeout(runTimeOut);
          runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
          }, timeRunning);
        
          clearTimeout(runNextAuto);
          runNextAuto = setTimeout(() => {
            nextDom.click();
          }, timeAutoNext);
        }
      }

      initCarousel();


    }, []); 
    return (
      <>
        <header className="princip">
          <section className="logoNavPrincip">
            <a href="/" className="logo" id="header">Gestión</a>
            <img className="logoEmpresaPrincip" src={imagen1} alt="Logo Gestion Vehicular" />
            <a href="/" className="logo" id="header"> Vehicular</a>
          </section>
          <nav className="navPrincip">
            <ul>
              <li><a href="#" onClick={() => scrollToSection('inicio')}>Inicio</a></li>
              <li><a href="#somos" onClick={() => scrollToSection('somos')}>Nosotros</a></li>
              <li><button id="show-login" className="log-btn">Log In</button></li>
            </ul>
          </nav>
        </header>

        <section className="window-container">
          <section className="carousel">

            <section className="list">
              <section className="item">
                <img src={gps} alt="GPS" className="imgThumbnail" />
                <section className="contentAll">
                  <section className="author"></section>
                  <section className="title">GESTIÓN DE</section>
                  <section className="topic">FLOTAS</section>
                  <section className="des">


                    <p className="first-p">La gestión de flotas es un componente esencial para las empresas que dependen del
                      transporte para llevar
                      a cabo sus operaciones de manera eficiente. </p>

                    <p>Nuestra solución integral de gestión de flotas está diseñada
                      para ofrecer un control total sobre los activos móviles, maximizando la eficiencia operativa y mejorando
                      la rentabilidad.</p>

                  </section>
                </section>
              </section>
              <section className="item">
                <img src={chofer} alt="Chofer" className="imgThumbnail" />
                <section className="contentAll">
                  <section className="author"></section>
                  <section className="title">GESTIÓN DE</section>
                  <section className="topic">CHOFERES</section>
                  <section className="des">
                    <p className="first-p">Mantenemos perfiles detallados de cada chofer en la plataforma,
                      incluyendo información personal, historial de conducción y calificaciones.
                      Esto facilita la asignación de tareas específicas según las habilidades y
                      experiencia de cada conductor.</p>

                    <p>La plataforma permite la asignación de tareas de manera inteligente,
                      considerando la ubicación actual de los conductores, su historial de
                      desempeño y las necesidades operativas. Esto asegura una asignación
                      eficiente y equitativa de las responsabilidades.</p>
                  </section>
                </section>
              </section>
              <section className="item">
                <img src={flota} alt="Flotas" className="imgThumbnail" />
                <section className="contentAll">
                  <section className="author"></section>
                  <section className="title">GESTIÓN DE</section>
                  <section className="topic">VEHÍCULOS</section>
                  <section className="des">
                    <p className="first-p">Cada vehículo en la flota cuenta con un registro detallado que incluye
                      información sobre mantenimientos, reparaciones y revisiones técnicas.
                      Esto ayuda a prevenir fallas inesperadas y prolonga la vida útil de los vehículos.</p>

                    <p>Facilita la coordinación de servicios de mantenimiento externos al integrar la
                      solución con talleres y proveedores de servicios. Optimice la gestión de citas y
                      reduzca el tiempo de inactividad.</p>
                  </section>
                </section>
              </section>

            </section>
              <section className="item">
                <img src={chofer} alt="Chofer" />
                <section className="contentAll">
                  <section className="title">
                    <p>Gestión Chofer</p>
                  </section>
                </section>
              </section>
            <section className="thumbnail">
              <section className="item">
                <img src={gps} alt="GPS" />
                <section className="contentAll">
                  <section className="title">
                    <p>Gestión Flotas</p>
                  </section>
                </section>
              </section>
              <section className="item">
                <img src={chofer} alt="Chofer" />
                <section className="contentAll">
                  <section className="title">
                    <p>Gestión Chofer</p>
                  </section>
                </section>
              </section>
              <section className="item">
                <img src={flota} alt="Flota" />
                <section className="contentAll">
                  <section className="title">
                    <p>Gestión Vehículos</p>
                  </section>
                </section>
              </section>
            </section>


            <section className="arrows">
              <button id="prev">&#60;</button>
              <button id="next">&#62;</button>
            </section>

            <section className="time"></section>
          </section>
          <section className="somos" id="somos">
            <article className="texto" id="about">
              <h2 className="tituloSeccion">¿Quiénes Somos?</h2>
              <p className="textoSeccion">
                En la vanguardia del sector de gestión vehicular de transporte
                público, nos presentamos como una empresa comprometida con la
                eficiencia, la seguridad y la calidad en cada trayecto. Nos
                especializamos en la administración integral de flotas de transporte
                público, con el objetivo primordial de brindar un servicio excepcional
                a la comunidad que servimos.
              </p>
              <p className="textoSeccion">
                Reconocemos la importancia crítica de la seguridad y la productividad
                en la gestión de vehículos y choferes. Por ello, nuestra plataforma
                integra funciones avanzadas de seguimiento, mantenimiento preventivo y
                gestión de conductores, asegurando no solo la eficiencia operativa,
                sino también el cumplimiento de estándares de seguridad y regulaciones
                del sector.
              </p>
            </article>
            <img src={flota} alt="gestion de flota" className="imgSomos" />
          </section>

          <section className="bgSection">
            <article className="slogan">
              <h2>
                Transformando la gestión del transporte a través de la tecnología
              </h2>
              <p className="textSlogan">
                Nuestra plataforma de gestión de transporte le permite a las empresas
                de transporte y logística, controlar y optimizar sus operaciones de
                transporte, reduciendo costos y aumentando la productividad.
              </p>
            </article>
          </section>
        </section>
      </>
    );
  }

  const Login = () => {

    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();

      setErrorMessage('');
      axios.post('http://localhost:8000/login', { email, password })
      
        .then(response => {
          console.log(response);
          const userId = response.data.userId; 
          setErrorMessage('');
          setTimeout(() => {
            setErrorMessage('Iniciando sesión...');
          }, 100);
          setTimeout(() => {
          
          navigate(`/inicio/${userId}`);
          }, 1800);
          
        })
        .catch(error => {
          console.error(error);
          if (error.response.status === 400) {
            setTimeout(() => {
            setErrorMessage('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
            }, 500);
          }
        });
    }
    

    useEffect(() => {
      const WindowContainer = document.querySelector('.window-container');
      

      const showLogin = () => {
        const popup = document.querySelector(".popup");
        if (popup) {
          popup.classList.add("active");
          document.body.style.overflow = 'hidden';
          WindowContainer.style.filter = "blur(5px) grayscale(50%)";
        }
      };

      const closeLogin = () => {
        const popup = document.querySelector(".popup");
        if (popup) {
          popup.classList.remove("active");
          document.body.style.overflow = 'auto';
          WindowContainer.style.filter = "blur(0px)";
        }
      };

      document.querySelector("#show-login")?.addEventListener("click", showLogin);
      document.querySelector(".popup .close-btn")?.addEventListener("click", closeLogin);

      return () => {
        document.querySelector("#show-login")?.removeEventListener("click", showLogin);
        document.querySelector(".popup .close-btn")?.removeEventListener("click", closeLogin);
      };
    }, []);




    return (
      <section className="popup" id="popup-1">
        <section className="close-btn">X</section>
        <section className="contentAll">
          <h2>Log in</h2>
          <form onSubmit={handleSubmit} method="post">
            <section className="input-field">
              <label htmlFor="email">Correo</label>
              <input type="text" id="username" name="username" placeholder="Correo" className="validate" value={email} onChange={e => setEmail(e.target.value)} required />
            </section>
            <section className="input-field">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" placeholder="Contraseña" className="validate" value={password} onChange={e => setPassword(e.target.value)} required />
            </section>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button className="btn">Ingresar</button>
          </form>
        </section>
      </section>
    );
  };


  export { PagInicio, Login }; 