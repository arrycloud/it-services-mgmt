const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    setupNavigation();
});

function setupNavigation() {
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });
}

async function loadPage(page) {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="loader">Loading...</div>';
    
    switch(page) {
        case 'dashboard': await loadDashboard(); break;
        case 'services': await loadServices(); break;
        case 'clients': await loadClients(); break;
        case 'bookings': loadBookings(); break;
        case 'analytics': loadAnalytics(); break;
        default: content.innerHTML = '<h2>' + page.charAt(0).toUpperCase() + page.slice(1) + '</h2><p>Section under development.</p>';
    }
}

async function loadDashboard() {
    const content = document.getElementById('page-content');
    try {
        const [statsRes, servicesRes] = await Promise.all([
            fetch(`${API_URL}/stats`),
            fetch(`${API_URL}/services`)
        ]);
        const stats = await statsRes.json();
        const services = await servicesRes.json();

        content.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card"><h3>Total Services</h3><div class="value">${stats.totalServices}</div></div>
                <div class="stat-card"><h3>Active Clients</h3><div class="value">${stats.activeClients}</div></div>
                <div class="stat-card"><h3>System Uptime</h3><div class="value">${stats.uptime}</div></div>
                <div class="stat-card"><h3>Monthly Revenue</h3><div class="value">${stats.revenue}</div></div>
            </div>
            <div class="section-header" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="color: var(--dark)">Recent Service Requests</h2>
                <button class="btn-primary" style="background: var(--primary); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; cursor: pointer; font-weight: 600;">+ New Service</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${services.map(s => `
                        <tr>
                            <td style="font-weight: 500">${s.name}</td>
                            <td>${s.client}</td>
                            <td>${s.date}</td>
                            <td><span class="status-badge status-${s.status.toLowerCase()}">${s.status}</span></td>
                            <td><button style="background: none; border: none; color: var(--primary); cursor: pointer;"><i class="fas fa-ellipsis-h"></i></button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (err) {
        content.innerHTML = '<div class="error-msg">Failed to connect to backend API. Please check if the server is running.</div>';
    }
}

async function loadServices() {
    const content = document.getElementById('page-content');
    try {
        const res = await fetch(`${API_URL}/services`);
        const services = await res.json();
        content.innerHTML = `
            <div class="section-header" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <h2>Service Catalog</h2>
                <button class="btn-primary" style="background: var(--primary); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; cursor: pointer;">Add Service</button>
            </div>
            <div class="stats-grid">
                ${services.map(s => `
                    <div class="stat-card">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <h3 style="color: var(--dark); font-size: 1.1rem;">${s.name}</h3>
                            <span class="status-badge status-${s.status.toLowerCase()}">${s.status}</span>
                        </div>
                        <p style="color: var(--secondary); margin: 1rem 0; font-size: 0.9rem;">Assigned to: ${s.client}</p>
                        <div style="display: flex; gap: 0.5rem;">
                            <button style="flex: 1; padding: 0.4rem; border: 1px solid #e2e8f0; border-radius: 4px; background: white; cursor: pointer;">Edit</button>
                            <button style="flex: 1; padding: 0.4rem; border: 1px solid #fee2e2; border-radius: 4px; background: #fef2f2; color: var(--danger); cursor: pointer;">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (err) {
        content.innerHTML = '<p>Error loading services.</p>';
    }
}

async function loadClients() {
    const content = document.getElementById('page-content');
    try {
        const res = await fetch(`${API_URL}/clients`);
        const clients = await res.json();
        content.innerHTML = `
            <div class="section-header" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <h2>Client Directory</h2>
                <button class="btn-primary" style="background: var(--primary); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; cursor: pointer;">Add Client</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Industry</th>
                        <th>Contact Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${clients.map(c => `
                        <tr>
                            <td style="font-weight: 500">${c.name}</td>
                            <td>${c.industry}</td>
                            <td>${c.contact}</td>
                            <td>
                                <button style="color: var(--primary); border: none; background: none; cursor: pointer; margin-right: 10px;"><i class="fas fa-edit"></i></button>
                                <button style="color: var(--danger); border: none; background: none; cursor: pointer;"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (err) {
        content.innerHTML = '<p>Error loading clients.</p>';
    }
}

function loadBookings() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <h2>Scheduling & Bookings</h2>
        <div style="background: white; padding: 2rem; border-radius: 12px; margin-top: 1rem; text-align: center;">
            <i class="fas fa-calendar-check" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h3>Calendar View</h3>
            <p style="color: var(--secondary)">Integrate with Google Calendar or Outlook for enterprise scheduling.</p>
        </div>
    `;
}

function loadAnalytics() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <h2>Performance Analytics</h2>
        <div class="stats-grid" style="margin-top: 1rem;">
            <div class="stat-card" style="height: 300px; display: flex; align-items: center; justify-content: center;">
                <p style="color: var(--secondary)">[ Revenue Chart Placeholder ]</p>
            </div>
            <div class="stat-card" style="height: 300px; display: flex; align-items: center; justify-content: center;">
                <p style="color: var(--secondary)">[ Service Distribution Chart Placeholder ]</p>
            </div>
        </div>
    `;
}
