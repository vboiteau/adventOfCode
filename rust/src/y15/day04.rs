fn solution01(secret_key: &str, starts_with: &str) -> usize {
	let mut string_digest: String = String::new();
	let mut i = 0;
	while string_digest.starts_with(starts_with) == false {
		i += 1;
		let digest = md5::compute(secret_key.to_owned() + &i.to_string());
		string_digest = format!("{:x}", digest);
	}
	i
}

#[cfg(test)]
mod tests {
	use rstest::*;

	#[rstest]
	#[case("abcdef", "00000", 609043)]
	#[case("pqrstuv", "00000", 1048970)]
	#[case("bgvyzdsv", "00000", 254575)]
	#[case("bgvyzdsv", "000000", 1038736)]
	fn problem01(#[case] secret_key: &str, #[case] starts_with: &str, #[case] expected: usize) {
		assert_eq!(super::solution01(secret_key, starts_with), expected);
	}
}
