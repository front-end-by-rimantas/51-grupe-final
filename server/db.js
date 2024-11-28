import mysql2 from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from './env.js';

export let connection = null;

try {
    connection = await mysql2.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    });
    // connection = await mysql2.createConnection({
    //     host: DB_HOST,
    //     user: 'root',
    //     password: ``,
    // });
} catch (error) {
    console.log(error);
}

if (false) {
    try {
        const dropDB = 'DROP DATABASE IF EXISTS `51gr_socials2`';
        await connection.execute(dropDB);

        const createDB = 'CREATE DATABASE IF NOT EXISTS `51gr_socials2` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_swedish_ci */';
        await connection.execute(createDB);

        const selectDB = 'USE 51gr_socials2';
        await connection.query(selectDB);

        const createRolesTable = `
            CREATE TABLE roles (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                role varchar(10) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createRolesTable);

        const insertRoles = `INSERT INTO roles (role) VALUES (?), (?);`;
        await connection.execute(insertRoles, ['admin', 'user']);

        const createUserStatusTable = `
            CREATE TABLE user_status (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                name varchar(10) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createUserStatusTable);

        const insertUserStatus = `INSERT INTO user_status (name) VALUES (?), (?), (?);`;
        await connection.execute(insertUserStatus, ['created', 'active', 'blocked']);

        const createReactionTypesTable = `
            CREATE TABLE reaction_types (
                id int(1) unsigned NOT NULL AUTO_INCREMENT,
                name varchar(10) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createReactionTypesTable);

        const insertReactionTypes = `INSERT INTO reaction_types (name) VALUES (?), (?), (?);`;
        await connection.execute(insertReactionTypes, ['like', 'dislike', 'love']);

        const createUsersTable = `
        CREATE TABLE users (
            id int(10) unsigned NOT NULL AUTO_INCREMENT,
            role_id int(1) unsigned NOT NULL DEFAULT 2,
            username varchar(60) NOT NULL,
            email varchar(80) NOT NULL,
            password_hash char(128) NOT NULL,
            profile_image char(68) DEFAULT NULL,
            registered_at datetime NOT NULL DEFAULT current_timestamp(),
            status_id int(1) unsigned NOT NULL DEFAULT 1,
            PRIMARY KEY (id),
            UNIQUE KEY email (email),
            UNIQUE KEY username (username),
            UNIQUE KEY profile_image (profile_image),
            KEY role_id (role_id),
            KEY status_id (status_id),
            CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id),
            CONSTRAINT users_ibfk_2 FOREIGN KEY (status_id) REFERENCES user_status (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createUsersTable);

        const insertUsers = `INSERT INTO users (role_id, username, email, password_hash) VALUES (?, ?, ?, ?);`;
        await connection.execute(insertUsers, ['1', 'chuck', 'chuck@norris.com', 'd96edb4522c1af63bc1e09987c24bdaed07ce9cd1240c314ee218f554222f8ba451e6147dab22bf552c18d6be0e89040913aeb32560f6eaed332eea0f2439406']);

        const createPostsTable = `
            CREATE TABLE posts (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                user_id int(10) unsigned NOT NULL,
                text varchar(1500) NOT NULL,
                created_at datetime NOT NULL DEFAULT current_timestamp(),
                likes_count int(10) unsigned NOT NULL DEFAULT 0,
                dislike_count int(10) unsigned NOT NULL DEFAULT 0,
                love_count int(10) unsigned NOT NULL DEFAULT 0,
                PRIMARY KEY (id),
                KEY user_id (user_id),
                CONSTRAINT posts_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createPostsTable);

        const createPostReactionsTable = `
        CREATE TABLE post_reactions (
            id int(10) unsigned NOT NULL AUTO_INCREMENT,
            user_id int(10) unsigned NOT NULL,
            post_id int(10) unsigned NOT NULL,
            reaction_type_id int(1) unsigned NOT NULL DEFAULT 1,
            PRIMARY KEY (id),
            KEY post_id (post_id),
            KEY user_id (user_id),
            KEY reaction_type_id (reaction_type_id),
            CONSTRAINT post_reactions_ibfk_1 FOREIGN KEY (post_id) REFERENCES posts (id),
            CONSTRAINT post_reactions_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id),
            CONSTRAINT post_reactions_ibfk_3 FOREIGN KEY (reaction_type_id) REFERENCES reaction_types (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createPostReactionsTable);

        const createTokensTable = `
            CREATE TABLE tokens (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                token char(20) NOT NULL,
                user_id int(10) unsigned NOT NULL,
                created_at datetime NOT NULL DEFAULT current_timestamp(),
                PRIMARY KEY (id),
                KEY user_id (user_id),
                CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci`;
        await connection.execute(createTokensTable);

    } catch (error) {
        console.log(error);
    }
}