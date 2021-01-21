// https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string
let string = 'strings';
string =
  string.substr(string.length - 1) === 's' ? string.slice(0, -1) : string;
console.log(string);

let repo = 'repositories';
repo = repo.substr(repo.length - 3) === 'ies' ? `${repo.slice(0, -3)}y` : repo;
// console.log(repo);
