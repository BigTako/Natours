const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const TourDate = require('./../models/tourDateModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
// const AppError = require('./../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  // const dates = JSON.parse(tour.startDatesObj);
  const date = tour.startDatesObj.find(
    obj => obj._id.toString() === req.query.date
  );

  if (date.participants.length + 1 > tour.maxGroupSize) {
    return next(new AppError('All free places of tour were reserved', 400));
  }

  //2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}&date=${req.query.date}`, // page user will be transfered to after successful payment
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // page user will be transfered to after canceling of payment
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`
            ]
          },
          unit_amount: tour.price * 100
        },
        quantity: 1
      }
    ],
    mode: 'payment'
  });
  // 3) Create session as responce
  res.status(200).json({
    status: 'success',
    session
  });
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   // This is only TEMPORARY, because it`s UNSECURE: everyon can make bookings without paying
//   const { tour, user, price, date } = req.query;
//   if (!tour && !user && !price) {
//     return next();
//   }
//   await TourDate.findByIdAndUpdate(date, {
//     $push: { participants: user },
//     $inc: { soldOut: 1 }
//   });
//   await Booking.create({ tour, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });
const createBookingCheckout = async session => {
  console.log(session);
  const tour = session.data.object.client_reference_id;
  const user = User.findOne({ email: session.data.object.customer_email }).id;
  const price = session.data.object.amount_total / 100;
  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    ); // body needs to be in raw form(available as a stream)
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
