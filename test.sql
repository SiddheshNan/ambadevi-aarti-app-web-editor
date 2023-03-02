DROP TABLE IF EXISTS kakadAarti;
CREATE TABLE IF NOT EXISTS[kakadAarti] (
  [number] TEXT PRIMARY KEY,
  [name] TEXT NOT NULL,
  [search_txt] TEXT
);

INSERT INTO [kakadAarti] VALUES
('1','अंबादेवी काकड आरती','["amba devi kakad aarti"]'),
('2','एकविरा देवी काकड आरती','["ekvira devi kakad aarti"]');