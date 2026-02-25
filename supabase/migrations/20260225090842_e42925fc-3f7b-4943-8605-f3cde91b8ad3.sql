
UPDATE public.worksheets
SET sub_category = CASE
  -- Math
  WHEN subject = 'math' AND (title ILIKE '%addition%' OR title ILIKE '%adding%') THEN 'Addition'
  WHEN subject = 'math' AND (title ILIKE '%subtraction%' OR title ILIKE '%subtract%') THEN 'Subtraction'
  WHEN subject = 'math' AND (title ILIKE '%multiplication%' OR title ILIKE '%multiply%' OR title ILIKE '%times table%') THEN 'Multiplication'
  WHEN subject = 'math' AND (title ILIKE '%division%' OR title ILIKE '%divide%') THEN 'Division'
  WHEN subject = 'math' AND title ILIKE '%place value%' THEN 'Place Value'
  WHEN subject = 'math' AND title ILIKE '%fraction%' THEN 'Fractions'
  WHEN subject = 'math' AND (title ILIKE '%shape%' OR title ILIKE '%geometry%') THEN 'Shapes'
  WHEN subject = 'math' AND (title ILIKE '%measurement%' OR title ILIKE '%length%' OR title ILIKE '%weight%' OR title ILIKE '%capacity%') THEN 'Measurement'
  WHEN subject = 'math' AND (title ILIKE '%time%' OR title ILIKE '%clock%' OR title ILIKE '%money%') THEN 'Time & Money'
  WHEN subject = 'math' AND (title ILIKE '%number%' OR title ILIKE '%counting%' OR title ILIKE '%pattern%') THEN 'Place Value'
  -- English
  WHEN subject = 'english' AND (title ILIKE '%comprehension%' OR title ILIKE '%reading%' OR title ILIKE '%passage%') THEN 'Reading'
  WHEN subject = 'english' AND (title ILIKE '%grammar%' OR title ILIKE '%noun%' OR title ILIKE '%verb%' OR title ILIKE '%adjective%' OR title ILIKE '%tense%' OR title ILIKE '%punctuation%') THEN 'Grammar'
  WHEN subject = 'english' AND (title ILIKE '%vocabulary%' OR title ILIKE '%spelling%' OR title ILIKE '%synonym%' OR title ILIKE '%antonym%') THEN 'Vocabulary'
  WHEN subject = 'english' AND (title ILIKE '%writing%' OR title ILIKE '%composition%' OR title ILIKE '%paragraph%' OR title ILIKE '%sentence%') THEN 'Writing'
  WHEN subject = 'english' AND (title ILIKE '%phonics%' OR title ILIKE '%vowel%' OR title ILIKE '%consonant%') THEN 'Phonics'
  -- EVS
  WHEN subject = 'evs' AND (title ILIKE '%plant%' OR title ILIKE '%animal%' OR title ILIKE '%bird%' OR title ILIKE '%insect%') THEN 'Plants & Animals'
  WHEN subject = 'evs' AND (title ILIKE '%body%' OR title ILIKE '%health%' OR title ILIKE '%hygiene%') THEN 'My Body'
  WHEN subject = 'evs' AND (title ILIKE '%family%' OR title ILIKE '%home%' OR title ILIKE '%house%') THEN 'Family & Home'
  WHEN subject = 'evs' AND (title ILIKE '%food%' OR title ILIKE '%water%' OR title ILIKE '%nutrition%') THEN 'Food & Water'
  WHEN subject = 'evs' AND (title ILIKE '%environment%' OR title ILIKE '%weather%' OR title ILIKE '%season%' OR title ILIKE '%earth%') THEN 'Environment'
  -- Computer
  WHEN subject = 'computer-science' AND (title ILIKE '%computer%' OR title ILIKE '%hardware%' OR title ILIKE '%software%') THEN 'Computer Basics'
  WHEN subject = 'computer-science' AND (title ILIKE '%keyboard%' OR title ILIKE '%mouse%' OR title ILIKE '%typing%') THEN 'Keyboard & Mouse'
  WHEN subject = 'computer-science' AND (title ILIKE '%internet%' OR title ILIKE '%digital safety%') THEN 'Digital Safety'
  ELSE sub_category
END
WHERE sub_category IS NULL OR sub_category = '';
