import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class RoomEntity{

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    creatorId:number;

    @Field()
    @Column()
    title:string;

    @Field()
    @Column()
    youtubeLink:string;

    @Field()
    @Column({nullable:true})
    shareLink:string;

   
    @OneToMany(()=>User,(user)=>user.room,{cascade:true})
    @Field(()=>[User],{nullable:true})
    users:User[];
}   