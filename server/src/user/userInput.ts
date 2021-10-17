

import { InputType, Field } from "@nestjs/graphql";
import { User } from "./user.entity";

@InputType()
export class UserInput {
  
  @Field()
  id:number

  @Field()
  username: string;
  
}