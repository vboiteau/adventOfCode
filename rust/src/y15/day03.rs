use crate::utils::file_writer::file_as_string;

struct House {
	x: i32,
	y: i32,
	visited: i32
}

struct Position {
	x: i32,
	y: i32
}

fn solution01(file_name: &str) -> usize {
	let moves: String = file_as_string("y15", "day03", file_name);
	let houses = count_houses_in_moves(moves.chars().collect());
	houses.len()
}


fn solution02(file_name: &str) -> usize {
	let moves: String = file_as_string("y15", "day03", file_name);
	let santa_moves: Vec<char> = moves.chars().step_by(2).collect();
	let robo_moves: Vec<char> = moves.chars().skip(1).step_by(2).collect();
	let mut houses = count_houses_in_moves(santa_moves);
	let robo_houses = &mut count_houses_in_moves(robo_moves);
	let mut only_robo_houses = Vec::new();
	for robo_house in robo_houses {
		if (houses.iter().position(|h| h.x == robo_house.x && h.y == robo_house.y)).is_none() {
			only_robo_houses.push(House { x: robo_house.x, y: robo_house.y, visited: robo_house.visited });
		}
	}
	houses.append(&mut only_robo_houses);
	houses.len()
}

fn count_houses_in_moves(moves: Vec<char>) -> Vec<House> {
	let mut houses: Vec<House> = Vec::new();
	let mut current_pos = Position { x: 0, y: 0 };
	houses.push(House { x: current_pos.x, y: current_pos.y, visited: 1 });
	for next_move in moves {
		match next_move {
			'<' =>  current_pos.x -= 1,
			'>' => current_pos.x += 1,
			'^' => current_pos.y += 1,
			'v' => current_pos.y -= 1,
			_ => continue
		}
		let index: Option<usize> = houses.iter().position(|h| h.x == current_pos.x && h.y == current_pos.y);
		if index.is_none() {
			houses.push(House { x: current_pos.x, y: current_pos.y, visited: 1 });
		} else {
			houses[index.unwrap()].visited += 1;
		}
	}
	houses
}

#[cfg(test)]
mod tests {
	use rstest::*;

	#[rstest]
	#[case("example01.txt", 2)]
	#[case("example02.txt", 4)]
	#[case("example03.txt", 2)]
	// #[case("input.txt", 2592)]
	fn problem01(#[case] file_name: &str, #[case] expected: usize) {
		assert_eq!(super::solution01(file_name), expected);
	}

	#[rstest]
	#[case("example04.txt", 3)]
	#[case("example02.txt", 3)]
	#[case("example03.txt", 11)]
	// #[case("input.txt", 2360)]
	fn problem02(#[case] file_name: &str, #[case] expected: usize) {
		assert_eq!(super::solution02(file_name), expected);
	}
}
