import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


//maissa-h@yahoo.fr

@WebSocketGateway(5000,{namespace:'message'})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection ,OnGatewayDisconnect{

    @WebSocketServer() server:Server
    
    private logger:Logger=new Logger('RoomGateway')
    
    users=new Map<string,string>()
    rooms=new Map<string,string>()
    
    afterInit(server:any){
        this.logger.log("server initialized!")
    }
    

    
    
    handleConnection(@ConnectedSocket() client:Socket,@MessageBody() data: unknown){
        
       client.on('connected user',(msg:any)=>{

            if (this.users.size!=0){
                this.users.forEach(item=>{
                 if (item==msg.user){
                    return
                 }
                })
            }
           
            this.users.set(client.id,msg.user)
            this.rooms.set(client.id,msg.room)
            
            
            client.join(msg.room)
            console.log(this.users)
       })
        client.on('disconnect',(msg:any)=>{
            if (this.users.has(client.id)){
               
                const roomId=this.rooms.get(client.id)
                console.log(roomId)
             this.server.to(roomId).emit('disconnected user',`${this.users.get(client.id)} left the room!`)
             this.users.delete(client.id)
             this.rooms.delete(client.id)
             console.log(this.users)
             client.disconnect()
            }
        })
    }

    handleDisconnect(Client:Socket){
            
        
  }

    @SubscribeMessage('disconnected user')
    handleUserDisconnection(@MessageBody() data: unknown,@ConnectedSocket() client: Socket){
        const event = 'disconnected user';
       this.server.emit('disconnected user',data)
    }

    
    @SubscribeMessage('connected user')
    handleUserConnection(@MessageBody() data: unknown,@ConnectedSocket() client: Socket) {
            const event = 'connected user';
           const {room,msg}=data as any
            client.broadcast.to(room).emit('connected user',msg)
            // client.broadcast.emit('connect','user connected')
            // return { event, data };
    }

     
    @SubscribeMessage('videoEvent')
    handleVideoState(@MessageBody() data: unknown,@ConnectedSocket() client: Socket) {
            const event = 'connected user';
           const {room,msg}=data as any
           console.log(data)
            client.broadcast.emit('videoEvent',msg)
            // client.broadcast.emit('connect','user connected')
            // return { event, data };
    }


    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: unknown,@ConnectedSocket() client: Socket):void{
        // const {msg,room}=data as any

        // console.log(msg)
           
                console.log(client.id)
                const {msg,room}=data as any
                console.log(room,msg)
                client.join(room)
              
                    console.log(typeof room)
                client.broadcast.emit('message',data)

                

    }
}