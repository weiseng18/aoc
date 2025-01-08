#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <set>
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

  // collect possible obstacle positions
  vector<pii> positions;
  FOR(i, 0, R) FOR(j, 0, C)
    if (grid[i][j] == 'X' && !(i == gy && j == gx)) {
      positions.eb(i, j);
      grid[i][j] = '.';
    }
  grid[gy][gx] = '.';

  map<pii, set<int> > visited;
  auto hasLoop = [&](int r, int c, int dir, auto hasLoop) {
    if (visited[{r,c}].contains(dir)) {
      return true;
    }
    visited[{r,c}].emplace(dir);

    int nr, nc;

    int origDir = dir;
    bool doneAtLeastOnce = false;
    
    dir--;
    do {
      doneAtLeastOnce = true;

      dir = (dir + 1) % 4;
      nr = r + dy[dir], nc = c + dx[dir];
      if (isOOB(nr, nc)) return false;
      
      // surrounded
      if (doneAtLeastOnce && origDir == (dir+1)%4) {
        return true;
      }
    } while (grid[nr][nc] == '#');

    return hasLoop(nr, nc, dir, hasLoop);
  };
 
  int ans = 0;
  for (auto &[r, c]: positions) {
    visited.clear();
    grid[r][c] = '#';
    if (hasLoop(gy, gx, 0, hasLoop)) {
        ans++;
    }
    grid[r][c] = '.';
  }
  cout << ans << "\n";

  return 0;
}
