import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout/>}>
                <Route path="/" element={<Home />}/>
                <Route path="/history" element={<History/>}/>
            </Route>
        </Routes>

        // Se eu quiser adicionar uma pagina de administracao eu posso
        // criar outra rota exemlo:

        // <Route path='/admin' element={<DefaultLayout/>}>
        //     <Route path="/products" element={<Home />}/>
        //     <Route path="/setProducts" element={<History/>}/>
        // </Route>

        // a partir dai vai se escalando ou somando a partir de /admin

    )
}