CREATE EXTENSION pgcrypto;

CREATE TABLE REQUESTS
(
    ID UUID NOT NULL DEFAULT gen_random_uuid(),
    URL TEXT,
    REQUEST_ID TEXT,
    EXECUTED_AT DOUBLE PRECISION,
    CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT now(),
    STATUS_CODE INTEGER,
    STATUS_LINE TEXT,
    METHOD TEXT,
    PRIMARY KEY (ID),
    CONSTRAINT UNIQUE_ID UNIQUE (ID));
