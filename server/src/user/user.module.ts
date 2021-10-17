import { Module} from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
@Module({

  controllers: [],
  providers: [UserService,UserResolver],
  imports:[TypeOrmModule.forFeature([User])]
})
export class AuthorModule {}
