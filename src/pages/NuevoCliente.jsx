import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/clientes'

export async function action({ request }) {

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

  await agregarCliente(datos)

  return redirect('/')
}

function NuevoCliente() {

  const errores = useActionData()
  const navigate = useNavigate()


  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">LLena todos los campos para registrar un nuevo cliente</p>

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

          <Formulario />

          <input
            type="submit"
            className='mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 hover:cursor-pointer'
            value='Registrar Cliente'
          />

        </Form>

      </div>
    </>
  )
}

export default NuevoCliente