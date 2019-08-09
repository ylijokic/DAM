/*Create a new database for the Digital Asset Manager*/

CREATE DATABASE IF NOT EXISTS dam;

USE dam;


/*Create Tables*/
/*Table for user entity*/
CREATE TABLE IF NOT EXISTS `user`
(
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `pw` VARCHAR(100) NOT NULL
);

/*Table for asset entity*/
CREATE TABLE IF NOT EXISTS `asset`
(
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `physical_file_name` VARCHAR(100),
  `uploader` int,
  `physical_file_size` int,
  `physical_file_type` VARCHAR(100)
);

/*Table for folder entity*/
CREATE TABLE IF NOT EXISTS `folder`
(
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100),
  `creator` int
);

/*Bridge Table for asset and folder entities*/
CREATE TABLE IF NOT EXISTS `asset_folder_mapping`
(
  `asset_id` int,
  `folder_id` int
);


/*Define Foreign Keys*/
ALTER TABLE `asset` ADD FOREIGN KEY (`uploader`) REFERENCES `user` (`id`);

ALTER TABLE `folder` ADD FOREIGN KEY (`creator`) REFERENCES `user` (`id`);

ALTER TABLE `asset_folder_mapping` ADD FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`);

ALTER TABLE `asset_folder_mapping` ADD FOREIGN KEY (`folder_id`) REFERENCES `folder` (`id`);

/*Add some dummy data*/
INSERT INTO `user`(email,pw) VALUES ("test_user@test.test","hunter2");

INSERT INTO `asset`(name,physical_file_name,uploader,physical_file_size,physical_file_type) VALUES ("testAsset","some_image.jpg",1,3,"jpg");

INSERT INTO `folder`(name,creator) VALUES ("test_folder",1);

INSERT INTO `asset_folder_mapping`(asset_id,folder_id) VALUES (1,1);
