import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface AdminNotificationProps {
  eventType?: 'signup' | 'service_request' | 'plan_subscription' | string
  eventTitle?: string
  userName?: string
  userEmail?: string
  userPhone?: string
  userRole?: string
  itemTitle?: string
  itemSubtitle?: string
  itemPrice?: number | string
  extraNotes?: string
  occurredAt?: string
}

const labels: Record<string, string> = {
  signup: 'تسجيل مستخدم جديد',
  service_request: 'طلب خدمة من المتجر',
  plan_subscription: 'اشتراك في باقة',
}

const AdminNotification = ({
  eventType = 'signup',
  eventTitle,
  userName,
  userEmail,
  userPhone,
  userRole,
  itemTitle,
  itemSubtitle,
  itemPrice,
  extraNotes,
  occurredAt,
}: AdminNotificationProps) => {
  const heading = eventTitle || labels[eventType] || 'إشعار جديد'
  const when = occurredAt || new Date().toLocaleString('fr-DZ')

  return (
    <Html lang="ar" dir="rtl">
      <Head />
      <Preview>{`Elite Mercato — ${heading}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={brand}>Elite Mercato</Heading>
            <Text style={tag}>BECOME A PRO · إشعار إداري</Text>
          </Section>

          <Section style={card}>
            <Heading as="h2" style={h2}>{heading}</Heading>
            <Text style={timestamp}>{when}</Text>

            <Hr style={hr} />

            {userName && <Row label="الاسم" value={userName} />}
            {userEmail && <Row label="البريد الإلكتروني" value={userEmail} />}
            {userPhone && <Row label="الهاتف" value={userPhone} />}
            {userRole && <Row label="نوع الحساب" value={userRole} />}
            {itemTitle && <Row label="الخدمة / الباقة" value={itemTitle} />}
            {itemSubtitle && <Row label="الفئة" value={itemSubtitle} />}
            {itemPrice != null && itemPrice !== '' && (
              <Row
                label="المبلغ"
                value={`${Number(itemPrice).toLocaleString('fr-DZ')} دج`}
              />
            )}
            {extraNotes && <Row label="ملاحظات" value={extraNotes} />}
          </Section>

          <Text style={footer}>
            هذا إشعار آلي من منصة Elite Mercato. لا داعي للرد.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={rowSection}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
  )
}

export const template = {
  component: AdminNotification,
  subject: (data: Record<string, any>) => {
    const t = labels[data?.eventType] || data?.eventTitle || 'إشعار جديد'
    return `Elite Mercato — ${t}`
  },
  displayName: 'إشعار إداري (تسجيل/طلب/اشتراك)',
  to: 'elitemercatodz@gmail.com',
  previewData: {
    eventType: 'signup',
    userName: 'لاعب تجريبي',
    userEmail: 'player@example.com',
    userPhone: '+213 555 000 000',
    userRole: 'player',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Tahoma, Arial, sans-serif' }
const container = { maxWidth: '560px', margin: '0 auto', padding: '24px' }
const header = { textAlign: 'right' as const, paddingBottom: '12px' }
const brand = { color: '#0b2545', fontSize: '24px', margin: '0', fontWeight: 800 }
const tag = { color: '#c9a227', fontSize: '11px', letterSpacing: '2px', margin: '4px 0 0' }
const card = {
  border: '1px solid #e6e8ee',
  borderRadius: '14px',
  padding: '20px 22px',
  backgroundColor: '#fafbff',
}
const h2 = { color: '#0b2545', fontSize: '18px', margin: '0 0 4px', textAlign: 'right' as const }
const timestamp = { color: '#6b7280', fontSize: '12px', margin: '0', textAlign: 'right' as const }
const hr = { borderColor: '#e6e8ee', margin: '14px 0' }
const rowSection = { margin: '6px 0', textAlign: 'right' as const }
const rowLabel = { color: '#6b7280', fontSize: '11px', margin: '0', fontWeight: 700 }
const rowValue = { color: '#0b2545', fontSize: '14px', margin: '2px 0 0', fontWeight: 600 }
const footer = {
  color: '#9aa3b2',
  fontSize: '11px',
  textAlign: 'center' as const,
  marginTop: '16px',
}
