import { NextResponse } from "next/server";
import { checkUser } from "../../../../back_end/controllers/user.controller";
import { getUsers } from "../../../../back_end/user";
import { runQuery } from "../../../../util/server/queryService";
import { error } from "console";

// export async function GET() {
//   const users = await getUsers();

//   return new Response(JSON.stringify({ data: users }));
// }

export async function POST(req: Request, res: Response) {
  const { name, price } = await req.json();
  try {
    const query = `INSERT INTO "coffee" (name, price) VALUES ($1, $2)`;
    const addCoffee = await runQuery(query, [name, price]);

    return new NextResponse(JSON.stringify({ user: addCoffee }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }

  // return await checkUser({ email: body.email, password: body.password });
}

export async function GET(): Promise<NextResponse> {
  try {
//         const createTable =
//           `CREATE TABLE "public"."user" (
//   "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   "username" integer NOT NULL,
//   "email" integer NOT NULL,
//   "password" integer NOT NULL,
//   "createdAt" text NOT NULL,
//   "updatedAt" text NOT NULL
// );` ;
    const user = `SELECT id, email,password  FROM "coffee" WHERE name='latte' ORDER BY price;`;

    const getUser = await runQuery(user);
    if (getUser.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "coffe not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ getUser: getUser }));
  } catch (error) {
    console.log("Failed to run query:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
