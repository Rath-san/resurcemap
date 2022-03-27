import { NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Author } from './models/authors.model';
import { AuthorService } from './authors.service';
import { NewAuthorInput } from './dto/new-author.args';
import { AuthorArgs } from './dto/author.args';

@Resolver((of) => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query((returns) => Author)
  async author(@Args('id') id: string): Promise<Author> {
    const author = await this.authorService.findOneById(id);
    if (!author) {
      throw new NotFoundException(id);
    }
    return author;
  }

  @Query((returns) => [Author])
  authors(@Args() authorsArgs: AuthorArgs): Promise<Author[]> {
    return this.authorService.findAll(authorsArgs);
  }

  @Mutation((returns) => Author)
  async createAuthor(@Args('newAuthorData') newAuthorData: NewAuthorInput) {
    return this.authorService.create(newAuthorData);
  }

  @Mutation((returns) => Boolean)
  async removeAuthor(@Args('id') id: string) {
    return this.authorService.remove(id);
  }
}
