import { useState } from "react";
import { useForm } from "react-hook-form";

import NavBar from "../Navbar";

import Navigate from "../Nav";
import IconMore from "../../assets/Solicitacao/icon-more.png";
import IconDelete from "../../assets/Solicitacao/icon-delete.png";
import IconBin from "../../assets/Solicitacao/icon-bin.png";

import S from "./style.module.scss";

function Solicitacao() {
  const { register, handleSubmit, reset } = useForm();

  const [clearData, setClearData] = useState(false);
  const [removeCollaborator, setRemoveCollaborator] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [data, setData] = useState([
    {
      colaborador: "Vitor Carvalho",
      empresa: "WSS001",
      prestacao: "329456",
      data: "08/01/2025",
      motivo: "Desp. de viagem a...",
      ctrCusto: "1100110002 - FIN...",
      ordInt: "0003",
      div: "002",
      pep: "001",
      moeda: "BRL",
      distKm: "434Km",
      valKm: "0.65",
      valFaturado: "242.10",
      despesa: "40.05",
    },
  ]);

  const handleClearForm = () => {
    reset({
      name: "",
      empresa: "",
      prestacao: "",
      motivo: "",
      date: "",
      selection_despesa: "",
      selection_custo: "",
      ordem_int: "",
      div: "",
      PEP: "",
      selection_moeda: "",
      distancia: "",
      valor: "",
      faturado: "",
      despesa: "",
    });
    setClearData(false)
  };

  const onSubmit = (formData) => {
    const formattedDate = new Date(formData.date).toLocaleDateString("pt-BR");

    const newEntry = {
      colaborador: formData.name || "Novo Colaborador",
      empresa: formData.empresa || "",
      prestacao: formData.prestacao || "",
      data: formattedDate || "",
      motivo: formData.selection_despesa || "",
      ctrCusto: formData.selection_custo || "",
      ordInt: formData.ordem_int || "",
      div: formData.div || "",
      pep: formData.PEP || "",
      moeda: formData.selection_moeda || "",
      distKm: formData.distancia || "",
      valKm: formData.valor || "",
      valFaturado: formData.faturado || "",
      despesa: formData.despesa || "",
    };

    setData((prevData) => [...prevData, newEntry]);
    handleClearForm();
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setData((prevData) => prevData.filter((_, index) => index !== selectedIndex));
      setRemoveCollaborator(false)
      setSelectedIndex(null)
    }
  };
  

  const handleClearData = () => {
    setClearData(true);
  };

  const handleDeleteCollaborator = (index) => {
    setSelectedIndex(index)
    setRemoveCollaborator(true)
  }

  return (
    <>
      {clearData && (
        <>
          <div className={S.Overlay} />
          <div className={S.Modal}>
            <h3 className={S.TextModal}>
              Deseja realmente limpar os campos preenchidos acima?
            </h3>
           
            <div className={S.BoxButtonModal}>
              <button className={S.FirstButton}  onClick={() => setClearData(false)}>Continuar editando</button>
              <button className={S.SecondButton} onClick={handleClearForm}>Sim, limpar</button>
            </div> 
          </div>
        </>
      )}


  {removeCollaborator && (
        <>
          <div className={S.Overlay} />
          <div className={S.Modal}>
            <h3 className={S.TextModal}>
              Deseja realmente excluir os dados dessa linha?
            </h3>
           
            <div className={S.BoxButtonModal}>
              <button className={S.FirstButton}  onClick={() => setRemoveCollaborator(false)}>Fechar</button>
              <button className={S.SecondButton} onClick={handleDelete}>Sim, limpar</button>
            </div> 
          </div>
        </>
      )}

      <div className={S.BoxAll}>
        <NavBar />

        <div className={S.ContainerMain}>
          <Navigate />
          <div className={S.ContainerForm}>
            <section className={S.FirstGrid}>
              <div className={S.ItemGrid}>
                <label className={S.Title}>Nome Completo</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={S.InputForm}
                />
              </div>

              <div className={S.ItemGrid}>
                <label className={S.Title}>Empresa</label>
                <input
                  type="text"
                  {...register("empresa")}
                  className={S.InputForm}
                />
              </div>
              <div className={S.ItemGrid}>
                <label className={S.Title}>Nº Prest. Contas</label>
                <input
                  type="text"
                  {...register("prestacao")}
                  className={S.InputForm}
                />
              </div>
              <div className={S.LastItemFirstGrid}>
                <label className={S.Title}>
                  Descrição / Motivo de Reembolso
                </label>
                <input
                  type="text"
                  {...register("motivo")}
                  className={S.InputForm}
                />
              </div>
            </section>
            <div className={S.Line} />

            <section className={S.SecondGrid}>
              <div className={S.ItemGrid}>
                <label className={S.Title}>Data</label>
                <input
                  type="date"
                  {...register("date")}
                  className={S.InputForm}
                />
              </div>

              <div className={S.ItemGrid}>
                <label className={S.Title}>Tipo de Despesa</label>
                <select
                  {...register("selection_despesa")}
                  className={S.InputForm}
                >
                  <option value="0">Selecionar</option>
                  <option value="alimentacao">Alimentação </option>
                  <option value="combustivel">Combustível</option>
                  <option value="conducao">Condução</option>
                  <option value="estacionamento">Estacionamento</option>
                  <option value="viagem administrativa">Viagem Admin.</option>
                  <option value="viagem operacional">Viagem Operacional</option>
                  <option value="eventos de representação">
                    Eventos de representação
                  </option>
                </select>
              </div>
              <div className={S.ItemGrid}>
                <label className={S.Title}>Centro de Custo</label>
                <select
                  {...register("selection_custo")}
                  className={S.InputForm}
                >
                  <option value="0">Selecionar</option>
                  <option value="1100109002">
                    1100109002 - FIN CONTROLES INTERNOS MTZ
                  </option>
                  <option value="1100110002">
                    1100110002 - FIN VICE-PRESIDENCIA FINANCAS MTZ
                  </option>
                  <option value="1100110101">
                    1100110101 - FIN CONTABILIDADE MTZ
                  </option>
                </select>
              </div>
              <div className={S.LastItemFirstGrid}>
                <div className={S.BoxContainerGrid}>
                  <div className={S.BoxLastGrid}>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Ord. Int</label>
                      <input
                        type="number"
                        {...register("ordem_int")}
                        className={`${S.InputFormLastGrid} ${S.SmallerInput}`}
                      />
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Div</label>
                      <input
                        type="number"
                        {...register("div")}
                        className={`${S.InputFormLastGrid} ${S.SmallerInput}`}
                      />
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>PEP</label>
                      <input
                        type="number"
                        {...register("PEP")}
                        className={`${S.InputFormLastGrid} ${S.SmallerInput}`}
                      />
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Moeda</label>
                      <select
                        {...register("selection_moeda")}
                        className={`${S.InputFormLastGrid} ${S.BiggerInput}`}
                      >
                        <option value="0">Selecionar</option>
                        <option value="BRL">BRL</option>
                        <option value="ARS">ARS</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Dist / Km</label>
                      <input
                        type="text"
                        {...register("distancia")}
                        className={`${S.InputFormLastGrid} ${S.SmallerInput}`}
                      />
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Valor / Km</label>
                      <input
                        type="number"
                        {...register("valor")}
                        className={`${S.InputFormLastGrid} ${S.BiggerInput}`}
                      />
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Val. Faturado</label>
                      <input
                        type="number"
                        {...register("faturado")}
                        className={`${S.InputFormLastGrid} ${S.BiggerInput}`}
                      />
                    </div>
                    <div className={S.ItemGrid}>
                      <label className={S.Title}>Despesa</label>
                      <input
                        type="number"
                        {...register("despesa")}
                        className={`${S.InputFormLastGrid} ${S.BiggerInput}`}
                      />
                    </div>
                  </div>

                  <div className={S.BoxButton}>
                    <button
                      onClick={() => handleSubmit(onSubmit)()}
                      className={S.ButtonAdding}
                    >
                      <img src={IconMore} alt="" />
                      Salvar
                    </button>
                    <button
                      className={S.ButtonDeleting}
                      onClick={handleClearData}
                    >
                      <img src={IconDelete} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={S.ContainerTable}>
            <table className={S.Table}>
              <thead>
                <tr>
                  <th></th>
                  <th className={S.TableHeader}>Colaborador(a)</th>
                  <th className={S.TableHeader}>Empresa</th>
                  <th className={S.TableHeader}>Nº Prest.</th>
                  <th className={S.TableHeader}>Data</th>
                  <th className={S.TableHeader}>Motivo</th>
                  <th className={S.TableHeader}>Tipo de despesa</th>
                  <th className={S.TableHeader}>Ctr. Custo</th>
                  <th className={S.TableHeader}>Ord. Int.</th>
                  <th className={S.TableHeader}>Div.</th>
                  <th className={S.TableHeader}>PEP</th>
                  <th className={S.TableHeader}>Moeda</th>
                  <th className={S.TableHeader}>Dist. Km</th>
                  <th className={S.TableHeader}>Val. Km</th>
                  <th className={S.TableHeader}>Val. Faturado</th>
                  <th className={S.TableHeader}>Despesa</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className={S.IconButtonDelete}
                        onClick={() => handleDeleteCollaborator(index)}
                      >
                        <img src={IconBin} />
                      </button>{" "}
                    </td>
                    <td>{item.colaborador}</td>
                    <td>{item.empresa}</td>
                    <td>{item.prestacao}</td>
                    <td>{item.data}</td>
                    <td>{item.motivo}</td>
                    <td>{item.motivo}</td>
                    <td>{item.ctrCusto}</td>
                    <td>{item.ordInt}</td>
                    <td>{item.div}</td>
                    <td>{item.pep}</td>
                    <td>{item.moeda}</td>
                    <td>{item.distKm}</td>
                    <td>{item.valKm}</td>
                    <td>{item.valFaturado}</td>
                    <td>{item.despesa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Solicitacao;
