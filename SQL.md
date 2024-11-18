LIKE: id, user_id, post_id, created_at
1, 11111, 99, 2024-11-18
2, 11111, 99, 2024-11-18
3, 11111, 99, 2024-11-18

# Kiek LIKE paspaudimu is viso?

```
SELECT SUM(likes) as likes FROM ( SELECT COUNT(*) % 2 as likes FROM `post_likes` WHERE post_id = ? GROUP BY user_id ) dt;
```

# Kaip zinoti, ar as esu paLIKEines?

```
SELECT count(*) % 2 FROM likes WHERE post_id = ? AND user_id = ?;
```

DISLIKE: id, user_id, post_id, created_at

like ->
if (yra DISLIKE) {
pasalinam DISLIKE
pridedam LIKE
}
if (nera LIKE && nera DISLIKE) {
pridedam LIKE
}
