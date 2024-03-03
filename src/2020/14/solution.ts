interface Instruction {
  address: number;
  value: number;
}

interface MaskInstruction {
  mask: string;
  instructions: Array<Instruction>;
}

export function getCumulativeMemoryValue(instructions: Array<string>): number {
  const maskInstructions: Array<MaskInstruction> =
    parseInstructions(instructions);
  const memory: Array<number> =
    convertMaskInstructionsToMemory(maskInstructions);
  return memory.reduce((sum, value) => sum + (value || 0), 0);
}

export function getCumulativeMemoryValueWithMaskedAddress(
  instructions: Array<string>
): number {
  const maskInstructions: Array<MaskInstruction> =
    parseInstructions(instructions);
  const memory: Array<number> =
    convertMaskInstructionsToMemoryWithMaskedAddress(maskInstructions);
  return memory.reduce((sum, value) => sum + (value || 0), 0);
}

function parseInstructions(
  instructions: Array<string>
): Array<MaskInstruction> {
  return instructions.reduce((parsed, line) => {
    if (line.startsWith('mask')) {
      parsed.push({
        mask: line.replace('mask = ', ''),
        instructions: [],
      });
    }
    if (line.startsWith('mem')) {
      const {address, value} = 
        /^mem\[(?<address>\d+)\]\s=\s(?<value>\d+)$/.exec(line).groups;
      parsed[parsed.length - 1].instructions.push({
        address: parseInt(address),
        value: parseInt(value),
      });
    }
    return parsed;
  }, []);
}

function convertMaskInstructionsToMemory(
  maskInstructions: Array<MaskInstruction>
): Array<number> {
  return maskInstructions.reduce(
    (written: Array<number>, maskInstruction: MaskInstruction) => {
      maskInstruction.instructions.forEach(({value, address}) => {
        written[address] = getMaskedValue(maskInstruction.mask, value);
      });
      return written;
    },
    []
  );
}

function getMaskedValue(mask: string, value: number): number {
  const bitValue: string = getBitValue(value);
  const maskedValue = mask
    .split('')
    .map((maskChar, index) => {
      return maskChar === 'X' ? bitValue[index] : maskChar;
    })
    .join('');
  return parseInt(maskedValue, 2);
}

function convertMaskInstructionsToMemoryWithMaskedAddress(
  maskInstructions: Array<MaskInstruction>
): Array<number> {
  const memory = maskInstructions.reduce(
    (written: Map<number, number>, maskInstruction: MaskInstruction) => {
      maskInstruction.instructions.forEach(({value, address}) => {
        const maskedAddress: string = getMaskedAddress(
          maskInstruction.mask,
          address
        );
        const addresses: Array<number> = explodeMaskedAddress(maskedAddress);
        addresses.forEach(current => {
          written.set(current, value);
        });
      });
      return written;
    },
    new Map<number, number>()
  );
  return [...memory.values()];
}

function getMaskedAddress(mask: string, address: number) {
  const bitAddress = getBitValue(address);
  return mask
    .split('')
    .map((maskChar, index) => {
      switch (maskChar) {
        case 'X':
        case '1':
          return maskChar;
        case '0':
        default:
          return bitAddress[index];
      }
    })
    .join('');
}

function explodeMaskedAddress(maskedAddress) {
  return maskedAddress
    .split('X')
    .reduce((addresses, nextPart) => {
      if (addresses.length === 0) {
        return [nextPart];
      }
      return [
        ...[...addresses].map(address => `${address}0${nextPart}`),
        ...[...addresses].map(address => `${address}1${nextPart}`),
      ];
    }, [])
    .map(address => parseInt(address, 2));
}

function getBitValue(value: number): string {
  const padded = '0'.repeat(36) + Number(value).toString(2);
  return padded.substring(padded.length - 36);
}
