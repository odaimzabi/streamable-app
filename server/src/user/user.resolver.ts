import {Resolver,Query,Args,Mutation, Context} from '@nestjs/graphql'
import { Ctx } from 'src/context/context'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

@Query(()=>User,{nullable:true})
async Me(@Context()ctx:Ctx){
 
  if (!ctx.req.session.userId){
    return null
  }

  const res= await this.userService.findById(ctx.req.session.userId)
  return res;
}
@Mutation(()=>User)
async Register(@Context()ctx:Ctx,@Args('username')firstName:string,@Args('password')password:string){
      const res= await this.userService.create(firstName,password)
      if (!res){
        return null;
      }
      ctx.req.session.userId=res.id;
      return res
}

@Mutation(()=>Boolean)
async Logout(@Context(){req,res}:Ctx){
    
    return new Promise((resolve)=>{
        req.session.destroy((err)=>{
            res?.clearCookie("qid")
            if (err){
              resolve(false)
              console.log(err)
            }
            resolve(true)
        })
    })
}

@Mutation(()=>User,{nullable:true})
async Login(@Context()ctx:Ctx,@Args('username')username:string,@Args('password')password:string){
      const res=await this.userService.findByUsername(username)
      if (!res){
        return null
      }
      
      ctx.req.session.userId=res.id;
      console.log(ctx.req.session)
      return res
}

  @Query(()=>[User],{nullable:true})
  async FindUsers() {
      return  this.userService.findAll()
  }

  @Mutation(()=>Boolean)
  async deleteAllUsers(){
    await this.userService.deleteAll()
    return true;
  }

  
}