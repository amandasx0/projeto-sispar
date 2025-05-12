import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Reembolso from './Pages/Reimbursement'
import Solicitacao from './Pages/Request'
import CreateAccount from './Pages/CreateAccount'

function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/reembolso' element={ <Reembolso /> } />
                <Route path='/solicitacao' element={ <Solicitacao /> } />
                 <Route path='/criar-conta' element={ <CreateAccount /> } />
            </Routes>
        
    )
}

export default AppRoutes