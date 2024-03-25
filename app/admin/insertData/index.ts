import { PrismaClient } from "@prisma/client/extension";
const express = require('express')
const app = express()

const prisma = new PrismaClient()

app.get('/getDataBuildings', async (req, res) => {
    try {
      const allBuildings = await prisma.students.findMany();
      res.json(allBuildings);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});

app.post('/insertBuilding', async (req, res) => {
    try {
        const { name, coordi1, coordi2 } = req.body;
        const newBuilding = await prisma.students.create({
            data: {
                nameBuilding : name,
                coordi : [coordi1, coordi2]
            }
        });
        res.json(newBuilding);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
