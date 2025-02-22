import { Link, useLocation } from "react-router-dom"

import IconHome from "../../assets/Nav/home.svg"
import IconArrow from "../../assets/Nav/arrow.svg"

import S from "./style.module.scss";

function Navigate() {
  const location = useLocation()

  return (
    <header className={S.Navigate}>
      <Link to="/">
        <img src={IconHome} alt="Icone Home" className={S.IconHome}/>
      </Link>

      <img src={IconArrow} alt="Icone Seta" className={S.Icon} />

      <Link to="/reembolso" className={S.Text}>Reembolsos</Link>

      {location.pathname === "/solicitacao" && (
        <>
          <img src={IconArrow} alt="Icone Seta" className={S.Icon} />
          <Link to="/reembolso" className={S.Text}>Solicitações de Reembolso</Link>
        </>
      )}
    </header>
  )
}

export default Navigate
