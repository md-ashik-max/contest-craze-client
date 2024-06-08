import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



const CheckoutForm = ({ price, id,name,image }) => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if (paymentError) {
            console.log("payment error", paymentError)
        }
        else {
            // console.log("Payment Intent", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log(paymentIntent.id)
                setTransactionId(paymentIntent.id)
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    contestId: id,
                    contestName:name,
                    contestImage:image
                }
                const res = await axiosSecure.post('/payments', payment)
                if (res.data.insertedId) {
                    const contestRes = await axiosSecure.get(`/contests/${id}`);
                    let currentParticipants = contestRes.data.participants;
                    // console.log("Current Participants:", currentParticipants);
                    currentParticipants = Number(currentParticipants) || 0;

                    const updatedParticipants = currentParticipants + 1;

                    // console.log("Updated Participants:", updatedParticipants);

                    axiosSecure.patch(`/contests/participant/${id}`, { participants: updatedParticipants })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                toast.success("Successfully joined the contest!");
                            }
                        })
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
                <label className="mb-2 font-bold text-lg my-4" htmlFor="card-element">
                    Card Details
                </label>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline my-6" type="submit" disabled={!stripe}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600">Your Transaction Id : {transactionId}</p>}
            </form>
            <ToastContainer />

        </div>
    );
};

export default CheckoutForm;