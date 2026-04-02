import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { supabase } from '../../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    // Validation
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      );
    }

    if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Format nomor WhatsApp tidak valid' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const { data: user, error: createError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        name,
        phone,
        role: 'customer',
        is_verified: true, // No email verification needed
        balance: 0,
        balance_available: 0,
        balance_locked: 0,
      })
      .select('id, email, name, role, created_at')
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Gagal membuat akun' },
        { status: 500 }
      );
    }

    // Create loyalty points entry
    await supabase
      .from('loyalty_points')
      .insert({
        user_id: user.id,
        balance: 0,
        total_earned: 0,
        total_redeemed: 0,
      });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registrasi gagal' },
      { status: 500 }
    );
  }
}
