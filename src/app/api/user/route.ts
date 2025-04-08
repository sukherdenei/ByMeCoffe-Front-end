// import { NextResponse } from "next/server";
// import { checkUser } from "../../../../back_end/controllers/user.controller";
// import { getUsers } from "../../../../back_end/user";
// import { runQuery } from "../../../../util/server/queryService";
// import { error } from "console";

// export async function POST(req: Request, res: Response) {
//   const { email, password } = await req.json();
//   try {
//     const query = `INSERT INTO "user" (email, password) VALUES ($1, $2)`;
//     const addUser = await runQuery(query, [email, password]);

//     return new NextResponse(JSON.stringify({ add: addUser }));
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
//       status: 500,
//     });
//   }
// }

// export async function GET(): Promise<NextResponse> {
//   try {
//     const createTable = await runQuery(`
//       CREATE TABLE "public"."User" (
//         "id" SERIAL PRIMARY KEY,
//         "email" VARCHAR(255) UNIQUE NOT NULL,
//         "password" TEXT NOT NULL,
//         "username" VARCHAR(100) UNIQUE NOT NULL,
//         "receivedDonations" INTEGER[],
//         "createdAt" TIMESTAMP DEFAULT NOW(),
//         "updatedAt" TIMESTAMP DEFAULT NOW()
//     );
//     `);
//     const user = `SELECT id, email,password  FROM "User" WHERE name='Coffee' ORDER BY price;`;

//     const getUser = await runQuery(user);
//     if (getUser.length <= 0) {
//       return new NextResponse(JSON.stringify({ error: "user not found" }), {
//         status: 404,
//       });
//     }

//     return new NextResponse(JSON.stringify({ getUser: createTable }));
//   } catch (error) {
//     console.log("Failed to run query:", error);
//     return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
//       status: 500,
//     });
//   }
// }

// import { runQuery } from "@/util/queryService";
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../../util/server/queryService";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const getAllUsers = `
    SELECT
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

    const users = await runQuery(getAllUsers);

    console.log("User-profile 110", users);

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
