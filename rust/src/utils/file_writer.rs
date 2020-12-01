use std::{fs::File, io::{Read, BufReader, BufRead}};

#[allow(dead_code)]
pub fn file_as_string(year:&str, test_name: &str, file_name: &str) -> String {
	let mut buf = String::new();
    File::open(format!("inputs/{}/{}/{}", year, test_name, file_name)).unwrap().read_to_string(&mut buf).unwrap();
    buf
}

#[allow(dead_code)]
pub fn file_as_lines(year:&str, test_name: &str, file_name: &str) -> impl Iterator<Item = String> {
	let reader = BufReader::new(File::open(format!("inputs/{}/{}/{}", year, test_name, file_name)).unwrap());
	reader.lines().map(|l| l.unwrap())
}

