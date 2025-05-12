import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import NavBar from "../Navbar";

import Navigate from "../Nav";
import IconMore from "../../assets/Solicitacao/icon-more.png";
import IconDelete from "../../assets/Solicitacao/icon-delete.png";
import IconBin from "../../assets/Solicitacao/icon-bin.png";

import api from "../../services/api";

import S from "./style.module.scss";

function Solicitacao() {
  const { register, handleSubmit, reset } = useForm();

  const [clearData, setClearData] = useState(false);
  const [reimbursement, setRemoveReimbursement] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchReimbursement, setSearchReimbursement] = useState(false)
  const [installment, setInstallment] = useState('')

  const [data, setData] = useState([]);

  const fetchReembolsos = async () => {
    try {
      const response = await api.get("/reembolso/pegar-reembolsos");
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("sucesso");
    }
  };

  useEffect(() => {
    fetchReembolsos();
  }, []);

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
    setClearData(false);
  };

  const onSubmit = async (formData) => {
    const formattedDate = new Date(formData.date).toLocaleDateString("pt-BR");

    try {
      const response = await api.post("/reembolso/cadastrar", {
        nome: formData.name,
        empresa: formData.empresa,
        prestacao: formData.prestacao,
        data: formattedDate,
        descricao: formData.motivo,
        tipo_despesa: formData.selection_despesa,
        ctr_custo: formData.selection_custo,
        ordem: formData.ordem_int,
        div: formData.div,
        pep: formData.PEP,
        moeda: formData.selection_moeda,
        distancia: formData.distancia,
        valor_km: formData.valor,
        valor_faturado: formData.faturado,
        despesa: formData.despesa,
      });

      if (response.status >= 400) {
        console.log("error");
        return;
      }

      await fetchReembolsos();
    } catch (e) {
      console.log(e);
    }

    handleClearForm();
  };

  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        await api.delete(`/reembolso/deletar/${selectedId}`);
        setData((prevData) =>
          prevData.filter((item) => item.id !== selectedId)
        );
      } catch (e) {
        console.log(e);
      } finally {
        setRemoveReimbursement(false);
        setSelectedId(null);
      }
    }
  };

  const handleClearData = () => {
    setClearData(true);
  };

  const searchInstallment = async () => {
  try {
    const response = await api.get(`/reembolso/buscar-prestacao/${installment}`);
    setData(response.data);
    setInstallment(null)
    setSearchReimbursement(false)
  } catch (error) {
    console.log("Erro ao buscar prestação:", error);
    setSearchReimbursement(false)
  }
};

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
              <button
                className={S.FirstButton}
                onClick={() => setClearData(false)}
              >
                Continuar editando
              </button>
              <button className={S.SecondButton} onClick={handleClearForm}>
                Sim, limpar
              </button>
            </div>
          </div>
        </>
      )}

      {reimbursement && (
        <>
          <div className={S.Overlay} />
          <div className={S.Modal}>
            <h3 className={S.TextModal}>
              Deseja realmente excluir os dados dessa linha?
            </h3>

            <div className={S.BoxButtonModal}>
              <button
                className={S.FirstButton}
                onClick={() => setRemoveReimbursement(false)}
              >
                Fechar
              </button>
              <button className={S.SecondButton} onClick={handleDelete}>
                Sim, limpar
              </button>
            </div>
          </div>
        </>
      )}

      {searchReimbursement && (
        <>
          <div className={S.Overlay} />
          <div className={S.Modal}>
            <h3 className={S.TextModal}>
              Qual prestação você deseja visualizar?
            </h3>

            <form>
              <input
                  type="text"
                 value={installment}
                  onChange={(e) => setInstallment(e.target.value)}
                  className={S.InputFormModal}
                />
             </form>
             <div className={S.BoxButtonModal}>
              <button
                className={S.FirstButton}
                onClick={() => setSearchReimbursement(false)}
              >
                Fechar
              </button>
               <button className={S.SecondButton} onClick={searchInstallment}>
                Buscar
              </button>
            </div>
          </div>
        </>
      )}

      <div className={S.BoxAll}>
        <NavBar onSearchClick={() => setSearchReimbursement(true)} />

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
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button
                        className={S.IconButtonDelete}
                        onClick={() => {
                          setSelectedId(item.id); 
                          setRemoveReimbursement(true); 
                        }}
                      >
                        <img src={IconBin} />
                      </button>{" "}
                    </td>
                    <td>{item.nome}</td>
                    <td>{item.empresa}</td>
                    <td>{item.prestacao}</td>
                    <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                    <td>{item.descricao}</td>
                    <td>{item.tipo_despesa}</td>
                    <td>{item.ctr_custo}</td>
                    <td>{item.ordem}</td>
                    <td>{item.div}</td>
                    <td>{item.pep}</td>
                    <td>{item.moeda}</td>
                    <td>{item.distancia}</td>
                    <td>{item.valor_km}</td>
                    <td>{item.valor_faturado}</td>
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
