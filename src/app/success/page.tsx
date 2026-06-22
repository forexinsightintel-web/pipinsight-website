// Success page after Stripe checkout
// Place in src/app/success/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const params = useSearchParams();
  const session = params.get('session_id');

  return (
    <div style={{
      minHeight:      '100vh',
      background:     '#0D1117',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     'system-ui, sans-serif',
      padding:        '20px',
    }}>
      <div style={{
        background:   '#111827',
        border:       '0.5px solid #1AAF8B',
        borderRadius: '16px',
        padding:      '48px 40px',
        maxWidth:     '480px',
        width:        '100%',
        textAlign:    'center',
      }}>
        {/* Success icon */}
        <div style={{
          width:        '72px',
          height:       '72px',
          background:   '#1AAF8B',
          borderRadius: '50%',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          margin:       '0 auto 24px',
          fontSize:     '32px',
        }}>
          ✓
        </div>

        <h1 style={{
          color:      '#F0F4F8',
          fontSize:   '28px',
          fontWeight: '600',
          margin:     '0 0 12px',
        }}>
          You're in!
        </h1>

        <p style={{
          color:      '#1AAF8B',
          fontSize:   '18px',
          fontWeight: '500',
          margin:     '0 0 20px',
        }}>
          Welcome to PIP:Insight Premium
        </p>

        <p style={{
          color:      '#64748B',
          fontSize:   '14px',
          lineHeight: '1.7',
          margin:     '0 0 32px',
        }}>
          Your subscription is active. You now have full access to all three
          daily sessions — London, New York and Asian — plus the AI Trade Journal.
        </p>

        {/* What's included */}
        <div style={{
          background:   '#0D1117',
          borderRadius: '10px',
          padding:      '20px',
          margin:       '0 0 32px',
          textAlign:    'left',
        }}>
          <p style={{ color: '#D4A017', fontSize: '13px', fontWeight: '600', margin: '0 0 12px' }}>
            WHAT YOU NOW HAVE ACCESS TO:
          </p>
          {[
            'Full analysis for all 9 pairs — 3x daily',
            'Entry, stop loss and take profit levels',
            'AI Trade Journal at pip-insight.co.uk/journal',
            'Multi-timeframe chart analysis',
            'Economic calendar with plain English explainers',
          ].map((item, i) => (
            <p key={i} style={{
              color:      '#F0F4F8',
              fontSize:   '13px',
              margin:     '0 0 8px',
              display:    'flex',
              alignItems: 'flex-start',
              gap:        '8px',
            }}>
              <span style={{ color: '#1AAF8B', flexShrink: 0 }}>✓</span>
              {item}
            </p>
          ))}
        </div>

        {/* Next steps */}
        <a
          href="/"
          style={{
            display:       'block',
            background:    '#1AAF8B',
            color:         '#fff',
            padding:       '14px 24px',
            borderRadius:  '8px',
            textDecoration:'none',
            fontWeight:    '600',
            fontSize:      '15px',
            marginBottom:  '12px',
          }}
        >
          View Today's Analysis
        </a>

        <a
          href="/journal"
          style={{
            display:       'block',
            background:    'transparent',
            color:         '#1AAF8B',
            border:        '0.5px solid #1AAF8B',
            padding:       '14px 24px',
            borderRadius:  '8px',
            textDecoration:'none',
            fontWeight:    '600',
            fontSize:      '15px',
          }}
        >
          Open AI Trade Journal
        </a>

        <p style={{
          color:     '#64748B',
          fontSize:  '12px',
          marginTop: '24px',
        }}>
          Questions? Email us at hello@pip-insight.co.uk
        </p>
      </div>
    </div>
  );
}
