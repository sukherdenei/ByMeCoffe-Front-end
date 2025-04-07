// import { NextResponse } from "next/server";

// export async function POST(req: Request): Promise<Response> {
//   try {
//     const { username, email, password } = await req.json();

//     const chechUserQuery = ``;
//   } catch (error) {
//     console.error("Aldaa garlaa:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Serveriin aldaa garlaa!" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/server/queryService";
import { hashSync } from "bcrypt";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password, username } = await req.json();

    const createUser = `INSERT INTO "User" (username, email, password) VALUES ($1, $2, $3)`;

    const hashedPassword = hashSync(password, 10);

    const user = await runQuery(createUser, [username, email, hashedPassword]);

    return new NextResponse(
      JSON.stringify({ user: user, message: "Amjilttai burtgelee" })
    );
  } catch (error) {
    console.error("Failed to run query:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
