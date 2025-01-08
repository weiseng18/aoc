% ---- Input handling
% read_grind(+Filename, -Grid)
read_grid(Filename, Grid) :-
  open(Filename, read, Stream),
  read_lines(Stream, Grid),
  close(Stream).

read_lines(Stream, []) :-
  at_end_of_stream(Stream).
read_lines(Stream, [R|Rs]) :-
  \+ at_end_of_stream(Stream),
  read_line_to_string(Stream, String),
  string_chars(String, R),
  read_lines(Stream, Rs).


% ---- Functionality
% find_pattern(+Grid, +Pattern, -Count)
find_pattern(Grid, Pattern, Count) :-
  length(Grid, Rows),
  nth1(1, Grid, FirstRow),
  length(FirstRow, Cols),
  findall(1, search_pattern(Grid, Pattern, Rows, Cols), Matches),
  length(Matches, Count).

% search_pattern(+Grid, +Pattern, +Rows, +Cols)
search_pattern(Grid, Pattern, Rows, Cols) :-
  between(1, Rows, R),
  between(1, Cols, C),
  % only half of it to prevent double count
  member(D, [right, right_down, down, left_down, left, left_up, up, right_up]),
  match_from(Grid, Pattern, R, C, D).

% Check if pattern is matched given (R, C, D).
% match_from(+Grid, +Pattern, +R, +C, +D)
match_from(Grid, Pattern, R, C, D) :-
  pattern_to_offsets(D, Offsets),
  check_match(Grid, Pattern, R, C, Offsets).

% Offsets
pattern_to_offsets(right, [(0,0), (0,1), (0,2), (0,3)]).
pattern_to_offsets(right_down, [(0,0), (1,1), (2,2), (3,3)]).
pattern_to_offsets(down, [(0,0), (1,0), (2,0), (3,0)]).
pattern_to_offsets(left_down, [(0,0), (1,-1), (2,-2), (3,-3)]).
pattern_to_offsets(left, [(0,0), (0,-1), (0,-2), (0,-3)]).
pattern_to_offsets(left_up, [(0,0), (-1,-1), (-2,-2), (-3,-3)]).
pattern_to_offsets(up, [(0,0), (-1,0), (-2,0), (-3,0)]).
pattern_to_offsets(right_up, [(0,0), (-1,1), (-2,2), (-3,3)]).

% check_match(+Grid, +Pattern, +R, +C, +Offsets)
check_match(_, [], _, _, _).
check_match(Grid, [P|Ps], R, C, [(Rd,Cd)|Offsets]) :-
  NR is R + Rd,
  NC is C + Cd,
  nth1(NR, Grid, RowContents),
  nth1(NC, RowContents, P),
  check_match(Grid, Ps, R, C, Offsets).


% ---- Entrypoint
main :-
  read_grid("input.txt", Grid),
  find_pattern(Grid, ['X', 'M', 'A', 'S'], Count),
  writeln(Count).
