import { getFileContent } from '../../fileReader';
import { resolve, join } from 'path';
import {
  getOutOfRangeFieldsSum,
  getMyTicket,
  getProductOfFieldStartingWith,
} from './solution';

test.each`
  file           | sum
  ${'test.txt'}  | ${71}
`(
  'Given a ticket notes file $file when getOutOfRangeFieldsSum is called then the returned sum should be $sum',
  async ({ file, sum }) => {
    const ticketNotes: string = await getFileContent(
      resolve(join(__dirname, file))
    );
    expect(getOutOfRangeFieldsSum(ticketNotes)).toBe(sum);
  }
);

test.each`
  file          | ticket
  ${'test.txt'} | ${{ class: 1, row: 7, seat: 14 }}
`(
  'Given a ticket notes file $file when getMyTicket is called then the returned ticket should be $ticket',
  async ({ file, ticket }) => {
    const ticketNotes: string = await getFileContent(
      resolve(join(__dirname, file))
    );
    expect(getMyTicket(ticketNotes)).toEqual(ticket);
  }
);

test.each`
  file           | startWith      | product
  ${'test.txt'}  | ${'s'}         | ${14}
`(
  'Given a ticket notes file $file when getProductOfFieldStartingWith is called with startWith $startWith then the returned product should be $product',
  async ({ file, startWith, product }) => {
    const ticketNotes: string = await getFileContent(
      resolve(join(__dirname, file))
    );
    expect(getProductOfFieldStartingWith(ticketNotes, startWith)).toEqual(
      product
    );
  }
);
