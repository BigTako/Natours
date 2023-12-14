# 🏖 Natours 🏞




## _Visit any place, anytime!_

The project of small tour agency which allows to manage different tours.

👨User opportunities:

▫ Overview tours

▫ Overview single tour description, price, rating and dates

▫ Overview places(points on map) tours consists of

▫ Select prefered date

▫ See all the tour reviews of previous customers

▫ Create an account

▫️ Update account information

▫️ Manage tours and users(depends on user role)

▫️ Book a tour online using Stripe

## Also

▫️ API completely implemented in Node.js and MongoDB

▫️ App uses server side rendering

▫️ App authentication system implemented using JWT tokens

▫️ Payment system implemented using Stripe

# Tech. stack

<p align="start">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,mongodb,pug" />
  </a>
</p>

# How to run:

> To run API , firstly clone my repository with API using `git clone https://github.com/BigTako/Natours`.
> Then run command `npm install` in cloned project root directory to install all necessary packages.
> Next step, is to congirure database. My solution is using MongoDB, so you can create you own cluster
> in Atlas `https://www.mongodb.com/cloud/atlas/register` or crete in localy using Compass `https://www.mongodb.com/products/tools/compass`.
> When it's done, create a `config.env` file in project root directory which will look like this:
> (or a little bit different if you're using local db)

- PORT=3000(port on which server is running, you can specify your own)
- DATABASE=(url to your db, i user url provided by Atlas)
- DATABASE_PASSWORD=(password to your db)
- NODE_ENV="development" (app running mode, 'development' by default, 'production' when deploing)
- JWT_SECRET=(create a secret key string 32+symbols)
- JWT_EXPIRES_IN=90d(specify your own expiration time or leave by default)
- JWT_COOKIE_EXPIRES_IN=90
- EMAIL_USERNAME=(specify email sender here)
- EMAIL_PASSWORD=(gmail passkey here)
- EMAIL_SERVICE=gmail(by default)
- EMAIL_FROM=(your company)
- STRIPE_SECRET_KEY=(secret key that is given after Stripe sign up)
- STRIPE_WEBHOOK_SECRET=(secret key that is given after Stripe sign up)

