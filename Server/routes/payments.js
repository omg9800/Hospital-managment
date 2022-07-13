const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const { Appointment, validateAppointment } = require('../models/appointment');
const { Doctor, validateDoctor } = require('../models/doctor');

router.get('/get-razorpay-key', (req, res) => {
    res.send({ key: "rzp_test_jp686rc60z0bCh" });
});

router.post('/create-order', async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: "rzp_test_jp686rc60z0bCh",
            key_secret: "pBzN3MmYN2L603UytaRMnhsO",
        });
        const options = {
            amount: req.body.amount,
            currency: 'INR',
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send('Some error occured');
        console.log(order);
        res.send(order);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/pay-order', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        console.log(req.body.patient);
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", "pBzN3MmYN2L603UytaRMnhsO")
            .update(sign.toString())
            .digest("hex");
        //console.log("payment succesful")
        if (razorpay_signature === expectedSign) {
            const { error } = validateAppointment(req.body.patient);
            if (error) return res.status(400).send(error.details[0].message);
            const doctor = await Doctor.findById(req.body.patient.doctorId);
            if (!doctor) return res.status(404).send('Doctor Not Found');

            let appointment = new Appointment({
                doctorId: req.body.patient.doctorId,
                name: req.body.patient.name,
                age: req.body.patient.age,
                weight: req.body.patient.weight,
                phone: req.body.patient.phone,
                symptoms: req.body.patient.symptoms,
                address: req.body.patient.address,
            });
            appointment = await appointment.save();

            console.log("payment succesful")
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

module.exports = router;







// const router = require("express").Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");


// router.post("/orders", async (req, res) => {
//     try {
//         const instance = new Razorpay({
//             key_id: "rzp_test_jp686rc60z0bCh",
//             key_secret: "pBzN3MmYN2L603UytaRMnhsO",
//         });

//         const options = {
//             amount: req.body.amount * 100,
//             currency: "INR",
//             receipt: crypto.randomBytes(10).toString("hex"),
//         };

//         instance.orders.create(options, (error, order) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ message: "Something Went Wrong!" });
//             }
//             res.status(200).json({ data: order });
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
//     }
// });

// router.post("/verify", async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//             req.body;
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto
//             .createHmac("sha256", pBzN3MmYN2L603UytaRMnhsO)
//             .update(sign.toString())
//             .digest("hex");

//         if (razorpay_signature === expectedSign) {
//             return res.status(200).json({ message: "Payment verified successfully" });
//         } else {
//             return res.status(400).json({ message: "Invalid signature sent!" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
//     }
// });

// module.exports = router;