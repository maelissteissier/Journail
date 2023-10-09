-- CREATE TABLE user (
-- 	id INTEGER NOT NULL,
-- 	username VARCHAR(80) NOT NULL,
-- 	password VARCHAR(50) NOT NULL,
-- 	email VARCHAR(200) NOT NULL,
-- 	creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
-- 	PRIMARY KEY (id),
-- 	UNIQUE (email)
-- );

CREATE TABLE food_ref (
	id INTEGER NOT NULL,
	original_calory INTEGER NOT NULL,
	original_quantity INTEGER NOT NULL,
	name VARCHAR(80) NOT NULL,
	quantity_type VARCHAR(80) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (name)
);

CREATE TABLE journal_category (
	id INTEGER NOT NULL,
	name VARCHAR(80) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (name)
);


CREATE TABLE food_journal_entry (
	id INTEGER NOT NULL,
	date DATETIME NOT NULL,
	quantity INTEGER,
	quantity_type VARCHAR(80),
	calories INTEGER NOT NULL,
	thoughts VARCHAR(1000),
	name VARCHAR(100),
	"foodRef_id" INTEGER,
	"journalCategory_id" INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY("foodRef_id") REFERENCES food_ref (id),
	FOREIGN KEY("journalCategory_id") REFERENCES journal_category (id)
);

CREATE TABLE text_journal_entry (
	id INTEGER NOT NULL,
	date DATETIME NOT NULL,
	text VARCHAR(1000) NOT NULL,
	"journalCategory_id" INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY("journalCategory_id") REFERENCES journal_category (id)
);

CREATE TABLE weight (
    id INTEGER NOT NULL,
    weight REAL NOT NULL,
    -- either LBS or KG
    unit VARCHAT(5),
    date DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE calorie_goal (
    id INTEGER NOT NULL,
    calorie_goal INTEGER NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY (id)
);