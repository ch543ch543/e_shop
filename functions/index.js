const functions = require('firebase-functions');
const paypal = require('paypal-rest-sdk');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({orgin: true});

// paypal.configure({
//   mode: 'sandbox',
//   client_id: functions.config().paypal.client_id,
//   client_secret: functions.congig().paypal.client_secret,
// })


// exports.payout = functions.https.onRequest((request, response) => {
  
//   const sender_batch_id = Math.random().toString(36).substring(9);
//   const sync_mode = "true";
//   const payReq = JSON.stringify({
//     sender_batch_header: {
//       sender_batch_id: sender_batch_id,
//       email_subject: "You have a payment"
//     },
//     items: [
//       {
//           recipient_type: "EMAIL",
//           amount: {
//               "value": 0.90,
//               "currency": "USD"
//           },
//           receiver: "shirt-supplier-three@mail.com",
//           note: "Thank you.",
//           sender_item_id: "item_3"
//       }
//     ]
//   })
// });

