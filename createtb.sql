CREATE TABLE topic (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    timetomaster INT,
    timespent INT,
    source VARCHAR(255),
    startlearningdate TIMESTAMP,
    inprogress BOOLEAN
);