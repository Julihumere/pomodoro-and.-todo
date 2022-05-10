import Link from "next/link";
import Image from "next/image";
import fondo from "../public/Fondo.jpg";
import stylesWallpaper from "../styles/Wallpaper.module.css";
import styles from "../styles/Pomodoro.module.css";
import { FaHome, FaPlay, FaPause, FaStop } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
/////////////////////
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Howl, Howler } from "howler";

export default function Pomodoro() {
  const [pausa, setpausa] = useState(true);
  const [mode, setMode] = useState("work");
  let [segundos, setSegundos] = useState(0);
  const pausaRef = useRef(pausa);
  const segundosRef = useRef(segundos);
  const modeRef = useRef(mode);
  const [repeticiones, setRepeticiones] = useState(0);
  const repeticionesRef = useRef(repeticiones);

  const [time, setTime] = useState([]);
  const [input, setInput] = useState({
    mensaje: "",
    minutos: 0,
    segundos: segundos,
    descansoMinutos: 0,
  });

  const handlePlay = () => {
    setpausa(false);
    pausaRef.current = false;
  };

  const handlePause = () => {
    setpausa(true);
    pausaRef.current = true;
  };

  const handleReset = () => {
    setInput({
      mensaje: "",
      minutos: 0,
      segundos: 0,
      descansoMinutos: 0,
    });
    time.pop();
    setpausa(true);
    setSegundos(0);
    segundosRef.current = 0;
    setMode("work");
    modeRef.current = "work";
    setRepeticiones(0);
    repeticionesRef.current = 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time.length === 1) {
      alert(
        "No puedes crear otro sin antes terminar en el que estas o cancelarla"
      );
    } else {
      setTime([...time, input]);
    }
    setpausa(true);
    pausaRef.current = true;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const reduccionSegundos = () => {
    segundosRef.current--;
    setSegundos(segundosRef.current);
  };

  Howler.volume(0.1);
  const audio = new Howl({
    src: ["audio.mp3"],
  });

  if (segundosRef.current === 3) {
    audio.play();
  }

  useEffect(() => {
    const cambiarModo = () => {
      const proximoModo = modeRef.current === "work" ? "break" : "work";
      const proximosSegundos =
        (proximoModo === "work" ? time[0]?.minutos : time[0]?.descansoMinutos) *
        60;
      const proximaRepeticion =
        proximoModo === "work"
          ? repeticionesRef.current + 1
          : repeticionesRef.current;

      setMode(proximoModo);
      modeRef.current = proximoModo;

      setSegundos(proximosSegundos);
      segundosRef.current = proximosSegundos;

      setRepeticiones(proximaRepeticion);
      repeticionesRef.current = proximaRepeticion;
    };
    segundosRef.current = time[0]?.minutos * 60;
    setSegundos(segundosRef.current);

    const interval = setInterval(() => {
      if (pausaRef.current) {
        return;
      }
      if (segundosRef.current === 0) {
        return cambiarModo();
      }
      reduccionSegundos();
    }, 1000);
    return () => clearInterval(interval);
  }, [time[0]]);

  const segundosTotales =
    mode === "work" ? time[0]?.minutos * 60 : time[0]?.descansoMinutos * 60;

  let porcentaje = Math.round((segundos / segundosTotales) * 100);

  const mensaje = time[0]?.mensaje;

  const minutosRestantes = Math.floor(segundos / 60);

  let segundosRestantes = segundos % 60;
  if (segundosRestantes < 10) segundosRestantes = "0" + segundosRestantes;

  const tiempo =
    (isNaN(minutosRestantes) ? "0" : minutosRestantes) +
    ":" +
    (isNaN(segundosRestantes) ? "0" : segundosRestantes);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Pomodoro</h1>
        <button className={styles.home}>
          <Link href={"/"}>
            <FaHome />
          </Link>
        </button>
        <ul className={styles.containerRedes}>
          <li className={styles.redes}>
            <Link href={"https://www.linkedin.com/in/juli-humere/"}>
              <BsLinkedin />
            </Link>
          </li>
          <li className={styles.redes}>
            <Link href={"https://github.com/Julihumere"}>
              <AiFillGithub />
            </Link>
          </li>
          <li className={styles.redes}>
            <Link href={"https://twitter.com/JuliHumere"}>
              <AiFillTwitterCircle />
            </Link>
          </li>

          <li className={styles.redes}>
            <Link href={"https://walink.co/c55318"}>
              <AiOutlineWhatsApp />
            </Link>
          </li>
        </ul>
      </header>
      <div className={styles.container}>
        <div className={styles.pomodoro}>
          <div className={styles.tiempo}>
            <>
              <h1>{mensaje}</h1>
              <CircularProgressbar
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: mode === "work" ? "midnightblue" : "red",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent",
                })}
                value={porcentaje}
                text={tiempo}
                className={styles.progreso}
              />
              <h1>{mode}</h1>
            </>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: 100,
                height: 100,
              }}
            >
              {pausa ? (
                <button onClick={handlePlay}>
                  <FaPlay />
                </button>
              ) : (
                <button onClick={handlePause}>
                  <FaPause />
                </button>
              )}
            </div>
            <button className={styles.btn_cancelar} onClick={handleReset}>
              Cancelar
            </button>
          </div>
        </div>
        <div className={styles.configuracion}>
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <label>
              Tarea:{" "}
              <input
                type="text"
                name="mensaje"
                value={input.mensaje}
                onChange={handleChange}
                className={styles.inputText}
              />
            </label>
            <label>
              Concentracion:{" "}
              <input
                type="number"
                name="minutos"
                min={1}
                value={input.minutos}
                onChange={handleChange}
                className={styles.inputNumber}
              />
            </label>
            <label>
              Descanso:{" "}
              <input
                type="number"
                name="descansoMinutos"
                min={1}
                value={input.descansoMinutos}
                onChange={handleChange}
                className={styles.inputNumber}
              />
            </label>

            <input
              className={styles.btn_agregar}
              type="submit"
              value="Agregar"
            />
          </form>
          <div className={styles.repeticiones}>
            <h1>Repeticiones</h1>
            <h2>{repeticionesRef.current}</h2>
          </div>
        </div>
      </div>
      <div className={stylesWallpaper.wallpaper}>
        <Image
          layout="fill"
          className={stylesWallpaper.stretch}
          src={fondo}
          alt=""
        />
      </div>
    </>
  );
}
