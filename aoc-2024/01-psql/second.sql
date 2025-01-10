-- Setup table
CREATE TABLE input (
  col1 INTEGER,
  col2 INTEGER
);

-- Read input
\COPY input (col1, col2) FROM './input.txt' WITH DELIMITER ' ';

-- Main
WITH full_join AS (
  SELECT *
  FROM (
    SELECT
      ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS rownum1,
      col1
    FROM input
  ) table1
  FULL JOIN
  (
    SELECT
      ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS rownum2,
      col2
    FROM input
  ) table2
  ON 1=1
),
intermediate AS (
  SELECT
    rownum1,
    col1,
    COUNT (
      CASE WHEN col1=col2 THEN 1 END
    ) OVER (PARTITION BY rownum1) AS freq
  FROM full_join
),
remove_dupes AS (
  SELECT *
  FROM intermediate
  GROUP BY rownum1, col1, freq
  ORDER BY rownum1
)
SELECT SUM(col1*freq) AS answer FROM remove_dupes;

-- Cleanup
DROP TABLE input;
