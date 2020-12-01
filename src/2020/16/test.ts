import {getFileContent} from '../../fileReader';
import {resolve, join} from 'path';
import {
  getOutOfRangeFieldsSum,
  getMyTicket,
  getProductOfFieldStartingWith,
} from './solution';

test.each`
  file           | sum
  ${'test.txt'}  | ${71}
  ${'input.txt'} | ${22000}
`(
  'Given a ticket notes file $file when getOutOfRangeFieldsSum is called then the returned sum should be $sum',
  async ({file, sum}) => {
    const ticketNotes: string = await getFileContent(
      resolve(join(__dirname, file))
    );
    expect(getOutOfRangeFieldsSum(ticketNotes)).toBe(sum);
  }
);

test.each`
  file          | ticket
  ${'test.txt'} | ${{class: 1, row: 7, seat: 14}}
  ${'input.txt'} | ${{
  'arrival location': 167,
  'arrival platform': 71,
  'arrival station': 109,
  'arrival track': 149,
  'departure date': 139,
  'departure location': 61,
  'departure platform': 113,
  'departure station': 137,
  'departure time': 53,
  'departure track': 59,
  duration: 127,
  price: 79,
  route: 157,
  class: 151,
  row: 73,
  seat: 131,
  train: 67,
  type: 107,
  wagon: 191,
  zone: 163,
}}
`(
  'Given a ticket notes file $file when getMyTicket is called then the returned ticket should be $ticket',
  async ({file, ticket}) => {
    const ticketNotes: string = await getFileContent(
      resolve(join(__dirname, file))
    );
    expect(getMyTicket(ticketNotes)).toEqual(ticket);
  }
);

test.each`
  file           | startWith      | product
  ${'test.txt'}  | ${'s'}         | ${14}
  ${'input.txt'} | ${'departure'} | ${410460648673}
`(
  'Given a ticket notes file $file when getProductOfFieldStartingWith is called with startWith $startWith then the returned product should be $product',
  async ({file, startWith, product}) => {
    const ticketNotes: string = await getFileContent(
      resolve(join(__dirname, file))
    );
    expect(getProductOfFieldStartingWith(ticketNotes, startWith)).toEqual(
      product
    );
  }
);
