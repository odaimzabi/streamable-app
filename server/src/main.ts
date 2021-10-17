import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import * as session from 'express-session'
import { getRepository } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import { AppModule } from './app.module';
import { Session } from './session/session.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({origin:true,credentials:true});
  const repo=getRepository(Session)
  app.use(session({
      resave: false,
      saveUninitialized: false,
      secret:"secret keyboard",
      name:"qid",
      cookie: { 
        httpOnly:true,
        secure:false,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
      store:new TypeormStore({repository:repo})
     
  }))
  await app.listen(4000);
  
}
bootstrap().catch(err=>console.log(err));
