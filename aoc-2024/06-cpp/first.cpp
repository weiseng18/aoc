#include <iostream>
#include <vector>
#include <string>
using namespace std;

using ll = long long;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using vi = vector<int>;
using vl = vector<ll>;
using vii = vector<pii>;
using vll = vector<pll>;

#define INF 1e9
#define EPS 1e-9
#define PI 2*acos(0)

#define FOR(i, j, k) for (int i=j; i<k; i++)
#define REP(i, k) for (int i=0; i<k; i++)
#define Vec2D(V, R, C) vector<vi> V(R, vi(C))
#define ALL(x) (x).begin(), (x).end()
#define REV(x) (x).rbegin(), (x).rend()
#define SZ(x) ((int)(x).size())
#define pb push_back
#define eb emplace_back

int dy[4] = {-1, 0, 1, 0},
    dx[4] = {0, 1, 0, -1};

vector<string> grid;

int main() {
  ios_base::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  string s;
  while (getline(cin, s)) {
    grid.eb(s);
  }

  int R = grid.size();
  int C = grid[0].size();

  // find guard pos
  int gy, gx;
  FOR(i, 0, R) FOR(j, 0, C) {
    if (grid[i][j] == '^') {
      gy = i;
      gx = j;
    }
  }

  auto isOOB = [&](int r, int c) {
    return r < 0 || r >= R || c < 0 || c >= C;
  };

  // fill cells (part 1)
  auto fillCells = [&](int r, int c, int dir, auto fillCells) {
    grid[r][c] = 'X';

    dir--;
    int nr, nc;
    do {
      dir = (dir + 1) % 4;
      nr = r + dy[dir], nc = c + dx[dir];
      if (isOOB(nr, nc)) return;
    } while (grid[nr][nc] == '#');

    fillCells(nr, nc, dir, fillCells);
  };

  fillCells(gy, gx, 0, fillCells);

  int ans = 0;
  FOR(i, 0, R) FOR(j, 0, C)
    if (grid[i][j] == 'X')
      ans++;
  cout << ans << "\n";

  return 0;
}


