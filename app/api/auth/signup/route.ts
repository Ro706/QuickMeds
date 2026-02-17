import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/model/User";
import { signupSchema } from "@/Schemas/auth";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    // 🔌 Connect to database
    await connectDB();

    // Parse request body
    const body = await req.json();

    // Validate input using Zod
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const {name, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Generate JWT token
    const token = signToken({
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    // Create response
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );

    // Set JWT cookie (HTTP-only)
    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}