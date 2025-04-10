// import { NextRequest, NextResponse } from "next/server";
// import { runQuery } from "../../../../util/server/queryService";
// import { useUser } from "@/app/_context/UserContext";
// import { Header } from "@/app/_components/Header.";
// import { CoverImg } from "@/app/_components/CoverImg";
// import { SupporterPage } from "@/app/_components/SupporterPage";
// import { DashboardProfile } from "@/app/_components/DashboardProfile";

import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../../util/server/queryService";

// const ViewProfile = () => {
//   const { users } = useUser();
//   return (
//     <div>
//       <Header />
//       <CoverImg />
//       <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
//         <SupporterPage />
//         <DashboardProfile />
//       </div>
//     </div>
//   );
// };

// export default ViewProfile;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const getUserById = `
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
    ORDER BY u.id DESC;`;

    const oneUserById = await runQuery(getUserById);
    console.log("get one user by id", oneUserById);

    return new NextResponse(JSON.stringify(oneUserById));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error in get user by id" }),
      {
        status: 500,
      }
    );
  }
}
