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

app.get('/api/news', async (req, res) => {
    const news = await prisma.news.findMany();
    res.json(news);
})

app.get('/api/news/:newsId', async (req, res) => {
    const newsItem = await prisma.news.findUnique({
        where: {
            id: Number(req.params.newsId)
        }
    });
    res.json(newsItem);
})

app.get('/api/buildings/:buildingsId', async (req, res) => {
    const building = await prisma.buildings.findUnique({
        where: {
            id: Number(req.params.buildingsId)
        }
    });
    res.json(building);
})



app.listen(5500, () => {
    console.log('Server is running on http://127.0.0.1:5500');
});