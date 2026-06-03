import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Simple auth check — set SANITY_REVALIDATE_SECRET in your env
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // Revalidate blog pages
    revalidatePath("/[locale]/blog", "page");
    revalidatePath("/[locale]/blog/[slug]", "page");
    revalidatePath("/en/blog");
    revalidatePath("/zh/blog");
    revalidatePath("/ja/blog");
    revalidatePath("/ru/blog");

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", err }, { status: 500 });
  }
}
