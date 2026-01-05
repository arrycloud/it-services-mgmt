const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
let services = [
    { id: 1, name: 'Cloud Migration', status: 'Active', client: 'TechCorp', date: '2023-10-01' },
    { id: 2, name: 'Cybersecurity Audit', status: 'Pending', client: 'GlobalBank', date: '2023-10-05' }
];

let clients = [
    { id: 1, name: 'TechCorp', industry: 'Technology', contact: 'john@techcorp.com' },
    { id: 2, name: 'GlobalBank', industry: 'Finance', contact: 'sarah@globalbank.com' }
];

// API Routes
app.get('/api/services', (req, res) => res.json(services));
app.post('/api/services', (req, res) => {
    const newService = { id: services.length + 1, ...req.body };
    services.push(newService);
    res.status(201).json(newService);
});

app.get('/api/clients', (req, res) => res.json(clients));
app.post('/api/clients', (req, res) => {
    const newClient = { id: clients.length + 1, ...req.body };
    clients.push(newClient);
    res.status(201).json(newClient);
});

app.get('/api/stats', (req, res) => {
    res.json({
        totalServices: services.length,
        activeClients: clients.length,
        uptime: '99.9%',
        revenue: '5,200'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
