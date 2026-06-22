// Stripe checkout component for pip-insight.co.uk
// Place in src/app/components/StripeCheckout.tsx

'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51TjyilGSUwPbv0Pz4J8tnU4FKH95dLXcwusVo0AHXhbvj1xY615xXR7653EyaoMnRvuoYNWEnvWrmDkABcCWM31f00hLEYLyjl');

const PRICE_ID = 'price_1Tl4vVGSUwPbv0PzKGJEzJq2';

export default function StripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: PRICE_ID, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl:  `${window.location.origin}/?cancelled=true`,
        billingAddressCollection: 'auto',
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          background:    loading ? '#0F6E56' : '#1AAF8B',
          color:         '#fff',
          border:        'none',
          padding:       '14px 28px',
          borderRadius:  '8px',
          fontSize:      '15px',
          fontWeight:    '600',
          cursor:        loading ? 'not-allowed' : 'pointer',
          width:         '100%',
          transition:    'background 0.2s',
        }}
      >
        {loading ? 'Redirecting to checkout...' : 'Get Full Access — £9.99/month'}
      </button>
      {error && (
        <p style={{ color: '#E8476A', fontSize: '13px', marginTop: '8px' }}>
          {error}
        </p>
      )}
      <p style={{ color: '#64748B', fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>
        Cancel anytime · No commitment · Secure payment via Stripe
      </p>
    </div>
  );
}
