// Fire-and-forget admin notification. Failures are logged only — never block UX.

export type AdminNotifyPayload = {
  eventType: 'signup' | 'service_request' | 'plan_subscription'
  userName?: string
  userEmail?: string
  userPhone?: string
  userRole?: string
  itemTitle?: string
  itemSubtitle?: string
  itemPrice?: number
  extraNotes?: string
}

export async function notifyAdmin(payload: AdminNotifyPayload) {
  try {
    await fetch('/api/public/notify-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch (err) {
    console.warn('notifyAdmin failed', err)
  }
}
