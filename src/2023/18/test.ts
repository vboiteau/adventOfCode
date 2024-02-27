import { join } from "path"
import { getFileLines } from "../../fileReader"
import { getDigSize, shoelace, perimeter, readInstructionPart1, readInstructionPart2 } from "./solution";

test.each`
file | readInstruction | expected
${'example.txt'} | ${readInstructionPart1} | ${62}
${'example.txt'} | ${readInstructionPart2} | ${952408144115}
`(
    `getDigSize($file content, $readInstruction) === $expected`, async ({ file, readInstruction, expected }) => {
        const instructions = await getFileLines(join(__dirname, file));
        expect(getDigSize(instructions, readInstruction)).toEqual(expected);
    }
)
