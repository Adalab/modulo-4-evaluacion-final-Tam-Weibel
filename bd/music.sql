CREATE DATABASE music;
USE music;
CREATE TABLE genres(
genre_id INT auto_increment primary key,
genre_name VARCHAR(15) not null
);
CREATE TABLE artists(
artist_id INT auto_increment primary key,
artist_name VARCHAR(30) not null,
origin VARCHAR(15) not null,
debut_year INT not null,
fk_genre_id INT,
FOREIGN KEY (fk_genre_id) REFERENCES genres(genre_id)
);
CREATE TABLE albums(
album_id INT auto_increment primary key,
album_title VARCHAR(30) not null,
release_year INT not null,
fk_artist_id INT,
fk_genre_id INT,
FOREIGN KEY (fk_artist_id) REFERENCES artists(artist_id),
FOREIGN KEY (fk_genre_id) REFERENCES genres(genre_id)
);

INSERT INTO genres (genre_name) VALUES
    ('Rock'),
    ('Pop'),
    ('Hip Hop'),
    ('Jazz'),
    ('Electronic');
INSERT INTO artists (artist_name, origin, debut_year, fk_genre_id) VALUES
    ('The Rolling Stones', 'United Kingdom', 1962, 1),
    ('Adele', 'United Kingdom', 2006, 2),
    ('Jay-Z', 'United States', 1996, 3),
    ('Queen', 'United Kingdom', 1970, 1),
    ('Rihanna', 'Barbados', 2005, 2),
    ('David Bowie', 'United Kingdom', 1962, 1),
    ('Beyoncé', 'United States', 1997, 2),
    ('Pink Floyd', 'United Kingdom', 1965, 1),
    ('Miles Davis', 'United States', 1944, 4),
    ('Daft Punk', 'France', 1993, 5);
INSERT INTO albums (album_title, release_year, fk_artist_id, fk_genre_id) VALUES
    ('Sticky Fingers', 1971, 1, 1),
    ('21', 2011, 2, 2),
    ('The Blueprint', 2001, 3, 3),
    ('A Night at the Opera', 1975, 4, 1),
    ('Good Girl Gone Bad', 2007, 5, 2),
    ('The Rise and Fall of Ziggy Stardust', 1972, 6, 1),
    ('Lemonade', 2016, 7, 2),
    ('The Dark Side of the Moon', 1973, 8, 1),
    ('Kind of Blue', 1959, 9, 4),
    ('Random Access Memories', 2013, 10, 5);

