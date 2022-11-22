import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from '../data/clientes'

export async function action({ params }) {

   await eliminarCliente(params.clienteId)
    return redirect('/')
}

function Cliente({ cliente }) {
    const navigate = useNavigate()
    const { nombre, empresa, telefono, email, id } = cliente
    return (
        <tr className="border-b">
            <td className="p-6 space-y-2">
                <p className="text-xl text-gray-800 font-bold">{nombre}</p>
                <p className="text-gray-600">{empresa}</p>
            </td>
            <td className="p-6 space-y-2">
                <p className="text-gray-700"><span className="font-bold">Telefono: </span> {telefono}</p>
                <p className="text-gray-700"><span className="font-bold">Correo: </span> {email}</p>
            </td>
            <td className="p-6 flex gap-2">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 uppercase font-bold text-xs"
                    onClick={() => navigate(`/clientes/${id}/editar`)} >
                    Editar
                </button>
                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('¿Deseas eliminar este registro?')) {
                            e.preventDefault()
                        }
                    } }
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-800 uppercase font-bold text-xs" >
                        Eliminar
                    </button>
                </Form>

            </td>
        </tr>
    )
}

export default Cliente