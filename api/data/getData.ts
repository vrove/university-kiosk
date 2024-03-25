const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.get('/api/buildings', async (req, res) => {
    const buildings = await prisma.buildings.findMany();
    res.json(buildings);
})

app.get('/api/lecturers', async (req, res) => {
    const lecturers = await prisma.lecturers.findMany();
    res.json(lecturers);
})



app.listen(5500, () => {
    console.log('Server is running on http://127.0.0.1:5500');
});