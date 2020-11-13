

//compartidos
import { CajeroInicio } from '../components/cajero/CajeroInicio';
import { Cobrar } from '../components/cajero/Cobrar';
import { AdminInicio } from '../components/admin/AdminInicio';
import { Productos } from '../components/admin/Productos';
import { NuevoProducto } from '../components/admin/NuevoProducto';
import { IniciaSesion } from '../components/usuario/IniciaSesion';
import { Registrate } from '../components/usuario/Registrate';
import Layout from '../components/Layout';
import LayoutSesion from '../components/LayoutSesion';
import { Error404 } from '../components/Error404';
const routes =[
    {
        path: "/admin",
        component: Layout,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminInicio,
                exact: true
            },
            {
                path: "/admin/productos",
                component: Productos,
                exact: true
            },
            {
                path: "/admin/productos/nuevo",
                component: NuevoProducto,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/cajero",
        component: Layout,
        exact: false,
        routes: [
            {
                path: "/cajero/inicio",
                component: CajeroInicio,
                exact: true
            },
            {
                path: "/cajero/cobrar",
                component: Cobrar,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutSesion ,
        exact: false,
        routes: [
            
            {
                path: "/inicia-sesion",
                component: IniciaSesion,
                exact: true
            },
            {
                path: "/registrate",
                component: Registrate,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]
export default routes;