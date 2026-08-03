import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    const query = `
      INSERT INTO contact_submissions (name, email, phone, service, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await pool.execute(query, [name, email, phone, service, message]);

    return NextResponse.json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Database insertion failed' }, { status: 500 });
  }
}