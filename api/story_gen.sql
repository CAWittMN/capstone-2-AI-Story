\echo "Delete and recreate the story_gen db?"
\prompt "Return for yes or control-C to cancel > " answer

DROP DATABASE IF EXISTS story_gen;
CREATE DATABASE story_gen;
\connect story_gen;

\i story_gen_schema.sql

\echo "Do you want to populate the story_gen db with test data?"
\prompt "Y for yes or N for No > " answer

\if :answer ~ 'Y'
    \i story_gen_test_data.sql
\endif

\echo "Delete and recreate the story_gen_test db?"
\prompt "Return for yes or control-C to cancel > " answer

DROP DATABASE IF EXISTS story_gen_test;
CREATE DATABASE story_gen_test;
\connect story_gen_test;

\i story_gen_schema.sql
\i story_gen_test_data.sql