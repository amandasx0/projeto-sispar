import S from "./style.module.scss";

import { Link } from "react-router-dom";

import IconMenu from "../../assets/Header/menu-icon.svg";
import IconHome from "../../assets/Header/home-icon.svg";
import IconExit from "../../assets/Header/exit-icon.svg";
import IconMoney from "../../assets/Header/money-icon.svg";
import IconSearch from "../../assets/Header/search-icon.svg";
import IconTime from "../../assets/Header/time-icon.svg";
import IconPerson from "../../assets/Header/icon-person.png";

function NavBar() {
  return (
    <div className={S.Container}>
      <img src={IconMenu} alt="Icone Menu" />

      <div className={S.ContainerProfile}>
        <img src={IconPerson} alt="Icone Perfil" />

        <div>
          <Link to="/">
            <img src={IconHome} alt="Icone de casa" />
          </Link>

          <img src={IconMoney} alt="Icone de dinheiro" />
          <img src={IconSearch} alt="Icone de pesquisa" />
          <img src={IconTime} alt="Icone de tempo" />
        </div>
      </div>

      <img src={IconExit} alt="Icone para sair" />
    </div>
  );
}

export default NavBar;
