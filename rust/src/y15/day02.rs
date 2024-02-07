use crate::utils::file_writer::file_as_lines;

fn solution01(file_name: &str) -> usize {
	let lines = file_as_lines("y15", "day02", file_name);
	let mut wrapper_paper_area = 0;
	for line in lines {
		wrapper_paper_area += get_gift_wrapping_area(&line);
	}
	wrapper_paper_area
}

fn get_gift_wrapping_area(dimensions_line: &str) -> usize {
	let dimensions = dimensions_line
		.split("x")
		.map(|s| s.parse::<usize>().unwrap())
		.collect::<Vec<usize>>();
	let lh = dimensions[0] * dimensions[1];
	let lw = dimensions[1] * dimensions[2];
	let hw = dimensions[2] * dimensions[0];
	let sides = vec![lh, lw, hw];
	let smallest = sides.iter().min();
	match smallest {
		Some(smallest) => smallest + 2 * lh + 2 * lw + 2 * hw,
		None => 0,
	}
}

fn solution02(file_name: &str) -> usize {
	let lines = file_as_lines("y15", "day02", file_name);
	let mut ribbon_length = 0;
	for line in lines {
		ribbon_length += get_gift_ribbon_length(&line);
	}
	ribbon_length
}

fn get_gift_ribbon_length(dimensions_line: &str) -> usize {
	let mut dimensions = dimensions_line
		.split("x")
		.map(|s| s.parse::<usize>().unwrap())
		.collect::<Vec<usize>>();
	dimensions.sort();
	let ribbon_length = dimensions[0] * 2 + dimensions[1] * 2;
	let volume = dimensions[0] * dimensions[1] * dimensions[2];
	ribbon_length + volume
}

#[cfg(test)]
mod tests {
	use rstest::*;

	#[rstest]
	#[case("example.txt", 101)]
	// #[case("input.txt", 1598415)]
	fn problem01(#[case] file_name: &str, #[case] expected: usize) {
		assert_eq!(super::solution01(file_name), expected);
	}

	#[rstest]
	#[case("example.txt", 48)]
	// #[case("input.txt", 3812909)]
	fn problem02(#[case] file_name: &str, #[case] expected: usize) {
		assert_eq!(super::solution02(file_name), expected);
	}
}
