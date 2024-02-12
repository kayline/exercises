-- Below are a bunch of "plain English" sentences.  Your job is to take a stab
-- at translating each one into a single SELECT query.  You can write your
-- query below each "plain English" sentence.

-- Some things to keep in mind about the `imdb` schema:
--
-- 1. The `title` table contains information about ALL entities on IMDb:
--    movies, TV shows, miniseries, etc. You have to join other tables if you
--    only want to look at one type of media.
--
-- 2. The IMDb database contains lots of no-name movies. It can help to
--    preemptively filtering the set of movies you're querying by the number of
--    votes, e.g., only look at movies with at least 200 votes.

-- QUERIES --

-- The highest-rated and lowest-rated movies per year, with ties
-- broken by highest number of votes.

-- The 3 highest-rated movies per year, with ties broken by highest
-- number of votes.

-- Directors by highest-rated first movie

-- All directors whose first movie was rated higher than the median
-- first movie

-- Directors by length of career, as measured by difference in
-- release of the first movie and last movie

-- Movies with sequels sorted by the biggest difference in rating
-- between the first and second movies.

-- Director/actor collaborations, ordered by numbers of times they
-- collaborated

-- Produce a "collaboration matrix" for a given director.
-- Have one column per film directed and one row per actor they
-- collaborated with. Put a '1'/'t'/etc. in a cell if the corresponding
-- actor starred in that film and a '0'/'f'/etc. if they didn't.
-- Feel free to limit the number of rows to the "Top 5" or "Top N" collaborators.
