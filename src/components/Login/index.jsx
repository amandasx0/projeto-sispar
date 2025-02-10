import S from "./style.module.scss"
import imageLogin from "../../assets/login/image-login.svg"
import Logo from "../../assets/login/logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const logins = [
     {
        user: "amandasarah@gmail.com",
        senha: "eternamente"
     },
     {
        user: "karynne@gmail.com",
        senha: "vainaweb"
     },
     {
        user: "samuel@gmail.com",
        senha: "vainaweb"
     },
    ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Preencha todos os campos")
      return
    }

    if (!email.includes("@")) {
      setError("Digite um email válido")
      return
    }

    const userExists = logins.some(
        (login) => login.user === email && login.senha === password
      )
    
      if (!userExists) {
        setError("Email ou senha inválidos")
        return
      }

    setError("")
    navigate("/reembolso")
  };

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
            <button className={`${S.Button} ${S.ButtonSecondary}`}>
              <Link to="/criar-conta">Criar conta</Link>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
