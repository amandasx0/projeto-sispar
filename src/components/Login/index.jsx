import { useState } from "react"
import { useNavigate } from "react-router-dom"

import imageLogin from "../../assets/login/image-login.svg"
import Logo from "../../assets/login/logo.svg"

import S from "./style.module.scss"

import api from "../../services/api"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!email || !password) {
        setError("Preencha todos os campos");
        return;
      }
    
      if (!email.includes("@")) {
        setError("Digite um email válido");
        return;
      }
    
      try {
        const response = await api.post("/colaborador/login", {
          email,
          senha: password,
        });
    
    
        if (response.status !== 200) {
          setError("Email ou senha inválidos");
          return;
        }

        navigate("/reembolso");
      } catch (e) {
        console.log(e)
      }
    };

  const handleNewAccount = () => {
    navigate("/criar-conta")
  }

  return (
    <section className={S.ContainerMainLogin}>
      <img src={imageLogin} alt="Imagem de navio" className={S.ImageLogin} />
      <div className={S.BoxLogin}>
        <img src={Logo} alt="Logo WS" />
        <h2 className={S.Title}>Boas vindas ao Novo Portal SISPAR</h2>
        <p className={S.SubTitle}>
          Sistema de Emissão de Boletos e Parcelamento
        </p>
        <form className={S.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className={S.InputForm}
          />
          <input
            type="password"
            placeholder="Senha"
            name="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="Senha"
            className={S.InputForm}
          />

          {error && <p className={S.Error}>{error}</p>}

          <a href="/" className={S.LinkPassword}>
            Esqueci minha senha
          </a>

          <div className={S.BoxButton}>
            <button type="submit" className={S.Button}>
              Entrar
            </button>
            <button type="button" onClick={handleNewAccount} className={`${S.Button} ${S.ButtonSecondary}`}>
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
