import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";  // Importing the correct type for req

export const GET = async (req: NextRequest): Promise<NextResponse> => {

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1', 10); // Parse string to number and default to 1
    const cat = searchParams.get('cat') || ''; // Parse string to number and default to 1

    const POST_PER_PAGE = 2;

    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),  // Skip calculation with correct page value
        where: {
            ...(cat && { catSlug: cat }),
        },
        orderBy: {
            createdAt: Prisma.SortOrder.desc,  // Sort posts by createdAt in descending order
        },
    }

    try {
        const [posts, count] = await prisma.$transaction([prisma.post.findMany(query), prisma.post.count({ where: query.where })])
        return NextResponse.json({ posts, count });  // Simplified response
    } catch (error) {
        console.error("Error fetching posts:", error);  // Log the error for debugging
        return NextResponse.json({ message: "post fetch failed" }, { status: 500 });
    }
};

// Creating post
export const POST = async (req: NextRequest): Promise<NextResponse> => {

    const session = await getAuthSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "User not Authenticated" }, { status: 401 });
    }


    try {
        const body = await req.json();
        console.log(`body -->`, body);
        const post = await prisma.post.create({ data: { ...body, userEmail: session.user.email } });
        return NextResponse.json(post, { status: 200 });  // Simplified response
    } catch (error) {
        console.error("Error fetching comments:", error);  // Log the error for debugging
        return NextResponse.json({ message: "comments fetch failed" }, { status: 500 });
    }
};

