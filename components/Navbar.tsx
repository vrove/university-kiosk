import Link from "next/link"
import './components.css'

const Navbar = () => {
  return (
    <nav className="navbar flexBetween max-container padding-container relative z-30 py-5">
          <ul className="nav-items hidden h-full gap-12 lg:flex">
            <li className="font-bold nav-button">
            <button className="btn btn-primary">Lingkungan Universitas</button>
            </li>
            <li className="font-bold nav-button">
            <button className="btn btn-primary">Gedung Kuliah</button>
            </li>
            <li className="font-bold nav-button">
            <button className="btn btn-primary">Gedung Universitas</button>
            </li>
            <li className="font-bold nav-button">
              <button className="btn btn-primary">Login</button>
            </li>
          </ul>
    </nav>
  )
}

export default Navbar