import "./navbar.css";

export default function Navbar() {
  return (
    <nav id="navbar__wrapper">
      <ul>
        <li>
          <a className="navbar__element"> Espacio Imaginario</a>
        </li>
        <li>
          <a className="navbar__element">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}
