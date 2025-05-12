import S from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

import { Link } from "react-router-dom";

import IconMenu from "../../assets/Header/menu-icon.svg";
import IconHome from "../../assets/Header/home-icon.svg";
import IconExit from "../../assets/Header/exit-icon.svg";
import IconMoney from "../../assets/Header/money-icon.svg";
import IconSearch from "../../assets/Header/search-icon.svg";
import IconTime from "../../assets/Header/time-icon.svg";
import IconPerson from "../../assets/Header/icon-person.png";

function NavBar({ onSearchClick }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={`${S.Container} ${isExpanded ? S.Expanded : ""}`}>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className={S.Button}
      >
        <img src={IconMenu} alt="Icone Menu" className={S.IconMenu} />
      </button>

      <div className={S.ContainerProfile}>
        <img src={IconPerson} alt="Icone Perfil" />

        <div>
          <Link to="/">
            <img src={IconHome} alt="Icone de casa" />
          </Link>

          <img src={IconMoney} alt="Icone de dinheiro" />
          <button onClick={onSearchClick} className={S.Button}>
            <img src={IconSearch} alt="Icone de pesquisa" />
          </button>
          <img src={IconTime} alt="Icone de tempo" />
        </div>
      </div>

      <button className={S.Button} onClick={handleBack}>
        <img src={IconExit} alt="Icone para sair" />
      </button>
    </div>
  );
}

export default NavBar;

NavBar.propTypes = {
  onSearchClick: PropTypes.func,
};
