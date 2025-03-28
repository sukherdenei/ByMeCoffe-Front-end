// Өгөгдлийн сангаас өгөгдлийг авах функц
// Энэ функц нь өгөгдлийн сангаас өгөгдлийг авахад хэрэглэгддэг
// Хэрэглэхдээ @neondatabase/serverless модулийг суулгана уу
// Энэ модуль нь өгөгдлийн сангаас өгөгдлийг авахад хялбар байдлаар хэрэглэгддэг

"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    // DATABASE_URL тохиргоог process.env-ээс авна
    const sql = neon(process.env.DATABASE_URL || "");

    try {
        // SQL хүсэлт ажиллуулж өгөгдлийг авна
        const data = await sql`SELECT * FROM table_name`; // Таны хүссэн хүснэгтийн нэрийг "table_name" гэж орлуулна уу
        return (data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
    }
    const PORT = process.env.PORT || 5432;
    console.log(`Server is running on port ${PORT}`);
}