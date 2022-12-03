import fs from 'fs';
import {statement} from './statment.js';

const invoicies = JSON.parse(fs.readFileSync('./invoicies.json'));
const plays = JSON.parse(fs.readFileSync('./plays.json'));

const expectedResult = `청구 내역 (고객명: BigCo)
Hamlet: $650.00 (55석)
As You Like it: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

invoicies
  .map(invoice => statement(invoice, plays))
  .forEach(result => {
    console.log(result);
  });
