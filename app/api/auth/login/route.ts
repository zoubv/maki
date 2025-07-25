// app/api/auth/login/route.ts
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'vraimentSecretAChanger';

export async function POST(req: Request) {
  const { email, mot_de_passe } = await req.json();

  const [rows] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
  const utilisateur = (rows as any[])[0];

  if (!utilisateur) {
    return new Response(JSON.stringify({ error: 'Utilisateur introuvable' }), { status: 404 });
  }

  const valid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401 });
  }

  const token = jwt.sign({ id: utilisateur.id, nom: utilisateur.nom }, SECRET, { expiresIn: '2h' });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
