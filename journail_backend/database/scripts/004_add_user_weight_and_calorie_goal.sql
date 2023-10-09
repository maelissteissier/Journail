CREATE TABLE user (
	id INTEGER NOT NULL,
	username VARCHAR(80) NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(200) NOT NULL,
	creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	UNIQUE (email)
);

CREATE TABLE weight (
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    weight REAL NOT NULL,
    -- either LBS or KG
    unit VARCHAT(5),
    date DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY("user_id") REFERENCES user (id)
);

CREATE TABLE calorie_goal (
    id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    calorie_goal INTEGER NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY("user_id") REFERENCES user (id)
);

INSERT INTO user values (1, 'Maeliss Teissier', 'jvpdp70<3', 'maeliss.teissier@gmail.com' );




ALTER TABLE journal_category
ADD user_id INTEGER NOT NULL DEFAULT 1,
ADD FOREIGN KEY ("user_id") REFERENCES user (id);



ALTER TABLE food_journal_entry
ADD user_id INTEGER NOT NULL DEFAULT 1,
ADD FOREIGN KEY ("user_id") REFERENCES user (id);

ALTER TABLE text_journal_entry
ADD user_id INTEGER NOT NULL DEFAULT 1,
ADD FOREIGN KEY ("user_id") REFERENCES user (id);
