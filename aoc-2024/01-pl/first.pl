% ---- Input handling
read_lines(Stream, [], []) :-
  at_end_of_stream(Stream).
read_lines(Stream, [A|As], [B|Bs]) :-
  \+ at_end_of_stream(Stream),
  read_line_to_string(Stream, String),
  split_string(String, "\s", "\s", StrList),
  % extract first 2 elements of the list of length 2
  maplist(number_string, [A,B|_], StrList),
  read_lines(Stream, As, Bs).

read_input(Filename, As, Bs) :-
  open(Filename, read, Stream),
  read_lines(Stream, As, Bs),
  close(Stream).


% ---- Sorting
% merge_sort(+Input, -Output)
merge_sort([], []).
merge_sort([X], [X]).
merge_sort(Input, Output) :-
  partition(Input, L, R),
  merge_sort(L, LDone),
  merge_sort(R, RDone),
  merge(Output, LDone, RDone).

% partition(+Arr, -L, -R)
partition([], [], []).
partition([X], [X], []).
partition([X,Y|Arr], [X|Xs], [Y|Ys]) :- partition(Arr, Xs, Ys).

% merge(-Arr, +Xs, +Ys)
merge([], [], []).
merge(Xs, Xs, []).
merge(Ys, [], Ys).
merge([X|Zs], [X|Xs], [Y|Ys]) :- X =< Y, merge(Zs, Xs, [Y|Ys]).
merge([Y|Zs], [X|Xs], [Y|Ys]) :- X > Y, merge(Zs, [X|Xs], Ys).

% compare_and_assign(+X, +Y, -A, -B)
compare_and_assign(X, Y, X, Y) :- X =< Y.
compare_and_assign(X, Y, Y, X) :- X > Y.


% ---- Functionality
% collect(-Ds, +As, +Bs)
collect([], [], []).
collect([D|Ds], [A|As], [B|Bs]) :-
  compare_and_assign(A,B,Lower,Higher),
  D is Higher - Lower,
  collect(Ds, As, Bs).

% sum_list(-Sum, +Xs).
sum_list(0, []).
sum_list(Sum, [X|Xs]) :-
  sum_list(PartialSum, Xs),
  Sum is PartialSum + X.


% ---- Debug
print_list([]).
print_list([X|Xs]) :- writeln(X), print_list(Xs).

print_lists([], []).
print_lists([X|Xs], [Y|Ys]) :-
  writeln(X + Y),
  print_lists(Xs, Ys).


% ---- Entrypoint
main :-
  read_input("input.txt", As, Bs),
  merge_sort(As, SortedAs),
  merge_sort(Bs, SortedBs),
  collect(Ds, SortedAs, SortedBs),
  sum_list(Res, Ds),
  writeln(Res).
