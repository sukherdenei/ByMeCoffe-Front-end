import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/server/queryService";
import { error } from "console";
import { userType } from "../../../../util/type";
import bcrypt from "bcrypt";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Email эсвэл Password оруулна уу!" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const getUserQuery = `SELECT * FROM "User" WHERE email = $1;`;
    const users: userType[] = await runQuery(getUserQuery, [email]);

    if (!users || users.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Хэрэглэгч олдсонгүй!" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = users[0];
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ error: "Нууц үг буруу!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Амжилттай нэвтэрлээ!", user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
