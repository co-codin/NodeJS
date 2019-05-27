import uuidv4 from 'uuid/v1'

const Mutation = {
    async createUser (parent, args, { prisma }, info) {
        const emailTaken = await prisma.exists.User({ email: args.data.email })

        if (emailTaken) {
            throw new Error('Email taken')
        }

        return prisma.mutation.createUser({ data: args.data }, info)
    },

    async deleteUser (parent, args, { prisma }, info) {
        
    },

    async updateUser (parent, args, { prisma }, info) {

    },

    async createPost (parent, args, { prisma, pubsub }, info) {

    },

    async deletePost (parent, args, { prisma, pubsub }, info) {

    },

    async updatePost (parent, args, { prisma }, info) {

    },

    async createComment (parent, args, { prisma, pubsub }, info) {

    },

    async deleteComment (parent, args, { prisma, pubsub }, info) {

    },

    async updateComment (parent, args, { prisma, pubsub }, info) {

    }
}

export { Mutation as default }
