import { SiteClient } from 'datocms-client';

export default async function recebeRequest(request, response){

    if(request.method === 'POST'){
        const token = 'c183ca94337c1bd3572ea67f9a005d';

        const client = new SiteClient (token);
 
        const registroCriado = await client.items.create({
            itemType: "972646", //ID Model de Comunities criado no Dato
            ...request.body,
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}