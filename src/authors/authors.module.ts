import { Module } from '@nestjs/common';
import { AuthorResolver } from './authors.resolver';
import { AuthorService } from './authors.service';

@Module({
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
