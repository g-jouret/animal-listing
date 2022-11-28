INSERT INTO users (id, name, first_name) VALUES (1, 'Jouret', 'Guillaume');

INSERT INTO animals (id, name, type) VALUES (1, 'Raichu', 2);
INSERT INTO animals (id, name, type) VALUES (2, 'Mitsu', 2);

INSERT INTO owner_pets (user_id, animal_id) VALUES (1, 1);
INSERT INTO owner_pets (user_id, animal_id) VALUES (1, 2);