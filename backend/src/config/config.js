export const cookieOptions = {
    httpOnly: true,
    secure: false ,
    sameSite: "lax",
    maxAge: 1000 * 60 * 5, // 5 minutes
};