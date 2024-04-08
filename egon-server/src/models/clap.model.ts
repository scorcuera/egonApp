import { prisma } from "../connection/prismaClient";
import { ClapForm } from "../interfaces/clap.interface";

const Clap = {
    getAllClaps: async () => {
        try {
            const claps = await prisma.claps.findMany();
            return claps;
        } catch (e) {
            console.log(e);
        }
    },
    getAllSentClaps: async (senderId: number) => {
        try {
            const claps = await prisma.claps.findMany({
                where: {
                    from_user_id: senderId
                }
            });
            return claps;
        } catch (e) {
            console.log(e);
        }
    },
    getAllReceivedClaps: async (recipientId: number) => {
        try {
            const claps = await prisma.claps.findMany({
                where: {
                    to_user_id: recipientId,
                },
                select: {
                    num_claps: true,
                    message: true,
                    sent_at: true,
                    users_claps_from_user_idTousers: {
                        select: {
                            name: true,
                        },
                    },
                }
            });
            return claps;
        } catch (e) {
            console.log(e);
        }
    },
    sendClaps: async (newClaps: ClapForm) => {
        try {
            await prisma.claps.create({
                data: newClaps
            })
            return 'Claps sent succesfully !';
        } catch (e) {
            console.log(e);
        }
    }
}

export default Clap;