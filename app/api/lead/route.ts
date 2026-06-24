import { NextRequest, NextResponse } from 'next/server'

/**
 * Public lead form -> consultant portal (Supabase `leads` table).
 * Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (server-only).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { isim, email, telefon, program, mesaj } = body || {}
    if (!isim || (!email && !telefon)) {
      return NextResponse.json({ error: 'İsim ve iletişim bilgisi gerekli' }, { status: 400 })
    }
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      return NextResponse.json({ error: 'Sunucu yapılandırması eksik' }, { status: 500 })
    }
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}`, Prefer: 'return=minimal' },
      body: JSON.stringify({ isim, email: email || null, telefon: telefon || null, kaynak: 'web', ilgi_alani: program || null, notlar: mesaj || null, durum: 'yeni' }),
    })
    if (!res.ok) {
      const t = await res.text()
      console.error('Lead insert failed:', t)
      return NextResponse.json({ error: 'Kayıt oluşturulamadı' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Hata' }, { status: 500 })
  }
}
