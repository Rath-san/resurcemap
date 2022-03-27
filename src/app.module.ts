import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthorModule } from './authors/authors.module';
import { DatabaseModule } from './db/db.module';

import { join } from 'path';
import { MarkersModule } from './markers/markers.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tyria_map'),
      serveRoot: '/public/',
    }),
    AuthorModule,
    MarkersModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
