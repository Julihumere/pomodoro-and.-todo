import React, { useState } from "react";
import styles from "../styles/ToDo.module.css";
import Image from "next/image";
import Link from "next/link";
import icono from "../public/icono libreta.png";
import stylesWallpaper from "../styles/Wallpaper.module.css";
import fondo from "../public/Fondo.jpg";
import { BsLinkedin } from "react-icons/bs";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaHome } from "react-icons/fa";
export default function ToDo() {
  const [lista, setLista] = useState([]);
  const [tareas, setTareas] = useState({
    tarea: "",
    completado: false,
    eliminado: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lista.map((e) => e.tarea).includes(tareas.tarea)) {
      alert("La tarea ya existe");
    } else {
      setLista([...lista, tareas]);
      setTareas({ tarea: "", completado: false, eliminado: false });
    }
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    setLista(lista.filter((el) => el.tarea !== e.target.value));
  };

  const handleCompletado = (e) => {
    e.preventDefault();
    setLista(
      lista.map((el) =>
        el.tarea === e.target.value ? { ...el, completado: !el.completado } : el
      )
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTareas({
      ...tareas,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>ToDo</h1>
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
        <div>
          <div className={styles.form}>
            <div className={styles.headerForm}>
              <Image src={icono} width="200" height="200" />{" "}
              <h1>Escribe aqui tus tareas</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                type="text"
                name="tarea"
                value={tareas.tarea}
                onChange={handleChange}
              />
              <button className={styles.btn_agregar}>AGREGAR</button>
            </form>
          </div>
          <div className={styles.completados}>
            <h1 className={styles.h1}>Tareas Completadas</h1>
            <ul className={styles.listaCompleto}>
              {lista.map((item, index) =>
                item.completado === true ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 400,
                    }}
                  >
                    <li className={styles.items} key={index}>
                      <h2>{item.tarea}</h2>
                    </li>
                    <button value={item.tarea} onClick={handleEliminar}>
                      ❌
                    </button>
                  </div>
                ) : null
              )}
            </ul>
          </div>
        </div>

        <div className={styles.list}>
          <h1 className={styles.h1}>Tareas en proceso</h1>
          <ul className={styles.containerList}>
            {lista.map((item, index) =>
              item.completado === false ? (
                <div className={styles.input}>
                  <li className={styles.items} key={index}>
                    {item.tarea}
                  </li>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 100,
                    }}
                  >
                    <button value={item.tarea} onClick={handleCompletado}>
                      ✔️
                    </button>
                    <button value={item.tarea} onClick={handleEliminar}>
                      ❌
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </ul>
          <h1>{/* {completados}/{tareas} */}</h1>
        </div>
        <div className={stylesWallpaper.wallpaper}>
          <Image className={stylesWallpaper.stretch} src={fondo} alt="" />
        </div>
      </div>
    </>
  );
}
