import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoomEntity } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UserInput } from 'src/user/userInput';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    @InjectRepository(User)
    private readonly roomRepository: Repository<RoomEntity>,
   
  ) {}

  async create(userInput:UserInput,title:string,youtubeLink:string,shareLink:string):Promise<RoomEntity>{   
        const room=new RoomEntity()

        //room creation
        room.creatorId=userInput.id
        room.title=title
        room.youtubeLink=youtubeLink
        room.shareLink=shareLink
     
        //user initialise 
        const user=new User()
        user.username=userInput.username
        user.id=userInput.id

        //room users initialised
        room.users=[]
        room.users.push(user)
        // const res=await this.userRepo.findOne(creatorId)

        // console.log(res)

        //room we save it !
        return await this.roomRepository.save(room)
  }


  async deleteUser(id:number,userInput:UserInput){
    const room=await this.roomRepository.findOne(id ,{relations:['users']})
    room.users=room.users.filter(item=>item.username!=userInput.username)

    if (room.users.length==0){
      this.destroy(id);
    }
    
   return await  this.roomRepository.save(room)
  }

  async update(id:number,userInput:UserInput){
    const room=await this.roomRepository.findOne(id ,{relations:['users']})

    //create user
    const user=new User()
    user.id=userInput.id
    user.username=userInput.username

    //push it !
    room.users.push(user)
    
    //save it 
    console.log(room)
    await this.roomRepository.save(room)

  }
  async destroy(id:number):Promise<boolean|Error>{

    const entity=await this.roomRepository.findOne(id,{relations:['users']})
      const res=await this.roomRepository.remove(entity)
        if (!res){
            return new Error("Couldnt find the room")
        }
      return true

  }
  async destroyAll(){

    await this.roomRepository.clear()
  }

  async find(id:number):Promise<RoomEntity>{
      return this.roomRepository.findOne(id,{relations:['users']})
  }
  async findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }
}

