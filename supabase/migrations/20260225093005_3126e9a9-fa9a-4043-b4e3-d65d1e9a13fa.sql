
DO $$
DECLARE
  cat RECORD;
  existing_id uuid;
  first_id uuid;
BEGIN
  -- For each Math category
  FOR cat IN SELECT id FROM worksheet_categories WHERE subject = 'Math' LOOP
    -- Addition
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Addition' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Addition WS','Addition Worksheet') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN
        UPDATE worksheet_subcategories SET title='Addition', slug='addition' WHERE id=first_id;
      END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Addition WS','Addition Worksheet','Word Problems','Word Problems WS');

    -- Subtraction
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Subtraction' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Subtraction WS' ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Subtraction', slug='subtraction' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title='Subtraction WS';

    -- Place Value
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Place Value' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Place Value WS','Counting Number Sense WS','Counting Number Sense','Comparing Numbers WS','Comparing Numbers') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Place Value', slug='place-value' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Place Value WS','Counting Number Sense WS','Counting Number Sense','Comparing Numbers WS','Comparing Numbers');

    -- Measurement
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Measurement' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Measurement Basics','Measurement Basics WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Measurement', slug='measurement' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Measurement Basics','Measurement Basics WS');

    -- Time & Money
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Time & Money' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Time Money','Time & Money WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Time & Money', slug='time-money' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Time Money','Time & Money WS');

    -- Shapes
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Shapes' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Shapes Patterns','Shapes Patterns WS','Geometry','Geometry WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Shapes', slug='shapes' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Shapes Patterns','Shapes Patterns WS','Geometry','Geometry WS');

    -- Normalize slugs
    UPDATE worksheet_subcategories SET slug='addition' WHERE category_id=cat.id AND title='Addition';
    UPDATE worksheet_subcategories SET slug='subtraction' WHERE category_id=cat.id AND title='Subtraction';
    UPDATE worksheet_subcategories SET slug='multiplication' WHERE category_id=cat.id AND title='Multiplication';
    UPDATE worksheet_subcategories SET slug='division' WHERE category_id=cat.id AND title='Division';
    UPDATE worksheet_subcategories SET slug='fractions' WHERE category_id=cat.id AND title='Fractions';
    UPDATE worksheet_subcategories SET slug='place-value' WHERE category_id=cat.id AND title='Place Value';
    UPDATE worksheet_subcategories SET slug='shapes' WHERE category_id=cat.id AND title='Shapes';
    UPDATE worksheet_subcategories SET slug='measurement' WHERE category_id=cat.id AND title='Measurement';
    UPDATE worksheet_subcategories SET slug='time-money' WHERE category_id=cat.id AND title='Time & Money';
  END LOOP;

  -- For each English category
  FOR cat IN SELECT id FROM worksheet_categories WHERE subject = 'English' LOOP
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Grammar' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Grammar Updated','Grammar WS','English Grammar WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Grammar', slug='grammar' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Grammar Updated','Grammar WS','English Grammar WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Reading' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Reading Comprehension','Reading Comprehension WS','Reading WS','English Reading WS','Reading Rc1 WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Reading', slug='reading' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Reading Comprehension','Reading Comprehension WS','Reading WS','English Reading WS','Reading Rc1 WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Phonics' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Phonics WS','English Phonics WS','Phonics Ph5c WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Phonics', slug='phonics' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Phonics WS','English Phonics WS','Phonics Ph5c WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Vocabulary' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Vocabulary WS','English Vocab WS','Vocab C3 WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Vocabulary', slug='vocabulary' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Vocabulary WS','English Vocab WS','Vocab C3 WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Writing' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('English Spelling WS','Spelling Spl1 WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Writing', slug='writing' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('English Spelling WS','Spelling Spl1 WS');

    -- Delete non-standard
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title NOT IN ('Reading','Grammar','Vocabulary','Writing','Phonics');

    UPDATE worksheet_subcategories SET slug='reading' WHERE category_id=cat.id AND title='Reading';
    UPDATE worksheet_subcategories SET slug='grammar' WHERE category_id=cat.id AND title='Grammar';
    UPDATE worksheet_subcategories SET slug='vocabulary' WHERE category_id=cat.id AND title='Vocabulary';
    UPDATE worksheet_subcategories SET slug='writing' WHERE category_id=cat.id AND title='Writing';
    UPDATE worksheet_subcategories SET slug='phonics' WHERE category_id=cat.id AND title='Phonics';
  END LOOP;

  -- For each Science category
  FOR cat IN SELECT id FROM worksheet_categories WHERE subject = 'Science' LOOP
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Plants & Animals' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Animals WS','Animals','Science Animals WS','Animals Habitats WS','Science Plants Worksheet','Science Plants WS','Plants','Plants WS','Plants Photosynthesis WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Plants & Animals', slug='plants-animals' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Animals WS','Animals','Science Animals WS','Animals Habitats WS','Science Plants Worksheet','Science Plants WS','Plants','Plants WS','Plants Photosynthesis WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='My Body' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Human Body WS','Human Body','Science Body WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='My Body', slug='my-body' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Human Body WS','Human Body','Science Body WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Family & Home' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Science Housing WS' ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Family & Home', slug='family-home' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title='Science Housing WS';

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Food & Water' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Science Food WS','Food & Digestion WS','Food Nutrition WS','Water WS','Science Materials WS','Materials WS','Materials') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Food & Water', slug='food-water' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Science Food WS','Food & Digestion WS','Food Nutrition WS','Water WS','Science Materials WS','Materials WS','Materials');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Environment' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Environment WS','Environment','Weather WS','Weather','Science Weather WS','Air & Weather WS','Air Weather WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Environment', slug='environment' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Environment WS','Weather WS','Weather','Science Weather WS','Air & Weather WS','Air Weather WS');

    -- Delete remaining non-standard
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title NOT IN ('Plants & Animals','My Body','Family & Home','Food & Water','Environment');
  END LOOP;

  -- For each Computer Science category
  FOR cat IN SELECT id FROM worksheet_categories WHERE subject = 'Computer Science' LOOP
    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Computer Basics' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Computer Basics WS','CS Basics WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Computer Basics', slug='computer-basics' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Computer Basics WS','CS Basics WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Keyboard & Mouse' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Keyboard & Mouse WS','Keyboard Mouse WS') ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Keyboard & Mouse', slug='keyboard-mouse' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title IN ('Keyboard & Mouse WS','Keyboard Mouse WS');

    SELECT id INTO existing_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Digital Safety' LIMIT 1;
    IF existing_id IS NULL THEN
      SELECT id INTO first_id FROM worksheet_subcategories WHERE category_id=cat.id AND title='Digital Safety WS' ORDER BY id LIMIT 1;
      IF first_id IS NOT NULL THEN UPDATE worksheet_subcategories SET title='Digital Safety', slug='digital-safety' WHERE id=first_id; END IF;
    END IF;
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title='Digital Safety WS';

    DELETE FROM worksheet_subcategories WHERE category_id=cat.id AND title NOT IN ('Computer Basics','Keyboard & Mouse','Digital Safety');
  END LOOP;

  -- Assignments: clear and rebuild
  FOR cat IN SELECT id FROM worksheet_categories WHERE subject = 'Assignments' LOOP
    DELETE FROM worksheet_subcategories WHERE category_id=cat.id;
  END LOOP;

  -- ==========================================================
  -- Insert missing standard subcategories
  -- ==========================================================
  INSERT INTO worksheet_subcategories (category_id, title, slug, sort_order)
  SELECT c.id, v.title, v.slug || '-g' || c.grade, v.sort_order
  FROM worksheet_categories c
  CROSS JOIN (VALUES ('Addition','addition',1),('Subtraction','subtraction',2),('Multiplication','multiplication',3),('Division','division',4),('Place Value','place-value',5),('Fractions','fractions',6),('Shapes','shapes',7),('Measurement','measurement',8),('Time & Money','time-money',9)) AS v(title, slug, sort_order)
  WHERE c.subject='Math' AND NOT EXISTS (SELECT 1 FROM worksheet_subcategories s WHERE s.category_id=c.id AND s.title=v.title);

  INSERT INTO worksheet_subcategories (category_id, title, slug, sort_order)
  SELECT c.id, v.title, v.slug || '-g' || c.grade, v.sort_order
  FROM worksheet_categories c
  CROSS JOIN (VALUES ('Reading','reading',1),('Grammar','grammar',2),('Vocabulary','vocabulary',3),('Writing','writing',4),('Phonics','phonics',5)) AS v(title, slug, sort_order)
  WHERE c.subject='English' AND NOT EXISTS (SELECT 1 FROM worksheet_subcategories s WHERE s.category_id=c.id AND s.title=v.title);

  INSERT INTO worksheet_subcategories (category_id, title, slug, sort_order)
  SELECT c.id, v.title, v.slug || '-g' || c.grade, v.sort_order
  FROM worksheet_categories c
  CROSS JOIN (VALUES ('Plants & Animals','plants-animals',1),('My Body','my-body',2),('Family & Home','family-home',3),('Food & Water','food-water',4),('Environment','environment',5)) AS v(title, slug, sort_order)
  WHERE c.subject='Science' AND NOT EXISTS (SELECT 1 FROM worksheet_subcategories s WHERE s.category_id=c.id AND s.title=v.title);

  INSERT INTO worksheet_subcategories (category_id, title, slug, sort_order)
  SELECT c.id, v.title, v.slug || '-g' || c.grade, v.sort_order
  FROM worksheet_categories c
  CROSS JOIN (VALUES ('Computer Basics','computer-basics',1),('Keyboard & Mouse','keyboard-mouse',2),('Digital Safety','digital-safety',3)) AS v(title, slug, sort_order)
  WHERE c.subject='Computer Science' AND NOT EXISTS (SELECT 1 FROM worksheet_subcategories s WHERE s.category_id=c.id AND s.title=v.title);

  INSERT INTO worksheet_subcategories (category_id, title, slug, sort_order)
  SELECT c.id, v.title, v.slug || '-g' || c.grade, v.sort_order
  FROM worksheet_categories c
  CROSS JOIN (VALUES ('English Assignment Packs','english-assignment-packs',1),('Math Assignment Packs','math-assignment-packs',2),('EVS Assignment Packs','evs-assignment-packs',3),('Mixed Subject Revision Sheets','mixed-subject-revision-sheets',4)) AS v(title, slug, sort_order)
  WHERE c.subject='Assignments' AND NOT EXISTS (SELECT 1 FROM worksheet_subcategories s WHERE s.category_id=c.id AND s.title=v.title);

END $$;
