import { PrismaClient } from "@prisma/client"

const client = new PrismaClient();

async function main() {
    for (const item of [...Array.from(Array(200).keys())]) {
        // await client.stream.create({
        //     data: {
        //         name: String(item),
        //         description: String(item),
        //         price: item,
        //         user: {
        //             connect: {
        //                 id: 4,
        //             },
        //         },
        //     },
        // });
    }
}

main().catch((e)=>console.log(e)).finally(()=>client.$disconnect())