/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NaaQrGeVdm4ggES6jj368eYjuQeg3PmSozymCRCqSHAMMzorDXTZ1WyZYh2AVE79PSYuDhJSvAGltinumz1jY2j00bcgqp17Y'
);

export const bookTour = async (tourId, dateId) => {
  try {
    // 1) Get chechout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}?date=${dateId}`
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
