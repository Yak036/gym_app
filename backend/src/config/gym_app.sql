-- MySQL Script generated by MySQL Workbench
-- Tue Mar 12 19:59:22 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gym_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gym_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gym_app` DEFAULT CHARACTER SET utf8 ;
USE `gym_app` ;

-- -----------------------------------------------------
-- Table `gym_app`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gym_app`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `surName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `dateBirth` DATE NOT NULL,
  `password` VARCHAR(15) NOT NULL,
  `session` TINYINT NULL,
  `secret_token` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym_app`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gym_app`.`articles` (
  `id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `img` VARCHAR(355) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) ,
  INDEX `fk_articles_users_idx` (`users_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym_app`.`metrics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gym_app`.`metrics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `height` VARCHAR(5) NOT NULL,
  `weight` VARCHAR(5) NOT NULL,
  `grease` VARCHAR(5) NOT NULL,
  `genetic` ENUM("Ectomorfo", "Mesomorfo", "Endomorfo") NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_metricas_users1_idx` (`users_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym_app`.`habits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gym_app`.`habits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `smoke` TINYINT NOT NULL,
  `drink` TINYINT NOT NULL,
  `hrsDream` VARCHAR(2) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_habits_users1_idx` (`users_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym_app`.`plans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gym_app`.`plans` (
  `idplans` INT NOT NULL AUTO_INCREMENT,
  `plan` ENUM("standar", "premium") NOT NULL,
  `date` DATE NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`idplans`, `users_id`),
  INDEX `fk_plans_users1_idx` (`users_id` ASC) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
