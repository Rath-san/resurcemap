import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { DB } from 'src/db/db';
import { AuthorArgs } from './dto/author.args';
import { NewAuthorInput } from './dto/new-author.args';
import { Author } from './models/authors.model';

// DUMMY DATA
const AUTHORS: Author[] = [
  {
    id: '1',
    firstName: 'Luise',
    lastName: 'Dereski',
  },
  {
    id: '2',
    firstName: 'Nick',
    lastName: 'Valentin',
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Ciastkowski',
  },
];

@Injectable()
export class AuthorService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: DB,
  ) {
    console.log('-AuthorService-');
  }

  private makeAuthor({ rowIndex, test1, test2 }: GoogleSpreadsheetRow): Author {
    return {
      id: rowIndex.toString(),
      firstName: test1,
      lastName: test2,
    };
  }

  async create(data: NewAuthorInput): Promise<Author> {
    const response = await this.db.save({
      test1: data.firstName,
      test2: data.lastName,
    });

    return this.makeAuthor(response);
  }

  async findOneById(id: string): Promise<Author> {
    const dbResponse = await this.db.getRow(+id);
    return this.makeAuthor(dbResponse);
  }

  async findAll(authorsArgs?: AuthorArgs): Promise<Author[]> {
    const dbResponse = await this.db.getRows();

    return dbResponse.map(this.makeAuthor);
  }

  async remove(id: string): Promise<boolean> {
    return this.db.remove(+id - 1).then(() => true);
  }
}
