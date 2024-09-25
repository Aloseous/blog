import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";  // Importing the correct type for req

// get all comments from a post

export const GET = async (req: NextRequest): Promise<NextResponse> => {

    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    try {
        const comments = await prisma.comment.findMany({ where: { ...(postSlug && { postSlug }) }, include: { user: true } })
        return NextResponse.json(comments);  // Simplified response
    } catch (error) {
        console.error("Error fetching comments:", error);  // Log the error for debugging
        return NextResponse.json({ message: "comments fetch failed" }, { status: 500 });
    }
};

// create comment
export const POST = async (req: NextRequest): Promise<NextResponse> => {

    const session = await getAuthSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "User not Authenticated" }, { status: 401 });
    }


    try {
        const body = await req.json()
        const comments = await prisma.comment.create({ data: { ...body, userEmail: session.user.email } })
        return NextResponse.json(comments, { status: 200 });  // Simplified response
    } catch (error) {
        console.error("Error fetching comments:", error);  // Log the error for debugging
        return NextResponse.json({ message: "comments fetch failed" }, { status: 500 });
    }
};
