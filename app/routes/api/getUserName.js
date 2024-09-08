// app/routes/api/getUserName.js
import { json } from "@remix-run/node";
import db from '~/data/db'; // Import your database connection

export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
        return json({ error: "Email not provided" }, { status: 400 });
    }

    try {
        // Check the "Clients" table
        let user = db.prepare('SELECT firstName FROM Clients WHERE email = ?').get(email);
        if (user) {
            return json({ firstName: user.firstName });
        }

        // Check the "Trainers" table
        user = db.prepare('SELECT firstName FROM Trainers WHERE email = ?').get(email);
        if (user) {
            return json({ firstName: user.firstName });
        }

        return json({ error: "User not found" }, { status: 404 });
    } catch (error) {
        console.error("Error accessing database:", error);
        return json({ error: "Database error" }, { status: 500 });
    }
};
