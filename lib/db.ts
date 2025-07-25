// lib/db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost', // ou l'hôte distant si tu utilises un hébergement
  user: 'root',
  password: 'root',
  database: 'maki_platform',
});
