import { NextResponse } from "next/server";
import { checkUser } from "../../../../back_end/controllers/user.controller";
import { getUsers } from "../../../../back_end/user";
import { runQuery } from "../../../../util/server/queryService";
import { error } from "console";

export async function POST(req: Request, res: Response) {
  const { email, password } = await req.json();
  try {
    const query = `INSERT INTO "user" (email, password) VALUES ($1, $2)`;
    const addUser = await runQuery(query, [email, password]);

    return new NextResponse(JSON.stringify({ add: addUser }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }

  // return await checkUser({ email: body.email, password: body.password });
}

export async function GET(): Promise<NextResponse> {
  try {
    const createTable = await runQuery(`
      CREATE TABLE "public"."user" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "username" VARCHAR(100) UNIQUE NOT NULL,
        "receivedDonations" INTEGER[],
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
    );
    `);
    const user = `SELECT id, email,password  FROM "user" WHERE name='Coffee' ORDER BY price;`;

    const getUser = await runQuery(user);
    if (getUser.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ getUser: createTable }));
  } catch (error) {
    console.log("Failed to run query:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

// import { checkUser } from "../../../../back_end/controllers/user.controller";
// import { getUsers } from "../../../../back_end/user";

// export async function GET() {
//   const users = await getUsers();

//   return new Response(JSON.stringify({ data: users }));
// }

// export async function POST(req: Request, res: Response) {
//   const body = await req.json();
//   console.log({ body });
//   return await checkUser({ email: body.email, password: body.password });
// }
