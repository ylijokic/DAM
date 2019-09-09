/***CREATE DATA***/
/*Add some dummy data*/
INSERT INTO `user` (
	email,
	pw
	)
VALUES (
	"test_user@test.test",
	"hunter2"
	);

INSERT INTO `asset` (
	name,
	physical_file_name,
	uploader,
	physical_file_size,
	physical_file_type
	)
VALUES (
	"testAsset",
	"some_image.jpg",
	1,
	3,
	"jpg"
	);

INSERT INTO `folder` (
	name,
	creator
	)
VALUES (
	"test_folder",
	1
	);

INSERT INTO `asset_folder_mapping` (
	asset_id,
	folder_id
	)
VALUES (
	1,
	1
	);

/***READ DATA***/
/*user Table*/
/*Select all columns and rows from user Table*/
SELECT *
FROM user;

/*Select email and password for a particular user*/
SELECT email,
	pw AS password
FROM user
WHERE id = '?';

/*Select all emails from user Table and display in alphabetical order*/
SELECT email
FROM user
ORDER BY email;

/*asset Table*/
/*Select all columns and rows from asset Table*/
SELECT *
FROM asset;

/*Select all assets associated with a user*/
SELECT name,
	physical_file_name,
	physical_file_size,
	physical_file_type
FROM asset
WHERE uploader = '?';

/*Select all assets of a particular file type*/
SELECT name,
	physical_file_name,
	physical_file_size,
	physical_file_type
FROM asset
WHERE physical_file_type = '?';

/*folder Table*/
/*Select all columns and rows from folder Table*/
SELECT *
FROM folder;

/*Select all folders associated with a user*/
SELECT name
FROM folder
WHERE creator = '?';

/***UPDATE DATA***/
/*Update a user's password*/
UPDATE user
SET pw = "newPassword1"
WHERE id = '?';

/*Update an asset's name*/
UPDATE asset
SET name = "newTestName"
WHERE id = '?';

/***DELETE DATA***/
/*Delete a user*/
DELETE
FROM user
WHERE id = '?';

/*Delete an asset*/
DELETE
FROM asset
WHERE id = '?';

/*Delete all assets of a particular file type from a specific uploader*/
DELETE
FROM asset
WHERE physical_file_type = '?'
	AND uploader = '?';

/*Delete all folders from a specific creator*/
DELETE
FROM folder
WHERE creator = '?';
