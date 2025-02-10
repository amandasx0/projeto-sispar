import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Reembolso from './Pages/Reimbursement'

function AppRoutes() {
    return (
    
            <Routes>
                <Route path='/' element={ <Home /> }></Route>
                <Route path='/reembolso' element={ <Reembolso /> }></Route>
            </Routes>
        
    )
}

export default AppRoutes