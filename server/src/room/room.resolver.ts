import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubscribeMessage } from '@nestjs/websockets';
import { Ctx } from 'src/context/context';
import { User } from 'src/user/user.entity';
import { UserInput } from 'src/user/userInput';
import { RoomEntity } from './room.entity';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';
import { Socket, Server } from 'socket.io';


//TODO: fix bug in graphql where u can add a user twice 


@Resolver()
export class RoomResolver {

    constructor(
        private readonly roomService: RoomService,
        private readonly roomGateway:RoomGateway
      ) {}
    @Mutation(()=>RoomEntity)
    async CreateRoom(@Args('user')user:UserInput,
    @Args('title')title:string,@Args('youtubeLink')youtubeLink:string,@Args('shareLink',{nullable:true})shareLink:string):Promise<RoomEntity|Error>{
        
        const res=await this.roomService.create(user,title,youtubeLink,shareLink)
        if (!res){
            return new Error("couldnt create a room for some reason..")
        }
        return res;

    }

    @Mutation(()=>Boolean)
    async AddUser(@Args('user')user:UserInput,@Args('id')id:number){
       const res= await this.roomService.update(id,user)
        return true
    }
    @Mutation(()=>Boolean)
    async removeUser(@Args('user')user:UserInput,@Args('id')id:number){
       const res= await this.roomService.deleteUser(id,user)
        if (!res){
           return res;
       }
       console.log("user left!")
       

        return true
    }
    @Mutation(()=>Boolean)
    async deleteRooms(){
     
        this.roomService.destroyAll()
        return true;
    }

    @Mutation(()=>Boolean)
    async DeleteRoom(@Args('id')id:number):Promise<boolean>{
        const res=this.roomService.destroy(id);
        if (!res){
            return false;
        }

        
        return true;
    }
    // @Mutation(()=>Boolean)
    // async SendMessage(@Args('msg')msg:string,ctx:Ctx){
    //       this.roomGateway.handleMessage(msg)
    //       return true;
    // }
   


    @Query(()=>RoomEntity,{nullable:true})
    async FindRoom(@Args('id')id:number):Promise<RoomEntity>{
            return this.roomService.find(id)
    }

}

