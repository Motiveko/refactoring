import fs from 'fs';
import {statement} from './statment.js';

const invoicies = JSON.parse(fs.readFileSync('ch1/invoicies.json'));
const plays = JSON.parse(fs.readFileSync('ch1/plays.json'));

const expectedResult = `청구 내역 (고객명: BigCo)
Hamlet: $650.00 (55석)
As You Like it: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

test('test statement', () => {
  const [invoice] = invoicies;
  expect(statement(invoice, plays)).toEqual(expectedResult);
})

