


import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {ObjectType,Field,ID} from '@nestjs/graphql'
import { RoomEntity } from 'src/room/room.entity';

@Entity()
@ObjectType()
export class User {
  @Field(()=>ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({nullable:true})
  password?: string;

  @ManyToOne(()=>RoomEntity,(room)=>room.users)
  room:RoomEntity
 
}