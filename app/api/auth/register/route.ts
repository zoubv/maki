// app/api/auth/register/route.ts
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { nom, email, mot_de_passe } = await req.json();

  if (!nom || !email || !mot_de_passe) {
    return new Response(JSON.stringify({ error: 'Champs requis manquants' }), { status: 400 });
  }

  const [rows] = await db.query('SELECT id FROM utilisateurs WHERE email = ?', [email]);
  if ((rows as any[]).length > 0) {
    return new Response(JSON.stringify({ error: 'Utilisateur déjà inscrit' }), { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
  await db.query(
    'INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)',
    [nom, email, hashedPassword]
  );

  return new Response(JSON.stringify({ message: 'Inscription réussie' }), { status: 201 });
}
