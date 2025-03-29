import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

// Initialize Stripe once
export const initializeStripe = async (publishableKey) => {
    if (!stripePromise) {
        stripePromise = loadStripe(publishableKey);
    }
    return stripePromise;
};

// Mount card element with React-friendly event handling
export const mountCardElement = async (elementId, onCardChange) => {
    const stripe = await stripePromise;
    const elements = stripe.elements();

    const cardElement = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
            },
        },
    });

    cardElement.mount(`#${elementId}`);
    cardElement.on('change', onCardChange);

    return cardElement;
};

// Create payment method
export const createPaymentMethod = async (cardElement) => {
    const stripe = await stripePromise;
    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) throw error;
    return paymentMethod.id;
};