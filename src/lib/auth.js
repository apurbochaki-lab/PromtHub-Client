import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI2);
const db = client.db(process.env.DATABASE_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        additionalFields: {
            role: {
                defaultValue: "user"
            },
            plan: {
                defaultValue: "free"
            }
        }
    }
});