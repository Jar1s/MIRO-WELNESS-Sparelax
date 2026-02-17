import { NextResponse } from 'next/server';
import { getSupabasePublic } from '@/lib/supabase';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const SELECT_POPUP_FIELDS = 'id,title,body,image_url,link_url,popup_size,popup_scale,enabled,updated_at';
const SELECT_POPUP_FIELDS_LEGACY = 'id,title,body,image_url,link_url,popup_size,enabled,updated_at';

const isPopupScaleSchemaError = (
  error:
    | {
        code?: string | null;
        message?: string | null;
        details?: string | null;
      }
    | null
    | undefined
) => {
  if (!error) return false;
  if (error.code === '42703' || error.code === 'PGRST204') return true;

  const text = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase();
  return text.includes('popup_scale');
};

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`popup:${ip}`, 60, 60_000);
    if (!limit.ok) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: noStoreHeaders });
    }

    const supabase = getSupabasePublic();

    let { data, error } = await supabase
      .from('popups')
      .select(SELECT_POPUP_FIELDS)
      .eq('enabled', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (isPopupScaleSchemaError(error)) {
      const legacy = await supabase
        .from('popups')
        .select(SELECT_POPUP_FIELDS_LEGACY)
        .eq('enabled', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      data = legacy.data ? { ...legacy.data, popup_scale: 100 } : null;
      error = legacy.error;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
    }

    return NextResponse.json({ popup: data || null }, { status: 200, headers: noStoreHeaders });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: noStoreHeaders });
  }
}
