-- Setup table
CREATE TABLE input (
  col1 INTEGER,
  col2 INTEGER
);

-- Read input
\COPY input (col1, col2) FROM './input.txt' WITH DELIMITER ' ';

-- Main
WITH sorted_columns AS (
  SELECT
    col1, col2
  FROM (
    SELECT
      ROW_NUMBER() OVER (ORDER BY col1) AS row_num,
      col1
    FROM input
  ) table_1
  INNER JOIN
  (
    SELECT
      ROW_NUMBER() OVER (ORDER BY col2) AS row_num,
      col2
    FROM input
  ) table_2
  ON table_1.row_num = table_2.row_num
)
SELECT SUM(ABS(col1-col2)) FROM sorted_columns AS answer;

-- Cleanup
DROP TABLE input;
