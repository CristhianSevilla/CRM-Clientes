import { Form, useNavigate, useLoaderData, useActionData, redirect } from 'react-router-dom'
import { obtenerCliente, actualizarCliente } from '../data/clientes'
import Formulario from '../components/Formulario'
import Error from '../components/Error'

export async function loader({ params }) {

    //Obtener el cliente
    const cliente = await obtenerCliente(params.clienteId)

    //Verififcar que el cliente exista
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El cliente no fue encontrado'
        })
    }

    return cliente

}

export async function action({ request, params }) {

    const formData = await request.formData()

    const datos = Object.fromEntries(formData)

    const email = formData.get('email')


    // Validación del formulario todos los campos llenos

    const errores = []

    if (Object.values(datos).includes('')) {
        errores.push("Todos los campos son obligatorios")
    }

    // Expresion regular para validar email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    //validar el email
    if (!regex.test(email)) {
        errores.push('El email no es valido')
    }

    // Retornar los datos si haya errores
    if (Object.keys(errores).length) {
        return errores
    }

    //Actualizar el cliente
    await actualizarCliente(params.clienteId, datos)

    return redirect('/')
}

function EditarCliente() {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Modifica los datos el cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white  font-bold uppercase mt-5 text-lg px-10 py-2 hover:bg-blue-700 hover:cursor-pointer"
                    onClick={() => navigate('/')} //Usamos este Hook para navegar a páginas
                >
                    Volver
                </button>
            </div>

            <div className="mt-10 shaow bg-white rounded-md md:w3/4 mx-auto px-5 py-10">

                {/* si errores tiene algo (operador truty ? ) entonces ejecuta lo que sigue de &&  */}
                {errores?.length && errores.map((error, i) =>
                    <Error key={i}>{error}</Error>)}

                <Form
                    method='post'
                    noValidate
                >

                    <Formulario
                        cliente={cliente}
                    />

                    <input
                        type="submit"
                        className='mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 hover:cursor-pointer'
                        value='Guardar cambios'
                    />

                </Form>

            </div>
        </>
    )
}

export default EditarCliente