CREATE TABLE `User`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `dayOfBirth` DATETIME NULL,
    `Position` VARCHAR(255) NULL,
    `Specializations` VARCHAR(255) NOT NULL
);
CREATE TABLE `Target`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `targetType` INT NULL,
    `startTime` DATETIME NOT NULL,
    `endTime` DATETIME NOT NULL,
    `initialWeight` INT NOT NULL,
    `targetWeight` INT NOT NULL,
    `currentWeight` INT NOT NULL,
    `userID` BIGINT NOT NULL,
    `description` VARCHAR(255) NOT NULL
);
CREATE TABLE `Dish`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `dishType` INT NOT NULL,
    `quantity` BIGINT NOT NULL,
    `unit` VARCHAR(255) NOT NULL
);
CREATE TABLE `Event`(
    `id` BIGINT NOT NULL,
    `eventName` VARCHAR(255) NOT NULL,
    `startDate` DATETIME NOT NULL,
    `endDate` DATETIME NOT NULL,
    `userID` BIGINT NOT NULL,
    `eventType` INT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Exercise`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `exerciseType` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `minTime` INT NOT NULL,
    `description` BIGINT NOT NULL
);
ALTER TABLE
    `Event` ADD CONSTRAINT `event_userid_foreign` FOREIGN KEY(`userID`) REFERENCES `User`(`id`);
ALTER TABLE
    `Target` ADD CONSTRAINT `target_userid_foreign` FOREIGN KEY(`userID`) REFERENCES `User`(`id`);