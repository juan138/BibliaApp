

CREATE TABLE books (
    id_book INT ,
    name_book VARCHAR(100) ,
    modern_name VARCHAR(100) ,
    new_testament int 
); 

CREATE TABLE verses (
    book_id int,
    chapter int,
    verse int,
    text TEXT 
); 