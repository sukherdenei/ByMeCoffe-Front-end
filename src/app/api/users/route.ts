import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../../util/server/queryService";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const usersQuery = `SELECT
      u.id,
      u.email,
      u.username,
    
      json_build_object(
        'name', p.name,
        'about', p.about,
        'avatarImage', p.avatarImage,
        'successMessage', p.successMessage,
        'socialmediaurl', p.socialMediaUrl
      ) AS profile,
    
      json_build_object(
        'cardNumber', b.cardNumber,
        'expiryDate', b.expiryDate,
        'country', b.country
      ) AS bankCard,
    
      (
        SELECT json_agg(
          json_build_object(
            'id', d1.id,
            'amount', d1.amount,
            'message', d1.specialMessage
          )
        )
        FROM "Donation" d1
        WHERE d1.donorId = u.id
      ) AS donationsGiven,
    
      (
        SELECT json_agg(
          json_build_object(
            'id', d2.id,
            'amount', d2.amount,
            'message', d2.specialMessage
          )
        )
        FROM "Donation" d2
        WHERE d2.recipientId = u.id
      ) AS donationsReceived
    
    FROM "User" u
    LEFT JOIN "Profile" p ON u.id = p.userId
    LEFT JOIN "BankCard" b ON u.id = b.userId
    ORDER BY u.id DESC;
    `;

    const users = await runQuery(usersQuery);

    console.log("User-profile", `users`);

    if (!Array.isArray(users) || users.length === 0) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "aldaa garlaa" }), {
      status: 500,
    });
  }
}
