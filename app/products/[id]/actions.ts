"use server";

import db from "@/lib/db";
import {unstable_cache as nextCache} from "next/dist/server/web/spec-extension/unstable-cache";
// import getSession from "@/lib/session";
// import {redirect} from "next/navigation";

export async function getProduct(id: number) {
    // nextJs의 fetch는 자동으로 cache된다. 태그 옵션도 설정 가능하다.
    // fetch("https://api.com", {
    //     next: {
    //         revalidate: 60,
    //         tags: ["hello"],
    //     },
    // });
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    chat_rooms: true,
                },
            },
            ChatRoom: {
                select: {
                    id: true,
                    users: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
    });
    return product;
}

// getProduct 함수에 인자를 적지 않아도 알아서 넘겨준다.
// 캐시 저장  불러오는 기준이 되는 key는 유니크해야한다.
export const getCachedProduct = nextCache(getProduct, ["product-detail"], {
    tags: ["product-detail","xxxx"],
});

export async function getProductTitle(id: number) {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
        },
    });
    return product;
}

export const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
    tags: ["product-title","xxxx"],
});


// export async function  createChatRoom  (userId: number)  {
//     const session = await getSession();
//     const room = await db.chatRoom.create({
//         data: {
//             users: {
//                 connect: [
//                     {
//                         id:  userId,
//                     },
//                     {
//                         id: session.id,
//                     },
//                 ],
//             },
//         },
//         select: {
//             id: true,
//         },
//     });
//     redirect(`/chats/${room.id}`);
// };