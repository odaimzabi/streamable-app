
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(username:string,password:string){   
        const user=new User()
        user.username=username
        user.password=password
        return await this.userRepository.save(user)
  }

  async findByUsername(username:string){
    const res=await this.userRepository.findOne({where:{username:username}})
    return res
  }

  async findById(id:number){
    const res=await this.userRepository.findOne({where:{id:id}})
    return res
  }

  async deleteAll(){
    await this.userRepository.clear()
  }

  async findAll() {
    return await this.userRepository.find();
  }
}