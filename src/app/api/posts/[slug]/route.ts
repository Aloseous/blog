import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { slug: string } }): Promise<NextResponse> => {
    const { slug } = params;

    try {
        const post = await prisma.post.update({ where: { slug }, data: { views: { increment: 1 } }, include: { user: true } })
        return NextResponse.json(post);  // Simplified response
    } catch (error) {
        console.error("Error fetching posts:", error);  // Log the error for debugging
        return NextResponse.json({ message: "post fetch failed" }, { status: 500 });
    }
};
