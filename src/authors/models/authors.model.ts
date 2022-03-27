// import { Post } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

// interface Post {
//   id: number;
//   name: string;
// }

@ObjectType()
export class Author {
  @Field((type) => String)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  //   @Field((type) => [Post])
  //   posts: Post[];
}
