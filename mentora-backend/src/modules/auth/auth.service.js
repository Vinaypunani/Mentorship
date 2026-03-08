const prisma = require("../../config/prisma");
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');

const signup = async ({ name, email, password, role }) => {
    if (role !== "parent" && role !== "mentor") {
        throw new Error("Invalid role");
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashed,
            role
        }
    });

    const token = generateToken(user);

    return { user, token };
}

const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return { user, token };
}

module.exports = {
    signup,
    login
}
