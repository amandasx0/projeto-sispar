import Navigate from "../Nav"
import { Link } from "react-router-dom"

import IconReembolso from "../../assets/Dashboard/icon-reembolso.png"
import IconAnalise from "../../assets/Dashboard/icon-analise.png"
import IconHistorico from "../../assets/Dashboard/icon-historico.png"
import IconEmAnalise from "../../assets/Dashboard/icon-em-analise.svg"
import IconAprovados from "../../assets/Dashboard/icon-aprovados.svg"
import IconRejeitados from "../../assets/Dashboard/icon-rejeitados.svg"
import IconSolicitados from "../../assets/Dashboard/icon-solicitados.svg"
import IconSistemaAtualizado from "../../assets/Dashboard/icon-sistema.png"

import S from "./style.module.scss"

function Reembolso() {
  const data = [
    {
      urlImage: IconSolicitados,
      amount: "182",
      text: "Solicitados",
    },
    {
      urlImage: IconEmAnalise,
      amount: "74",
      text: "Em análise",
    },
    {
      urlImage: IconAprovados,
      amount: "195",
      text: "Aprovados",
    },
    {
      urlImage: IconRejeitados,
      amount: "41",
      text: "Rejeitados",
    },
  ]

  return (
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
            {data.map(item => (
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
  )
}

export default Reembolso