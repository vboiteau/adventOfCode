interface Range {
  min: number;
  max: number;
}

interface FieldRanges {
  [key: string]: Array<Range>;
}

interface Ticket {
  [key: string]: number;
}

interface TicketNotes {
  fieldRanges: FieldRanges;
  myTicket: Array<number>;
  nearbyTickets: Array<Array<number>>;
}

export function getOutOfRangeFieldsSum(serializedTicketNotes: string): number {
  const ticketNotes: TicketNotes = parseTicketNotes(serializedTicketNotes);
  const allRanges: Array<Range> = Object.values(ticketNotes.fieldRanges).reduce(
    (ranges, fieldRanges) => [...ranges, ...fieldRanges],
    []
  );
  const outOfRangeFields = ticketNotes.nearbyTickets
    .reduce((fields, tickets) => [...fields, ...tickets], [])
    .filter(field => allRanges.every(range => isOutOfRange(range, field)));
  return outOfRangeFields.reduce((sum, field) => sum + field, 0);
}

export function getMyTicket(serializedTicketNotes: string): Ticket {
  const ticketNotes: TicketNotes = parseTicketNotes(serializedTicketNotes);
  const fieldOrders: Array<string> = getFieldOrders(ticketNotes);
  const myTicket: Ticket = fieldOrders.reduce(
    (ticket, key, index) => ({
      ...ticket,
      [key]: ticketNotes.myTicket[index],
    }),
    {}
  );
  return myTicket;
}

export function getProductOfFieldStartingWith(
  serializedTicketNotes: string,
  startWith: string
): number {
  const myTicket: Ticket = getMyTicket(serializedTicketNotes);
  return Object.entries(myTicket).reduce(
    (product: number, [key, value]) =>
      key.startsWith(startWith) ? product * value : product,
    1
  );
}

function getFieldOrders(ticketNotes: TicketNotes): Array<string> {
  const allRanges: Array<Range> = Object.values(ticketNotes.fieldRanges).reduce(
    (ranges, fieldRanges) => [...ranges, ...fieldRanges],
    []
  );
  const validTickets: Array<Array<number>> = ticketNotes.nearbyTickets.filter(
    ticket =>
      ticket.every(field => allRanges.some(range => isInRange(range, field)))
  );
  let fieldSuggestions = Object.entries(ticketNotes.fieldRanges)
    .reduce((order, [key, ranges]) => {
      for (
        let fieldIndex = 0, len = ticketNotes.myTicket.length;
        fieldIndex < len;
        fieldIndex++
      ) {
        if (validFieldIndexForRanges(validTickets, ranges, fieldIndex)) {
          order[fieldIndex] = [...order[fieldIndex], key];
        }
      }
      return order;
    }, new Array(ticketNotes.myTicket.length).fill([]))
    .map((suggestions, index) => ({suggestions, index}));
  const order: Array<string> = [];
  while (
    fieldSuggestions.filter(({suggestions}) => suggestions.length > 0).length >
    0
  ) {
    fieldSuggestions
      .filter(({suggestions}) => suggestions.length === 1)
      .forEach(({index, suggestions: [fieldName]}) => {
        fieldSuggestions = fieldSuggestions.map(({index, suggestions}) => {
          if (suggestions.includes(fieldName)) {
            suggestions.splice(suggestions.indexOf(fieldName), 1);
          }
          return {
            index,
            suggestions,
          };
        });
        order[index] = fieldName;
      });
  }
  return order;
}

function validFieldIndexForRanges(
  tickets: Array<Array<number>>,
  ranges: Array<Range>,
  fieldIndex
): boolean {
  return tickets.every(ticket =>
    ranges.some((range: Range) => isInRange(range, ticket[fieldIndex]))
  );
}

function parseTicketNotes(serializedTicketNotes: string): TicketNotes {
  const [fields, yourTicket, nearbyTickets]: Array<string> =
    serializedTicketNotes.split(/\n\n/);
  return {
    fieldRanges: parseFieldRanges(fields),
    myTicket: parseTicket(yourTicket.split('\n').pop()),
    nearbyTickets: nearbyTickets
      .split('\n')
      .filter(ticket => ticket.length)
      .slice(1)
      .map(parseTicket),
  };
}

function parseFieldRanges(fields: string): FieldRanges {
  return fields.split('\n').reduce((ranges: FieldRanges, field: string) => {
    const {fieldName, max1, max2, min1, min2} = field.match(
      /^(?<fieldName>[\w\s]+):\s(?<min1>\d+)-(?<max1>\d+)\sor\s(?<min2>\d+)-(?<max2>\d+)/
    ).groups;
    return {
      ...ranges,
      [fieldName]: [
        {
          min: parseInt(min1),
          max: parseInt(max1),
        },
        {
          min: parseInt(min2),
          max: parseInt(max2),
        },
      ],
    };
  }, {});
}

function parseTicket(ticket: string): Array<number> {
  return ticket.split(',').map(field => parseInt(field, 10));
}

function isInRange(range: Range, value: number): boolean {
  return range.min <= value && range.max >= value;
}

function isOutOfRange(range: Range, value: number): boolean {
  return !isInRange(range, value);
}
