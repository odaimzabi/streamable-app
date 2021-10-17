import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomGateway } from './room.gateway';
import { RoomResolver } from './room.resolver';
import {RoomEntity} from './room.entity'
import { RoomService } from './room.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
@Module({
    imports:[TypeOrmModule.forFeature([RoomEntity])],
    providers:[RoomGateway,RoomResolver,RoomService]
})
export class RoomModule {}
