use crate::utils::file_writer::file_as_string;

fn solution01(file_name: &str) -> isize {
	let input = file_as_string("y15", "day01", file_name);
    let mut floor = 0;
	for next_operation in input.chars() {
		if next_operation == '(' {
			floor += 1;
		} else if next_operation == ')' {
			floor -= 1;
		}
	}
	floor
}

fn solution02(file_name: &str) -> isize {
	let input = file_as_string("y15", "day01", file_name);
    let mut floor = 0;
	let mut visited_floors = 0;
	for next_operation in input.chars() {
		if next_operation == '(' {
			floor += 1;
		} else if next_operation == ')' {
			floor -= 1;
		}
		visited_floors += 1;
		if floor < 0 {
			break;
		}
	}
	visited_floors
}

#[cfg(test)]
mod tests {
	use rstest::*;

    #[rstest]
	#[case("example01.txt", 0)]
	#[case("example02.txt", 0)]
	#[case("example03.txt", 3)]
	#[case("example04.txt", 3)]
	#[case("example05.txt", 3)]
	#[case("example06.txt", -1)]
	#[case("example07.txt", -1)]
	#[case("example08.txt", -3)]
	#[case("example09.txt", -3)]
	// #[case("input.txt", 232)]
    fn problem01(#[case] file_name: &str, #[case] expected: isize) {
		assert_eq!(
			expected,
			super::solution01(file_name),
			"Test for solution 01 failed for file {} when expecting {}",
			file_name,
			expected);
    }

    #[rstest]
	#[case("example10.txt", 1)]
	#[case("example11.txt", 5)]
	// #[case("input.txt", 1783)]
    fn problem02(#[case] file_name: &str, #[case] expected: isize) {
		assert_eq!(
			expected,
			super::solution02(file_name),
			"Test for solution 02 failed for file {} when expecting {}",
			file_name,
			expected);
    }
}
