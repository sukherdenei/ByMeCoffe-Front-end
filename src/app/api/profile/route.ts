import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/server/queryService";

export async function GET(req: Request): Promise<Response> {
  try {
    const query = `
      SELECT
        u.id AS user_id,
        u.email,
        jsonb_build_object(
          'id', p.id,
          'name', p."name",
          'about', p."about",
          'avatarImage', p."avatarImage",
          'socialMediaURL', p."socialMediaURL"
        ) AS profile
      FROM "User" u
      LEFT JOIN "Profile" p ON u.id = p."user_id";
    `;

    const usersProfiles = await runQuery(query);

    return new NextResponse(JSON.stringify(usersProfiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, about, avatarimage, socialmediaurl, userId } =
      await req.json();

    const createProfilequery = `INSERT INTO "Profile" ("name", "about", "avatarimage", "socialmediaurl", "userid") VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

    const newProfile = await runQuery(createProfilequery, [ 
      name,
      about,
      avatarimage,
      socialmediaurl,
      userId,
    ]);

    const profileId = (newProfile[0] as { id: number }).id; 
    const updateUserQuery = `
    UPDATE "user" SET "BankCard" = $1 WHERE id = $2;
  `;
    await runQuery(updateUserQuery, [profileId, userId]);

    return new NextResponse(
      JSON.stringify({
        message: "Successfully created profile",
        profile: newProfile,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "server алдаа гарлаа" }), {
      status: 500,
    });
  }
}

// export async function PUT(req: Request): Promise<Response> {
//   try {
//     const { name, about, avatarImage, socialMediaURL, id } = await req.json();

//     const changeProfile = `
//     UPDATE "Profile"
//     SET "name" = $1, "about" = $2, "avatarImage" = $3, "socialMediaURL" = $4
//     WHERE "id" = $5
//     RETURNING *;
//   `;

//     const updatedProfile = await runQuery(changeProfile, [
//       name,
//       about,
//       avatarImage,
//       socialMediaURL,
//       id,
//     ]);
//     if (!updatedProfile) {
//       return new NextResponse(
//         JSON.stringify({ message: "profile not found" }),
//         { status: 404 }
//       );
//     }
//     return new NextResponse(
//       JSON.stringify({ message: "Successfully edited", updatedProfile }),
//       { status: 201 }
//     );
//   } catch (err) {
//     return new NextResponse(JSON.stringify({ error: "Server aldaa garlaa" }), {
//       status: 500,
//     });
//   }
// }
