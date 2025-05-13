import Navigate from "../Nav";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import NavBar from "../Navbar";

import IconReembolso from "../../assets/Dashboard/icon-reembolso.png";
import IconAnalise from "../../assets/Dashboard/icon-analise.png";
import IconHistorico from "../../assets/Dashboard/icon-historico.png";
import IconEmAnalise from "../../assets/Dashboard/icon-em-analise.svg";
import IconAprovados from "../../assets/Dashboard/icon-aprovados.svg";
import IconRejeitados from "../../assets/Dashboard/icon-rejeitados.svg";
import IconSolicitados from "../../assets/Dashboard/icon-solicitados.svg";
import IconSistemaAtualizado from "../../assets/Dashboard/icon-sistema.png";

import S from "./style.module.scss";

function Reembolso() {
  const fetched = useRef(false);
  const [summary, setSummary] = useState({
    Solicitados: 0,
    "Em Análise": 0,
    Aprovado: 0,
    Rejeitado: 0,
  });

  const fetchReembolsos = async () => {
    try {
      const response = await api.get("/reembolso/pegar-reembolsos");

      const counts = response.data.reduce(
        (acc, item) => {
          const status = item.status;
          if (acc[status] !== undefined) {
            acc[status]++;
          }
          return acc;
        },
        {
          Solicitados: 0,
          "Em Análise": 0,
          Aprovado: 0,
          Rejeitado: 0,
        }
      );

      setSummary(counts);
    } catch (err) {
      console.error(err);
    }
  };

 useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      fetchReembolsos();
    }
  }, []);
  
  const data = [
    {
      urlImage: IconSolicitados,
      amount: summary.Solicitados,
      text: "Solicitados",
    },
    {
      urlImage: IconEmAnalise,
      amount: summary["Em Análise"],
      text: "Em Análise",
    },
    {
      urlImage: IconAprovados,
      amount: summary.Aprovado,
      text: "Aprovados",
    },
    {
      urlImage: IconRejeitados,
      amount: summary.Rejeitado,
      text: "Rejeitados",
    },
  ];

  return (
    <div className={S.BoxAll}>
      <NavBar />
      <div className={S.ContainerMain}>
        <Navigate />
        <div className={S.BoxContent}>
          <div>
            <h2 className={S.Title}>Sistema de Reembolsos</h2>
            <p className={S.Description}>
              Solicite novos pedidos de reembolso, visualize solicitações em
              análise e todo o histórico.
            </p>
            <div className={S.BoxItens}>
              <Link to="/solicitacao" className={S.Link}>
                <section className={S.Item}>
                  <img src={IconReembolso} alt="Icone reembolso" />
                  <h3 className={S.TitleItem}>Solicitar Reembolso</h3>
                </section>
              </Link>

              <Link to="#" className={S.Link}>
                <section className={S.Item}>
                  <img src={IconAnalise} alt="Icone analise" />
                  <h3 className={S.TitleItem}>Verificar análises</h3>
                </section>
              </Link>

              <Link to="#" className={S.Link}>
                <section className={S.Item}>
                  <img src={IconHistorico} alt="Icon historico" />
                  <h3 className={S.TitleItem}>Histórico</h3>
                </section>
              </Link>
            </div>

            <div className={S.BoxData}>
              {data.map((item) => (
                <div className={S.ItemBoxData} key={item}>
                  <img src={item.urlImage} alt={item.urlImage} />
                  <p>
                    <b>{item.amount}</b> {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className={S.BoxFooter}>
              <img src={IconSistemaAtualizado} alt="" />
              <p className={S.TextUpdateText}> Sistema atualizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reembolso;
