CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' in email) > 1),
    age INTEGER NOT NULL,
    gender VARCHAR(10),
    is_admin BOOLEAN DEFAULT FALSE,
);

CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    gen_images BOOLEAN DEFAULT TRUE,
    gen_audio BOOLEAN DEFAULT TRUE,
    prompt TEXT NOT NULL,
    char_success BOOLEAN,
    last_updated DATE DEFAULT CURRENT_DATE,
    curr_summary TEXT,
    max_chapters INTEGER NOT NULL,
);

CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
    text_content TEXT NOT NULL,
    img TEXT,
    audio TEXT,
    user_prompt TEXT NOT NULL,
);

