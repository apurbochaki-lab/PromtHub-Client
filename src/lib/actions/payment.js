'use server';

import { serverMutation } from "../core/server";

export const makePayment = async (paymentData) => {
    return serverMutation("/api/payment", paymentData);
}