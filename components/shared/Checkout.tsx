import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { IEvent } from '@/lib/database/models/events.model';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId}: { event: IEvent, userId: string }) => {

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    }

    await checkoutOrder(order);
  }
  return (
    <form onSubmit={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className='button sm:w-fit'>
        {event.isFree ? 'Get Tickets' : 'Buy Tickets'}
      </Button>

    </form>
  )
}

export default Checkout