import ProductList from "@/app/(tabs)/home/comps/product-list";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import {getInitialProducts} from "@/app/(tabs)/home/actions";

export type InitialProducts = Prisma.PromiseReturnType<
    typeof getInitialProducts
>;

export const metadata = {
    title: "Home",
};

// 새로고침시 데이터베이스 자동 호출
// export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Products() {
    const initialProducts = await getInitialProducts();
    // const revalidate = async () => {
    //     "use server";
    //     revalidatePath("/home");
    // };
    return (
        <div>
            <ProductList initialProducts={initialProducts}/>
            <Link
                href="/product/add"
                className="bg-blue-500 flex items-center justify-center rounded-full size-10 md:size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
            >
                <PlusIcon className="size-7 md:size-10"/>
            </Link>
        </div>
    );
}