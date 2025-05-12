import { useState } from "react";
import S from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function NewAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState(null);

  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name || !cargo || !salario) {
      setError("Preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Digite um email válido");
      return;
    }

    try {
      const response = await api.post("/colaborador/cadastrar", {
        email,
        senha: password,
        nome: name,
        cargo,
        salario,
      });

      if (response.status >= 400) {
        setError("Email ou senha inválidos");
        return;
      }

      setSucess("Cadastro feito com sucesso");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBack = () => {
    navigate("/");
  }

  return (
    <>
      <div className={S.Line} />
      <section className={S.ContainerMain}>
        <h2 className={S.Title}>Faça seu cadastro</h2>
        <form className={S.Form} onSubmit={handleSubmit}>
          <div className={S.BoxForm}>
            <label className={S.TitleForm}>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              name="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className={S.InputForm}
            />
          </div>

          <div className={S.BoxForm}>
            <label className={S.TitleForm}>Email</label>
            <input
              type="text"
              placeholder="Email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className={S.InputForm}
            />
          </div>

          <div className={S.BoxForm}>
            <label className={S.TitleForm}>Cargo</label>
            <input
              type="text"
              placeholder="Cargo"
              name="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              id="cargo"
              className={S.InputForm}
            />
          </div>

          <div className={S.BoxForm}>
            <label className={S.TitleForm}>Salário</label>
            <input
              type="number"
              placeholder="Salário"
              name="Salário"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              id="Salário"
              className={S.InputForm}
            />
          </div>

          <div className={S.BoxForm}>
            <label className={S.TitleForm}>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              name="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="Senha"
              className={S.InputForm}
            />
          </div>

          {error && <p className={S.Error}>{error}</p>}
          {sucess && <p className={S.Sucess}>{sucess}</p>}

          <div className={S.BoxButton}>
            <button type="submit" className={S.Button}>
              Cadastrar
            </button>

            <button type="button" className={`${S.Button} ${S.ButtonSecondary}`} onClick={handleBack}>
              Voltar
            </button>
          </div>

        </form>
        
      </section>
      <div className={S.Line} />
    </>
  );
}

export default NewAccount;
