// const { GoogleSpreadsheet } = require('google-spreadsheet');
// const gsConfig = require('./api-map-testing-dbf37929d816.json');

import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import * as gsConfig from './api-map-testing-dbf37929d816.json';

// module.exports = async () => {
//     // Initialize the sheet - doc ID is the long id in the sheets URL
//     const doc = new GoogleSpreadsheet('1ojqRG1CBtoCX_p9BRTcDfiGf_YeAapQ1VFyZS3ssYYI');

//     // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
//     await doc.useServiceAccountAuth(gsConfig);

//     await doc.loadInfo(); // loads document properties and worksheets
//     console.log(doc.title);
//     await doc.updateProperties({ title: 'renamed doc' });

//     const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

//     await sheet.setHeaderRow(['test1', 'test2'])

//     // await sheet.addRow({
//     //     test1: 'e',
//     //     test2: 'f'
//     // })

//     const rows = await sheet.getRows()

//     // adding / removing sheets
//     // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
//     // await doc.sheetsByTitle['hot new sheet!'].delete();

//     // const save =

// }

export class DB {
  worksheet: GoogleSpreadsheetWorksheet;

  constructor(id: string) {
    const doc = new GoogleSpreadsheet(id);
    this.initialize(doc);
  }

  async initialize(doc: GoogleSpreadsheet) {
    try {
      await doc.useServiceAccountAuth(gsConfig);
      await doc.loadInfo();

      this.worksheet = doc.sheetsByIndex[0];

      await this.worksheet.setHeaderRow(['id', 'test1', 'test2', 'deleted']);
    } catch (error) {
      console.log(error);
    }
  }

  async getRow(id: number) {
    return await this.worksheet[id - 1];
  }

  async getRows() {
    return this.worksheet.getRows();
  }

  async save(data: { [x: string]: any }) {
    return this.worksheet.addRow(data);
  }

  async remove(id: number) {
    const rows = await this.getRows();
    rows[id - 1].deleted = true;
    try {
      await rows[id - 1].save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
