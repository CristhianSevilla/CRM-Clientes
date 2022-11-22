import { useRouteError } from 'react-router-dom'

export default function ErrorPage(){
    const error = useRouteError()

    console.log(error);

    return (
        <div className='space-y-g'>
            <h1 className="text-enter text-6xl font-extrabold text-blue-900">CRM - CLIENTES</h1>
            <p className="text-center mt-6 text-3xl text-red-700 font-bold">Hubo un error</p>
            {/* revisa error.status o el mensage */}
            <p className="text-center mt-5 text-2xl">{error.statusText || error.message}</p> 
        </div>
    )
}