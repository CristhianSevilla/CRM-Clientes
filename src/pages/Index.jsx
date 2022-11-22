import { useLoaderData } from 'react-router-dom'
import { obtenerClientes } from '../data/clientes'
import Cliente from '../components/Cliente';

// Es una funcion que se ejecuta cuando este cargado el componente y ideal para cargar un state o mostrar los resultados de una api en un componente. Se tiene que importar en el main
export function loader() {
   const clientes = obtenerClientes()

    return clientes
}

function Index() {

    const clientes = useLoaderData()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>

            {
                clientes.length ? (
                    <table className="w-full bg-white shadow mt-5 table-auto">
                        <thead className="bg-blue-900 text-white">
                            <tr className=''>
                                <th className="p-2">Cliente</th>
                                <th className="p-2">Contacto</th>
                                <th className="p-2">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                clientes.map(cliente => (
                                    <Cliente
                                        cliente={cliente}
                                        key={cliente.id}
                                    />
                                ))
                            }
                        </tbody>

                    </table>
                ) :
                    (
                        <p className="text-centermt-10 ">No hay clientes aun</p>
                    )
            }

        </>
    )
}

export default Index