import request from "supertest";
import { ServerModel } from "../src/models/server.model";
import { prisma } from "../src/connection/prismaClient";

beforeAll(async () => {
    await prisma.roles.create({
        data: {
            name: "user",
            id: 1
        }
    });
    await prisma.roles.create({
        data: {
            name: "admin",
            id: 2
        }
    });
    const newAdmin = {
        email: "admin@f5.org",
        name: "admin",
        password: "pass2",
        role_id: 2
    };
    const newUser = {
        email: "user@f5.org",
        name: "user",
        password: "pass1",
        role_id: 1
    }
    const server = new ServerModel();
    await request(server.app).post("/auth/register").send(newAdmin);
    await request(server.app).post("/auth/register").send(newUser);
})

describe("GET all claps", () => {
    let token = "";
    beforeAll( async () => {
        const admin = {
            email: "admin@f5.org",
            password: "pass2"
        }
        const server = new ServerModel();
        const response = await request(server.app).post("/auth/login").send(admin);
        token = response.body.data.token;
    });
    test("should return status code 200 when claps are called", async () => {
        const server = new ServerModel();
        const response = await request(server.app).get("/claps").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    test("should return status code 401 if user is not admin", async () => {
        const user = {
            email: "user@f5.org",
            password: "pass1"
        }
        const server = new ServerModel();
        const userData = await request(server.app).post("/auth/login").send(user);
        token = userData.body.data.token;
        const response = await request(server.app).get("/claps").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(401);
    });
})

describe("POST claps", () => {
    let user = {
        id: 0,
        token: ""
    };
    let admin = {
        id: 0,
        token: ""
    };
    beforeAll(async() => {
        const userData = {
            email: "user@f5.org",
            password: "pass1"
        }
        const adminData = {
            email: "admin@f5.org",
            password: "pass2"
        }
        const server = new ServerModel();
        const userInfo = await request(server.app).post("/auth/login").send(userData);
        const adminInfo = await request(server.app).post("/auth/login").send(adminData);
        user = {
            id: userInfo.body.data.user.id,
            token: userInfo.body.data.token
        }
        admin = {
            id: adminInfo.body.data.user.id,
            token: adminInfo.body.data.token
        }
    });
    test("should return status code 201 when claps are sent", async () => {
        const clapForm = {
            from_user_id: user.id,
            to_user_id: admin.id,
            num_claps: 20,
            message: "great job!"
        }
        const server = new ServerModel();
        const response = await request(server.app).post("/claps").send(clapForm).set("Authorization", `Bearer ${user.token}`);
        expect(response.status).toBe(201);
    });
    test("should return 401 if token is not provided", async () => {
        const clapForm = {
            from_user_id: user.id,
            to_user_id: admin.id,
            num_claps: 20,
            message: "great job!"
        }
        const server = new ServerModel();
        const response = await request(server.app).post("/claps").send(clapForm);
        expect(response.status).toBe(401);
    })
})

describe("GET user claps", () => {
    let user = {
        id: 0,
        token: ""
    };
    let admin = {
        id: 0,
        token: ""
    };
    beforeAll(async() => {
        const userData = {
            email: "user@f5.org",
            password: "pass1"
        }
        const adminData = {
            email: "admin@f5.org",
            password: "pass2"
        }
        const server = new ServerModel();
        const userInfo = await request(server.app).post("/auth/login").send(userData);
        const adminInfo = await request(server.app).post("/auth/login").send(adminData);
        user = {
            id: userInfo.body.data.user.id,
            token: userInfo.body.data.token
        }
        admin = {
            id: adminInfo.body.data.user.id,
            token: adminInfo.body.data.token
        }
    });
    test("should return status code 200 when received claps are called", async () => {
        const server = new ServerModel();
        const response = await request(server.app).get(`/claps/receivedClaps/${user.id}`).set("Authorization", `Bearer ${user.token}`);
        expect(response.status).toBe(200);
    });
    test("should return status code 401 if token is not provided", async () => {
        const server = new ServerModel();
        const response = await request(server.app).get(`/claps/receivedClaps/${user.id}`);
        expect(response.status).toBe(401);
    });
    test("should return received claps if they were sent", async () => {
        const server = new ServerModel();
        const response = await request(server.app).get(`/claps/receivedClaps/${admin.id}`).set("Authorization", `Bearer ${admin.token}`);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
    test("should return custom message if user doesn't have any claps yet", async () => {
        const server = new ServerModel();
        const response = await request(server.app).get(`/claps/receivedClaps/${user.id}`).set("Authorization", `Bearer ${user.token}`);
        expect(response.body.message).toContain("You don't have any received claps yet");
    })
})

afterAll(async () => {
    const deleteUsers = prisma.users.deleteMany();
    const deleteRoles = prisma.roles.deleteMany();
    const deleteClaps = prisma.claps.deleteMany();

    await prisma.$transaction([
        deleteClaps,
        deleteUsers,
        deleteRoles
        ]
    );

    await prisma.$disconnect();
})
