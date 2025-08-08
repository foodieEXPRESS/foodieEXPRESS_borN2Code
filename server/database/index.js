const {PrismaClient} =require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// Function to check available models
const checkModels = async () => {
  const models = Object.keys(prisma)
    .filter(key => !key.startsWith('_'))
    .filter(key => typeof prisma[key] === 'object')
  console.log('Available Prisma Models:', models)
}

// Execute the check
checkModels()

module.exports = prisma