"" clear register clipboard
qbq
:wshada!


"" Wh
"" "By$
"" 0Wh
"" d$
:%norm Wh"By$0Whd$

"" paste the second column
"bp0Whs<Enter><Enter><Esc>

V:s/ /\r/g<Enter>

"" Sort each half
:let elems = (line('$') - 1) / 2
:execute "1," . elems .  "sort"
:execute elems+1 . "," . line('$') . "sort"

"" Add trailing endline to avoid if statement dance
GA<Enter><Esc>

:let count = elems + 2
gg
qa}jdd
:let count = count - 1
:execute "normal " . (count) . "k"
pkJ0q

:execute "normal " . (elems-1) . "@a"

gg0
qa
iabs(<Esc>Whs-<Esc>A)<Esc>

"" replace line with calc result
0d$
i<C-R>=<C-R>"<Enter><Esc>0jq

:execute "normal " . (elems-1) . "@a"

gg
:execute "normal " . (elems) . "J"
V:s/ /+/g

"" replace line with calc result
0d$
i<C-R>=<C-R>"<Enter><Esc>

"" done!!
