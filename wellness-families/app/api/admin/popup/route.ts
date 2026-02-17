import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getSupabaseServer } from '@/lib/supabase';
import { getClientIp, rateLimit } from '@/lib/rateLimit';

const SELECT_POPUP_FIELDS = 'id,title,body,image_url,link_url,popup_size,popup_scale,enabled,updated_at';
const SELECT_POPUP_FIELDS_LEGACY = 'id,title,body,image_url,link_url,popup_size,enabled,updated_at';
const MIN_POPUP_SCALE = 70;
const MAX_POPUP_SCALE = 220;

const isAuthorized = (req: Request) => {
  const header = req.headers.get('x-admin-password') || '';
  const secret = process.env.ADMIN_PASSWORD || '';
  if (!header || !secret) return false;
  const headerBuf = Buffer.from(header);
  const secretBuf = Buffer.from(secret);
  if (headerBuf.length !== secretBuf.length) return false;
  return timingSafeEqual(headerBuf, secretBuf);
};

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`admin:popup:get:${ip}`, 20, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServer();
    let { data: enabledPopup, error: enabledError } = await supabase
      .from('popups')
      .select(SELECT_POPUP_FIELDS)
      .eq('enabled', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (enabledError?.code === '42703') {
      const legacy = await supabase
        .from('popups')
        .select(SELECT_POPUP_FIELDS_LEGACY)
        .eq('enabled', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      enabledPopup = legacy.data ? { ...legacy.data, popup_scale: 100 } : null;
      enabledError = legacy.error;
    }

    if (enabledError) {
      return NextResponse.json({ error: enabledError.message }, { status: 500 });
    }

    if (enabledPopup) {
      return NextResponse.json({ popup: enabledPopup }, { status: 200 });
    }

    let { data, error } = await supabase
      .from('popups')
      .select(SELECT_POPUP_FIELDS)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error?.code === '42703') {
      const legacy = await supabase
        .from('popups')
        .select(SELECT_POPUP_FIELDS_LEGACY)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      data = legacy.data ? { ...legacy.data, popup_scale: 100 } : null;
      error = legacy.error;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ popup: data || null }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`admin:popup:post:${ip}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      title,
      body: text,
      image_url,
      link_url,
      popup_size,
      popup_scale,
      enabled,
    } = body || {};

    if (title && typeof title !== 'string') {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
    }
    if (text && typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
    if (image_url && typeof image_url !== 'string') {
      return NextResponse.json({ error: 'Invalid image_url' }, { status: 400 });
    }
    if (link_url && typeof link_url !== 'string') {
      return NextResponse.json({ error: 'Invalid link_url' }, { status: 400 });
    }
    if (popup_size && typeof popup_size !== 'string') {
      return NextResponse.json({ error: 'Invalid popup_size' }, { status: 400 });
    }
    if (popup_scale !== undefined && typeof popup_scale !== 'number') {
      return NextResponse.json({ error: 'Invalid popup_scale' }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    let resolvedImageUrl = image_url ? image_url.slice(0, 500) : null;
    if (!resolvedImageUrl && id) {
      const { data: existing } = await supabase
        .from('popups')
        .select('image_url')
        .eq('id', id)
        .maybeSingle();
      if (existing?.image_url) {
        resolvedImageUrl = existing.image_url;
      }
    }

    const payload = {
      title: title ? title.slice(0, 120) : null,
      body: text ? text.slice(0, 500) : null,
      image_url: resolvedImageUrl,
      link_url: link_url ? link_url.slice(0, 500) : null,
      popup_size: popup_size === 'lg' || popup_size === 'md' || popup_size === 'sm' ? popup_size : 'md',
      popup_scale:
        typeof popup_scale === 'number'
          ? Math.min(MAX_POPUP_SCALE, Math.max(MIN_POPUP_SCALE, Math.round(popup_scale)))
          : 100,
      enabled: Boolean(enabled),
    };
    const legacyPayload = {
      title: payload.title,
      body: payload.body,
      image_url: payload.image_url,
      link_url: payload.link_url,
      popup_size: payload.popup_size,
      enabled: payload.enabled,
    };

    let data;
    let error;

    if (id) {
      ({ data, error } = await supabase.from('popups').update(payload).eq('id', id).select().single());
      if (error?.code === '42703') {
        ({ data, error } = await supabase.from('popups').update(legacyPayload).eq('id', id).select().single());
        if (data) {
          data = { ...data, popup_scale: 100 };
        }
      }
    } else {
      const { data: existing } = await supabase
        .from('popups')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing?.id) {
        ({ data, error } = await supabase
          .from('popups')
          .update(payload)
          .eq('id', existing.id)
          .select()
          .single());
        if (error?.code === '42703') {
          ({ data, error } = await supabase
            .from('popups')
            .update(legacyPayload)
            .eq('id', existing.id)
            .select()
            .single());
          if (data) {
            data = { ...data, popup_scale: 100 };
          }
        }
      } else {
        ({ data, error } = await supabase.from('popups').insert(payload).select().single());
        if (error?.code === '42703') {
          ({ data, error } = await supabase.from('popups').insert(legacyPayload).select().single());
          if (data) {
            data = { ...data, popup_scale: 100 };
          }
        }
      }
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data?.id && payload.enabled) {
      const { error: disableOthersError } = await supabase
        .from('popups')
        .update({ enabled: false })
        .neq('id', data.id)
        .eq('enabled', true);

      if (disableOthersError) {
        return NextResponse.json({ error: disableOthersError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ popup: data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
