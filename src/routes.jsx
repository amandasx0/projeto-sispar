import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Reembolso from './Pages/Reimbursement'
import Solicitacao from './Pages/Request'

function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/reembolso' element={ <Reembolso /> } />
                <Route path='/solicitacao' element={ <Solicitacao /> } />
            </Routes>
        
    )
}

export default AppRoutes