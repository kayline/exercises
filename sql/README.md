# Advanced SQL Features

## Contents <!-- omit in toc>

- [Contents \<!-- omit in toc\>](#contents----omit-in-toc)
- [Preparation](#preparation)
  - [Queries](#queries)
- [Common Table Expressions](#common-table-expressions)
- [Window Functions](#window-functions)
  - [`CUME_DIST`](#cume_dist)
  - [`DENSE_RANK`](#dense_rank)
  - [`FIRST_VALUE`](#first_value)
  - [`LAG`](#lag)
  - [`LAST_VALUE`](#last_value)
  - [`LEAD`](#lead)
  - [`NTILE`](#ntile)
  - [`NTH_VALUE`](#nth_value)
  - [`PERCENT_RANK`](#percent_rank)
  - [`RANK`](#rank)
  - [`ROW_NUMBER`](#row_number)
- [`LATERAL` Joins](#lateral-joins)

## Preparation

We are going to look at various aspects of director + actor collaboration.

1. Are there movies with more than one director?
1. If yes, what does the distribution look like?

### Queries

Remember, the `title` table contains information about movies, TV shows, miniseries, etc. You have to join other tables if you only want to look at one type of media.

Also, the IMDB database contains lots of no-name movies. Preemptively filtering the set of movies you're considering by number of votes can help. When looking at movies I suggest only looking at movies with more than 200 votes.

- Highest-rated movie per year
- 3 highest-rated movies per year
- Interquartile range of ratings per movie per year
- For each director, what pecent of their corpus are we filtering out by removing the movies with the N lowest votes?
- Directors by highest rated first movie
- Director with longest gap between movies

## Common Table Expressions

See <https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-cte/>

Common Table Expressions (CTEs) allow you to define named subqueries, set apart from the rest of the query. They can be used multiple times in a query and PostgreSQL can take advantage of that. Their main benefit is probably improved readability, though.

```sql
WITH movies AS (
  SELECT *
  FROM title t
  JOIN kind_type kt
    ON (kt.id = t.kind_id)
  WHERE kt.kind = 'movies'
)
SELECT
  movies.production_year,
  COUNT(*) per_year
FROM movies
GROUP BY production_year;
```

## Window Functions

### `CUME_DIST`

### `DENSE_RANK`

### `FIRST_VALUE`

### `LAG`

### `LAST_VALUE`

### `LEAD`

### `NTILE`

### `NTH_VALUE`

### `PERCENT_RANK`

### `RANK`

### `ROW_NUMBER`

## `LATERAL` Joins

See <https://www.heap.io/blog/postgresqls-powerful-new-join-type-lateral> and <https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-LATERAL>

`LATERAL` joins are kind of like a "for each" loop. If you've ever wanted to join AT MOST a certain number of row then `LATERAL` allows you to do this.

This effectively lets you call a function for each row in the outer query. That function might be a correlated subquery, allowing you to reference outer fields in the inner query.

It's one way to compute "Top N" queries.

For example, if we wanted the 3 most recent comments from each user, we might write a query like this:

```sql
SELECT *
FROM users u
JOIN LATERAL (
  SELECT *
  FROM comments c
  WHERE c.user_id = u.id
  ORDER BY c.created_at DESC
  LIMIT 3
) t ON true;
```
