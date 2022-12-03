import fs from 'fs';
import {htmlStatement, statement} from './statment.js';

const invoicies = JSON.parse(fs.readFileSync('ch1/invoicies.json'));
const plays = JSON.parse(fs.readFileSync('ch1/plays.json'));


const [invoice] = invoicies;
test('test statement', () => {
  expect(statement(invoice, plays)).toMatchSnapshot();
})

test('test htmlStatement', () => {
  expect(htmlStatement(invoice, plays)).toMatchSnapshot();
})