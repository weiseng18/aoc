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
  member(D, [right_down, left_up]),
  match_from(Grid, Pattern, R, C, D).

% Check if pattern is matched given (R, C, D).
% match_from(+Grid, +Pattern, +R, +C, +D)
match_from(Grid, Pattern, R, C, D) :-
  % first check
  pattern_to_offsets(D, Off1),
  check_match(Grid, Pattern, R, C, Off1),
  % check that ANY of the offset pairs work
  pattern_pair(D, D2),
  pattern_to_offsets(D2, Off2),
  check_match(Grid, Pattern, R, C, Off2),
  writeln(R+C+D+D2).

% Offsets (with A as the center)
pattern_to_offsets(right_down, [(-1,-1), (0,0), (1,1)]).
pattern_to_offsets(left_down, [(-1,1), (0,0), (1,-1)]).
pattern_to_offsets(left_up, [(1,1), (0,0), (-1,-1)]).
pattern_to_offsets(right_up, [(1,-1), (0,0), (-1,1)]).

% Pattern pairings
% - first element in the pair is part of the half that is
%   considered in the double count prevention, i.e. one of
%   [right_down, left_up]
%
pattern_pair(right_down, left_down).
pattern_pair(right_down, right_up).
pattern_pair(left_up, left_down).
pattern_pair(left_up, right_up).

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
  find_pattern(Grid, ['M', 'A', 'S'], Count),
  writeln(Count).
