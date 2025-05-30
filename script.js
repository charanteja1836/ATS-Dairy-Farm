// Clock Functionality
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-GB');
}
setInterval(updateClock, 1000);
updateClock();

// Sidebar Toggle for Mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('active');
});

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load Saved Theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Navigation System
document.querySelectorAll('.menu li').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.menu li').forEach(i => i.classList.remove('active'));
    this.classList.add('active');

    const sectionToShow = this.getAttribute('data-section');

    document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById('content-iframe').style.display = 'none';
    document.getElementById('home-content').style.display = 'none';

    if (sectionToShow === 'home') {
      document.getElementById('home-content').style.display = 'block';
      initDashboardCharts();
    } else if (sectionToShow === 'crm') {
      document.getElementById('crm-content').style.display = 'block';
      initCRM();
    } else if (sectionToShow === 'farmer') {
      document.getElementById('farmer-content').style.display = 'block';
      initFarmerCharts();
    } else if (sectionToShow === 'milk') {
      document.getElementById('milk-content').style.display = 'block';
      initMilkCollection();
    } else if (sectionToShow === 'chilling') {
      document.getElementById('chilling-content').style.display = 'block';
      initChillingCenters();
    } else if (sectionToShow === 'processing') {
      document.getElementById('processing-content').style.display = 'block';
      initProcessingPlants();
    } else if (sectionToShow === 'quality') {
      document.getElementById('quality-content').style.display = 'block';
      initQualityControl();
    } else if (sectionToShow === 'inventory') {
      document.getElementById('inventory-content').style.display = 'block';
      initInventoryManagement();
    } else if (sectionToShow === 'distribution') {
      document.getElementById('distribution-content').style.display = 'block';
      initDistribution();
    } else if (sectionToShow === 'logout') {
      if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('theme');
        window.location.href = '/logout';
      }
    }  else {
      const iframe = document.getElementById('content-iframe');
      iframe.style.display = 'block';
      iframe.src = `${sectionToShow}.html`;
    }

    document.querySelector('.sidebar').classList.remove('active');
  });
});

// Initialize Dashboard Charts
function initDashboardCharts() {
  function createGauge(ctxId, value, color) {
    new Chart(document.getElementById(ctxId), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [value, 100 - value],
          backgroundColor: [color, getComputedStyle(document.documentElement).getPropertyValue('--gauge-empty').trim()],
          borderWidth: 1,
          borderColor: '#ddd'
        }]
      },
      options: {
        rotation: -90,
        circumference: 180,
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
          datalabels: {
            display: true,
            formatter: () => `${value}%`,
            color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim(),
            font: { weight: 'bold', size: 14 },
            anchor: 'center',
            align: 'center'
          }
        }
      },
      plugins: [{
        id: 'gaugeBackground',
        beforeDraw: chart => {
          const { ctx, chartArea } = chart;
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            chartArea.left + chartArea.width / 2,
            chartArea.top + chartArea.height,
            chartArea.width / 2.2,
            Math.PI,
            2 * Math.PI,
            false
          );
          ctx.lineWidth = 10;
          ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--gauge-empty').trim();
          ctx.stroke();
          ctx.restore();
        }
      }]
    });
  }

  createGauge('gauge1', 75, '#28a745');
  createGauge('gauge2', 82, '#007bff');
  createGauge('gauge3', 55, '#ffc107');
  createGauge('gauge4', 65, '#17a2b8');
  createGauge('gauge5', 90, '#20c997');
  createGauge('gauge6', 95, '#6610f2');
  createGauge('gauge7', 70, '#fd7e14');
  createGauge('gauge8', 85, '#dc3545');

  new Chart(document.getElementById('monthlyMilkChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { label: 'Cow Milk (L)', backgroundColor: '#007bff', data: [3000, 3500, 4000, 3700, 4200, 5000, 5200, 4800, 4600, 4900, 5100, 5300] },
        { label: 'Buffalo Milk (L)', backgroundColor: '#28a745', data: [1500, 1800, 2000, 1900, 2100, 2500, 2700, 2600, 2500, 2450, 2400, 2600] }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 12 }, color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() } }
      }
    }
  });

  new Chart(document.getElementById('dailyMilkChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Cow Milk (L)', backgroundColor: '#ffc107', data: [900, 950, 1000, 980, 1020, 1100, 1050] },
        { label: 'Buffalo Milk (L)', backgroundColor: '#17a2b8', data: [500, 520, 560, 540, 580, 600, 590] }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 12 }, color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() } }
      }
    }
  });
}

// Initialize Farmer Management Charts
function initFarmerCharts() {
  new Chart(document.getElementById('donutChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Active', 'Inactive'],
      datasets: [{ data: [4860, 340], backgroundColor: ['#28a745', '#dc3545'], hoverOffset: 20 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  new Chart(document.getElementById('barChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu'],
      datasets: [{ label: 'Milk Supplied (L)', data: [12000, 9500, 8300, 7800], backgroundColor: '#007bff' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } }
    }
  });
}

// Initialize CRM
function initCRM() {
  let tickets = [
    { id: 1, name: 'Rachel Green', priority: 'low', message: 'Request for additional milk supply for upcoming festival.', status: 'open', date: new Date().toISOString() },
    { id: 2, name: 'John Doe', priority: 'high', message: 'Urgent issue with cattle feed delivery schedule!', status: 'open', date: new Date().toISOString() },
    { id: 3, name: 'Priya Singh', priority: 'low', message: 'Need update on order tracking for dairy products.', status: 'open', date: new Date().toISOString() }
  ];

  const ticketsContainer = document.getElementById('ticketsContainer');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const addTicketBtn = document.getElementById('addTicketBtn');
  const ticketModal = document.getElementById('ticketModal');
  const closeBtn = document.querySelector('.close');
  const ticketForm = document.getElementById('ticketForm');
  const totalTicketsEl = document.getElementById('totalTickets');
  const openTicketsEl = document.getElementById('openTickets');
  const resolvedTicketsEl = document.getElementById('resolvedTickets');

  function renderTickets(ticketsToRender = tickets) {
    ticketsContainer.innerHTML = ticketsToRender.length === 0 ? '<p class="no-tickets">No tickets found</p>' : '';
    ticketsToRender.forEach(ticket => {
      const ticketEl = document.createElement('div');
      ticketEl.className = 'ticket';
      ticketEl.dataset.id = ticket.id;
      ticketEl.innerHTML = `
        <div class="ticket-info">
          <div class="ticket-header">
            <strong>${ticket.name || 'Unknown'}</strong>
            <span class="priority ${ticket.priority}">${ticket.priority.toUpperCase()}</span>
            <small>${new Date(ticket.date).toLocaleDateString()}</small>
          </div>
          <p>${ticket.message || 'No message provided'}</p>
        </div>
        <div class="ticket-actions">
          <button class="reply-btn">Reply</button>
          <button class="email-btn">Email</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      ticketsContainer.appendChild(ticketEl);
    });
    updateStats();
    setupTicketEventListeners();
  }

  function updateStats() {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const resolvedPercentage = Math.round((total - open) / total * 100) || 0;
    totalTicketsEl.textContent = total;
    openTicketsEl.textContent = open;
    resolvedTicketsEl.textContent = `${resolvedPercentage}%`;
  }

  function setupTicketEventListeners() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ticketId = parseInt(btn.closest('.ticket').dataset.id);
        if (confirm('Are you sure you want to delete this ticket?')) {
          tickets = tickets.filter(ticket => ticket.id !== ticketId);
          renderTickets();
        }
      });
    });
    document.querySelectorAll('.reply-btn, .email-btn').forEach(btn => {
      btn.addEventListener('click', () => alert(`${btn.textContent} action clicked`));
    });
  }

  function searchTickets() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = searchTerm ? tickets.filter(ticket =>
      (ticket.name && ticket.name.toLowerCase().includes(searchTerm)) ||
      (ticket.message && ticket.message.toLowerCase().includes(searchTerm))
    ) : tickets;
    renderTickets(filtered);
  }

  function addTicket(ticketData) {
    const newTicket = {
      id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
      name: ticketData.name.trim(),
      priority: ticketData.priority,
      message: ticketData.message.trim(),
      status: 'open',
      date: new Date().toISOString()
    };
    tickets.unshift(newTicket);
    renderTickets();
    ticketModal.style.display = 'none';
    ticketForm.reset();
  }

  searchBtn.addEventListener('click', searchTickets);
  searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') searchTickets();
  });
  addTicketBtn.addEventListener('click', () => ticketModal.style.display = 'block');
  closeBtn.addEventListener('click', () => ticketModal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === ticketModal) ticketModal.style.display = 'none';
  });
  ticketForm.addEventListener('submit', e => {
    e.preventDefault();
    addTicket({
      name: document.getElementById('customerName').value,
      priority: document.getElementById('ticketPriority').value,
      message: document.getElementById('ticketMessage').value
    });
  });

  renderTickets();
}

// Initialize Milk Collection
/* Fake Data */
const suppliers = [
  {id:'SP-1001', name:'Rajesh Patel', contact:'9876543210', location:'Village A', cows:5, yield:24.50, status:'Active'},
  {id:'SP-1002', name:'Meena Sharma', contact:'9876543211', location:'Village B', cows:8, yield:38.30, status:'Active'},
  {id:'SP-1003', name:'Vijay Kumar', contact:'9876543212', location:'Village C', cows:12, yield:52.25, status:'New'},
  {id:'SP-1004', name:'Sunita Devi', contact:'9876543213', location:'Village A', cows:8, yield:29.95, status:'Active'}
];

let milkEntries = [
  { date: '2025-05-25', quantity: 200, fat: 4.5, status: 'Pending' },
  { date: '2025-05-25', quantity: 150, fat: 3.2, status: 'Cleared' },
  { date: '2025-05-26', quantity: 180, fat: 2.5, status: 'Pending' },
  { date: '2025-05-26', quantity: 220, fat: 4.8, status: 'Pending' },
  { date: '2025-05-27', quantity: 100, fat: 3.0, status: 'Cleared' }
];
let qualitySort = { field: 'date', direction: 'asc' };

/* Tabs */
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(btn => btn.addEventListener('click', () => {
  tabs.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tabId = btn.dataset.tab;
  tabContents.forEach(tc => tc.classList.toggle('active', tc.id === tabId));
  if (tabId === 'quality') renderQualityTable();
  if (tabId === 'payments') renderPaymentsTable();
}));

/* Suppliers Rendering */
function renderSuppliers() {
  const tbody = document.getElementById('supplierTableBody');
  tbody.innerHTML = suppliers.map(s => `<tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.contact}</td>
      <td>${s.location}</td>
      <td>${s.cows}</td>
      <td>${s.yield.toFixed(2)}L</td>
      <td><span class="status ${s.status}">${s.status}</span></td>
      <td class="actions">
        <i class="fas fa-eye" title="View"></i>
        <i class="fas fa-pen" title="Edit"></i>
        <i class="fas fa-trash" title="Delete" onclick="deleteSupplier('${s.id}')"></i>
      </td>
    </tr>`).join('');
  updateSummaryCards();
}

function deleteSupplier(id) {
  if (confirm('Delete supplier ' + id + '?')) {
    const idx = suppliers.findIndex(s => s.id === id);
    if (idx > -1) {
      suppliers.splice(idx, 1);
      renderSuppliers();
    }
  }
}

/* Supplier Modal */
const supplierModal = document.getElementById('supplierModal');
const addSupplierBtn = document.getElementById('addSupplierBtn');
const closeModalBtn = supplierModal.querySelector('.close');
const supplierForm = document.getElementById('supplierForm');

addSupplierBtn.onclick = () => supplierModal.style.display = 'block';
closeModalBtn.onclick = () => supplierModal.style.display = 'none';
window.onclick = e => { if (e.target === supplierModal || e.target === milkEntryModal) supplierModal.style.display = milkEntryModal.style.display = 'none'; };

supplierForm.onsubmit = e => {
  e.preventDefault();
  const newSupplier = {
    id: document.getElementById('spId').value.trim(),
    name: document.getElementById('spName').value.trim(),
    contact: document.getElementById('spContact').value.trim(),
    location: document.getElementById('spLocation').value.trim(),
    cows: parseInt(document.getElementById('spCows').value),
    yield: parseFloat(document.getElementById('spYield').value),
    status: document.getElementById('spStatus').value
  };
  suppliers.push(newSupplier);
  supplierForm.reset();
  supplierModal.style.display = 'none';
  renderSuppliers();
};

/* Milk Entry Modal */
const milkEntryModal = document.getElementById('milkEntryModal');
const addQualityEntryBtn = document.getElementById('addQualityEntryBtn');
const addPaymentEntryBtn = document.getElementById('addPaymentEntryBtn');
const milkEntryForm = document.getElementById('milkEntryForm');
const closeMilkModalBtn = milkEntryModal.querySelector('.close');

addQualityEntryBtn.onclick = addPaymentEntryBtn.onclick = () => milkEntryModal.style.display = 'block';
closeMilkModalBtn.onclick = () => milkEntryModal.style.display = 'none';

milkEntryForm.onsubmit = e => {
  e.preventDefault();
  const date = document.getElementById('newMilkDate').value;
  const quantity = parseFloat(document.getElementById('newMilkQuantity').value);
  const fat = parseFloat(document.getElementById('newMilkFat').value);
  if (!date || isNaN(quantity) || isNaN(fat) || quantity <= 0 || fat < 0 || fat > 10) {
    alert('Please enter valid data (quantity > 0, fat 0–10%).');
    return;
  }
  milkEntries.push({ date, quantity, fat, status: 'Pending' });
  milkEntryForm.reset();
  milkEntryModal.style.display = 'none';
  renderMilkTable();
  updateMilkTotals();
  renderQualityTable();
  renderPaymentsTable();
  updateSummaryCards();
};

/* Milk Collection */
const addMilkBtn = document.getElementById('addMilkBtn');
const exportMilkBtn = document.getElementById('exportMilkBtn');

addMilkBtn.onclick = addMilkEntry;
exportMilkBtn.onclick = exportMilkData;

function addMilkEntry() {
  const date = document.getElementById('milkDate').value;
  const quantity = parseFloat(document.getElementById('milkQuantity').value);
  const fat = parseFloat(document.getElementById('milkFat').value);
  if (!date || isNaN(quantity) || isNaN(fat) || quantity <= 0 || fat < 0 || fat > 10) {
    alert('Please enter valid data (quantity > 0, fat 0–10%).');
    return;
  }
  milkEntries.push({ date, quantity, fat, status: 'Pending' });
  document.getElementById('milkDate').value = '';
  document.getElementById('milkQuantity').value = '';
  document.getElementById('milkFat').value = '';
  renderMilkTable();
  updateMilkTotals();
  renderQualityTable();
  renderPaymentsTable();
  updateSummaryCards();
}

function renderMilkTable() {
  const tbody = document.getElementById('milkTableBody');
  tbody.innerHTML = milkEntries.map(e => `<tr><td>${e.date}</td><td>${e.quantity}</td><td>${e.fat}</td></tr>`).join('');
}

function updateMilkTotals() {
  const totalQ = milkEntries.reduce((sum, e) => sum + e.quantity, 0);
  const avgF = milkEntries.length ? (milkEntries.reduce((sum, e) => sum + e.fat, 0) / milkEntries.length).toFixed(2) : 0;
  document.getElementById('totalQuantity').textContent = totalQ.toFixed(2);
  document.getElementById('avgFat').textContent = avgF;
  updateSummaryCards();
}

function exportMilkData() {
  if (milkEntries.length === 0) {
    alert('No data to export.');
    return;
  }
  try {
    let csv = 'Date,Quantity (L),Fat (%)\n';
    milkEntries.forEach(e => csv += `${e.date},${e.quantity},${e.fat}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'milk_collection_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    alert('Export failed. Please try a different browser.');
  }
}

/* Quality Control */
function getQualityGrade(fat) {
  if (fat > 4) return 'A';
  if (fat >= 3) return 'B';
  return 'C';
}

function renderQualityTable() {
  const filter = document.getElementById('qualityFilter').value;
  const search = document.getElementById('qualitySearch').value.toLowerCase();
  let filteredEntries = filter === 'all' ? milkEntries : milkEntries.filter(e => getQualityGrade(e.fat) === filter);
  filteredEntries = filteredEntries.filter(e => e.date.toLowerCase().includes(search) || getQualityGrade(e.fat).toLowerCase().includes(search));

  // Sorting
  filteredEntries.sort((a, b) => {
    let fieldA = a[qualitySort.field] || getQualityGrade(a.fat);
    let fieldB = b[qualitySort.field] || getQualityGrade(b.fat);
    if (qualitySort.field === 'grade') {
      fieldA = getQualityGrade(a.fat);
      fieldB = getQualityGrade(b.fat);
    }
    if (qualitySort.direction === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  const tbody = document.getElementById('qualityTableBody');
  tbody.innerHTML = filteredEntries.map((e, i) => `<tr>
    <td>${e.date}</td>
    <td>${e.quantity}</td>
    <td>${e.fat}</td>
    <td><span class="status ${getQualityGrade(e.fat)}">${getQualityGrade(e.fat)}</span></td>
    <td class="actions"><i class="fas fa-trash" onclick="deleteQualityEntry(${milkEntries.indexOf(e)})" title="Delete Entry"></i></td>
  </tr>`).join('');

  // Update totals
  const avgFat = filteredEntries.length ? (filteredEntries.reduce((sum, e) => sum + e.fat, 0) / filteredEntries.length).toFixed(2) : 0;
  document.getElementById('selectedAvgFat').textContent = avgFat;

  // Update sort indicators
  document.querySelectorAll('.sortable').forEach(th => {
    th.classList.remove('sorted-asc', 'sorted-desc');
    if (th.dataset.sort === qualitySort.field) {
      th.classList.add(qualitySort.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
  });
}

function deleteQualityEntry(index) {
  if (confirm(`Delete entry for ${milkEntries[index].date}?`)) {
    milkEntries.splice(index, 1);
    renderMilkTable();
    updateMilkTotals();
    renderQualityTable();
    renderPaymentsTable();
    updateSummaryCards();
  }
}

document.getElementById('qualityFilter').addEventListener('change', renderQualityTable);
document.getElementById('qualitySearch').addEventListener('input', () => renderQualityTable());
document.querySelectorAll('.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const field = th.dataset.sort;
    if (qualitySort.field === field) {
      qualitySort.direction = qualitySort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      qualitySort.field = field;
      qualitySort.direction = 'asc';
    }
    renderQualityTable();
  });
});

/* Payments */
function calculatePayment(quantity, fat) {
  const baseRate = 50; // ₹50 per liter
  const fatBonus = fat * 10; // ₹10 per % fat
  return (quantity * (baseRate + fatBonus)).toFixed(2);
}

function renderPaymentsTable() {
  const filter = document.getElementById('paymentStatusFilter').value;
  const filteredEntries = filter === 'all' ? milkEntries : milkEntries.filter(e => e.status === filter);

  const tbody = document.getElementById('paymentsTableBody');
  tbody.innerHTML = filteredEntries.map((e, i) => `<tr>
    <td><input type="checkbox" class="payment-checkbox" data-index="${milkEntries.indexOf(e)}" ${e.status === 'Cleared' ? 'checked' : ''}></td>
    <td>${e.date}</td>
    <td>${e.quantity}</td>
    <td>₹${calculatePayment(e.quantity, e.fat)}</td>
    <td><span class="status ${e.status}">${e.status}</span></td>
    <td class="actions"><i class="fas fa-trash" onclick="deletePaymentEntry(${milkEntries.indexOf(e)})" title="Delete entry"></i></td>
  </tr>`).join('');

  // Update total pending
  const totalPending = milkEntries.reduce((sum, e) => e.status === 'Pending' ? sum + parseFloat(calculatePayment(e.quantity, e.fat)) : sum, 0);
  document.getElementById('totalPending').textContent = `₹${totalPending.toFixed(2)}`;

  // Update Select All checkbox state
  const selectAll = document.getElementById('selectAllPayments');
  selectAll.checked = filteredEntries.length > 0 && filteredEntries.every(e => e.status === 'Cleared');

  // Checkbox event listeners
  document.querySelectorAll('.payment-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      milkEntries[index].status = e.target.checked ? 'Cleared' : 'Pending';
      renderPaymentsTable();
      updateSummaryCards();
    });
  });
}

function deletePaymentEntry(index) {
  if (confirm(`Delete entry for ${milkEntries[index].date}?`)) {
    milkEntries.splice(index, 1);
    renderMilkTable();
    updateMilkTotals();
    renderQualityTable();
    renderPaymentsTable();
    updateSummaryCards();
  }
}

function exportPaymentsData() {
  if (milkEntries.length === 0) {
    alert('No data to export.');
    return;
  }
  try {
    let csv = 'Date,Quantity (L),Fat (%),Payment (₹),Status\n';
    milkEntries.forEach(e => {
      csv += `${e.date},${e.quantity},${e.fat},${calculatePayment(e.quantity, e.fat)},${e.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment_history.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    alert('Export failed. Please try a different browser.');
  }
}

document.getElementById('paymentStatusFilter').addEventListener('change', renderPaymentsTable);
document.getElementById('exportPaymentsBtn').addEventListener('click', exportPaymentsData);
document.getElementById('selectAllPayments').addEventListener('change', (e) => {
  if (e.target.checked) {
    const filter = document.getElementById('paymentStatusFilter').value;
    const indices = (filter === 'all' ? milkEntries : milkEntries.filter(e => e.status === filter))
      .map((e, i) => milkEntries.indexOf(e))
      .filter(i => milkEntries[i].status === 'Pending');
    indices.forEach(i => milkEntries[i].status = 'Cleared');
    renderPaymentsTable();
    updateSummaryCards();
  }
});

/* Summary Cards Update */
function updateSummaryCards() {
  document.getElementById('totalSuppliersCard').textContent = suppliers.length;
  document.getElementById('todaysCollectionCard').textContent = milkEntries.reduce((sum, e) => sum + e.quantity, 0).toFixed(2) + 'L';
  const avgQuality = milkEntries.length ? milkEntries.reduce((sum, e) => sum + (getQualityGrade(e.fat) === 'A' ? 3 : getQualityGrade(e.fat) === 'B' ? 2 : 1), 0) / milkEntries.length : 0;
  document.getElementById('avgQualityCard').textContent = avgQuality ? (avgQuality >= 2.5 ? 'A' : avgQuality >= 1.5 ? 'B' : 'C') : 'N/A';
  const pendingPayments = milkEntries.reduce((sum, e) => e.status === 'Pending' ? sum + parseFloat(calculatePayment(e.quantity, e.fat)) : sum, 0);
  document.getElementById('pendingPaymentsCard').textContent = `₹${pendingPayments.toFixed(2)}`;
}

/* Init */
renderSuppliers();
renderMilkTable();
renderQualityTable();
renderPaymentsTable();
updateSummaryCards();

// Initialize Chilling Centers
function initChillingCenters() {
  let receptionBatches = [
    { id: 'BATCH-001', source: 'Collection Center A', centerId: 'CC-001', volume: 1000, grade: 'Accepted', weight: 1030, received: '2025-05-20T08:00', notes: '' },
    { id: 'BATCH-002', source: 'Producer B', centerId: 'CC-002', volume: 800, grade: 'Rejected', weight: 820, received: '2025-05-20T09:00', notes: 'High microbial count' }
  ];

  let chillingCenters = [
    { id: 'CC-001', name: 'North Chilling Unit', location: 'Village A', capacity: 5000, stock: 3200, temp: 3.5, status: 'Operational' },
    { id: 'CC-002', name: 'South Chilling Unit', location: 'Village B', capacity: 7000, stock: 4500, temp: 4.0, status: 'Operational' }
  ];

  let dispatchRecords = [
    { id: 'DISP-001', centerId: 'CC-001', quantity: 2000, transport: 'Tanker', destination: 'Main Dairy', dispatchTime: '2025-05-20T12:00', sanitization: 'Checked', notes: '' }
  ];

  let testResults = [
    { id: 'SAMP-001', stage: 'Reception', reference: 'BATCH-001', grade: 'A', fat: 4.2, microbial: 5000, testDate: '2025-05-20', notes: '' },
    { id: 'SAMP-002', stage: 'Storage', reference: 'CC-001', grade: 'A-', fat: 4.0, microbial: 8000, testDate: '2025-05-20', notes: '' }
  ];

  let receptionChart, tempChart;

  function updateCenterDropdown() {
    const select = document.getElementById('batchCenterId');
    select.innerHTML = '<option value="" disabled selected>Select Chilling Center</option>';
    chillingCenters.forEach(center => {
      const option = document.createElement('option');
      option.value = center.id;
      option.textContent = `${center.id} - ${center.name}`;
      select.appendChild(option);
    });
  }

  function initCharts() {
    receptionChart = new Chart(document.getElementById('receptionChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Collection Centers', 'Producers'],
        datasets: [{
          label: 'Milk Volume (L)',
          data: [0, 0],
          backgroundColor: ['#38a169', '#2b6cb0'],
          borderColor: ['#2f855a', '#2c5282'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Volume (L)', font: { size: 12 } }, ticks: { font: { size: 10 } } },
          x: { ticks: { font: { size: 10 } } }
        },
        plugins: { legend: { display: false }, title: { display: false } }
      }
    });

    tempChart = new Chart(document.getElementById('tempChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Temperature (°C)', font: { size: 12 } }, ticks: { font: { size: 10 } } },
          x: { ticks: { font: { size: 10 } } }
        },
        plugins: { legend: { position: 'top', labels: { font: { size: 10 } } } }
      }
    });

    updateCharts();
  }

  function updateCharts() {
    const collectionVolume = receptionBatches
      .filter(b => b.grade === 'Accepted' && b.source.toLowerCase().includes('collection'))
      .reduce((sum, b) => sum + b.volume, 0);
    const producerVolume = receptionBatches
      .filter(b => b.grade === 'Accepted' && !b.source.toLowerCase().includes('collection'))
      .reduce((sum, b) => sum + b.volume, 0);
    receptionChart.data.datasets[0].data = [collectionVolume, producerVolume];
    receptionChart.update();

    tempChart.data.datasets = chillingCenters.map((center, index) => ({
      label: center.name,
      data: [
        center.temp,
        center.temp + (Math.random() - 0.5) * 0.5,
        center.temp + (Math.random() - 0.5) * 0.5,
        center.temp + (Math.random() - 0.5) * 0.5,
        center.temp + (Math.random() - 0.5) * 0.5
      ],
      borderColor: ['#38a169', '#2b6cb0', '#e53e3e', '#ecc94b'][index % 4],
      fill: false,
      tension: 0.4
    }));
    tempChart.update();
  }

  function updateMetrics() {
    const totalMilkReceived = receptionBatches.reduce((sum, b) => (b.grade === 'Accepted' ? sum + b.volume : sum), 0);
    const totalCapacity = chillingCenters.reduce((sum, c) => sum + c.capacity, 0);
    const totalStock = chillingCenters.reduce((sum, c) => sum + (c.stock || 0), 0);
    const storageUtilization = totalCapacity ? ((totalStock / totalCapacity) * 100).toFixed(1) : 0;
    const avgTemp = chillingCenters.length ? (chillingCenters.reduce((sum, c) => sum + (c.temp || 0), 0) / chillingCenters.length).toFixed(1) : 0;
    const qualityIssues = testResults.filter(t => t.grade === 'B' || t.grade === 'C').length;

    document.getElementById('totalMilkReceived').textContent = totalMilkReceived.toLocaleString() + ' L';
    document.getElementById('storageUtilization').textContent = storageUtilization + '%';
    document.getElementById('avgTemp').textContent = avgTemp + '°C';
    document.getElementById('qualityIssues').textContent = qualityIssues;
  }

  function renderReception() {
    document.getElementById('receptionRecords').innerHTML = receptionBatches.map(b => `
      <div class="record" data-id="${b.id}">
        <div class="record-details">
          <p><strong>ID:</strong> ${b.id}</p>
          <p><strong>Source:</strong> ${b.source}</p>
          <p><strong>Center ID:</strong> ${b.centerId}</p>
          <p><strong>Volume:</strong> ${b.volume.toFixed(1)} L</p>
          <p><strong>Grade:</strong> <span class="status ${b.grade}">${b.grade}</span></p>
        </div>
        <div class="actions">
          <i class="fas fa-pen edit" title="Edit"></i>
          <i class="fas fa-trash delete" title="Delete"></i>
        </div>
      </div>
    `).join('');
    updateMetrics();
    updateCharts();
    setupReceptionEvents();
  }

  function renderChilling() {
    document.getElementById('chillingRecords').innerHTML = chillingCenters.map(c => `
      <div class="record" data-id="${c.id}">
        <div class="record-details">
          <p><strong>ID:</strong> ${c.id}</p>
          <p><strong>Name:</strong> ${c.name}</p>
          <p><strong>Stock:</strong> ${(c.stock || 0).toFixed(1)} L</p>
          <p><strong>Status:</strong> <span class="status ${c.status.replace(' ', '-')}"">${c.status}</span></p>
        </div>
        <div class="actions">
          <i class="fas fa-pen edit" title="Edit"></i>
          <i class="fas fa-trash delete" title="Delete"></i>
        </div>
      </div>
    `).join('');
    updateMetrics();
    updateCharts();
    updateCenterDropdown();
    setupChillingEvents();
  }

  function renderDispatch() {
    document.getElementById('dispatchRecords').innerHTML = dispatchRecords.map(d => `
      <div class="record" data-id="${d.id}">
        <div class="record-details">
          <p><strong>ID:</strong> ${d.id}</p>
          <p><strong>Center ID:</strong> ${d.centerId}</p>
          <p><strong>Quantity:</strong> ${d.quantity.toFixed(1)} L</p>
          <p><strong>Sanitization:</strong> <span class="status ${d.sanitization.replace(' ', '-')}"">${d.sanitization}</span></p>
        </div>
        <div class="actions">
          <i class="fas fa-pen edit" title="Edit"></i>
          <i class="fas fa-trash delete" title="Delete"></i>
        </div>
      </div>
    `).join('');
    setupDispatchEvents();
  }

  function renderSampling() {
    document.getElementById('samplingRecords').innerHTML = testResults.map(t => `
      <div class="record" data-id="${t.id}">
        <div class="record-details">
          <p><strong>ID:</strong> ${t.id}</p>
          <p><strong>Stage:</strong> ${t.stage}</p>
          <p><strong>Grade:</strong> <span class="grade ${t.grade}">${t.grade}</span></p>
          <p><strong>Fat:</strong> ${t.fat.toFixed(1)}%</p>
        </div>
        <div class="actions">
          <i class="fas fa-pen edit" title="Edit"></i>
          <i class="fas fa-trash delete" title="Delete"></i>
        </div>
      </div>
    `).join('');
    updateMetrics();
    setupSamplingEvents();
  }

  function setupReceptionEvents() {
    document.querySelectorAll('#receptionRecords .delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.record').dataset.id;
        if (confirm(`Delete batch ${id}?`)) {
          const batch = receptionBatches.find(b => b.id === id);
          if (batch && batch.grade === 'Accepted') {
            const center = chillingCenters.find(c => c.id === batch.centerId);
            if (center) center.stock = Math.max(0, (center.stock || 0) - batch.volume);
          }
          receptionBatches = receptionBatches.filter(b => b.id !== id);
          renderReception();
          renderChilling();
        }
      });
    });
    document.querySelectorAll('#receptionRecords .edit').forEach(btn => {
      btn.addEventListener('click', () => alert(`Edit batch ${btn.closest('.record').dataset.id}`));
    });
  }

  function setupChillingEvents() {
    document.querySelectorAll('#chillingRecords .delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.record').dataset.id;
        if (confirm(`Delete center ${id}?`)) {
          chillingCenters = chillingCenters.filter(c => c.id === id);
          dispatchRecords = dispatchRecords.filter(d => d.centerId !== id);
          testResults = testResults.filter(t => t.reference !== id);
          receptionBatches = receptionBatches.filter(b => b.centerId !== id);
          renderChilling();
          renderDispatch();
          renderSampling();
          renderReception();
        }
      });
    });
    document.querySelectorAll('#chillingRecords .edit').forEach(btn => {
      btn.addEventListener('click', () => alert(`Edit center ${btn.closest('.record').dataset.id}`));
    });
  }

  function setupDispatchEvents() {
    document.querySelectorAll('#dispatchRecords .delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.record').dataset.id;
        if (confirm(`Delete dispatch ${id}?`)) {
          const dispatch = dispatchRecords.find(d => d.id === id);
          if (dispatch) {
            const center = chillingCenters.find(c => c.id === dispatch.centerId);
            if (center) center.stock = (center.stock || 0) + dispatch.quantity;
          }
          dispatchRecords = dispatchRecords.filter(d => d.id !== id);
          renderDispatch();
          renderChilling();
        }
      });
    });
    document.querySelectorAll('#dispatchRecords .edit').forEach(btn => {
      btn.addEventListener('click', () => alert(`Edit dispatch ${btn.closest('.record').dataset.id}`));
    });
  }

  function setupSamplingEvents() {
    document.querySelectorAll('#samplingRecords .delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.record').dataset.id;
        if (confirm(`Delete sample ${id}?`)) {
          testResults = testResults.filter(t => t.id !== id);
          renderSampling();
        }
      });
    });
    document.querySelectorAll('#samplingRecords .edit').forEach(btn => {
      btn.addEventListener('click', () => alert(`Edit sample ${btn.closest('.record').dataset.id}`));
    });
  }

  function setupForm(formId, submitHandler) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', e => {
      e.preventDefault();
      submitHandler();
      form.reset();
    });
  }

  setupForm('receptionForm', () => {
    const id = document.getElementById('batchId').value.trim();
    if (receptionBatches.some(b => b.id === id)) return alert('Batch ID already exists.');
    const volume = parseFloat(document.getElementById('batchVolume').value) || 0;
    const weight = parseFloat(document.getElementById('batchWeight').value) || 0;
    const centerId = document.getElementById('batchCenterId').value;
    if (volume <= 0 || weight <= 0) return alert('Volume and weight must be positive.');
    if (!centerId) return alert('Please select a chilling center.');
    const center = chillingCenters.find(c => c.id === centerId);
    if (!center) return alert('Invalid chilling center selected.');
    if (center.status !== 'Operational') return alert('Selected center is not operational.');
    const newBatch = {
      id,
      source: document.getElementById('batchSource').value.trim(),
      centerId,
      volume,
      grade: document.getElementById('batchGrade').value,
      weight,
      received: document.getElementById('batchReceived').value,
      notes: document.getElementById('batchNotes').value.trim()
    };
    receptionBatches.push(newBatch);
    if (newBatch.grade === 'Accepted') center.stock = (center.stock || 0) + newBatch.volume;
    renderReception();
    renderChilling();
  });

  setupForm('chillingForm', () => {
    const id = document.getElementById('centerId').value.trim();
    if (chillingCenters.some(c => c.id === id)) return alert('Center ID already exists.');
    const capacity = parseFloat(document.getElementById('centerCapacity').value) || 0;
    const temp = parseFloat(document.getElementById('centerTemp').value) || 0;
    if (capacity <= 0) return alert('Capacity must be positive.');
    chillingCenters.push({
      id,
      name: document.getElementById('centerName').value.trim(),
      location: document.getElementById('centerLocation').value.trim(),
      capacity,
      stock: 0,
      temp,
      status: document.getElementById('centerStatus').value
    });
    renderChilling();
  });

  setupForm('dispatchForm', () => {
    const id = document.getElementById('dispatchId').value.trim();
    if (dispatchRecords.some(d => d.id === id)) return alert('Dispatch ID already exists.');
    const quantity = parseFloat(document.getElementById('dispatchQuantity').value) || 0;
    const centerId = document.getElementById('dispatchCenterId').value.trim();
    if (quantity <= 0) return alert('Quantity must be positive.');
    const center = chillingCenters.find(c => c.id === centerId);
    if (!center) return alert('Invalid center ID.');
    if (center.stock < quantity) return alert('Insufficient stock in center.');
    center.stock -= quantity;
    dispatchRecords.push({
      id,
      centerId,
      quantity,
      transport: document.getElementById('dispatchTransport').value.trim(),
      destination: document.getElementById('dispatchDestination').value.trim(),
      dispatchTime: document.getElementById('dispatchTime').value,
      sanitization: document.getElementById('dispatchSanitization').value,
      notes: document.getElementById('dispatchNotes').value.trim()
    });
    renderDispatch();
    renderChilling();
  });

  setupForm('samplingForm', () => {
    const id = document.getElementById('sampleId').value.trim();
    if (testResults.some(t => t.id === id)) return alert('Sample ID already exists.');
    const fat = parseFloat(document.getElementById('sampleFat').value) || 0;
    const microbial = parseFloat(document.getElementById('sampleMicrobial').value) || 0;
    if (fat <= 0 || microbial < 0) return alert('Fat and microbial count must be valid.');
    testResults.push({
      id,
      stage: document.getElementById('sampleStage').value,
      reference: document.getElementById('sampleReference').value.trim(),
      grade: document.getElementById('sampleGrade').value,
      fat,
      microbial,
      testDate: document.getElementById('sampleDate').value,
      notes: document.getElementById('sampleNotes').value.trim()
    });
    renderSampling();
  });

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = content.classList.contains('active');
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.classList.remove('active');
        c.previousElementSibling.classList.add('collapsed');
      });
      if (!isActive) {
        content.classList.add('active');
        header.classList.remove('collapsed');
      }
    });
  });

  initCharts();
  renderReception();
  renderChilling();
  renderDispatch();
  renderSampling();
}
// Initialize Processing Plants
function initProcessingPlants() {
  let productionLogs = [
    { id: 'BATCH-001', stage: 'reception', volume: 5000, status: 'Completed', date: '2025-05-20T08:00' },
    { id: 'BATCH-002', stage: 'pasteurization', volume: 4800, status: 'In Progress', date: '2025-05-20T10:00' }
  ];

  let maintenanceTasks = [
    { id: 'TASK-001', equipment: 'Pasteurizer', description: 'Calibrate temperature sensor', status: 'todo' },
    { id: 'TASK-002', equipment: 'Packaging Line', description: 'Replace conveyor belt', status: 'todo' },
    { id: 'TASK-003', equipment: 'Homogenizer', description: 'Routine check', status: 'done' }
  ];

  let equipmentStatus = [
    { name: 'Homogenizer', status: 'running' },
    { name: 'Pasteurizer', status: 'maintenance' },
    { name: 'Packaging Line', status: 'running' },
    { name: 'Storage Tank', status: 'offline' }
  ];

  let qualityMetricsChart;

  function initChart() {
    try {
      qualityMetricsChart = new Chart(document.getElementById('qualityMetricsChart').getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Pass', 'Minor Issues', 'Failed'],
          datasets: [{
            data: [80, 15, 5],
            backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 12 } } },
            title: { display: false }
          }
        }
      });
    } catch (e) {
      console.error('Error initializing chart:', e);
    }
  }

  function updateOverview() {
    try {
      const dailyOutput = productionLogs
        .filter(log => log.status === 'Completed' && new Date(log.date).toDateString() === new Date().toDateString())
        .reduce((sum, log) => sum + log.volume, 0);
      const uptime = equipmentStatus.filter(e => e.status === 'running').length / equipmentStatus.length * 100;
      const defectRate = productionLogs.length ? (productionLogs.filter(log => log.status === 'Failed').length / productionLogs.length * 100).toFixed(1) : 0;
      const activeTasks = maintenanceTasks.filter(task => task.status !== 'done').length;

      document.getElementById('dailyOutput').textContent = dailyOutput.toLocaleString() + ' L';
      document.getElementById('uptime').textContent = uptime.toFixed(1) + '%';
      document.getElementById('defectRate').textContent = defectRate + '%';
      document.getElementById('activeTasks').textContent = activeTasks;
    } catch (e) {
      console.error('Error updating overview:', e);
    }
  }

  function renderProductionLogs() {
    try {
      const filterText = document.getElementById('logFilter').value.toLowerCase();
      const stageFilter = document.getElementById('stageFilter').value;
      const filteredLogs = productionLogs.filter(log =>
        log.id.toLowerCase().includes(filterText) &&
        (stageFilter === 'all' || log.stage === stageFilter)
      );

      document.getElementById('productionTableBody').innerHTML = filteredLogs
        .map(log => `
          <tr>
            <td>${log.id}</td>
            <td>${log.stage.charAt(0).toUpperCase() + log.stage.slice(1)}</td>
            <td>${log.volume.toFixed(1)}</td>
            <td><span class="status ${log.status.replace(' ', '-')}">${log.status}</span></td>
            <td>${new Date(log.date).toLocaleString()}</td>
            <td><i class="fas fa-trash delete-log" data-id="${log.id}" aria-label="Delete log ${log.id}"></i></td>
          </tr>
        `).join('');
      updateOverview();
    } catch (e) {
      console.error('Error rendering production logs:', e);
      document.getElementById('productionTableBody').innerHTML = '<tr><td colspan="6">Error loading logs</td></tr>';
    }
  }

  function renderMaintenanceTasks() {
    try {
      ['todo', 'done'].forEach(status => {
        const tasks = maintenanceTasks.filter(task => task.status === status);
        const column = document.getElementById(`${status}Tasks`);
        if (column) {
          column.innerHTML = tasks
            .map(task => `
              <div class="kanban-task" draggable="true" data-id="${task.id}">
                <strong>${task.id}</strong>: ${task.equipment}<br>${task.description}
              </div>
            `).join('');
        }
      });
      setupKanbanDragDrop();
      updateOverview();
    } catch (e) {
      console.error('Error rendering maintenance tasks:', e);
    }
  }

  function setupKanbanDragDrop() {
    try {
      document.querySelectorAll('.kanban-task').forEach(task => {
        task.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', e.target.dataset.id);
        });
      });

      document.querySelectorAll('.kanban-column').forEach(column => {
        column.addEventListener('dragover', e => e.preventDefault());
        column.addEventListener('drop', e => {
          e.preventDefault();
          const taskId = e.dataTransfer.getData('text/plain');
          const newStatus = column.dataset.status;
          const task = maintenanceTasks.find(t => t.id === taskId);
          if (task) {
            task.status = newStatus;
            renderMaintenanceTasks();
          }
        });
      });
    } catch (e) {
      console.error('Error setting up Kanban drag-drop:', e);
    }
  }

  function setupForm(formId, submitHandler) {
    try {
      const form = document.getElementById(formId);
      form.addEventListener('submit', e => {
        e.preventDefault();
        submitHandler();
        form.reset();
        document.getElementById(formId.replace('Form', 'Modal')).style.display = 'none';
        showToast('Action completed successfully!');
      });
    } catch (e) {
      console.error(`Error setting up form ${formId}:`, e);
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--success); color: white; padding: 10px 20px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  setupForm('logForm', () => {
    try {
      const id = document.getElementById('logBatchId').value.trim();
      if (!/^[A-Z0-9-]+$/.test(id)) return alert('Batch ID must be alphanumeric with dashes.');
      if (productionLogs.some(log => log.id === id)) return alert('Batch ID already exists.');
      const volume = parseFloat(document.getElementById('logVolume').value) || 0;
      if (volume <= 0) return alert('Volume must be positive.');
      productionLogs.push({
        id,
        stage: document.getElementById('logStage').value,
        volume,
        status: document.getElementById('logStatus').value,
        date: document.getElementById('logDate').value
      });
      renderProductionLogs();
    } catch (e) {
      console.error('Error adding production log:', e);
      alert('Error adding log.');
    }
  });

  setupForm('taskForm', () => {
    try {
      const id = document.getElementById('taskId').value.trim();
      if (!/^[A-Z0-9-]+$/.test(id)) return alert('Task ID must be alphanumeric with dashes.');
      if (maintenanceTasks.some(task => task.id === id)) return alert('Task ID already exists.');
      maintenanceTasks.push({
        id,
        equipment: document.getElementById('taskEquipment').value.trim(),
        description: document.getElementById('taskDescription').value.trim(),
        status: document.getElementById('taskStatus').value
      });
      renderMaintenanceTasks();
      updateOverview();
    } catch (e) {
      console.error('Error adding maintenance task:', e);
      alert('Error adding task.');
    }
  });

  document.getElementById('logFilter').addEventListener('input', renderProductionLogs);
  document.getElementById('stageFilter').addEventListener('change', renderProductionLogs);

  document.getElementById('addLogBtn').addEventListener('click', () => {
    document.getElementById('logModal').style.display = 'block';
  });

  document.getElementById('addTaskBtn').addEventListener('click', () => {
    document.getElementById('taskModal').style.display = 'block';
  });

  document.querySelectorAll('.panel-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('active');
      header.querySelector('i').classList.toggle('fa-chevron-down');
      header.querySelector('i').classList.toggle('fa-chevron-up');
    });
  });

  document.querySelectorAll('.modal .close').forEach(close => {
    close.addEventListener('click', () => {
      close.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  document.getElementById('productionTableBody').addEventListener('click', e => {
    if (e.target.classList.contains('delete-log')) {
      const id = e.target.dataset.id;
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close" role="button" aria-label="Close modal">×</span>
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete log ${id}?</p>
          <button id="confirmDelete" class="btn-purple">Yes, Delete</button>
          <button id="cancelDelete" class="btn-purple">Cancel</button>
        </div>
      `;
      document.body.appendChild(modal);
      modal.style.display = 'block';

      document.getElementById('confirmDelete').addEventListener('click', () => {
        productionLogs = productionLogs.filter(log => log.id !== id);
        renderProductionLogs();
        showToast('Log deleted successfully!');
        modal.remove();
      });

      document.getElementById('cancelDelete').addEventListener('click', () => {
        modal.remove();
      });

      modal.querySelector('.close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.remove();
      });
    }
  });

  initChart();
  updateOverview();
  renderProductionLogs();
  renderMaintenanceTasks();
}
// Initialize Quality Control
function initQualityControl() {
  let testResults = [
    { id: 'TEST-001', stage: 'Reception', batch: 'BATCH-001', fat: 4.2, tpc: 5000 },
    { id: 'TEST-002', stage: 'Pasteurization', batch: 'BATCH-002', phosphatase: 'Pass' },
    { id: 'TEST-003', stage: 'Packaging', batch: 'BATCH-003', status: 'Fail' }
  ];

  function updateCardContent(stage) {
    const stageTests = testResults.filter(t => t.stage === t.stage);
    const records = document.getElementById(`${stage.toLowerCase()}Records`);
    records.innerHTML = stageTests.map(t => `
      <div class="record" data-id="${t.id}">
        <div class="record-details">
          <p>ID: ${t.id}</p>
          <p>Batch ID: ${t.batch}</p>
          ${t.fat ? `<p>Fat Content: ${t.fat.toFixed(1)}%</p>` : ''}
          ${t.tpc ? `<p>TPC: ${t.tpc} CFU/mL</p>` : ''}
          ${t.phosphatase ? `<p>Phosphatase Test: ${t.phosphatase}</p>` : ''}
          ${t.status ? `<p>Status: ${t.status}</p>` : ''}
        </div>
        <button class="delete">Delete Log</button>
      </div>
    `).join('');

    if (stage === 'Reception') {
      const samples = stageTests.length;
      const tpcIssues = stageTests.filter(t => t.tpc > 10000).length;
      document.getElementById('receptionSamples').textContent = samples;
      document.getElementById('receptionTests').textContent = tpcIssues;

      const labels = ['Low TPC', 'High TPC', 'High TPC'];
      const data = [
        stageTests.filter(t => t.tpc <= 10000).length,
        stageTests.filter(t => t.tpc > 10000).length
      ];
      new Chart(document.getElementById('receptionChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: '#0288d1',
            borderColor: '#0288d1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `${stage} Metrics`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else if (stage === 'Pasteurization') {
      const samples = stageTests.length;
      const issues = stageTests.filter(t => t.phosphatase === 'Fail').length;
      document.getElementById('pasteurizationSamples').textContent = samples;
      document.getElementById('pasteurizationIssues').textContent = issues;

      const labels = ['Pass', 'Fail'];
      const data = [
        stageTests.filter(t => t.phosphatase === 'Pass').length,
        stageTests.filter(t => t.phosphatase === 'Fail').length
      ];
      new Chart(document.getElementById('pasteurizationChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: '#0288d1',
            borderColor: '#0288d1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `${stage} Metrics`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else if (stage === 'Cleaning') {
      const samples = stageTests.length;
      const issues = stageTests.filter(t => t.tpc > 10000).length;
      document.getElementById('cleaningSamples').textContent = samples;
      document.getElementById('cleaningIssues').textContent = issues;

      const labels = ['Low TPC', 'High TPC'];
      const data = [
        stageTests.filter(t => t.tpc <= 10000).length,
        stageTests.filter(t => t.tpc > 10000).length
      ];
      new Chart(document.getElementById('cleaningChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: '#0288d1',
            borderColor: '#0288d1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `${stage} Metrics`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else if (stage === 'Packaging') {
      const samples = stageTests.length;
      const issues = stageTests.filter(t => t.status === 'Fail').length;
      document.getElementById('packagingSamples').textContent = samples;
      document.getElementById('packagingIssues').textContent = issues;

      const labels = ['Pass', 'Fail'];
      const data = [
        stageTests.filter(t => t.status === 'Pass').length,
        stageTests.filter(t => t.status === 'Fail').length
      ];
      new Chart(document.getElementById('packagingChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: '#0288d1',
            borderColor: '#0288d1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `${stage} Metrics`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else if (stage === 'Traceability') {
      const samples = [...new Set(stageTests.map(t => t.batch))].length;
      const issues = stageTests.filter(t => t.status === 'Recall').length;
      document.getElementById('traceabilitySamples').textContent = samples;
      document.getElementById('traceabilityIssues').textContent = issues;

      const labels = ['Tracked', 'Recall'];
      const data = [
        stageTests.filter(t => t.status === 'Tracked').length,
        stageTests.filter(t => t.status === 'Recall').length
      ];
      new Chart(document.getElementById('traceabilityChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: '#0288d1',
            borderColor: '#0288d1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `${stage} Metrics`
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    document.querySelectorAll(`#${stage.toLowerCase()}Records .delete`).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.record').dataset.id;
        testResults = testResults.filter(t => t.id !== id);
        updateCardContent(stage);
      });
    });
  }

  // Navigation Functionality
  document.querySelectorAll('#quality-content .nav-step').forEach(step => {
    step.addEventListener('click', () => {
      document.querySelectorAll('#quality-content .nav-step').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('#quality-content .stage-card').forEach(c => c.classList.remove('active'));
      step.classList.add('active');
      document.querySelector(`#${step.dataset.stage.toLowerCase()}Card`).classList.add('active');
    });
  });

  // Form Handling
  document.querySelectorAll('#quality-content .stage-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const stage = form.dataset.stage;
      const id = document.getElementById(`${stage.toLowerCase()}Id`).value.trim();
      const batch = document.getElementById(`${stage.toLowerCase()}Batch`).value.trim();

      let testData = { id, stage, batch };

      if (stage === 'Reception') {
        const fat = parseFloat(document.getElementById('receptionFat').value);
        const tpc = parseFloat(document.getElementById('receptionTPC').value);
        if (isNaN(fat) || isNaN(tpc) || fat <= 0 || tpc < 0) {
          alert('Please fill all fields with valid values.');
          return;
        }
        testData.fat = fat;
        testData.tpc = tpc;
      } else if (stage === 'Pasteurization') {
        const phosphatase = document.getElementById('pasteurizationPhosphatase').value;
        testData.phosphatase = phosphatase;
      } else if (stage === 'Cleaning') {
        const tpc = parseFloat(document.getElementById('cleaningTPC').value);
        if (isNaN(tpc) || tpc < 0) {
          alert('Please fill TPC with a valid value.');
          return;
        }
        testData.tpc = tpc;
      } else if (stage === 'Packaging') {
        const status = document.getElementById('packagingStatus').value;
        testData.status = status;
      } else if (stage === 'Traceability') {
        const status = document.getElementById('traceabilityStatus').value;
        testData.status = status;
      }

      testResults.push(testData);
      updateCardContent(stage);
      form.reset();
    });
  });

  ['Reception', 'Pasteurization', 'Cleaning', 'Traceability', 'Packaging'].forEach(updateCardContent);
}
function initInventoryManagement() {
  // Load data from localStorage or use default mock data
  let inventoryData = JSON.parse(localStorage.getItem('inventoryData')) || [
    { id: 1, name: "Raw Milk Batch 001", category: "Raw Milk", quantity: 5000, unit: "L", location: "Chilling Center A", expiration: "N/A", status: "OK" },
    { id: 2, name: "Pasteurized Milk 002", category: "Processed Milk", quantity: 2000, unit: "L", location: "Warehouse B", expiration: "2025-06-01", status: "Expiring Soon" },
    { id: 3, name: "Cheese Batch XYZ", category: "Processed Milk", quantity: 1000, unit: "kg", location: "Warehouse A", expiration: "2025-05-30", status: "Expiring Soon" },
    { id: 4, name: "Feed Concentrate", category: "Feed", quantity: 50, unit: "bags", location: "Storage Shed", expiration: "N/A", status: "Low" }
  ];
  let nextId = JSON.parse(localStorage.getItem('inventoryNextId')) || 5;

  // Save data to localStorage
  function saveData() {
    try {
      localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
      localStorage.setItem('inventoryNextId', JSON.stringify(nextId));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  function updateCards() {
    try {
      const rawMilk = inventoryData.filter(item => item.category === "Raw Milk").reduce((sum, item) => sum + item.quantity, 0);
      const processed = inventoryData.filter(item => item.category === "Processed Milk").reduce((sum, item) => sum + item.quantity, 0);
      const expiring = inventoryData.filter(item => item.status === "Expiring Soon").length;
      const lowStock = inventoryData.filter(item => item.status === "Low").length;

      document.getElementById("totalRawMilk").textContent = `${rawMilk.toLocaleString()} L`;
      document.getElementById("totalProcessed").textContent = `${processed.toLocaleString()} L/kg`;
      document.getElementById("expiringItems").textContent = expiring;
      document.getElementById("lowStockItems").textContent = lowStock;
    } catch (e) {
      console.error('Error updating cards:', e);
    }
  }

  function addStatusUpdate(message) {
    try {
      const statusList = document.getElementById("statusUpdates");
      const li = document.createElement("li");
      const timestamp = new Date().toLocaleString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      li.innerHTML = `${message} at ${timestamp} <button onclick="dismissStatus(this)"><i class="fas fa-times"></i></button>`;
      statusList.prepend(li);
    } catch (e) {
      console.error('Error adding status update:', e);
    }
  }

  function renderTable() {
    try {
      const tableBody = document.getElementById("inventoryTableBody");
      tableBody.innerHTML = "";
      inventoryData.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.category = item.category;
        row.dataset.status = item.status;
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></td>
          <td>${item.unit}</td>
          <td>${item.location}</td>
          <td>${item.expiration}</td>
          <td>
            <select onchange="updateStatus(${item.id}, this.value)">
              <option value="OK" ${item.status === "OK" ? "selected" : ""}>OK</option>
              <option value="Expiring Soon" ${item.status === "Expiring Soon" ? "selected" : ""}>Expiring Soon</option>
              <option value="Low" ${item.status === "Low" ? "selected" : ""}>Low</option>
            </select>
          </td>
          <td>
            <button onclick="reorderItem(${item.id})">Reorder</button>
            <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      updateCards();
      saveData();
    } catch (e) {
      console.error('Error rendering table:', e);
    }
  }

  function sortTable(key) {
    try {
      const sortOrder = document.querySelector(`th[data-sort="${key}"]`).dataset.order || "asc";
      inventoryData.sort((a, b) => {
        let valA = a[key], valB = b[key];
        if (key === "expiration" && valA === "N/A") valA = "9999-12-31";
        if (key === "expiration" && valB === "N/A") valB = "9999-12-31";
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      document.querySelector(`th[data-sort="${key}"]`).dataset.order = sortOrder === "asc" ? "desc" : "asc";
      renderTable();
    } catch (e) {
      console.error('Error sorting table:', e);
    }
  }

  window.updateQuantity = function(id, value) {
    try {
      const item = inventoryData.find(item => item.id === id);
      if (!item) return;
      const oldQuantity = item.quantity;
      item.quantity = parseInt(value) || 0;
      addStatusUpdate(`Updated ${item.name} quantity from ${oldQuantity} to ${item.quantity} ${item.unit}`);
      renderTable();
    } catch (e) {
      console.error('Error updating quantity:', e);
    }
  };

  window.updateStatus = function(id, value) {
    try {
      const item = inventoryData.find(item => item.id === id);
      if (!item) return;
      const oldStatus = item.status;
      item.status = value;
      addStatusUpdate(`Changed ${item.name} status from ${oldStatus} to ${value}`);
      renderTable();
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  window.reorderItem = function(id) {
    try {
      const item = inventoryData.find(item => item.id === id);
      if (!item) return;
      item.quantity += 100;
      item.status = item.quantity < 100 ? "Low" : "OK";
      addStatusUpdate(`Reordered ${item.name} with 100 ${item.unit}`);
      renderTable();
    } catch (e) {
      console.error('Error reordering item:', e);
    }
  };

  window.deleteItem = function(id) {
    try {
      const item = inventoryData.find(item => item.id === id);
      if (!item) return;
      inventoryData = inventoryData.filter(item => item.id !== id);
      addStatusUpdate(`Deleted ${item.name} from inventory`);
      renderTable();
    } catch (e) {
      console.error('Error deleting item:', e);
    }
  };

  window.dismissStatus = function(button) {
    try {
      button.parentElement.remove();
    } catch (e) {
      console.error('Error dismissing status:', e);
    }
  };

  window.highlightRows = function(type) {
    try {
      const rows = document.getElementById("inventoryTableBody").getElementsByTagName("tr");
      Array.from(rows).forEach(row => {
        row.classList.remove("highlight");
        if (
          (type === "raw-milk" && row.dataset.category === "Raw Milk") ||
          (type === "processed" && row.dataset.category === "Processed Milk") ||
          (type === "expiring" && row.dataset.status === "Expiring Soon") ||
          (type === "low-stock" && row.dataset.status === "Low")
        ) {
          row.classList.add("highlight");
        }
      });
      setTimeout(() => {
        Array.from(rows).forEach(row => row.classList.remove("highlight"));
      }, 2000);
    } catch (e) {
      console.error('Error highlighting rows:', e);
    }
  };

  // Modal Functions
  function openModal() {
    try {
      const modal = document.getElementById("addItemModal");
      if (modal) {
        modal.style.display = "flex";
        document.getElementById("itemName").focus();
      }
    } catch (e) {
      console.error('Error opening modal:', e);
    }
  }

  window.closeModal = function() {
    try {
      const modal = document.getElementById("addItemModal");
      if (modal) {
        modal.style.display = "none";
      }
      const form = document.getElementById("addItemForm");
      if (form) {
        form.reset();
      }
      document.getElementById("itemCategory").value = "Raw Milk";
      document.getElementById("itemQuantity").value = "0";
      document.getElementById("itemUnit").value = "L";
      document.getElementById("itemLocation").value = "Unknown";
      document.getElementById("itemExpiration").value = "N/A";
      document.getElementById("itemStatus").value = "OK";
      document.getElementById("nameError").style.display = "none";
      document.getElementById("quantityError").style.display = "none";
    } catch (e) {
      console.error('Error closing modal:', e);
    }
  };

  function addNewItem(event) {
    try {
      event.preventDefault();
      const name = document.getElementById("itemName").value.trim();
      const quantity = parseInt(document.getElementById("itemQuantity").value) || 0;

      // Validation
      let isValid = true;
      if (!name) {
        document.getElementById("nameError").style.display = "block";
        isValid = false;
      } else {
        document.getElementById("nameError").style.display = "none";
      }
      if (quantity < 0) {
        document.getElementById("quantityError").style.display = "block";
        isValid = false;
      } else {
        document.getElementById("quantityError").style.display = "none";
      }

      if (!isValid) return;

      const newItem = {
        id: nextId++,
        name,
        category: document.getElementById("itemCategory").value,
        quantity,
        unit: document.getElementById("itemUnit").value,
        location: document.getElementById("itemLocation").value || "Unknown",
        expiration: document.getElementById("itemExpiration").value || "N/A",
        status: document.getElementById("itemStatus").value
      };
      inventoryData.push(newItem);
      addStatusUpdate(`Added ${name} to inventory`);
      renderTable();
      closeModal();
    } catch (e) {
      console.error('Error adding new item:', e);
    }
  }

  // Initialize table and event listeners
  try {
    renderTable();

    const searchBtn = document.getElementById("inventorySearchBtn");
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        try {
          const query = document.getElementById("inventorySearch").value.toLowerCase();
          const rows = document.getElementById("inventoryTableBody").getElementsByTagName("tr");
          Array.from(rows).forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const category = row.cells[1].textContent.toLowerCase();
            row.style.display = (name.includes(query) || category.includes(query)) ? "" : "none";
          });
        } catch (e) {
          console.error('Error searching inventory:', e);
        }
      });
    }

    document.querySelectorAll("th[data-sort]").forEach(th => {
      th.addEventListener("click", () => sortTable(th.dataset.sort));
    });

    const addItemBtn = document.getElementById("addItemBtn");
    if (addItemBtn) {
      addItemBtn.addEventListener("click", openModal);
    }

    const addItemForm = document.getElementById("addItemForm");
    if (addItemForm) {
      addItemForm.addEventListener("submit", addNewItem);
    }
  } catch (e) {
    console.error('Error initializing inventory management:', e);
  }
}
// Distribution Section Data
const distributionData = {
  collection: [
    { id: 'COL-001', volume: 5000, fat: 3.5, date: '2025-05-26' },
    { id: 'COL-002', volume: 5000, fat: 3.4, date: '2025-05-26' }
  ],
  chilling: [
    { id: 'CHL-001', quantity: 9500, temperature: 3, center: 'Center A' }
  ],
  processing: [
    { id: 'PRC-001', type: 'Pasteurized Milk', quantity: 8000, efficiency: 95 }
  ],
  packaging: [
    { id: 'PKG-001', type: 'Bottle', quantity: 7500 }
  ],
  transportation: [
    { id: 'SHP-001', destination: 'Processing Plant A', quantity: 5000, unit: 'L', status: 'In Transit' },
    { id: 'SHP-002', destination: 'Distributor B', quantity: 3000, unit: 'L', status: 'Delivered' }
  ],
  sales: [
    { id: 'SAL-001', location: 'Distributor A', quantity: 5000, sales: 500000 },
    { id: 'SAL-002', location: 'Retailer Y', quantity: 3000, sales: 300000 }
  ]
};

let distributionNextIds = {
  collection: 3,
  chilling: 2,
  processing: 2,
  packaging: 2,
  transportation: 3,
  sales: 3
};

// Initialize Distribution Section
function initDistribution() {
  // Set up nav cards
  document.querySelectorAll('.distribution-nav-card').forEach(card => {
    card.addEventListener('click', () => distributionShowSection(card.dataset.section));
  });

  // Set up search
  document.getElementById('distribution-shipmentSearchBtn').addEventListener('click', distributionSearchShipments);

  // Set initial timestamp and update every second
  distributionSetTimestamp();
  setInterval(distributionSetTimestamp, 1000);

  // Show default section
  distributionShowSection('collection');
  console.log('Distribution section initialized at 04:41 PM IST, May 27, 2025');
}

// Toggle Distribution Subsection
function distributionShowSection(section) {
  document.querySelectorAll('.distribution-content-section').forEach(s => {
    s.classList.remove('active');
  });
  document.getElementById(`distribution-content-${section}`).classList.add('active');
  document.querySelectorAll('.distribution-nav-card').forEach(card => {
    card.classList.remove('active');
  });
  document.querySelector(`.distribution-nav-card[data-section="${section}"]`).classList.add('active');
  distributionRenderTiles(section);
  distributionRenderSummaryCard(section);
}

// Render Tiles
function distributionRenderTiles(section) {
  const container = document.getElementById(`distribution-${section}-tiles`);
  if (!container) return;
  container.innerHTML = '';
  
  // Add tile
  const addTile = document.createElement('div');
  addTile.className = 'distribution-tile add-tile';
  addTile.innerHTML = '<h3>Add Record</h3><i class="fas fa-plus"></i>';
  addTile.onclick = () => distributionOpenModal(section, 'add');
  container.appendChild(addTile);

  // Data tiles
  distributionData[section].forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'distribution-tile';
    tile.innerHTML = distributionGetTileContent(section, item);
    container.appendChild(tile);
  });
}

// Get Tile Content
function distributionGetTileContent(section, item) {
  switch (section) {
    case 'collection':
      return `
        <h3>Collection ${item.id}</h3>
        <p>Volume: ${item.volume} L</p>
        <p>Fat: ${item.fat}%</p>
        <p>Date: ${item.date}</p>
        <div class="actions">
          <button class="edit" onclick="distributionOpenModal('collection', 'edit', '${item.id}')">Edit</button>
          <button class="delete" onclick="distributionDeleteRecord('collection', '${item.id}')">Delete</button>
        </div>`;
    case 'chilling':
      return `
        <h3>Chilling ${item.id}</h3>
        <p>Quantity: ${item.quantity} L</p>
        <p>Temperature: ${item.temperature}°C</p>
        <p>Center: ${item.center}</p>
        <div class="actions">
          <button class="edit" onclick="distributionOpenModal('chilling', 'edit', '${item.id}')">Edit</button>
          <button class="delete" onclick="distributionDeleteRecord('chilling', '${item.id}')">Delete</button>
        </div>`;
    case 'processing':
      return `
        <h3>Processing ${item.id}</h3>
        <p>Type: ${item.type}</p>
        <p>Quantity: ${item.quantity} L</p>
        <p>Efficiency: ${item.efficiency}%</p>
        <div class="actions">
          <button class="edit" onclick="distributionOpenModal('processing', 'edit', '${item.id}')">Edit</button>
          <button class="delete" onclick="distributionDeleteRecord('processing', '${item.id}')">Delete</button>
        </div>`;
    case 'packaging':
      return `
        <h3>Packaging ${item.id}</h3>
        <p>Type: ${item.type}</p>
        <p>Quantity: ${item.quantity} L</p>
        <div class="actions">
          <button class="edit" onclick="distributionOpenModal('packaging', 'edit', '${item.id}')">Edit</button>
          <button class="delete" onclick="distributionDeleteRecord('packaging', '${item.id}')">Delete</button>
        </div>`;
    case 'transportation':
      return `
        <h3>Shipment ${item.id}</h3>
        <p>Destination: ${item.destination}</p>
        <p>Quantity: ${item.quantity} ${item.unit}</p>
        <p>Status: ${item.status}</p>
        <div class="actions">
          <button class="edit" onclick="distributionOpenModal('transportation', 'edit', '${item.id}')">Edit</button>
          <button class="delete" onclick="distributionDeleteRecord('transportation', '${item.id}')">Delete</button>
        </div>`;
    case 'sales':
      return `
        <h3>Sales ${item.id}</h3>
        <p>Location: ${item.location}</p>
        <p>Quantity: ${item.quantity} L</p>
        <p>Sales: ₹${item.sales}</p>
        <div class="actions">
          <button class="edit" onclick="distributionOpenModal('sales', 'edit', '${item.id}')">Edit</button>
          <button class="delete" onclick="distributionDeleteRecord('sales', '${item.id}')">Delete</button>
        </div>`;
  }
}

// Render Summary Card
function distributionRenderSummaryCard(section) {
  const container = document.getElementById(`distribution-${section}-tiles`);
  if (!container) return;

  const existingSummary = container.querySelector('.distribution-summary-tile');
  if (existingSummary) existingSummary.remove();

  const summaryTile = document.createElement('div');
  summaryTile.className = 'distribution-summary-tile';
  let summaryContent = '';

  switch (section) {
    case 'collection':
      const totalVolume = distributionData[section].reduce((sum, item) => sum + item.volume, 0);
      const avgFat = (distributionData[section].reduce((sum, item) => sum + item.fat, 0) / distributionData[section].length).toFixed(1);
      const collectionCount = distributionData[section].length;
      summaryContent = `
        <h3>Collection Summary</h3>
        <p><span class="label">Total Volume:</span> <span class="value">${totalVolume} L</span></p>
        <p><span class="label">Average Fat Content:</span> <span class="value">${avgFat}%</span></p>
        <p><span class="label">Collections:</span> <span class="value">${collectionCount}</span></p>`;
      break;
    case 'chilling':
      const totalChilled = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const avgTemp = (distributionData[section].reduce((sum, item) => sum + item.temperature, 0) / distributionData[section].length).toFixed(1);
      const centers = new Set(distributionData[section].map(item => item.center)).size;
      summaryContent = `
        <h3>Chilling Summary</h3>
        <p><span class="label">Total Quantity:</span> <span class="value">${totalChilled} L</span></p>
        <p><span class="label">Average Temperature:</span> <span class="value">${avgTemp}°C</span></p>
        <p><span class="label">Centers:</span> <span class="value">${centers}</span></p>`;
      break;
    case 'processing':
      const totalProcessed = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const avgEfficiency = (distributionData[section].reduce((sum, item) => sum + item.efficiency, 0) / distributionData[section].length).toFixed(1);
      const productCount = distributionData[section].length;
      summaryContent = `
        <h3>Processing Summary</h3>
        <p><span class="label">Total Quantity:</span> <span class="value">${totalProcessed} L</span></p>
        <p><span class="label">Average Efficiency:</span> <span class="value">${avgEfficiency}%</span></p>
        <p><span class="label">Products:</span> <span class="value">${productCount}</span></p>`;
      break;
    case 'packaging':
      const totalPackaged = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const typeCounts = distributionData[section].reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + item.quantity;
        return acc;
      }, {});
      const typeBreakdown = Object.entries(typeCounts).map(([type, qty]) => `${type}: ${qty} L`).join(', ');
      summaryContent = `
        <h3>Packaging Summary</h3>
        <p><span class="label">Total Quantity:</span> <span class="value">${totalPackaged} L</span></p>
        <p><span class="label">By Type:</span> <span class="value">${typeBreakdown}</span></p>`;
      break;
    case 'transportation':
      const totalShipments = distributionData[section].length;
      const statusCounts = distributionData[section].reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});
      const statusBreakdown = Object.entries(statusCounts).map(([status, count]) => `${status}: ${count}`).join(', ');
      summaryContent = `
        <h3>Transportation Summary</h3>
        <p><span class="label">Total Shipments:</span> <span class="value">${totalShipments}</span></p>
        <p><span class="label">Status Breakdown:</span> <span class="value">${statusBreakdown}</span></p>`;
      break;
    case 'sales':
      const totalSales = distributionData[section].reduce((sum, item) => sum + item.sales, 0);
      const totalSold = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const avgSalesPerLocation = (totalSales / distributionData[section].length).toFixed(0);
      summaryContent = `
        <h3>Sales Summary</h3>
        <p><span class="label">Total Sales:</span> <span class="value">₹${totalSales}</span></p>
        <p><span class="label">Total Quantity Sold:</span> <span class="value">${totalSold} L</span></p>
        <p><span class="label">Avg Sales/Location:</span> <span class="value">₹${avgSalesPerLocation}</span></p>`;
      break;
  }

  summaryTile.innerHTML = summaryContent;
  container.appendChild(summaryTile);
}

// Open Modal
function distributionOpenModal(section, action, id = null) {
  const modal = document.getElementById('distribution-modal');
  const title = document.getElementById('distribution-modal-title');
  const form = document.getElementById('distribution-modal-form');
  title.textContent = `${action === 'add' ? 'Add' : 'Edit'} ${section.charAt(0).toUpperCase() + section.slice(1)} Record`;
  form.innerHTML = distributionGetFormContent(section, action, id);
  form.onsubmit = (e) => distributionHandleFormSubmit(e, section, action, id);
  modal.classList.add('active');
}

// Get Form Content
function distributionGetFormContent(section, action, id) {
  const item = id ? distributionData[section].find(i => i.id === id) : {};
  switch (section) {
    case 'collection':
      return `
        <div>
          <label for="volume">Volume (L) *</label>
          <input type="number" id="volume" value="${item.volume || ''}" required>
          <span class="error" id="volumeError">Volume must be positive</span>
        </div>
        <div>
          <label for="fat">Fat Content (%) *</label>
          <input type="number" id="fat" step="0.1" value="${item.fat || ''}" required>
          <span class="error" id="fatError">Fat content must be positive</span>
        </div>
        <div>
          <label for="date">Date *</label>
          <input type="date" id="date" value="${item.date || '2025-05-26'}" required>
        </div>
        <div>
          <button type="submit" class="submit">Save</button>
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
        </div>`;
    case 'chilling':
      return `
        <div>
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || ''}" required>
          <span class="error" id="quantityError">Quantity must be positive</span>
        </div>
        <div>
          <label for="temperature">Temperature (°C) *</label>
          <input type="number" id="temperature" value="${item.temperature || ''}" required>
          <span class="error" id="temperatureError">Temperature must be valid</span>
        </div>
        <div>
          <label for="center">Center *</label>
          <input type="text" id="center" value="${item.center || ''}" required>
        </div>
        <div>
          <button type="submit" class="submit">Save</button>
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
        </div>`;
    case 'processing':
      return `
        <div>
          <label for="type">Type *</label>
          <input type="text" id="type" value="${item.type || ''}" required>
          <span class="error" id="typeError">Type is required</span>
        </div>
        <div>
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || ''}" required>
          <span class="error" id="quantityError">Quantity must be positive</span>
        </div>
        <div>
          <label for="efficiency">Efficiency (%) *</label>
          <input type="number" id="efficiency" value="${item.efficiency || ''}" required>
          <span class="error" id="efficiencyError">Efficiency must be between 0 and 100</span>
        </div>
        <div>
          <button type="submit" class="submit">Save</button>
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
        </div>`;
    case 'packaging':
      return `
        <div>
          <label for="type">Type *</label>
          <select id="type" required>
            <option value="Bottle" ${item.type === 'Bottle' ? 'selected' : ''}>Bottle</option>
            <option value="Carton" ${item.type === 'Carton' ? 'selected' : ''}>Carton</option>
            <option value="Packet" ${item.type === 'Packet' ? 'selected' : ''}>Packet</option>
          </select>
        </div>
        <div>
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || ''}" required>
          <span class="error" id="quantityError">Quantity must be positive</span>
        </div>
        <div>
          <button type="submit" class="submit">Save</button>
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
        </div>`;
    case 'transportation':
      return `
        <div>
          <label for="destination">Destination *</label>
          <input type="text" id="destination" value="${item.destination || ''}" required>
          <span class="error" id="destinationError">Destination is required</span>
        </div>
        <div>
          <label for="quantity">Quantity *</label>
          <input type="number" id="quantity" value="${item.quantity || ''}" required>
          <span class="error" id="quantityError">Quantity must be positive</span>
        </div>
        <div>
          <label for="unit">Unit *</label>
          <select id="unit" required>
            <option value="L" ${item.unit === 'L' ? 'selected' : ''}>L</option>
            <option value="kg" ${item.unit === 'kg' ? 'selected' : ''}>kg</option>
          </select>
        </div>
        <div>
          <label for="status">Status *</label>
          <select id="status" required>
            <option value="Scheduled" ${item.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
            <option value="In Transit" ${item.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
            <option value="Delivered" ${item.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Delayed" ${item.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
          </select>
        </div>
        <div>
          <button type="submit" class="submit">Save</button>
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
        </div>`;
    case 'sales':
      return `
        <div>
          <label for="location">Location *</label>
          <input type="text" id="location" value="${item.location || ''}" required>
          <span class="error" id="locationError">Location is required</span>
        </div>
        <div>
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || ''}" required>
          <span class="error" id="quantityError">Quantity must be positive</span>
        </div>
        <div>
          <label for="sales">Sales (₹) *</label>
          <input type="number" id="sales" value="${item.sales || ''}" required>
          <span class="error" id="salesError">Sales must be positive</span>
        </div>
        <div>
          <button type="submit" class="submit">Save</button>
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
        </div>`;
  }
}

// Handle Form Submission
function distributionHandleFormSubmit(e, section, action, id) {
  e.preventDefault();
  let isValid = true;
  const form = e.target;
  const newItem = {};

  switch (section) {
    case 'collection':
      newItem.volume = parseInt(form.volume.value);
      newItem.fat = parseFloat(form.fat.value);
      newItem.date = form.date.value;
      if (newItem.volume <= 0) {
        document.getElementById('volumeError').style.display = 'block';
        isValid = false;
      }
      if (newItem.fat <= 0) {
        document.getElementById('fatError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'chilling':
      newItem.quantity = parseInt(form.quantity.value);
      newItem.temperature = parseFloat(form.temperature.value);
      newItem.center = form.center.value;
      if (newItem.quantity <= 0) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      if (newItem.temperature < 0 || newItem.temperature > 5) {
        document.getElementById('temperatureError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'processing':
      newItem.type = form.type.value;
      newItem.quantity = parseInt(form.quantity.value);
      newItem.efficiency = parseFloat(form.efficiency.value);
      if (!newItem.type) {
        document.getElementById('typeError').style.display = 'block';
        isValid = false;
      }
      if (newItem.quantity <= 0) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      if (newItem.efficiency <= 0 || newItem.efficiency > 100) {
        document.getElementById('efficiencyError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'packaging':
      newItem.type = form.type.value;
      newItem.quantity = parseInt(form.quantity.value);
      if (newItem.quantity <= 0) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'transportation':
      newItem.destination = form.destination.value;
      newItem.quantity = parseInt(form.quantity.value);
      newItem.unit = form.unit.value;
      newItem.status = form.status.value;
      if (!newItem.destination) {
        document.getElementById('destinationError').style.display = 'block';
        isValid = false;
      }
      if (newItem.quantity <= 0) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'sales':
      newItem.location = form.location.value;
      newItem.quantity = parseInt(form.quantity.value);
      newItem.sales = parseInt(form.sales.value);
      if (!newItem.location) {
        document.getElementById('locationError').style.display = 'block';
        isValid = false;
      }
      if (newItem.quantity <= 0) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      if (newItem.sales < 0) {
        document.getElementById('salesError').style.display = 'block';
        isValid = false;
      }
      break;
  }

  if (!isValid) return;

  if (action === 'add') {
    newItem.id = `${section.slice(0, 3).toUpperCase()}-${String(distributionNextIds[section]++).padStart(3, '0')}`;
    distributionData[section].push(newItem);
  } else {
    const index = distributionData[section].findIndex(i => i.id === id);
    distributionData[section][index] = { ...distributionData[section][index], ...newItem };
  }

  distributionCloseModal();
  distributionRenderTiles(section);
  distributionRenderSummaryCard(section);
}

// Delete Record
function distributionDeleteRecord(section, id) {
  if (confirm(`Delete ${section} record ${id}?`)) {
    distributionData[section] = distributionData[section].filter(item => item.id !== id);
    distributionRenderTiles(section);
    distributionRenderSummaryCard(section);
  }
}

// Close Modal
function distributionCloseModal() {
  document.getElementById('distribution-modal').classList.remove('active');
  document.getElementById('distribution-modal-form').reset();
  document.querySelectorAll('.error').forEach(e => e.style.display = 'none');
}

// Search Shipments
function distributionSearchShipments() {
  const query = document.getElementById('distribution-shipmentSearch').value.toLowerCase();
  const tiles = document.querySelectorAll('#distribution-transportation-tiles .distribution-tile:not(.add-tile):not(.distribution-summary-tile)');
  tiles.forEach(tile => {
    const id = tile.querySelector('h3').textContent.toLowerCase();
    const destination = tile.querySelector('p:nth-child(2)').textContent.toLowerCase();
    const status = tile.querySelector('p:nth-child(4)').textContent.toLowerCase();
    tile.style.display = (id.includes(query) || destination.includes(query) || status.includes(query)) ? '' : 'none';
  });
}

// Set Dynamic Timestamp
function distributionSetTimestamp() {
  document.getElementById('distribution-timestamp').textContent = 'Updated at ' + new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.menu li[data-section="home"]').click();
});
