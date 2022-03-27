import { ArgsType, Field } from '@nestjs/graphql';
// import { Max, Min } from 'class-validator';

@ArgsType()
export class AuthorArgs {
  @Field((type) => String, { nullable: true })
  firstName: string;

  @Field((type) => String, { nullable: true })
  lastName: string;
  //   @Min(0)
  //   skip = 0;

  //   @Field(type => Int)
  //   @Min(1)
  //   @Max(50)
}
