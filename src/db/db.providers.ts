// import * as mongoose from 'mongoose';

import { DB } from './db';

export const dbProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): DB =>
      new DB('1ojqRG1CBtoCX_p9BRTcDfiGf_YeAapQ1VFyZS3ssYYI'),
  },
];
