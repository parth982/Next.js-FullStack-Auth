import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) return NextResponse.json(
            { error: "User does not exist" },
            { status: 400 })

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) return NextResponse.json({ error: "Invalid password" }, { status: 400 })

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.emailS
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "3d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, { httpOnly: true })
        return response
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}