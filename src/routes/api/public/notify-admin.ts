import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const PayloadSchema = z.object({
  eventType: z.enum(['signup', 'service_request', 'plan_subscription']),
  userName: z.string().min(1).max(200).optional(),
  userEmail: z.string().email().max(254).optional(),
  userPhone: z.string().min(3).max(40).optional(),
  userRole: z.string().min(1).max(40).optional(),
  itemTitle: z.string().min(1).max(200).optional(),
  itemSubtitle: z.string().min(1).max(200).optional(),
  itemPrice: z.number().nonnegative().max(1_000_000_000).optional(),
  extraNotes: z.string().max(1000).optional(),
})

const ADMIN_EMAIL = 'elitemercatodz@gmail.com'

export const Route = createFileRoute('/api/public/notify-admin')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        let raw: unknown
        try {
          raw = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = PayloadSchema.safeParse(raw)
        if (!parsed.success) {
          return Response.json(
            { error: 'Invalid payload', issues: parsed.error.flatten() },
            { status: 400 },
          )
        }

        const supabase = createClient(supabaseUrl, serviceKey)
        const messageId = crypto.randomUUID()
        const idempotencyKey = `admin-notify-${parsed.data.eventType}-${messageId}`

        const { error } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            templateName: 'admin-notification',
            recipientEmail: ADMIN_EMAIL,
            messageId,
            idempotencyKey,
            templateData: {
              ...parsed.data,
              occurredAt: new Date().toISOString(),
            },
          },
        })

        if (error) {
          console.error('enqueue_email failed', error)
          return Response.json({ error: 'Failed to enqueue' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
