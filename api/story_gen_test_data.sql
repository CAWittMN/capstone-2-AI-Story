INSERT INTO users (username, password, age, gender, is_admin)
VALUES ('user1test',
'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
12,
"male",
FALSE),
("user2test",
'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
25,
"female",
TRUE
),
("user3test",
'$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
25,
"male",
FALSE);

INSERT INTO stories (user_id, title, completed, gen_images, gen_audio, prompt, char_success, max_chapters)