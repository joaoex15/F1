import cors from "@fastify/cors";
import fastify from "fastify";

const server =fastify({logger:true})

server.register(cors,{origin:"*"})
const teams=   [{
    id:1,name:"McLaren",base:"Woling,Unuted Kingdom"},
    {id:2,name:"Merdeces",base:"Brackley,Unuted Kingdom"},
    {id:3,name:"Red Bull Racing",base:"Milton Keynes,Unuted Kingdom"}
]

const drivers=   [{
    id:1,name:"Max Veerstappen",team:"Red Bull Racing"},
    {id:2,name:"Lewis Hamilton",team:"Ferrari"},
    {id:3,name:"Lando Norris",team:"McLaren"}



]
server.get("/teams",async(request,response)=>{
    response.type("application/json").code(200)
  return {teams}
})

server.get("/drivers",async(request,response)=>{
    response.type("application/json").code(200)
    return {drivers}
})


interface DriveParams{
    id:string
}

server.get<{Params:DriveParams}>("/drivers/:id",async(request,response)=>{
    const id =  parseInt(request.params.id);
    const driver=drivers.find(d=>d.id===id)
    if(!driver){
        response.type("application/json").code(300)
        return{message:"Driver Not Found"}

    }
    else{
        response.type("application/json").code(200)

    return {driver}}
})

server.listen({port:3333},()=>{console.log("server init")})