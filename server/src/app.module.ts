import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthorModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { RoomModule } from './room/room.module';
import { RoomEntity } from './room/room.entity';
import {SessionModule} from 'nestjs-session'
import { NestSessionOptions } from 'nestjs-session';
import { TypeormStore } from 'typeorm-store';
import { getConnection, getRepository } from 'typeorm';
import { Session } from './session/session.entity';
import session from 'express-session';
@Module({
  imports: [
    AuthorModule,

    TypeOrmModule.forRoot({
      type: "sqlite",
      database: 'schema.sqlite',
      entities: [User, RoomEntity, Session],
      synchronize: true,
      logging: true
    }),
    
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: join('src/schema.gql'),
      cors: {
        credentials: true,
        origin: true,
    },
    }),
   
    RoomModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
