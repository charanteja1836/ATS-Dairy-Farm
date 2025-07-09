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
// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('isAuthenticated')) {
    window.location.href = 'login.html';
  }
});

// Handle logout
document.querySelector('.logout-btn').addEventListener('click', () => {
  localStorage.removeItem('isAuthenticated');
  window.location.href = 'login.html';
});

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
    } else if (sectionToShow === 'settings') {
      document.getElementById('settings-content').style.display = 'block';
      initSettings();
    } else {
      const iframe = document.getElementById('content-iframe');
      iframe.style.display = 'block';
      iframe.src = `${sectionToShow}.html`;
    }

    document.querySelector('.sidebar').classList.remove('active');
  });
});

// Initialize Dashboard Charts
function initDashboardCharts() {

  // Common chart options
  const chartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 12 }, color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() } }
    }
  };

  // Daily Charts
  new Chart(document.getElementById('dailyMilkChartBar'), {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Cow Milk (L)', backgroundColor: '#ffc107', data: [900, 950, 1000, 980, 1020, 1100, 1050] },
        { label: 'Buffalo Milk (L)', backgroundColor: '#17a2b8', data: [500, 520, 560, 540, 580, 600, 590] }
      ]
    },
    options: chartOptions
  });

  new Chart(document.getElementById('dailyMilkChartLine'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Cow Milk (L)', borderColor: '#ffc107', data: [900, 950, 1000, 980, 1020, 1100, 1050], fill: false },
        { label: 'Buffalo Milk (L)', borderColor: '#17a2b8', data: [500, 520, 560, 540, 580, 600, 590], fill: false }
      ]
    },
    options: chartOptions
  });

  // Weekly Charts
  new Chart(document.getElementById('weeklyMilkChartBar'), {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Cow Milk (L)', backgroundColor: '#ff5733', data: [6500, 6800, 7000, 7200] },
        { label: 'Buffalo Milk (L)', backgroundColor: '#c70039', data: [3500, 3600, 3700, 3800] }
      ]
    },
    options: chartOptions
  });

  new Chart(document.getElementById('weeklyMilkChartLine'), {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Cow Milk (L)', borderColor: '#ff5733', data: [6500, 6800, 7000, 7200], fill: false },
        { label: 'Buffalo Milk (L)', borderColor: '#c70039', data: [3500, 3600, 3700, 3800], fill: false }
      ]
    },
    options: chartOptions
  });

  // Monthly Charts
  new Chart(document.getElementById('monthlyMilkChartBar'), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { label: 'Cow Milk (L)', backgroundColor: '#007bff', data: [3000, 3500, 4000, 3700, 4200, 5000, 5200, 4800, 4600, 4900, 5100, 5300] },
        { label: 'Buffalo Milk (L)', backgroundColor: '#28a745', data: [1500, 1800, 2000, 1900, 2100, 2500, 2700, 2600, 2500, 2450, 2400, 2600] }
      ]
    },
    options: chartOptions
  });

  new Chart(document.getElementById('monthlyMilkChartLine'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { label: 'Cow Milk (L)', borderColor: '#007bff', data: [3000, 3500, 4000, 3700, 4200, 5000, 5200, 4800, 4600, 4900, 5100, 5300], fill: false },
        { label: 'Buffalo Milk (L)', borderColor: '#28a745', data: [1500, 1800, 2000, 1900, 2100, 2500, 2700, 2600, 2500, 2450, 2400, 2600], fill: false }
      ]
    },
    options: chartOptions
  });

  // Filter button interactivity
  const filterButtons = document.querySelectorAll('.filter-btn');
  const chartCards = document.querySelectorAll('.chart-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      // Get filter type (daily, weekly, monthly)
      const filter = button.getAttribute('data-filter');

      // Hide all charts and show only the relevant ones
      chartCards.forEach(card => {
        card.classList.remove('active');
        if (card.classList.contains(`${filter}-charts`)) {
          card.classList.add('active');
        }
      });
    });
  });
}

// Initialize Farmer Management Charts
const FarmerManagement = {
  farmers: [
    { name: "Ramesh Kumar", village: "Narsapuram", milkSupplied: 1250, rating: 5, status: "Active", contact: "+919876543210" },
    { name: "Suresh Reddy", village: "Kothapalle", milkSupplied: 900, rating: 4, status: "Active", contact: "+919876543211" },
    { name: "Anil Sharma", village: "Medak", milkSupplied: 600, rating: 3, status: "Inactive", contact: "+919876543212" },
    { name: "Vijay Patel", village: "Suryapet", milkSupplied: 1100, rating: 4, status: "Active", contact: "+919876543213" },
    { name: "Kiran Rao", village: "Warangal", milkSupplied: 800, rating: 2, status: "Inactive", contact: "+919876543214" }
  ],
  sortDirection: 1,
  sortColumn: -1,
  editIndex: -1,
  donutChartInstance: null,
  barChartInstance: null,
  filteredFarmers: [], // Track the currently displayed farmers

  init() {
    const initialize = () => {
      const farmerTableBody = document.getElementById("fm-farmerTableBody");
      const searchButton = document.querySelector("#fm-searchInput + button");
      const addFarmerButton = document.getElementById("fm-addFarmerButton");

      if (!farmerTableBody || !searchButton || !addFarmerButton) {
        console.error("Farmer Management: Required DOM elements not found. Retrying...");
        setTimeout(initialize, 100);
        return;
      }

      // Bind event listeners
      searchButton.addEventListener("click", this.searchFarmers.bind(this));
      addFarmerButton.addEventListener("click", this.openAddFarmerModal.bind(this));

      // Initial render of table and charts
      this.filteredFarmers = [...this.farmers]; // Initially, show all farmers
      this.renderTable(this.filteredFarmers);
      this.updateStats();
      this.initCharts();
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      initialize();
    } else {
      document.addEventListener("DOMContentLoaded", initialize);
    }
  },

  renderTable(farmers) {
    const tbody = document.getElementById("fm-farmerTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    farmers.forEach((farmer, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${farmer.name}</td>
        <td>${farmer.village}</td>
        <td>${farmer.milkSupplied}</td>
        <td>${this.renderStars(farmer.rating)}</td>
        <td class="status-${farmer.status.toLowerCase()}">${farmer.status}</td>
        <td>
          <span class="delete" onclick="FarmerManagement.deleteFarmer(${index})"><i class="fas fa-trash-alt"></i></span>
          <span class="edit" onclick="FarmerManagement.editFarmer(${index})"><i class="fas fa-edit"></i></span>
          <button onclick="FarmerManagement.viewFarmer(${index})">View</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Update charts after rendering the table
    this.updateCharts();
  },

  renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="${i <= rating ? 'star' : 'star-empty'}">★</span>`;
    }
    return stars;
  },

  updateStats() {
    const totalFarmers = this.farmers.length;
    const activeFarmers = this.farmers.filter(f => f.status === "Active").length;
    const kycVerified = this.farmers.filter(f => f.contact.startsWith("+91")).length;
    const regions = [...new Set(this.farmers.map(f => f.village))];
    const topRegion = regions.reduce((top, region) => {
      const milk = this.farmers.filter(f => f.village === region).reduce((sum, f) => sum + f.milkSupplied, 0);
      return milk > (top.milk || 0) ? { region, milk } : top;
    }, { region: "N/A", milk: 0 });

    document.getElementById("fm-totalFarmers").textContent = totalFarmers.toLocaleString();
    document.getElementById("fm-activeFarmers").textContent = activeFarmers.toLocaleString();
    document.getElementById("fm-kycVerified").textContent = kycVerified.toLocaleString();
    document.getElementById("fm-topRegion").textContent = topRegion.region;
  },

  initCharts() {
    const donutCtx = document.getElementById("fm-donutChart")?.getContext("2d");
    const barCtx = document.getElementById("fm-barChart")?.getContext("2d");

    if (!donutCtx || !barCtx) {
      console.error("Chart canvases not found.");
      return;
    }

    // Destroy existing chart instances if they exist
    if (this.donutChartInstance) this.donutChartInstance.destroy();
    if (this.barChartInstance) this.barChartInstance.destroy();

    // Initial chart rendering (will be updated in updateCharts)
    this.donutChartInstance = new Chart(donutCtx, {
      type: "doughnut",
      data: {
        labels: ["Active", "Inactive"],
        datasets: [{
          data: [0, 0], // Placeholder data
          backgroundColor: ["#28a745", "#dc3545"],
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } }
      }
    });

    this.barChartInstance = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [{
          label: "Milk Supplied (L)",
          data: [],
          backgroundColor: "#007bff",
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });

    // Update charts with initial data
    this.updateCharts();
  },

  updateCharts() {
    if (!this.donutChartInstance || !this.barChartInstance) return;

    // Update doughnut chart (Active vs Inactive) based on filtered farmers
    const activeFarmers = this.filteredFarmers.filter(f => f.status === "Active").length;
    const inactiveFarmers = this.filteredFarmers.length - activeFarmers;
    this.donutChartInstance.data.datasets[0].data = [activeFarmers, inactiveFarmers];
    this.donutChartInstance.update();

    // Update bar chart (Milk Supplied per Region) based on filtered farmers
    const regions = [...new Set(this.filteredFarmers.map(f => f.village))];
    const milkByRegion = regions.map(region =>
      this.filteredFarmers.filter(f => f.village === region).reduce((sum, f) => sum + f.milkSupplied, 0)
    );
    this.barChartInstance.data.labels = regions;
    this.barChartInstance.data.datasets[0].data = milkByRegion;
    this.barChartInstance.update();
  },

  sortTable(column) {
    this.sortColumn = column;
    this.sortDirection *= -1;
    const headers = document.querySelectorAll("#fm-farmerTable th");
    headers.forEach((header, index) => {
      header.classList.remove("sort-asc", "sort-desc");
      if (index === column) {
        header.classList.add(this.sortDirection === 1 ? "sort-asc" : "sort-desc");
      }
    });

    const sortedFarmers = [...this.filteredFarmers].sort((a, b) => {
      const values = [
        a.name, a.village, a.milkSupplied, a.rating, a.status
      ];
      const valA = values[column];
      const valB = b[Object.keys(b)[column]];
      if (typeof valA === "number") return this.sortDirection * (valA - valB);
      return this.sortDirection * valA.localeCompare(valB);
    });

    this.filteredFarmers = sortedFarmers;
    this.renderTable(this.filteredFarmers);
  },

  searchFarmers() {
    const query = document.getElementById("fm-searchInput").value.toLowerCase();
    this.filteredFarmers = this.farmers.filter(f =>
      f.name.toLowerCase().includes(query) || f.village.toLowerCase().includes(query)
    );
    this.renderTable(this.filteredFarmers);
  },

  openAddFarmerModal() {
    const modal = document.getElementById("fm-addFarmerModal");
    if (!modal) return;

    this.editIndex = -1;
    document.getElementById("fm-addFarmerModalTitle").textContent = "Add New Farmer";
    document.getElementById("fm-addFarmerBtn").textContent = "Add Farmer";
    document.getElementById("fm-newName").value = "";
    document.getElementById("fm-newVillage").value = "";
    document.getElementById("fm-newMilk").value = "";
    document.getElementById("fm-newRating").value = "1";
    document.getElementById("fm-newStatus").value = "Active";
    document.getElementById("fm-newContact").value = "";
    this.clearErrors();
    modal.style.display = "flex";
  },

  editFarmer(index) {
    const modal = document.getElementById("fm-addFarmerModal");
    if (!modal) return;

    this.editIndex = index;
    const farmer = this.filteredFarmers[index];
    document.getElementById("fm-addFarmerModalTitle").textContent = "Edit Farmer";
    document.getElementById("fm-addFarmerBtn").textContent = "Update Farmer";
    document.getElementById("fm-newName").value = farmer.name;
    document.getElementById("fm-newVillage").value = farmer.village;
    document.getElementById("fm-newMilk").value = farmer.milkSupplied;
    document.getElementById("fm-newRating").value = farmer.rating;
    document.getElementById("fm-newStatus").value = farmer.status;
    document.getElementById("fm-newContact").value = farmer.contact;
    this.clearErrors();
    modal.style.display = "flex";
  },

  addOrUpdateFarmer() {
    const name = document.getElementById("fm-newName").value.trim();
    const village = document.getElementById("fm-newVillage").value.trim();
    const milkSupplied = parseFloat(document.getElementById("fm-newMilk").value);
    const rating = parseInt(document.getElementById("fm-newRating").value);
    const status = document.getElementById("fm-newStatus").value;
    const contact = document.getElementById("fm-newContact").value.trim();

    this.clearErrors();
    let hasError = false;

    if (!name) {
      document.getElementById("fm-nameError").textContent = "Name is required.";
      document.getElementById("fm-nameError").style.display = "block";
      hasError = true;
    }
    if (!village) {
      document.getElementById("fm-villageError").textContent = "Village is required.";
      document.getElementById("fm-villageError").style.display = "block";
      hasError = true;
    }
    if (isNaN(milkSupplied) || milkSupplied <= 0) {
      document.getElementById("fm-milkError").textContent = "Valid milk supplied amount is required.";
      document.getElementById("fm-milkError").style.display = "block";
      hasError = true;
    }
    if (!contact || !/^\+\d{11,12}$/.test(contact)) {
      document.getElementById("fm-contactError").textContent = "Valid contact number is required (e.g., +919876543210).";
      document.getElementById("fm-contactError").style.display = "block";
      hasError = true;
    }

    if (hasError) return;

    const farmer = { name, village, milkSupplied, rating, status, contact };
    if (this.editIndex === -1) {
      this.farmers.push(farmer);
    } else {
      const actualIndex = this.farmers.findIndex(f => f === this.filteredFarmers[this.editIndex]);
      this.farmers[actualIndex] = farmer;
    }

    this.filteredFarmers = [...this.farmers]; // Reset filtered farmers after add/edit
    this.renderTable(this.filteredFarmers);
    this.updateStats();
    this.closeModal();
  },

  deleteFarmer(index) {
    if (confirm("Are you sure you want to delete this farmer?")) {
      const actualIndex = this.farmers.findIndex(f => f === this.filteredFarmers[index]);
      this.farmers.splice(actualIndex, 1);
      this.filteredFarmers = [...this.farmers];
      this.renderTable(this.filteredFarmers);
      this.updateStats();
    }
  },

  viewFarmer(index) {
    const modal = document.getElementById("fm-farmerModal");
    if (!modal) return;

    const farmer = this.filteredFarmers[index];
    document.getElementById("fm-modalVillage").textContent = farmer.village;
    document.getElementById("fm-modalMilk").textContent = farmer.milkSupplied;
    document.getElementById("fm-modalRating").textContent = farmer.rating;
    document.getElementById("fm-modalStatus").textContent = farmer.status;
    document.getElementById("fm-modalContact").textContent = farmer.contact;
    modal.style.display = "flex";
  },

  closeModal() {
    document.getElementById("fm-farmerModal").style.display = "none";
    document.getElementById("fm-addFarmerModal").style.display = "none";
  },

  clearErrors() {
    document.querySelectorAll(".error-message").forEach(error => {
      error.style.display = "none";
      error.textContent = "";
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  FarmerManagement.init();
});

// Initialize CRM
console.log('Script loaded at', new Date().toLocaleString());

function initCRM() {
  console.log('initCRM started');
  try {
    let tickets = [
      { id: 1, name: 'Rachel Green', priority: 'low', message: 'Request for additional milk supply for upcoming festival.', email: 'rachel@example.com', status: 'open', date: new Date().toISOString(), category: 'supply', replies: [] },
      { id: 2, name: 'John Doe', priority: 'high', message: 'Urgent issue with cattle feed delivery schedule!', email: 'john@example.com', status: 'open', date: new Date().toISOString(), category: 'delivery', replies: [] },
      { id: 3, name: 'Priya Singh', priority: 'low', message: 'Need update on order tracking for dairy products.', email: 'priya@example.com', status: 'open', date: new Date().toISOString(), category: 'billing', replies: [] }
    ];

    let issues = [];
    try {
      const storedIssues = JSON.parse(localStorage.getItem('crmIssues'));
      if (Array.isArray(storedIssues)) {
        issues = storedIssues.filter(issue => Number.isInteger(issue.id) && issue.title && issue.resolution);
        console.log('Loaded issues from localStorage:', issues);
      }
    } catch (error) {
      console.error('Error parsing localStorage issues:', error);
    }
    if (issues.length === 0) {
      issues = [
        { id: 1, title: 'Delivery Delays', resolution: 'Check with distribution team, update customer details, offer discount if delay exceeds 2 hours.' },
        { id: 2, title: 'Product Quality', resolution: 'Request batch number, initiate quality check, replace product if confirmed defective.' },
        { id: 3, title: 'Billing Disputes', resolution: 'Review order history, correct invoice, send updated copy to customer.' }
      ];
      localStorage.setItem('crmIssues', JSON.stringify(issues));
      console.log('Initialized default issues:', issues);
    }

    let crmNotesHistory = JSON.parse(localStorage.getItem('crmNotesHistory')) || [];

    let prevResolvedPercentage = 0;
    let skipNotesValidation = false; // Flag to prevent validation after successful save

    const ticketsContainer = document.getElementById('ticketsContainer');
    const issuesContainer = document.getElementById('issuesContainer');
    const searchInput = document.getElementById('searchInput');
    const addTicketBtn = document.getElementById('addTicketBtn');
    const addIssueBtn = document.getElementById('addIssueBtn');
    const ticketModal = document.getElementById('ticketModal');
    const viewTicketModal = document.getElementById('viewTicketModal');
    const replyTicketModal = document.getElementById('replyTicketModal');
    const issueModal = document.getElementById('issueModal');
    const closeBtn = document.querySelectorAll('.close');
    const ticketForm = document.getElementById('ticketForm');
    const replyForm = document.getElementById('replyForm');
    const issueForm = document.getElementById('issueForm');
    const notesForm = document.getElementById('notesForm');
    const totalTicketsEl = document.getElementById('totalTickets');
    const openTicketsEl = document.getElementById('openTickets');
    const resolvedTicketsEl = document.getElementById('resolvedTickets');
    const categoryFilter = document.getElementById('categoryFilter');
    const exportTicketsBtn = document.getElementById('exportTicketsBtn');
    const bulkStatusUpdate = document.getElementById('bulkStatusUpdate');
    const crmNotes = document.getElementById('crmNotes');
    const markResolvedBtn = document.getElementById('markResolvedBtn');
    const toolbarBtn = document.querySelector('.toolbar-btn');
    const savedNotes = document.getElementById('savedNotes');

    if (!ticketsContainer || !issuesContainer) {
      console.error('Required containers not found in DOM');
      return;
    }

    function enforceLineWrap(textarea, warningId) {
      const warningEl = document.getElementById(warningId);
      if (warningEl) {
        warningEl.textContent = '';
        warningEl.style.display = 'none';
      }
      return true;
    }

    function validateForm(formId, data) {
      if (formId === 'notesForm' && skipNotesValidation) {
        return true; // Skip validation after successful save
      }
      let isValid = true;
      const errors = {};

      if (formId === 'ticketForm') {
        if (!data.name || data.name.trim() === '') {
          errors.customerName = 'Customer name is required.';
          isValid = false;
        } else if (data.name.length < 2 || data.name.length > 18) {
          errors.customerName = 'Name must be 2–18 characters long.';
          isValid = false;
        } else if (/^\d+$/.test(data.name.trim())) {
          errors.customerName = 'Name cannot be only numbers.';
          isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
          errors.customerName = 'Name can only contain letters and spaces.';
          isValid = false;
        }
        if (!data.priority || data.priority.trim() === '') {
          errors.ticketPriority = 'Priority is required.';
          isValid = false;
        }
        if (!data.category || data.category.trim() === '') {
          errors.ticketCategory = 'Category is required.';
          isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || data.email.trim() === '') {
          errors.ticketEmail = 'Email is required.';
          isValid = false;
        } else if (!emailRegex.test(data.email)) {
          errors.ticketEmail = 'Please enter a valid email address.';
          isValid = false;
        }
        if (!data.message || data.message.trim() === '') {
          errors.ticketMessage = 'Message is required.';
          isValid = false;
        } else if (data.message.length < 10) {
          errors.ticketMessage = 'Message must be at least 10 characters.';
          isValid = false;
        } else if (data.message.length > 500) {
          errors.ticketMessage = 'Message cannot exceed 500 characters.';
          isValid = false;
        } else if (/^\d+$/.test(data.message.trim())) {
          errors.ticketMessage = 'Message cannot be only numbers.';
          isValid = false;
        }
      } else if (formId === 'issueForm') {
        if (!data.title || data.title.trim() === '') {
          errors.issueTitle = 'Issue title is required.';
          isValid = false;
        } else if (data.title.length < 5) {
          errors.issueTitle = 'Title must be at least 5 characters.';
          isValid = false;
        } else if (data.title.length > 100) {
          errors.issueTitle = 'Title cannot exceed 100 characters.';
          isValid = false;
        } else if (/^\d+$/.test(data.title.trim())) {
          errors.issueTitle = 'Title cannot be only numbers.';
          isValid = false;
        }
        if (!data.resolution || data.resolution.trim() === '') {
          errors.issueResolution = 'Resolution is required.';
          isValid = false;
        } else if (data.resolution.length < 10) {
          errors.issueResolution = 'Resolution must be at least 10 characters.';
          isValid = false;
        } else if (data.resolution.length > 500) {
          errors.issueResolution = 'Resolution cannot exceed 500 characters.';
          isValid = false;
        } else if (/^\d+$/.test(data.resolution.trim())) {
          errors.issueResolution = 'Resolution cannot be only numbers.';
          isValid = false;
        }
      } else if (formId === 'replyForm') {
        if (!data.message || data.message.trim() === '') {
          errors.replyMessage = 'Reply is required.';
          isValid = false;
        } else if (data.message.length < 5) {
          errors.replyMessage = 'Reply must be at least 5 characters.';
          isValid = false;
        } else if (data.message.length > 500) {
          errors.replyMessage = 'Reply cannot exceed 500 characters.';
          isValid = false;
        } else if (/^\d+$/.test(data.message.trim())) {
          errors.replyMessage = 'Reply cannot be only numbers.';
          isValid = false;
        }
      } else if (formId === 'notesForm') {
        const notesTrimmed = data.notes ? data.notes.trim() : '';
        if (!notesTrimmed) {
          errors.crmNotes = 'Notes cannot be empty.';
          isValid = false;
        } else if (notesTrimmed.length < 20) {
          errors.crmNotes = 'Notes must be at least 20 characters.';
          isValid = false;
        } else if (notesTrimmed.length > 1000) {
          errors.crmNotes = 'Notes cannot exceed 1000 characters.';
          isValid = false;
        } else if (/^\d+$/.test(notesTrimmed)) {
          errors.crmNotes = 'Notes cannot be only numbers.';
          isValid = false;
        }
      }

      console.log(`Validation for ${formId}: isValid=${isValid}, errors=`, errors);

      ['customerName', 'ticketPriority', 'ticketCategory', 'ticketEmail', 'ticketMessage', 'issueTitle', 'issueResolution', 'replyMessage', 'crmNotes'].forEach(id => {
        const errorEl = document.getElementById(`${id}Error`);
        if (errorEl) {
          errorEl.textContent = errors[id] || '';
          errorEl.style.display = errors[id] ? 'block' : 'none';
          console.log(`Updated ${id}Error: textContent="${errorEl.textContent}", display=${errorEl.style.display}`);
        }
      });

      return isValid;
    }

    function updateCharCounter(textareaId, counterId, maxLength) {
      const textarea = document.getElementById(textareaId);
      const counter = document.getElementById(counterId);
      if (textarea && counter) {
        counter.textContent = `${textarea.value.length}/${maxLength}`;
      }
    }

    function renderTickets(ticketsToRender = tickets) {
      console.log('Rendering tickets:', ticketsToRender.length, ticketsToRender);
      ticketsContainer.innerHTML = ticketsToRender.length === 0 ? '<p class="no-tickets">No tickets found</p>' : '';
      ticketsToRender.forEach(ticket => {
        const ticketEl = document.createElement('div');
        ticketEl.className = 'ticket';
        ticketEl.dataset.id = ticket.id;
        ticketEl.innerHTML = `
          <div class="ticket-info">
            <input type="checkbox" class="ticket-checkbox" data-id="${ticket.id}">
            <div>
              <div class="ticket-header">
                <strong class="${ticket.status === 'resolved' ? 'resolved-name' : ''}">${ticket.name || 'Unknown'}</strong>
                <span class="priority ${ticket.priority}">${ticket.priority.toUpperCase()}</span>
                <span>${ticket.category.toUpperCase()}</span>
                <small>${new Date(ticket.date).toLocaleDateString()}</small>
              </div>
              <p>${ticket.message || 'No message provided'}</p>
              <p><small>Email: ${ticket.email}</small></p>
            </div>
          </div>
          <div class="ticket-actions">
            <button class="reply-btn">Reply</button>
            <button class="view-btn">View</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
        ticketsContainer.appendChild(ticketEl);
      });
      updateStats();
      setupTicketEventListeners();
      updateToolbarVisibility();
    }

    function renderIssues(issuesToRender = issues) {
      console.log('Rendering issues:', issuesToRender);
      issuesContainer.innerHTML = issuesToRender.length === 0 ? '<p>No issues found</p>' : '';
      issuesToRender.forEach(issue => {
        if (!Number.isInteger(issue.id)) {
          console.error('Invalid issue ID:', issue);
          return;
        }
        const issueEl = document.createElement('div');
        issueEl.className = 'issue-item';
        issueEl.dataset.id = issue.id;
        issueEl.innerHTML = `
          <div class="issue-content">
            <h4>${issue.title}</h4>
            <p><strong>Resolution:</strong> ${issue.resolution}</p>
          </div>
          <button class="issue-delete-btn" data-id="${issue.id}"><i class="fas fa-trash"></i></button>
        `;
        issuesContainer.appendChild(issueEl);
      });
      try {
        localStorage.setItem('crmIssues', JSON.stringify(issuesToRender));
      } catch (error) {
        console.error('Failed to save issues to localStorage:', error);
      }
      setupIssueEventListeners();
    }

    function renderNotes() {
      console.log('Rendering notes:', crmNotesHistory.length);
      savedNotes.innerHTML = '';
      crmNotesHistory.forEach(note => {
        const noteEl = document.createElement('div');
        noteEl.className = 'note-item';
        noteEl.innerHTML = `
          <p>${note.text}</p>
          <button class="note-delete-btn" data-id="${note.id}"><i class="fas fa-times"></i></button>
        `;
        savedNotes.appendChild(noteEl);
      });
      setupNoteEventListeners();
    }

    function updateStats() {
      console.log('Updating stats');
      const total = tickets.length;
      const open = tickets.filter(t => t.status === 'open').length;
      const resolved = tickets.filter(t => t.status === 'resolved').length;
      const resolvedPercentage = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;
      totalTicketsEl.textContent = total;
      openTicketsEl.textContent = open;
      resolvedTicketsEl.innerHTML = `${resolvedPercentage}%${resolvedPercentage > prevResolvedPercentage ? '<i class="fas fa-arrow-up resolved-icon"></i>' : ''}`;
      prevResolvedPercentage = resolvedPercentage;
    }

    function updateToolbarVisibility() {
      const checkedBoxes = document.querySelectorAll('.ticket-checkbox:checked');
      toolbarBtn.style.display = checkedBoxes.length > 0 ? 'block' : 'none';
    }

    function setupTicketEventListeners() {
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const ticketId = parseInt(btn.closest('.ticket').dataset.id);
          if (confirm(`Are you sure you want to delete ticket #${ticketId}?`)) {
            tickets = tickets.filter(ticket => ticket.id !== ticketId);
            renderTickets();
          }
        });
      });

      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const ticketId = parseInt(btn.closest('.ticket').dataset.id);
          const ticket = tickets.find(t => t.id === ticketId);
          const viewContent = document.getElementById('viewTicketContent');
          viewContent.innerHTML = `
            <p><strong>Name:</strong> ${ticket.name}</p>
            <p><strong>Email:</strong> ${ticket.email}</p>
            <p><strong>Priority:</strong> ${ticket.priority.toUpperCase()}</p>
            <p><strong>Category:</strong> ${ticket.category.toUpperCase()}</p>
            <p><strong>Status:</strong> ${ticket.status.toUpperCase()}</p>
            <p><strong>Date:</strong> ${new Date(ticket.date).toLocaleDateString()}</p>
            <p><strong>Message:</strong> ${ticket.message}</p>
            <h4>Replies:</h4>
            ${ticket.replies.length > 0 ? ticket.replies.map(reply => `
              <div class="reply-item">
                <p><small>${new Date(reply.date).toLocaleString()}</small></p>
                <p>${reply.message}</p>
              </div>
            `).join('') : '<p>No replies yet.</p>'}
          `;
          viewTicketModal.style.display = 'block';
        });
      });

      document.querySelectorAll('.reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const ticketId = parseInt(btn.closest('.ticket').dataset.id);
          replyTicketModal.style.display = 'block';
          replyForm.dataset.ticketId = ticketId;
        });
      });

      document.querySelectorAll('.ticket-checkbox').forEach(cb => {
        cb.addEventListener('change', updateToolbarVisibility);
      });
    }

    replyForm.addEventListener('submit', e => {
      e.preventDefault();
      const ticketId = parseInt(replyForm.dataset.ticketId);
      const replyMessage = document.getElementById('replyMessage').value.trim();
      if (validateForm('replyForm', { message: replyMessage })) {
        const ticket = tickets.find(t => t.id === ticketId);
        ticket.replies.push({
          message: replyMessage,
          date: new Date().toISOString()
        });
        renderTickets();
        replyTicketModal.style.display = 'none';
        replyForm.reset();
        updateCharCounter('replyMessage', 'replyMessageCounter', 500);
        document.getElementById('replyMessageLineWarning').style.display = 'none';
        document.getElementById('replyMessageError').style.display = 'none';
      }
    });

    function setupIssueEventListeners() {
      document.querySelectorAll('.issue-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const issueId = parseInt(btn.dataset.id);
          if (confirm(`Are you sure you want to delete issue #${issueId}?`)) {
            issues = issues.filter(issue => issue.id !== issueId);
            renderIssues();
          }
        });
      });
    }

    function setupNoteEventListeners() {
      document.querySelectorAll('.note-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const noteId = parseInt(btn.dataset.id);
          if (confirm(`Are you sure you want to delete note #${noteId}?`)) {
            crmNotesHistory = crmNotesHistory.filter(note => note.id !== noteId);
            localStorage.setItem('crmNotesHistory', JSON.stringify(crmNotesHistory));
            renderNotes();
          }
        });
      });
    }

    function searchTickets() {
      console.log('Searching tickets with term:', searchInput.value, 'category:', categoryFilter.value);
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      let filtered = tickets;
      if (searchTerm) {
        filtered = filtered.filter(ticket =>
          (ticket.name && ticket.name.toLowerCase().includes(searchTerm)) ||
          (ticket.message && ticket.message.toLowerCase().includes(searchTerm)) ||
          (ticket.email && ticket.email.toLowerCase().includes(searchTerm))
        );
      }
      if (category) {
        filtered = filtered.filter(ticket => ticket.category === category);
      }
      renderTickets(filtered);
    }

    function addTicket(ticketData) {
      console.log('Adding ticket:', ticketData);
      if (validateForm('ticketForm', ticketData)) {
        const newTicket = {
          id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
          name: ticketData.name.trim(),
          priority: ticketData.priority,
          category: ticketData.category,
          email: ticketData.email.trim(),
          message: ticketData.message.trim(),
          status: 'open',
          date: new Date().toISOString(),
          replies: []
        };
        tickets.unshift(newTicket);
        // Reset filters to show all tickets, including the new one
        searchInput.value = '';
        categoryFilter.value = '';
        renderTickets(); // Render all tickets
        ticketModal.style.display = 'none';
        ticketForm.reset();
        updateCharCounter('ticketMessage', 'ticketMessageCounter', 500);
        document.getElementById('ticketMessageLineWarning').style.display = 'none';
        ['customerName', 'ticketPriority', 'ticketCategory', 'ticketEmail', 'ticketMessage'].forEach(id => {
          const errorEl = document.getElementById(`${id}Error`);
          if (errorEl) errorEl.style.display = 'none';
        });
        window.scrollTo(0, 0);
      }
    }

    function addIssue(issueData) {
      console.log('Adding issue:', issueData);
      if (validateForm('issueForm', issueData)) {
        const newIssue = {
          id: issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1,
          title: issueData.title.trim(),
          resolution: issueData.resolution.trim()
        };
        issues.push(newIssue);
        renderIssues();
        issueModal.style.display = 'none';
        issueForm.reset();
        updateCharCounter('issueResolution', 'issueResolutionCounter', 500);
        document.getElementById('issueResolutionLineWarning').style.display = 'none';
        ['issueTitle', 'issueResolution'].forEach(id => {
          const errorEl = document.getElementById(`${id}Error`);
          if (errorEl) errorEl.style.display = 'none';
        });
      }
    }

    function addNote(noteText) {
      console.log('Adding note:', noteText);
      const errorEl = document.getElementById('crmNotesError');
      const warningEl = document.getElementById('crmNotesLineWarning');

      if (validateForm('notesForm', { notes: noteText })) {
        skipNotesValidation = true; // Set flag to skip validation post-save
        const newNote = {
          id: crmNotesHistory.length > 0 ? Math.max(...crmNotesHistory.map(n => n.id)) + 1 : 1,
          text: noteText.trim()
        };
        crmNotesHistory.push(newNote);
        localStorage.setItem('crmNotesHistory', JSON.stringify(crmNotesHistory));
        renderNotes();

        notesForm.reset();
        crmNotes.value = '';
        updateCharCounter('crmNotes', 'crmNotesCounter', 1000);

        if (errorEl) {
          errorEl.textContent = '';
          errorEl.style.display = 'none';
        }
        if (warningEl) {
          warningEl.textContent = '';
          warningEl.style.display = 'none';
        }
        console.log('Note added successfully:', newNote);
        // Explicitly clear error after reset to handle stray events
        setTimeout(() => {
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
          }
          skipNotesValidation = false; // Reset flag
        }, 0);
      } else {
        console.log('Note validation failed for text:', noteText);
        skipNotesValidation = false; // Ensure flag is cleared on failure
      }
    }

    function exportTickets() {
      console.log('Exporting tickets:', tickets.length);
      const csv = [
        ['ID', 'Name', 'Email', 'Priority', 'Category', 'Message', 'Status', 'Date', 'Replies'],
        ...tickets.map(ticket => [
          ticket.id,
          `"${ticket.name.replace(/"/g, '""')}"`,
          ticket.email,
          ticket.priority,
          ticket.category,
          `"${ticket.message.replace(/"/g, '""')}"`,
          ticket.status,
          new Date(ticket.date).toLocaleString(),
          `"${ticket.replies.map(r => r.message.replace(/"/g, '""')).join('; ')}"`
        ])
      ].map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tickets.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }

    function bulkUpdateStatus() {
      console.log('Bulk updating status:', bulkStatusUpdate.value);
      const status = bulkStatusUpdate.value;
      if (status && tickets.length > 0) {
        document.querySelectorAll('.ticket-checkbox').forEach(cb => {
          cb.checked = true;
        });
        if (confirm(`Are you sure you want to update all ${tickets.length} tickets to status: ${status}?`)) {
          tickets.forEach(ticket => {
            ticket.status = status;
          });
          // Reset filters to show all tickets
          searchInput.value = '';
          categoryFilter.value = '';
          renderTickets();
          bulkStatusUpdate.value = '';
          updateToolbarVisibility();
        } else {
          document.querySelectorAll('.ticket-checkbox').forEach(cb => {
            cb.checked = false;
          });
          bulkStatusUpdate.value = '';
          updateToolbarVisibility();
        }
      } else if (tickets.length === 0) {
        alert('No tickets available to update.');
        bulkStatusUpdate.value = '';
      }
    }

    function markAsResolved() {
      console.log('Marking selected tickets as resolved');
      const selectedTickets = Array.from(document.querySelectorAll('.ticket-checkbox:checked')).map(cb => parseInt(cb.dataset.id));
      if (selectedTickets.length > 0 && confirm(`Are you sure you want to mark ${selectedTickets.length} selected tickets as resolved?`)) {
        tickets.forEach(ticket => {
          if (selectedTickets.includes(ticket.id)) {
            ticket.status = 'resolved';
          }
        });
        // Reset filters to show all tickets
        searchInput.value = '';
        categoryFilter.value = '';
        renderTickets();
        updateToolbarVisibility();
      }
    }

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') searchTickets();
    });
    categoryFilter.addEventListener('change', searchTickets);
    addTicketBtn.addEventListener('click', () => {
      console.log('Add ticket button clicked');
      ticketModal.style.display = 'block';
      window.scrollTo(0, 0);
    });
    addIssueBtn.addEventListener('click', () => {
      console.log('Add issue button clicked');
      issueModal.style.display = 'block';
    });
    closeBtn.forEach(btn => btn.addEventListener('click', () => {
      ticketModal.style.display = 'none';
      viewTicketModal.style.display = 'none';
      replyTicketModal.style.display = 'none';
      issueModal.style.display = 'none';
    }));
    window.addEventListener('click', e => {
      if (e.target === ticketModal || e.target === viewTicketModal || e.target === replyTicketModal || e.target === issueModal) {
        ticketModal.style.display = 'none';
        viewTicketModal.style.display = 'none';
        replyTicketModal.style.display = 'none';
        issueModal.style.display = 'none';
      }
    });
    ticketForm.addEventListener('submit', e => {
      e.preventDefault();
      addTicket({
        name: document.getElementById('customerName').value,
        priority: document.getElementById('ticketPriority').value,
        category: document.getElementById('ticketCategory').value,
        email: document.getElementById('ticketEmail').value,
        message: document.getElementById('ticketMessage').value
      });
    });
    issueForm.addEventListener('submit', e => {
      e.preventDefault();
      addIssue({
        title: document.getElementById('issueTitle').value,
        resolution: document.getElementById('issueResolution').value
      });
    });
    notesForm.addEventListener('submit', e => {
      e.preventDefault();
      const noteText = crmNotes.value.trim();
      console.log('Form submitted with note text:', noteText);
      addNote(noteText);
    });
    exportTicketsBtn.addEventListener('click', exportTickets);
    bulkStatusUpdate.addEventListener('change', bulkUpdateStatus);
    markResolvedBtn.addEventListener('click', markAsResolved);

    document.getElementById('ticketMessage').addEventListener('input', e => {
      enforceLineWrap(e.target, 'ticketMessageLineWarning');
      updateCharCounter('ticketMessage', 'ticketMessageCounter', 500);
    });
    document.getElementById('issueResolution').addEventListener('input', e => {
      enforceLineWrap(e.target, 'issueResolutionLineWarning');
      updateCharCounter('issueResolution', 'issueResolutionCounter', 500);
    });
    document.getElementById('replyMessage').addEventListener('input', e => {
      enforceLineWrap(e.target, 'replyMessageLineWarning');
      updateCharCounter('replyMessage', 'replyMessageCounter', 500);
    });
    document.getElementById('crmNotes').addEventListener('input', e => {
      enforceLineWrap(e.target, 'crmNotesLineWarning');
      updateCharCounter('crmNotes', 'crmNotesCounter', 1000);
      const errorEl = document.getElementById('crmNotesError');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    });

    document.getElementById('customerName').addEventListener('input', e => {
      const value = e.target.value;
      const errorEl = document.getElementById('customerNameError');
      if (/^\d+$/.test(value)) {
        errorEl.textContent = 'Name cannot be only numbers.';
        errorEl.style.display = 'block';
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorEl.textContent = 'Name can only contain letters and spaces.';
        errorEl.style.display = 'block';
      } else {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    });

    document.getElementById('issueTitle').addEventListener('input', e => {
      const value = e.target.value;
      const errorEl = document.getElementById('issueTitleError');
      if (/^\d+$/.test(value)) {
        errorEl.textContent = 'Title cannot be only numbers.';
        errorEl.style.display = 'block';
      } else {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    });

    renderTickets();
    renderIssues();
    renderNotes();
    console.log('initCRM completed');
  } catch (error) {
    console.error('Error in initCRM:', error);
  }
}

if (document.readyState === 'loading') {
  console.log('Waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', initCRM);
} else {
  console.log('DOM already loaded, running initCRM');
  initCRM();
}
// Initialize Milk Collection
/* Fake Data */
const suppliers = [
  { id: 'SP-1001', name: 'Rajesh Patel', contact: '9876543210', location: 'Village A', cows: 5, yield: 24.50, status: 'Active' },
  { id: 'SP-1002', name: 'Meena Sharma', contact: '9876543211', location: 'Village B', cows: 8, yield: 30, status: 'Active' },
  { id: 'SP-1003', name: 'Vijay Kumar', contact: '9876543212', location: 'Village V', cows: 12, yield: 51, status: 'New' },
  { id: 'SP-874', name: 'Sunita Devi', contact: '9876543213', location: 'Village A', cows: 8, yield: 29, status: 'Active' }
];

let milkEntries = [
  { date: '2024-05-25', quantity: 200, fat: 4.5, status: 'Pending' },
  { date: '2024-05-25', quantity: 150, fat: 3.2, status: 'Cleared' },
  { date: '2024-05-26', quantity: 212, fat: 7.5, status: 'Pending' },
  { date: '2024-05-26', quantity: 220, fat: 4.8, status: 'Pending' },
  { date: '2024-05-27', quantity: 100, fat: 3.0, status: 'Cleared' }
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

/* Validation Functions */
function validateSupplierForm(isEdit = false, currentId = null) {
  let isValid = true;
  const spId = document.getElementById('spId').value.trim();
  const spName = document.getElementById('spName').value.trim();
  const spContact = document.getElementById('spContact').value.trim();
  const spLocation = document.getElementById('spLocation').value.trim();
  const spCows = document.getElementById('spCows').value.trim();
  const spYield = document.getElementById('spYield').value.trim();
  const spStatus = document.getElementById('spStatus').value;

  // Clear previous errors
  document.getElementById('spIdError').textContent = '';
  document.getElementById('spNameError').textContent = '';
  document.getElementById('spContactError').textContent = '';
  document.getElementById('spLocationError').textContent = '';
  document.getElementById('spCowsError').textContent = '';
  document.getElementById('spYieldError').textContent = '';
  document.getElementById('spStatusError').textContent = '';

  // Supplier ID: Required, format SP-XXXX
  if (!spId) {
    document.getElementById('spIdError').textContent = 'Supplier ID is required';
    isValid = false;
  } else if (!/^SP-\d{3,4}$/.test(spId)) {
    document.getElementById('spIdError').textContent = 'Supplier ID must be in format SP-XXX or SP-XXXX (e.g., SP-123 or SP-1234)';
    isValid = false;
  } else if (!isEdit && suppliers.some(s => s.id === spId) || (isEdit && suppliers.some(s => s.id === spId && s.id !== currentId))) {
    document.getElementById('spIdError').textContent = 'Supplier ID already exists';
    isValid = false;
  }

  // Name: Required, 2-50 characters, only letters and spaces
  if (!spName) {
    document.getElementById('spNameError').textContent = 'Name is required';
    isValid = false;
  } else if (!/^[A-Za-z\s]+$/.test(spName)) {
    document.getElementById('spNameError').textContent = 'Name must contain only letters and spaces';
    isValid = false;
  } else if (spName.length < 2 || spName.length > 50) {
    document.getElementById('spNameError').textContent = 'Name must be between 2 and 50 characters';
    isValid = false;
  }

  // Contact: Required, 10-digit phone number
  if (!spContact) {
    document.getElementById('spContactError').textContent = 'Contact is required';
    isValid = false;
  } else if (!/^\d{10}$/.test(spContact)) {
    document.getElementById('spContactError').textContent = 'Contact must be a 10-digit phone number';
    isValid = false;
  }

  // Location: Required, only letters and spaces
  if (!spLocation) {
    document.getElementById('spLocationError').textContent = 'Location is required';
    isValid = false;
  } else if (!/^[A-Za-z\s]+$/.test(spLocation)) {
    document.getElementById('spLocationError').textContent = 'Location must contain only letters and spaces';
    isValid = false;
  }

  // Cows: Required, positive integer
  if (!spCows) {
    document.getElementById('spCowsError').textContent = 'Number of cows is required';
    isValid = false;
  } else if (isNaN(spCows) || parseInt(spCows) <= 0) {
    document.getElementById('spCowsError').textContent = 'Number of cows must be a positive integer';
    isValid = false;
  }

  // Yield: Required, positive number
  if (!spYield) {
    document.getElementById('spYieldError').textContent = 'Average yield is required';
    isValid = false;
  } else if (isNaN(spYield) || parseFloat(spYield) <= 0) {
    document.getElementById('spYieldError').textContent = 'Average yield must be a positive number';
    isValid = false;
  }

  // Status: Required
  if (!spStatus) {
    document.getElementById('spStatusError').textContent = 'Status is required';
    isValid = false;
  }

  return isValid;
}

function validateMilkForm(modal = false) {
  let isValid = true;
  const prefix = modal ? 'newMilk' : 'milk';
  const date = document.getElementById(`${prefix}Date`).value;
  const quantity = document.getElementById(`${prefix}Quantity`).value.trim();
  const fat = document.getElementById(`${prefix}Fat`).value.trim();

  // Clear previous errors
  document.getElementById(`${prefix}DateError`).textContent = '';
  document.getElementById(`${prefix}QuantityError`).textContent = '';
  document.getElementById(`${prefix}FatError`).textContent = '';

  // Date: Required, not in future
  const today = new Date().toISOString().split('T')[0];
  if (!date) {
    document.getElementById(`${prefix}DateError`).textContent = 'Date is required';
    isValid = false;
  } else if (date > today) {
    document.getElementById(`${prefix}DateError`).textContent = 'Date cannot be in the future';
    isValid = false;
  }

  // Quantity: Required, positive number
  if (!quantity) {
    document.getElementById(`${prefix}QuantityError`).textContent = 'Quantity is required';
    isValid = false;
  } else if (isNaN(quantity) || parseFloat(quantity) <= 0) {
    document.getElementById(`${prefix}QuantityError`).textContent = 'Quantity must be a positive number';
    isValid = false;
  }

  // Fat: Required, between 0 and 10
  if (!fat) {
    document.getElementById(`${prefix}FatError`).textContent = 'Fat percentage is required';
    isValid = false;
  } else if (isNaN(fat) || parseFloat(fat) < 0 || parseFloat(fat) > 10) {
    document.getElementById(`${prefix}FatError`).textContent = 'Fat percentage must be between 0 and 10';
    isValid = false;
  }

  return isValid;
}

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
        <i class="fas fa-eye" title="View" onclick="viewSupplier('${s.id}')"></i>
        <i class="fas fa-pen" title="Edit" onclick="editSupplier('${s.id}')"></i>
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

function viewSupplier(id) {
  const supplier = suppliers.find(s => s.id === id);
  if (!supplier) return;
  const viewModal = document.getElementById('viewSupplierModal');
  const details = document.getElementById('viewSupplierDetails');
  details.innerHTML = `
    <p><strong>Supplier ID:</strong> ${supplier.id}</p>
    <p><strong>Name:</strong> ${supplier.name}</p>
    <p><strong>Contact:</strong> ${supplier.contact}</p>
    <p><strong>Location:</strong> ${supplier.location}</p>
    <p><strong>Cows:</strong> ${supplier.cows}</p>
    <p><strong>Avg. Yield:</strong> ${supplier.yield.toFixed(2)}L</p>
    <p><strong>Status:</strong> ${supplier.status}</p>
  `;
  viewModal.style.display = 'block';
}

function editSupplier(id) {
  const supplier = suppliers.find(s => s.id === id);
  if (!supplier) return;
  const modal = document.getElementById('supplierModal');
  const modalTitle = document.getElementById('supplierModalTitle');
  modalTitle.textContent = 'Edit Supplier';
  document.getElementById('spId').value = supplier.id;
  document.getElementById('spName').value = supplier.name;
  document.getElementById('spContact').value = supplier.contact;
  document.getElementById('spLocation').value = supplier.location;
  document.getElementById('spCows').value = supplier.cows;
  document.getElementById('spYield').value = supplier.yield;
  document.getElementById('spStatus').value = supplier.status;
  document.getElementById('spId').disabled = true; // Prevent editing ID
  modal.dataset.editId = id; // Store ID for editing
  modal.style.display = 'block';
}

/* Supplier Modal */
const supplierModal = document.getElementById('supplierModal');
const viewSupplierModal = document.getElementById('viewSupplierModal');
const addSupplierBtn = document.getElementById('addSupplierBtn');
const closeModalBtn = supplierModal.querySelector('.close');
const closeViewModalBtn = viewSupplierModal.querySelector('.close');
const supplierForm = document.getElementById('supplierForm');

addSupplierBtn.onclick = () => {
  document.getElementById('supplierModalTitle').textContent = 'Add Supplier';
  document.getElementById('spId').disabled = false;
  supplierForm.reset();
  document.getElementById('spIdError').textContent = '';
  document.getElementById('spNameError').textContent = '';
  document.getElementById('spContactError').textContent = '';
  document.getElementById('spLocationError').textContent = '';
  document.getElementById('spCowsError').textContent = '';
  document.getElementById('spYieldError').textContent = '';
  document.getElementById('spStatusError').textContent = '';
  delete supplierModal.dataset.editId;
  supplierModal.style.display = 'block';
};

closeModalBtn.onclick = () => {
  supplierForm.reset();
  document.getElementById('spIdError').textContent = '';
  document.getElementById('spNameError').textContent = '';
  document.getElementById('spContactError').textContent = '';
  document.getElementById('spLocationError').textContent = '';
  document.getElementById('spCowsError').textContent = '';
  document.getElementById('spYieldError').textContent = '';
  document.getElementById('spStatusError').textContent = '';
  document.getElementById('spId').disabled = false;
  supplierModal.style.display = 'none';
};

closeViewModalBtn.onclick = () => {
  viewSupplierModal.style.display = 'none';
};

window.onclick = e => {
  if (e.target === supplierModal || e.target === milkEntryModal || e.target === viewSupplierModal) {
    supplierModal.style.display = 'none';
    milkEntryModal.style.display = 'none';
    viewSupplierModal.style.display = 'none';
    supplierForm.reset();
    milkEntryForm.reset();
    document.getElementById('spIdError').textContent = '';
    document.getElementById('spNameError').textContent = '';
    document.getElementById('spContactError').textContent = '';
    document.getElementById('spLocationError').textContent = '';
    document.getElementById('spCowsError').textContent = '';
    document.getElementById('spYieldError').textContent = '';
    document.getElementById('spStatusError').textContent = '';
    document.getElementById('newMilkDateError').textContent = '';
    document.getElementById('newMilkQuantityError').textContent = '';
    document.getElementById('newMilkFatError').textContent = '';
    document.getElementById('spId').disabled = false;
  }
};

supplierForm.onsubmit = e => {
  e.preventDefault();
  const isEdit = supplierModal.dataset.editId !== undefined;
  const currentId = isEdit ? supplierModal.dataset.editId : null;
  if (!validateSupplierForm(isEdit, currentId)) return;
  const newSupplier = {
    id: document.getElementById('spId').value.trim(),
    name: document.getElementById('spName').value.trim(),
    contact: document.getElementById('spContact').value.trim(),
    location: document.getElementById('spLocation').value.trim(),
    cows: parseInt(document.getElementById('spCows').value),
    yield: parseFloat(document.getElementById('spYield').value),
    status: document.getElementById('spStatus').value
  };
  if (isEdit) {
    const idx = suppliers.findIndex(s => s.id === currentId);
    if (idx > -1) {
      suppliers[idx] = newSupplier;
      alert('Supplier updated successfully!');
    }
  } else {
    suppliers.push(newSupplier);
    alert('Supplier added successfully!');
  }
  supplierForm.reset();
  document.getElementById('spIdError').textContent = '';
  document.getElementById('spNameError').textContent = '';
  document.getElementById('spContactError').textContent = '';
  document.getElementById('spLocationError').textContent = '';
  document.getElementById('spCowsError').textContent = '';
  document.getElementById('spYieldError').textContent = '';
  document.getElementById('spStatusError').textContent = '';
  document.getElementById('spId').disabled = false;
  supplierModal.style.display = 'none';
  delete supplierModal.dataset.editId;
  renderSuppliers();
};

/* Milk Entry Modal */
const milkEntryModal = document.getElementById('milkEntryModal');
const milkEntryForm = document.getElementById('milkEntryForm');
const closeMilkModalBtn = milkEntryModal.querySelector('.close');

closeMilkModalBtn.onclick = () => {
  milkEntryForm.reset();
  document.getElementById('newMilkDateError').textContent = '';
  document.getElementById('newMilkQuantityError').textContent = '';
  document.getElementById('newMilkFatError').textContent = '';
  milkEntryModal.style.display = 'none';
  delete milkEntryModal.dataset.source;
  delete milkEntryModal.dataset.editIndex;
};

milkEntryForm.onsubmit = e => {
  e.preventDefault();
  if (!validateMilkForm(true)) return;
  const date = document.getElementById('newMilkDate').value;
  const quantity = parseFloat(document.getElementById('newMilkQuantity').value);
  const fat = parseFloat(document.getElementById('newMilkFat').value);
  const source = milkEntryModal.dataset.source;
  const editIndex = milkEntryModal.dataset.editIndex;

  if (editIndex !== undefined) {
    const index = parseInt(editIndex);
    milkEntries[index] = { date, quantity, fat, status: milkEntries[index].status };
    alert('Milk entry updated successfully!');
  } else {
    milkEntries.push({ date, quantity, fat, status: 'Pending' });
    alert('Milk entry added successfully!');
  }

  milkEntryForm.reset();
  document.getElementById('newMilkDateError').textContent = '';
  document.getElementById('newMilkQuantityError').textContent = '';
  document.getElementById('newMilkFatError').textContent = '';
  milkEntryModal.style.display = 'none';
  delete milkEntryModal.dataset.source;
  delete milkEntryModal.dataset.editIndex;
  renderMilkTable();
  updateMilkTotals();
  if (source === 'quality') renderQualityTable();
  if (source === 'payments') renderPaymentsTable();
  updateSummaryCards();
};

/* Milk Collection */
const addMilkBtn = document.getElementById('addMilkBtn');
const exportMilkBtn = document.getElementById('exportMilkBtn');

addMilkBtn.onclick = addMilkEntry;
exportMilkBtn.onclick = exportMilkData;

function addMilkEntry() {
  if (!validateMilkForm()) return;
  const date = document.getElementById('milkDate').value;
  const quantity = parseFloat(document.getElementById('milkQuantity').value);
  const fat = parseFloat(document.getElementById('milkFat').value);
  milkEntries.push({ date, quantity, fat, status: 'Pending' });
  document.getElementById('milkDate').value = '';
  document.getElementById('milkQuantity').value = '';
  document.getElementById('milkFat').value = '';
  document.getElementById('milkDateError').textContent = '';
  document.getElementById('milkQuantityError').textContent = '';
  document.getElementById('milkFatError').textContent = '';
  renderMilkTable();
  updateMilkTotals();
  renderQualityTable();
  renderPaymentsTable();
  updateSummaryCards();
  alert('Milk entry added successfully!');
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

function editQualityEntry(index) {
  const entry = milkEntries[index];
  if (!entry) return;
  const modal = document.getElementById('milkEntryModal');
  const modalTitle = document.getElementById('milkEntryModalTitle');
  modalTitle.textContent = 'Edit Milk Entry';
  document.getElementById('newMilkDate').value = entry.date;
  document.getElementById('newMilkQuantity').value = entry.quantity;
  document.getElementById('newMilkFat').value = entry.fat;
  modal.dataset.source = 'quality';
  modal.dataset.editIndex = index;
  modal.style.display = 'block';
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
    <td class="actions">
      <i class="fas fa-pen" onclick="editQualityEntry(${milkEntries.indexOf(e)})" title="Edit Entry"></i>
      <i class="fas fa-trash" onclick="deleteQualityEntry(${milkEntries.indexOf(e)})" title="Delete Entry"></i>
    </td>
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
      .map(e => milkEntries.indexOf(e))
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
  const totalPending = milkEntries.reduce((sum, e) => e.status === 'Pending' ? sum + parseFloat(calculatePayment(e.quantity, e.fat)) : sum, 0);
  document.getElementById('pendingPaymentsCard').textContent = `₹${totalPending.toFixed(2)}`;
}

/* Init */
renderSuppliers();
renderMilkTable();
updateMilkTotals();
renderQualityTable();
renderPaymentsTable();
updateSummaryCards();

/* Quality Control */
function getQualityGrade(fat) {
  if (fat > 4) return 'A';
  if (fat >= 3) return 'B';
  return 'C';
}

function editQualityEntry(index) {
  const entry = milkEntries[index];
  if (!entry) return;
  const modal = document.getElementById('milkEntryModal');
  const modalTitle = document.getElementById('milkEntryModalTitle');
  modalTitle.textContent = 'Edit Milk Entry';
  document.getElementById('newMilkDate').value = entry.date;
  document.getElementById('newMilkQuantity').value = entry.quantity;
  document.getElementById('newMilkFat').value = entry.fat;
  modal.dataset.source = 'quality';
  modal.dataset.editIndex = index;
  modal.style.display = 'block';
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
    <td class="actions">
      <i class="fas fa-pen" onclick="editQualityEntry(${milkEntries.indexOf(e)})" title="Edit Entry"></i>
      <i class="fas fa-trash" onclick="deleteQualityEntry(${milkEntries.indexOf(e)})" title="Delete Entry"></i>
    </td>
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
  const totalPending = milkEntries.reduce((sum, e) => e.status === 'Pending' ? sum + parseFloat(calculatePayment(e.quantity, e.fat)) : sum, 0);
  document.getElementById('pendingPaymentsCard').textContent = `₹${totalPending.toFixed(2)}`;
}

/* Init */
renderSuppliers();
renderMilkTable();
updateMilkTotals();
renderQualityTable();
renderPaymentsTable();
updateSummaryCards();

// Initialize Chilling Centers
// Data
let receptionBatches = [
    { id: 'BATCH-001', source: 'Collection-A', centerId: 'CC-001', volume: 1000, grade: 'Accepted', received: '2025-05-20T08:00', notes: '' },
    { id: 'BATCH-002', source: 'Producer-B', centerId: 'CC-002', volume: 800, grade: 'Rejected', received: '2025-05-20T09:00', notes: 'High microbial count' }
];

let chillingCenters = [
    { id: 'CC-001', name: 'North-Unit', location: 'Village-A', capacity: 5000, stock: 3200, temp: 3.5, status: 'Operational' },
    { id: 'CC-002', name: 'South-Unit', location: 'Village-B', capacity: 7000, stock: 4500, temp: 4.0, status: 'Operational' }
];

let dispatchRecords = [
    { id: 'DISP-001', centerId: 'CC-001', quantity: 2000, transport: 'Tanker', destination: 'Main-Dairy', dispatchTime: '2025-05-20T12:00', sanitization: 'Checked', notes: '' }
];

let testResults = [
    { id: 'SAMP-001', stage: 'Reception', reference: 'BATCH-001', grade: 'A', fat: 4.2, microbial: 5000, testDate: '2025-05-20', notes: '' },
    { id: 'SAMP-002', stage: 'Storage', reference: 'CC-001', grade: 'A-', fat: 4.0, microbial: 8000, testDate: '2025-05-20', notes: '' }
];

// Chart.js Variables
let receptionChart, tempChart;

// Edit State
let editMode = { active: false, section: null, id: null };

// Update Center Dropdown
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

// Initialize Charts
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
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Volume (L)', font: { size: 12 } },
                    ticks: { font: { size: 10 } }
                },
                x: {
                    ticks: { font: { size: 10 } }
                }
            },
            plugins: {
                legend: { display: false },
                title: { display: false }
            }
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
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Temperature (°C)', font: { size: 12 } },
                    ticks: { font: { size: 10 } }
                },
                x: {
                    ticks: { font: { size: 10 } }
                }
            },
            plugins: {
                legend: { position: 'top', labels: { font: { size: 10 } } }
            }
        }
    });

    updateCharts();
}

// Update Charts
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

// Metrics
function updateMetrics() {
    const totalMilkReceived = receptionBatches.reduce((sum, b) => b.grade === 'Accepted' ? sum + b.volume : sum, 0);
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

// Render Data
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
                <p><strong>Status:</strong> <span class="status ${c.status.replace(' ', '-')}">${c.status}</span></p>
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
                <p><strong>Sanitization:</strong> <span class="status ${d.sanitization.replace(' ', '-')}">${d.sanitization}</span></p>
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
                <p><strong>Microbial:</strong> ${t.microbial.toLocaleString()} CFU/mL</p>
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

// Reset Form
function resetForm(section) {
    document.getElementById(`${section}Form`).reset();
    document.getElementById(`${section}FormTitle`).textContent = `Add New ${section.charAt(0).toUpperCase() + section.slice(1)}`;
    document.getElementById(`${section}Submit`).innerHTML = '<i class="fas fa-save"></i> Save';
    editMode = { active: false, section: null, id: null };
    clearValidationErrors(section);
}

// Clear Validation Errors
function clearValidationErrors(section) {
    const form = document.getElementById(`${section}Form`);
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('error');
    });
    form.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    if (section === 'reception') {
        document.getElementById('batchId').disabled = false;
    } else if (section === 'chilling') {
        document.getElementById('centerId').disabled = false;
    } else if (section === 'dispatch') {
        document.getElementById('dispatchId').disabled = false;
    } else if (section === 'sampling') {
        document.getElementById('sampleId').disabled = false;
    }
}

// Validate Input
function validateInput(input, errorId, message, isValid) {
    const errorElement = document.getElementById(errorId);
    if (!isValid) {
        input.classList.add('error');
        errorElement.style.display = 'block';
        errorElement.textContent = message;
        return false;
    } else {
        input.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

// Validate Not Numbers Only
function isNotNumbersOnly(value) {
    return value.length > 5 && !/^\d+$/.test(value);
}

// Edit Handlers
function handleEdit(e) {
    const id = e.target.closest('.record').dataset.id;
    const section = e.target.closest('.accordion').querySelector('.accordion-header').dataset.section;

    editMode = { active: true, section, id };
    clearValidationErrors(section);

    if (section === 'reception') {
        const batch = receptionBatches.find(b => b.id === id);
        if (batch) {
            document.getElementById('batchId').value = batch.id;
            document.getElementById('batchId').disabled = true;
            document.getElementById('batchSource').value = batch.source;
            document.getElementById('batchVolume').value = batch.volume;
            document.getElementById('batchCenterId').value = batch.centerId;
            document.getElementById('batchGrade').value = batch.grade;
            document.getElementById('batchReceived').value = batch.received;
            document.getElementById('batchNotes').value = batch.notes;
            document.getElementById('receptionFormTitle').textContent = `Edit Batch ${id}`;
            document.getElementById('receptionSubmit').innerHTML = '<i class="fas fa-save"></i> Update';
        }
    } else if (section === 'chilling') {
        const center = chillingCenters.find(c => c.id === id);
        if (center) {
            document.getElementById('centerId').value = center.id;
            document.getElementById('centerId').disabled = true;
            document.getElementById('centerName').value = center.name;
            document.getElementById('centerLocation').value = center.location;
            document.getElementById('centerCapacity').value = center.capacity;
            document.getElementById('centerTemp').value = center.temp;
            document.getElementById('centerStatus').value = center.status;
            document.getElementById('chillingFormTitle').textContent = `Edit Center ${id}`;
            document.getElementById('chillingSubmit').innerHTML = '<i class="fas fa-save"></i> Update';
        }
    } else if (section === 'dispatch') {
        const dispatch = dispatchRecords.find(d => d.id === id);
        if (dispatch) {
            document.getElementById('dispatchId').value = dispatch.id;
            document.getElementById('dispatchId').disabled = true;
            document.getElementById('dispatchCenterId').value = dispatch.centerId;
            document.getElementById('dispatchQuantity').value = dispatch.quantity;
            document.getElementById('dispatchTransport').value = dispatch.transport;
            document.getElementById('dispatchDestination').value = dispatch.destination;
            document.getElementById('dispatchTime').value = dispatch.dispatchTime;
            document.getElementById('dispatchSanitization').value = dispatch.sanitization;
            document.getElementById('dispatchNotes').value = dispatch.notes;
            document.getElementById('dispatchFormTitle').textContent = `Edit Dispatch ${id}`;
            document.getElementById('dispatchSubmit').innerHTML = '<i class="fas fa-save"></i> Update';
        }
    } else if (section === 'sampling') {
        const sample = testResults.find(t => t.id === id);
        if (sample) {
            document.getElementById('sampleId').value = sample.id;
            document.getElementById('sampleId').disabled = true;
            document.getElementById('sampleStage').value = sample.stage;
            document.getElementById('sampleReference').value = sample.reference;
            document.getElementById('sampleGrade').value = sample.grade;
            document.getElementById('sampleFat').value = sample.fat;
            document.getElementById('sampleMicrobial').value = sample.microbial;
            document.getElementById('sampleDate').value = sample.testDate;
            document.getElementById('sampleNotes').value = sample.notes;
            document.getElementById('samplingFormTitle').textContent = `Edit Sample ${id}`;
            document.getElementById('samplingSubmit').innerHTML = '<i class="fas fa-save"></i> Update';
        }
    }

    // Open the accordion
    const header = document.querySelector(`.accordion-header[data-section="${section}"]`);
    const content = header.nextElementSibling;
    if (!content.classList.contains('active')) {
        header.classList.toggle('collapsed');
        content.classList.toggle('active');
    }
}

// Event Handlers
function setupReceptionEvents() {
    document.querySelectorAll('#receptionRecords .delete').forEach(btn => {
        btn.removeEventListener('click', handleDeleteReception);
        btn.addEventListener('click', handleDeleteReception);
    });
    document.querySelectorAll('#receptionRecords .edit').forEach(btn => {
        btn.removeEventListener('click', handleEdit);
        btn.addEventListener('click', handleEdit);
    });
}

function handleDeleteReception(e) {
    const id = e.target.closest('.record').dataset.id;
    if (confirm(`Delete batch ${id}?`)) {
        const batch = receptionBatches.find(b => b.id === id);
        if (batch && batch.grade === 'Accepted') {
            const center = chillingCenters.find(c => c.id === batch.centerId);
            if (center) {
                center.stock = Math.max(0, (center.stock || 0) - batch.volume);
                console.log(`Deleted batch ${id}, updated stock for ${center.id} to ${center.stock}`);
            }
        }
        receptionBatches = receptionBatches.filter(b => b.id !== id);
        renderReception();
        renderChilling();
        resetForm('reception');
    }
}

function setupChillingEvents() {
    document.querySelectorAll('#chillingRecords .delete').forEach(btn => {
        btn.removeEventListener('click', handleDeleteChilling);
        btn.addEventListener('click', handleDeleteChilling);
    });
    document.querySelectorAll('#chillingRecords .edit').forEach(btn => {
        btn.removeEventListener('click', handleEdit);
        btn.addEventListener('click', handleEdit);
    });
}

function handleDeleteChilling(e) {
    const id = e.target.closest('.record').dataset.id;
    if (confirm(`Delete center ${id}?`)) {
        chillingCenters = chillingCenters.filter(c => c.id !== id);
        dispatchRecords = dispatchRecords.filter(d => d.centerId !== id);
        testResults = testResults.filter(t => t.reference !== id);
        receptionBatches = receptionBatches.filter(b => b.centerId !== id);
        renderChilling();
        renderDispatch();
        renderSampling();
        renderReception();
        resetForm('chilling');
    }
}

function setupDispatchEvents() {
    document.querySelectorAll('#dispatchRecords .delete').forEach(btn => {
        btn.removeEventListener('click', handleDeleteDispatch);
        btn.addEventListener('click', handleDeleteDispatch);
    });
    document.querySelectorAll('#dispatchRecords .edit').forEach(btn => {
        btn.removeEventListener('click', handleEdit);
        btn.addEventListener('click', handleEdit);
    });
}

function handleDeleteDispatch(e) {
    const id = e.target.closest('.record').dataset.id;
    if (confirm(`Delete dispatch ${id}?`)) {
        const dispatch = dispatchRecords.find(d => d.id === id);
        if (dispatch) {
            const center = chillingCenters.find(c => c.id === dispatch.centerId);
            if (center) {
                center.stock = (center.stock || 0) + dispatch.quantity;
                console.log(`Deleted dispatch ${id}, updated stock for ${center.id} to ${center.stock}`);
            }
        }
        dispatchRecords = dispatchRecords.filter(d => d.id !== id);
        renderDispatch();
        renderChilling();
        resetForm('dispatch');
    }
}

function setupSamplingEvents() {
    document.querySelectorAll('#samplingRecords .delete').forEach(btn => {
        btn.removeEventListener('click', handleDeleteSampling);
        btn.addEventListener('click', handleDeleteSampling);
    });
    document.querySelectorAll('#samplingRecords .edit').forEach(btn => {
        btn.removeEventListener('click', handleEdit);
        btn.addEventListener('click', handleEdit);
    });
}

function handleDeleteSampling(e) {
    const id = e.target.closest('.record').dataset.id;
    if (confirm(`Delete sample ${id}?`)) {
        testResults = testResults.filter(t => t.id !== id);
        renderSampling();
        resetForm('sampling');
    }
}

// Collapsible Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        header.classList.toggle('collapsed');
        content.classList.toggle('active');
    });
});

// Form Validation
function validateReceptionForm() {
    let isValid = true;
    const id = document.getElementById('batchId').value.trim();
    const source = document.getElementById('batchSource').value.trim();
    const volume = parseFloat(document.getElementById('batchVolume').value) || 0;
    const centerId = document.getElementById('batchCenterId').value;
    const grade = document.getElementById('batchGrade').value;
    const received = document.getElementById('batchReceived').value;

    if (!editMode.active || editMode.id !== id) {
        isValid &= validateInput(
            document.getElementById('batchId'),
            'batchIdError',
            'Batch ID is required, must be unique, not numbers only, and > 5 characters.',
            id && isNotNumbersOnly(id) && !receptionBatches.some(b => b.id === id)
        );
    }
    isValid &= validateInput(
        document.getElementById('batchSource'),
        'batchSourceError',
        'Source is required, must be not numbers only, and > 5 characters.',
        source && isNotNumbersOnly(source)
    );
    isValid &= validateInput(
        document.getElementById('batchVolume'),
        'batchVolumeError',
        'Volume must be at least 500L.',
        volume >= 500
    );
    isValid &= validateInput(
        document.getElementById('batchCenterId'),
        'batchCenterIdError',
        'Please select a chilling center.',
        centerId
    );
    isValid &= validateInput(
        document.getElementById('batchGrade'),
        'batchGradeError',
        'Please select a grade.',
        grade
    );
    isValid &= validateInput(
        document.getElementById('batchReceived'),
        'batchReceivedError',
        'Received date is required.',
        received
    );

    const center = chillingCenters.find(c => c.id === centerId);
    isValid &= validateInput(
        document.getElementById('batchCenterId'),
        'batchCenterIdError',
        'Invalid chilling center selected.',
        center
    );
    if (center) {
        isValid &= validateInput(
            document.getElementById('batchCenterId'),
            'batchCenterIdError',
            'Selected center is not operational.',
            center.status === 'Operational'
        );
    }

    return isValid;
}

function validateChillingForm() {
    let isValid = true;
    const id = document.getElementById('centerId').value.trim();
    const name = document.getElementById('centerName').value.trim();
    const location = document.getElementById('centerLocation').value.trim();
    const capacity = parseInt(document.getElementById('centerCapacity').value) || 0;
    const temp = parseFloat(document.getElementById('centerTemp').value) || 0;
    const status = document.getElementById('centerStatus').value;

    if (!editMode.active || editMode.id !== id) {
        isValid &= validateInput(
            document.getElementById('centerId'),
            'centerIdError',
            'Center ID is required, must be unique, not numbers only, and > 5 characters.',
            id && isNotNumbersOnly(id) && !chillingCenters.some(c => c.id === id)
        );
    }
    isValid &= validateInput(
        document.getElementById('centerName'),
        'centerNameError',
        'Name is required, must be not numbers only, and > 5 characters.',
        name && isNotNumbersOnly(name)
    );
    isValid &= validateInput(
        document.getElementById('centerLocation'),
        'centerLocationError',
        'Location is required, must be not numbers only, and > 5 characters.',
        location && isNotNumbersOnly(location)
    );
    isValid &= validateInput(
        document.getElementById('centerCapacity'),
        'centerCapacityError',
        'Capacity must be at least 500L.',
        capacity >= 500
    );
    isValid &= validateInput(
        document.getElementById('centerTemp'),
        'centerTempError',
        'Temperature must be between 0–6°C.',
        temp >= 0 && temp <= 6
    );
    isValid &= validateInput(
        document.getElementById('centerStatus'),
        'centerStatusError',
        'Please select a status.',
        status
    );

    return isValid;
}

function validateDispatchForm() {
    let isValid = true;
    const id = document.getElementById('dispatchId').value.trim();
    const centerId = document.getElementById('dispatchCenterId').value.trim();
    const quantity = parseFloat(document.getElementById('dispatchQuantity').value) || 0;
    const transport = document.getElementById('dispatchTransport').value;
    const destination = document.getElementById('dispatchDestination').value.trim();
    const dispatchTime = document.getElementById('dispatchTime').value;
    const sanitization = document.getElementById('dispatchSanitization').value;

    if (!editMode.active || editMode.id !== id) {
        isValid &= validateInput(
            document.getElementById('dispatchId'),
            'dispatchIdError',
            'Dispatch ID is required, must be unique, not numbers only, and > 5 characters.',
            id && isNotNumbersOnly(id) && !dispatchRecords.some(d => d.id === id)
        );
    }
    isValid &= validateInput(
        document.getElementById('dispatchCenterId'),
        'dispatchCenterIdError',
        'Valid Center ID is required, must be not numbers only, and > 5 characters.',
        centerId && isNotNumbersOnly(centerId)
    );
    isValid &= validateInput(
        document.getElementById('dispatchQuantity'),
        'dispatchQuantityError',
        'Quantity must be at least 500L.',
        quantity >= 500
    );
    isValid &= validateInput(
        document.getElementById('dispatchTransport'),
        'dispatchTransportError',
        'Please select a transport type.',
        transport
    );
    isValid &= validateInput(
        document.getElementById('dispatchDestination'),
        'dispatchDestinationError',
        'Destination is required, must be not numbers only, and > 5 characters.',
        destination && isNotNumbersOnly(destination)
    );
    isValid &= validateInput(
        document.getElementById('dispatchTime'),
        'dispatchTimeError',
        'Dispatch time is required.',
        dispatchTime
    );
    isValid &= validateInput(
        document.getElementById('dispatchSanitization'),
        'dispatchSanitizationError',
        'Please select sanitization status.',
        sanitization
    );

    const center = chillingCenters.find(c => c.id === centerId);
    isValid &= validateInput(
        document.getElementById('dispatchCenterId'),
        'dispatchCenterIdError',
        'Invalid Center ID.',
        center
    );
    if (center) {
        isValid &= validateInput(
            document.getElementById('dispatchQuantity'),
            'dispatchQuantityError',
            `Insufficient stock in center ${centerId}. Available: ${(center.stock || 0).toFixed(1)} L`,
            (center.stock || 0) >= quantity
        );
    }

    return isValid;
}

function validateSamplingForm() {
    let isValid = true;
    const id = document.getElementById('sampleId').value.trim();
    const stage = document.getElementById('sampleStage').value;
    const reference = document.getElementById('sampleReference').value.trim();
    const grade = document.getElementById('sampleGrade').value;
    const fat = parseFloat(document.getElementById('sampleFat').value) || 0;
    const microbial = parseInt(document.getElementById('sampleMicrobial').value) || 0;
    const testDate = document.getElementById('sampleDate').value;

    if (!editMode.active || editMode.id !== id) {
        isValid &= validateInput(
            document.getElementById('sampleId'),
            'sampleIdError',
            'Sample ID is required, must be unique, not numbers only, and > 5 characters.',
            id && isNotNumbersOnly(id) && !testResults.some(t => t.id === id)
        );
    }
    isValid &= validateInput(
        document.getElementById('sampleStage'),
        'sampleStageError',
        'Please select a stage.',
        stage
    );
    isValid &= validateInput(
        document.getElementById('sampleReference'),
        'sampleReferenceError',
        'Reference ID is required, must be not numbers only, and > 5 characters.',
        reference && isNotNumbersOnly(reference)
    );
    isValid &= validateInput(
        document.getElementById('sampleGrade'),
        'sampleGradeError',
        'Please select a grade.',
        grade
    );
    isValid &= validateInput(
        document.getElementById('sampleFat'),
        'sampleFatError',
        'Fat content must be non-negative.',
        fat >= 0
    );
    isValid &= validateInput(
        document.getElementById('sampleMicrobial'),
        'sampleMicrobialError',
        'Microbial count must be between 0 and 1,000,000 CFU/mL.',
        microbial >= 0 && microbial <= 1000000
    );
    isValid &= validateInput(
        document.getElementById('sampleDate'),
        'sampleDateError',
        'Test date is required.',
        testDate
    );

    return isValid;
}

// Forms
function setupForm(formId, validateFn, submitHandler) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', e => {
        e.preventDefault();
        clearValidationErrors(formId.replace('Form', ''));
        if (validateFn()) {
            submitHandler();
            resetForm(formId.replace('Form', ''));
        }
    });
}

setupForm('receptionForm', validateReceptionForm, () => {
    const id = document.getElementById('batchId').value.trim();
    const volume = parseFloat(document.getElementById('batchVolume').value);
    const centerId = document.getElementById('batchCenterId').value;
    const grade = document.getElementById('batchGrade').value;

    if (editMode.active && editMode.section === 'reception' && editMode.id === id) {
        const batch = receptionBatches.find(b => b.id === id);
        if (batch) {
            const oldVolume = batch.volume;
            const oldGrade = batch.grade;
            batch.source = document.getElementById('batchSource').value.trim();
            batch.centerId = centerId;
            batch.volume = volume;
            batch.grade = grade;
            batch.received = document.getElementById('batchReceived').value;
            batch.notes = document.getElementById('batchNotes').value.trim();

            const center = chillingCenters.find(c => c.id === centerId);
            if (center) {
                if (oldGrade === 'Accepted' && grade !== 'Accepted') {
                    center.stock = Math.max(0, (center.stock || 0) - oldVolume);
                } else if (grade === 'Accepted') {
                    center.stock = (center.stock || 0) - (oldGrade === 'Accepted' ? oldVolume : 0) + volume;
                }
                console.log(`Updated batch ${id}, updated stock for ${center.id} to ${center.stock}`);
            }
        }
    } else {
        const newBatch = {
            id,
            source: document.getElementById('batchSource').value.trim(),
            centerId,
            volume,
            grade,
            received: document.getElementById('batchReceived').value,
            notes: document.getElementById('batchNotes').value.trim()
        };
        receptionBatches.push(newBatch);
        if (grade === 'Accepted') {
            const center = chillingCenters.find(c => c.id === centerId);
            if (center) {
                center.stock = (center.stock || 0) + volume;
                console.log(`Added batch ${id}, updated stock for ${center.id} to ${center.stock}`);
            }
        }
    }
    renderReception();
    renderChilling();
});

setupForm('chillingForm', validateChillingForm, () => {
    const id = document.getElementById('centerId').value.trim();
    const capacity = parseInt(document.getElementById('centerCapacity').value);
    const temp = parseFloat(document.getElementById('centerTemp').value);

    if (editMode.active && editMode.section === 'chilling' && editMode.id === id) {
        const center = chillingCenters.find(c => c.id === id);
        if (center) {
            center.name = document.getElementById('centerName').value.trim();
            center.location = document.getElementById('centerLocation').value.trim();
            center.capacity = capacity;
            center.temp = temp;
            center.status = document.getElementById('centerStatus').value;
            console.log(`Updated center ${id}`);
        }
    } else {
        chillingCenters.push({
            id,
            name: document.getElementById('centerName').value.trim(),
            location: document.getElementById('centerLocation').value.trim(),
            capacity,
            stock: 0,
            temp,
            status: document.getElementById('centerStatus').value
        });
    }
    renderChilling();
});

setupForm('dispatchForm', validateDispatchForm, () => {
    const id = document.getElementById('dispatchId').value.trim();
    const centerId = document.getElementById('dispatchCenterId').value.trim();
    const quantity = parseFloat(document.getElementById('dispatchQuantity').value);

    const center = chillingCenters.find(c => c.id === centerId);
    if (editMode.active && editMode.section === 'dispatch' && editMode.id === id) {
        const dispatch = dispatchRecords.find(d => d.id === id);
        if (dispatch) {
            const oldQuantity = dispatch.quantity;
            dispatch.centerId = centerId;
            dispatch.quantity = quantity;
            dispatch.transport = document.getElementById('dispatchTransport').value;
            dispatch.destination = document.getElementById('dispatchDestination').value.trim();
            dispatch.dispatchTime = document.getElementById('dispatchTime').value;
            dispatch.sanitization = document.getElementById('dispatchSanitization').value;
            dispatch.notes = document.getElementById('dispatchNotes').value.trim();
            if (center) {
                center.stock = (center.stock || 0) + oldQuantity - quantity;
                console.log(`Updated dispatch ${id}, updated stock for ${center.id} to ${center.stock}`);
            }
        }
    } else {
        center.stock = (center.stock || 0) - quantity;
        dispatchRecords.push({
            id,
            centerId,
            quantity,
            transport: document.getElementById('dispatchTransport').value,
            destination: document.getElementById('dispatchDestination').value.trim(),
            dispatchTime: document.getElementById('dispatchTime').value,
            sanitization: document.getElementById('dispatchSanitization').value,
            notes: document.getElementById('dispatchNotes').value.trim()
        });
        console.log(`Dispatched ${id}, updated stock for ${center.id} to ${center.stock}`);
    }
    renderDispatch();
    renderChilling();
});

setupForm('samplingForm', validateSamplingForm, () => {
    const id = document.getElementById('sampleId').value.trim();
    const fat = parseFloat(document.getElementById('sampleFat').value);
    const microbial = parseInt(document.getElementById('sampleMicrobial').value);

    if (editMode.active && editMode.section === 'sampling' && editMode.id === id) {
        const sample = testResults.find(t => t.id === id);
        if (sample) {
            sample.stage = document.getElementById('sampleStage').value;
            sample.reference = document.getElementById('sampleReference').value.trim();
            sample.grade = document.getElementById('sampleGrade').value;
            sample.fat = fat;
            sample.microbial = microbial;
            sample.testDate = document.getElementById('sampleDate').value;
            sample.notes = document.getElementById('sampleNotes').value.trim();
            console.log(`Updated sample ${id}`);
        }
    } else {
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
    }
    renderSampling();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateCenterDropdown();
    renderReception();
    renderChilling();
    renderDispatch();
    renderSampling();
});
// Flag to prevent multiple initializations
let isInitialized = false;

function initProcessingPlants() {
  if (isInitialized) {
    console.log('initProcessingPlants already called, skipping re-initialization.');
    return;
  }
  isInitialized = true;
  console.log('Initializing processing plants at', new Date().toLocaleString());

  let productionLogs = [
    { id: 'BATCH-001', stage: 'reception', volume: 5000, status: 'Completed', date: '2025-07-03T08:00' },
    { id: 'BATCH-002', stage: 'pasteurization', volume: 4800, status: 'In Progress', date: '2025-07-03T10:00' }
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
      if (!window.Chart) {
        console.error('Chart.js not loaded. Quality Metrics chart will not render.');
        return;
      }
      const canvas = document.getElementById('qualityMetricsChart');
      if (!canvas) {
        console.error('Quality Metrics chart canvas not found.');
        return;
      }
      // Destroy existing chart if it exists
      if (qualityMetricsChart) {
        console.log('Destroying existing Chart.js instance for qualityMetricsChart.');
        qualityMetricsChart.destroy();
      }
      qualityMetricsChart = new Chart(canvas.getContext('2d'), {
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
      console.log('Quality Metrics chart initialized successfully.');
    } catch (e) {
      console.error('Error initializing chart:', e);
    }
  }

  function updateOverview() {
    try {
      const dailyOutput = productionLogs
        .filter(log => log.status === 'Completed' && new Date(log.date).toLocaleDateString() === new Date().toLocaleDateString())
        .reduce((sum, log) => sum + log.volume, 0);
      const uptime = equipmentStatus.filter(e => e.status === 'running').length / equipmentStatus.length * 100;
      const defectRate = productionLogs.length ? (productionLogs.filter(log => log.status === 'Failed').length / productionLogs.length * 100).toFixed(1) : 0;
      const activeTasks = maintenanceTasks.filter(task => task.status !== 'done').length;

      const dailyOutputEl = document.getElementById('dailyOutput');
      const uptimeEl = document.getElementById('uptime');
      const defectRateEl = document.getElementById('defectRate');
      const activeTasksEl = document.getElementById('activeTasks');

      if (dailyOutputEl) dailyOutputEl.textContent = dailyOutput.toLocaleString() + ' L';
      if (uptimeEl) uptimeEl.textContent = uptime.toFixed(1) + '%';
      if (defectRateEl) defectRateEl.textContent = defectRate + '%';
      if (activeTasksEl) activeTasksEl.textContent = activeTasks;

      document.querySelectorAll('#processing-content .overview-card').forEach(card => {
        card.classList.add('updated');
        setTimeout(() => card.classList.remove('updated'), 500);
      });
    } catch (e) {
      console.error('Error updating overview:', e);
    }
  }

  function renderProductionLogs() {
    try {
      const tableBody = document.getElementById('productionLogsBody');
      if (!tableBody) {
        console.error('Production logs table body not found.');
        return;
      }
      const filterText = document.getElementById('logFilter')?.value.toLowerCase() || '';
      const stageFilter = document.getElementById('stageFilter')?.value || 'all';
      const filteredLogs = productionLogs.filter(log =>
        log.id.toLowerCase().includes(filterText) &&
        (stageFilter === 'all' || log.stage === stageFilter)
      );

      tableBody.innerHTML = filteredLogs
        .map(log => `
          <tr>
            <td>${log.id}</td>
            <td>${log.stage.charAt(0).toUpperCase() + log.stage.slice(1)}</td>
            <td>${log.volume.toFixed(1)}</td>
            <td><span class="status ${log.status.replace(' ', '-')}" style="color: var(--status-${log.status.replace(' ', '-')});">${log.status}</span></td>
            <td>${new Date(log.date).toLocaleString()}</td>
            <td>
              <span class="edit-icon edit-log" data-id="${log.id}" aria-label="Edit log ${log.id}" style="cursor: pointer; margin-right: 10px;">✎</span>
              <span class="delete-icon delete-log" data-id="${log.id}" aria-label="Delete log ${log.id}" style="cursor: pointer;">🗑</span>
            </td>
          </tr>
        `).join('');
      updateOverview();
    } catch (e) {
      console.error('Error rendering production logs:', e);
      const tableBody = document.getElementById('productionLogsBody');
      if (tableBody) tableBody.innerHTML = '<tr><td colspan="6">Error loading logs</td></tr>';
    }
  }

  function renderMaintenanceTasks() {
    try {
      ['todo', 'done'].forEach(status => {
        const column = document.getElementById(`${status}Tasks`);
        if (!column) {
          console.error(`Kanban column for ${status} not found.`);
          return;
        }
        const tasks = maintenanceTasks.filter(task => task.status === status);
        column.innerHTML = tasks
          .map(task => `
            <div class="kanban-task" draggable="true" data-id="${task.id}">
              <div class="actions">
                <span class="edit-icon edit-task" data-id="${task.id}" aria-label="Edit task ${task.id}" style="cursor: pointer; margin-right: 10px;">✎</span>
                <span class="delete-icon delete-task" data-id="${task.id}" aria-label="Delete task ${task.id}" style="cursor: pointer;">🗑</span>
              </div>
              <strong>${task.id}</strong>: ${task.equipment}<br>${task.description}
            </div>
          `).join('');
      });
      setupKanbanDragDrop();
      updateOverview();
    } catch (e) {
      console.error('Error rendering maintenance tasks:', e);
    }
  }

  function renderEquipmentStatus() {
    try {
      const equipmentGrid = document.querySelector('#processing-content .equipment-grid');
      if (!equipmentGrid) {
        console.error('Equipment grid not found.');
        return;
      }
      equipmentGrid.innerHTML = equipmentStatus
        .map(equipment => `
          <div class="equipment-card" data-equipment="${equipment.name}">
            <div class="actions">
              <span class="edit-icon edit-equipment" data-name="${equipment.name}" aria-label="Edit ${equipment.name} status" style="cursor: pointer;">✎</span>
            </div>
            <h3>${equipment.name}</h3>
            <div class="status ${equipment.status}">${equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}</div>
          </div>
        `).join('');
      updateOverview();
      updateStatusSnapshot();
    } catch (e) {
      console.error('Error rendering equipment status:', e);
    }
  }

  function updateStatusSnapshot() {
    try {
      const snapshotContainer = document.querySelector('#processing-content .status-snapshot');
      if (!snapshotContainer) {
        console.error('Status snapshot container not found.');
        return;
      }
      snapshotContainer.innerHTML = '<h2>Equipment Status Snapshot</h2>' + equipmentStatus
        .map(equipment => `
          <div class="snapshot-card">
            <div class="snapshot-card-inner">
              <div class="snapshot-front ${equipment.status}">
                <h3>${equipment.name}</h3>
                <p>${equipment.status === 'running' ? 'Running smoothly' : equipment.status === 'maintenance' ? 'Under maintenance' : 'Currently offline'}</p>
              </div>
              <div class="snapshot-back">
                <p>${equipment.status === 'running' ? 'Check logs for details' : equipment.status === 'maintenance' ? 'Review task status' : 'Inspect for issues'}</p>
              </div>
            </div>
          </div>
        `).join('');
    } catch (e) {
      console.error('Error updating status snapshot:', e);
    }
  }

  function setupKanbanDragDrop() {
    try {
      document.querySelectorAll('#processing-content .kanban-task').forEach(task => {
        task.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', e.target.dataset.id);
        });
      });

      document.querySelectorAll('#processing-content .kanban-column').forEach(column => {
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

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function clearErrors(formId) {
    const errors = document.querySelectorAll(`#${formId} .error-message`);
    if (errors) {
      errors.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
      });
    }
  }

  function validateLogForm(isEdit = false) {
    clearErrors(isEdit ? 'editLogForm' : 'logForm');
    let isValid = true;

    const batchIdInput = document.getElementById(isEdit ? 'editLogBatchId' : 'logBatchId');
    if (!batchIdInput) {
      console.error(`Batch ID input not found for ${isEdit ? 'editLogForm' : 'logForm'}.`);
      return false;
    }
    const batchId = batchIdInput.value.trim();
    if (!/^[A-Z0-9-]{6,}$/.test(batchId)) {
      showError(isEdit ? 'editLogBatchId' : 'logBatchId', 'Batch ID must be at least 6 characters, alphanumeric with dashes.');
      isValid = false;
    } else {
      const existingLog = productionLogs.find(log => log.id === batchId);
      const currentLogId = isEdit ? batchIdInput.dataset.originalId : null;
      if (existingLog && (!isEdit || existingLog.id !== currentLogId)) {
        showError(isEdit ? 'editLogBatchId' : 'logBatchId', 'Batch ID already exists.');
        isValid = false;
      }
    }

    const volumeInput = document.getElementById(isEdit ? 'editLogVolume' : 'logVolume');
    if (!volumeInput) {
      console.error(`Volume input not found for ${isEdit ? 'editLogForm' : 'logForm'}.`);
      isValid = false;
    } else {
      const volume = parseFloat(volumeInput.value);
      if (isNaN(volume) || volume <= 0) {
        showError(isEdit ? 'editLogVolume' : 'logVolume', 'Volume must be a positive number.');
        isValid = false;
      }
    }

    const dateInput = document.getElementById(isEdit ? 'editLogDate' : 'logDate');
    if (!dateInput) {
      console.error(`Date input not found for ${isEdit ? 'editLogForm' : 'logForm'}.`);
      isValid = false;
    } else {
      const date = dateInput.value;
      if (!date || new Date(date) > new Date()) {
        showError(isEdit ? 'editLogDate' : 'logDate', 'Date cannot be in the future.');
        isValid = false;
      }
    }

    const stageInput = document.getElementById(isEdit ? 'editLogStage' : 'logStage');
    if (!stageInput) {
      console.error(`Stage input not found for ${isEdit ? 'editLogForm' : 'logForm'}.`);
      isValid = false;
    } else {
      const stage = stageInput.value;
      if (!['reception', 'homogenization', 'pasteurization', 'packaging'].includes(stage)) {
        showError(isEdit ? 'editLogStage' : 'logStage', 'Please select a valid stage.');
        isValid = false;
      }
    }

    const statusInput = document.getElementById(isEdit ? 'editLogStatus' : 'logStatus');
    if (!statusInput) {
      console.error(`Status input not found for ${isEdit ? 'editLogForm' : 'logForm'}.`);
      isValid = false;
    } else {
      const status = statusInput.value;
      if (!['Completed', 'In Progress', 'Failed'].includes(status)) {
        showError(isEdit ? 'editLogStatus' : 'logStatus', 'Please select a valid status.');
        isValid = false;
      }
    }

    return isValid;
  }

  function validateTaskForm() {
    clearErrors('taskForm');
    let isValid = true;

    const taskIdInput = document.getElementById('taskId');
    if (!taskIdInput) {
      console.error('Task ID input not found.');
      return false;
    }
    const taskId = taskIdInput.value.trim();
    if (!/^[A-Z0-9-]{6,}$/.test(taskId)) {
      showError('taskId', 'Task ID must be at least 6 characters, alphanumeric with dashes.');
      isValid = false;
    } else {
      const existingTask = maintenanceTasks.find(task => task.id === taskId);
      const isEditing = document.getElementById('taskModalTitle')?.textContent.includes('Edit');
      if (existingTask && !isEditing) {
        showError('taskId', 'Task ID already exists.');
        isValid = false;
      }
    }

    const equipmentInput = document.getElementById('taskEquipment');
    if (!equipmentInput) {
      console.error('Task equipment input not found.');
      isValid = false;
    } else {
      const equipment = equipmentInput.value.trim();
      if (!/^[A-Za-z0-9\s-]{5,}$/.test(equipment)) {
        showError('taskEquipment', 'Equipment name must be at least 5 characters, alphanumeric with spaces and dashes.');
        isValid = false;
      }
    }

    const descriptionInput = document.getElementById('taskDescription');
    if (!descriptionInput) {
      console.error('Task description input not found.');
      isValid = false;
    } else {
      const description = descriptionInput.value.trim();
      if (!/^[A-Za-z0-9\s-]{10,250}$/.test(description)) {
        showError('taskDescription', 'Description must be 10-250 characters, alphanumeric with spaces and dashes.');
        isValid = false;
      }
    }

    const statusInput = document.getElementById('taskStatus');
    if (!statusInput) {
      console.error('Task status input not found.');
      isValid = false;
    } else {
      const status = statusInput.value;
      if (!['todo', 'done'].includes(status)) {
        showError('taskStatus', 'Please select a valid status.');
        isValid = false;
      }
    }

    return isValid;
  }

  function validateEquipmentForm() {
    clearErrors('editEquipmentForm');
    let isValid = true;

    const nameInput = document.getElementById('editEquipmentName');
    if (!nameInput) {
      console.error('Equipment name input not found.');
      return false;
    }
    const name = nameInput.value.trim();
    if (!/^[A-Za-z0-9\s-]{5,}$/.test(name)) {
      showError('editEquipmentName', 'Equipment name must be at least 5 characters, alphanumeric with spaces and dashes.');
      isValid = false;
    }

    const statusInput = document.getElementById('editEquipmentStatus');
    if (!statusInput) {
      console.error('Equipment status input not found.');
      isValid = false;
    } else {
      const status = statusInput.value;
      if (!['running', 'maintenance', 'offline'].includes(status)) {
        showError('editEquipmentStatus', 'Please select a valid status.');
        isValid = false;
      }
    }

    return isValid;
  }

  function setupForm(formId, submitHandler) {
    try {
      const form = document.getElementById(formId);
      if (!form) {
        console.error(`Form with ID ${formId} not found.`);
        return;
      }
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (formId === 'logForm' && !validateLogForm()) return;
        if (formId === 'editLogForm' && !validateLogForm(true)) return;
        if (formId === 'taskForm' && !validateTaskForm()) return;
        if (formId === 'editEquipmentForm' && !validateEquipmentForm()) return;
        submitHandler();
        form.reset();
        clearErrors(formId);
        const modal = document.getElementById(formId.replace('Form', 'Modal'));
        if (modal) modal.style.display = 'none';
        showToast('Action completed successfully!');
      });
    } catch (e) {
      console.error(`Error setting up form ${formId}:`, e);
    }
  }

  function showToast(message) {
    try {
      const toast = document.createElement('div');
      toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--success); color: white; padding: 10px 20px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (e) {
      console.error('Error showing toast:', e);
    }
  }

  function resetPanelStyles() {
    try {
      const panels = document.querySelectorAll('#processing-content .panel-content');
      if (!panels.length) {
        console.error('No panel content elements found for reset.');
      }
      panels.forEach(content => {
        content.style.display = 'none'; // Force reset
        content.classList.remove('active');
      });
      const chevrons = document.querySelectorAll('#processing-content .chevron');
      if (!chevrons.length) {
        console.error('No chevron elements found for reset.');
      }
      chevrons.forEach(chevron => {
        chevron.textContent = '▼';
        chevron.classList.remove('active');
      });
      console.log(`Reset ${panels.length} panels and ${chevrons.length} chevrons.`);
    } catch (e) {
      console.error('Error resetting panel styles:', e);
    }
  }

  function setupPanelToggles() {
    try {
      const processingContent = document.getElementById('processing-content');
      if (!processingContent) {
        console.error('Processing content container (#processing-content) not found.');
        return;
      }
      const headers = document.querySelectorAll('#processing-content .panel-header');
      if (!headers.length) {
        console.error('No panel headers found with selector #processing-content .panel-header');
        return;
      }
      console.log(`Found ${headers.length} panel headers for toggle setup.`);

      // Direct event listeners on headers
      headers.forEach((header, index) => {
        // Remove any existing listeners to prevent duplicates
        header.removeEventListener('click', handlePanelClick);
        header.addEventListener('click', handlePanelClick);
      });

      // Event delegation on #processing-content
      processingContent.removeEventListener('click', handleDelegatedPanelClick);
      processingContent.addEventListener('click', handleDelegatedPanelClick);

      function handlePanelClick(e) {
        e.stopPropagation();
        const header = e.currentTarget;
        const content = header.nextElementSibling;
        const chevron = header.querySelector('.chevron');
        const panelName = header.querySelector('h2')?.textContent || `Panel ${index + 1}`;
        if (content && chevron) {
          const isActive = content.classList.contains('active');
          content.classList.toggle('active', !isActive);
          content.style.display = isActive ? 'none' : 'block'; // Force style
          chevron.classList.toggle('active', !isActive);
          chevron.textContent = isActive ? '▼' : '▲';
          console.log(`[Direct] Panel "${panelName}" toggled to ${isActive ? 'closed' : 'open'} (display: ${content.style.display})`);
        } else {
          console.error(`[Direct] Panel content or chevron not found for "${panelName}"`);
        }
      }

      function handleDelegatedPanelClick(e) {
        const header = e.target.closest('#processing-content .panel-header');
        if (header) {
          e.stopPropagation();
          const content = header.nextElementSibling;
          const chevron = header.querySelector('.chevron');
          const panelName = header.querySelector('h2')?.textContent || 'Unknown';
          if (content && chevron) {
            const isActive = content.classList.contains('active');
            content.classList.toggle('active', !isActive);
            content.style.display = isActive ? 'none' : 'block';
            chevron.classList.toggle('active', !isActive);
            chevron.textContent = isActive ? '▼' : '▲';
            console.log(`[Delegated] Panel "${panelName}" toggled to ${isActive ? 'closed' : 'open'} (display: ${content.style.display})`);
          } else {
            console.error(`[Delegated] Panel content or chevron not found for "${panelName}"`);
          }
        }
      }
    } catch (e) {
      console.error('Error setting up panel toggles:', e);
    }
  }

  setupForm('logForm', () => {
    try {
      const id = document.getElementById('logBatchId').value.trim();
      const volume = parseFloat(document.getElementById('logVolume').value);
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
      showToast('Error adding log.');
    }
  });

  setupForm('taskForm', () => {
    try {
      const id = document.getElementById('taskId').value.trim();
      const taskIndex = maintenanceTasks.findIndex(task => task.id === id);
      const task = {
        id,
        equipment: document.getElementById('taskEquipment').value.trim(),
        description: document.getElementById('taskDescription').value.trim(),
        status: document.getElementById('taskStatus').value
      };
      if (taskIndex !== -1) {
        maintenanceTasks[taskIndex] = task;
      } else {
        maintenanceTasks.push(task);
      }
      renderMaintenanceTasks();
    } catch (e) {
      console.error('Error adding/editing maintenance task:', e);
      showToast('Error adding/editing task.');
    }
  });

  setupForm('editLogForm', () => {
    try {
      const id = document.getElementById('editLogBatchId').value.trim();
      const volume = parseFloat(document.getElementById('editLogVolume').value);
      const logIndex = productionLogs.findIndex(log => log.id === document.getElementById('editLogBatchId').dataset.originalId);
      if (logIndex !== -1) {
        productionLogs[logIndex] = {
          id,
          stage: document.getElementById('editLogStage').value,
          volume,
          status: document.getElementById('editLogStatus').value,
          date: document.getElementById('editLogDate').value
        };
        renderProductionLogs();
      }
    } catch (e) {
      console.error('Error editing production log:', e);
      showToast('Error editing log.');
    }
  });

  setupForm('editEquipmentForm', () => {
    try {
      const name = document.getElementById('editEquipmentName').value.trim();
      const newStatus = document.getElementById('editEquipmentStatus').value;
      const equipmentIndex = equipmentStatus.findIndex(e => e.name === document.getElementById('editEquipmentName').dataset.originalName);
      if (equipmentIndex !== -1) {
        equipmentStatus[equipmentIndex] = { name, status: newStatus };
        renderEquipmentStatus();
        updateOverview();
        showToast('Equipment status updated!');
      }
    } catch (e) {
      console.error('Error editing equipment status:', e);
      showToast('Error editing equipment status.');
    }
  });

  const logFilter = document.getElementById('logFilter');
  if (logFilter) logFilter.addEventListener('input', renderProductionLogs);

  const stageFilter = document.getElementById('stageFilter');
  if (stageFilter) stageFilter.addEventListener('change', renderProductionLogs);

  const addLogBtn = document.getElementById('addLogBtn');
  if (addLogBtn) {
    addLogBtn.addEventListener('click', () => {
      clearErrors('logForm');
      const logModal = document.getElementById('logModal');
      if (logModal) logModal.style.display = 'block';
    });
  }

  const addTaskBtn = document.getElementById('addTaskBtn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      clearErrors('taskForm');
      const taskIdInput = document.getElementById('taskId');
      const taskEquipmentInput = document.getElementById('taskEquipment');
      const taskDescriptionInput = document.getElementById('taskDescription');
      const taskStatusInput = document.getElementById('taskStatus');
      const taskModalTitle = document.getElementById('taskModalTitle');
      const taskModal = document.getElementById('taskModal');
      if (taskIdInput) taskIdInput.value = '';
      if (taskEquipmentInput) taskEquipmentInput.value = '';
      if (taskDescriptionInput) taskDescriptionInput.value = '';
      if (taskStatusInput) taskStatusInput.value = 'todo';
      if (taskModalTitle) taskModalTitle.textContent = 'Add Maintenance Task';
      if (taskModal) taskModal.style.display = 'block';
    });
  }

  document.querySelectorAll('#processing-content .modal .close').forEach(close => {
    close.addEventListener('click', () => {
      const form = close.closest('.modal').querySelector('form');
      if (form) clearErrors(form.id);
      close.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      const form = e.target.querySelector('form');
      if (form) clearErrors(form.id);
      e.target.style.display = 'none';
    }
  });

  const productionLogsBody = document.getElementById('productionLogsBody');
  if (productionLogsBody) {
    productionLogsBody.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('delete-log')) {
        const id = target.dataset.id;
        productionLogs = productionLogs.filter(log => log.id !== id);
        renderProductionLogs();
        showToast('Log deleted successfully!');
      } else if (target.classList.contains('edit-log')) {
        const id = target.dataset.id;
        const log = productionLogs.find(log => log.id === id);
        if (log) {
          clearErrors('editLogForm');
          const editLogBatchId = document.getElementById('editLogBatchId');
          const editLogStage = document.getElementById('editLogStage');
          const editLogVolume = document.getElementById('editLogVolume');
          const editLogStatus = document.getElementById('editLogStatus');
          const editLogDate = document.getElementById('editLogDate');
          const editLogModal = document.getElementById('editLogModal');
          if (editLogBatchId) {
            editLogBatchId.value = log.id;
            editLogBatchId.dataset.originalId = log.id;
          }
          if (editLogStage) editLogStage.value = log.stage;
          if (editLogVolume) editLogVolume.value = log.volume;
          if (editLogStatus) editLogStatus.value = log.status;
          if (editLogDate) editLogDate.value = log.date;
          if (editLogModal) editLogModal.style.display = 'block';
        }
      }
    });
  }

  const kanbanBoard = document.querySelector('#processing-content .kanban-board');
  if (kanbanBoard) {
    kanbanBoard.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('delete-task')) {
        const id = target.dataset.id;
        maintenanceTasks = maintenanceTasks.filter(task => task.id !== id);
        renderMaintenanceTasks();
        showToast('Task deleted successfully!');
      } else if (target.classList.contains('edit-task')) {
        const id = target.dataset.id;
        const task = maintenanceTasks.find(task => task.id === id);
        if (task) {
          clearErrors('taskForm');
          const taskIdInput = document.getElementById('taskId');
          const taskEquipmentInput = document.getElementById('taskEquipment');
          const taskDescriptionInput = document.getElementById('taskDescription');
          const taskStatusInput = document.getElementById('taskStatus');
          const taskModalTitle = document.getElementById('taskModalTitle');
          const taskModal = document.getElementById('taskModal');
          if (taskIdInput) taskIdInput.value = task.id;
          if (taskEquipmentInput) taskEquipmentInput.value = task.equipment;
          if (taskDescriptionInput) taskDescriptionInput.value = task.description;
          if (taskStatusInput) taskStatusInput.value = task.status;
          if (taskModalTitle) taskModalTitle.textContent = 'Edit Maintenance Task';
          if (taskModal) taskModal.style.display = 'block';
        }
      }
    });
  }

  const equipmentGrid = document.querySelector('#processing-content .equipment-grid');
  if (equipmentGrid) {
    equipmentGrid.addEventListener('click', e => {
      if (e.target.classList.contains('edit-equipment')) {
        const name = e.target.dataset.name;
        const equipment = equipmentStatus.find(e => e.name === name);
        if (equipment) {
          clearErrors('editEquipmentForm');
          const editEquipmentName = document.getElementById('editEquipmentName');
          const editEquipmentStatus = document.getElementById('editEquipmentStatus');
          const editEquipmentModal = document.getElementById('editEquipmentModal');
          if (editEquipmentName) {
            editEquipmentName.value = equipment.name;
            editEquipmentName.dataset.originalName = equipment.name;
          }
          if (editEquipmentStatus) editEquipmentStatus.value = equipment.status;
          if (editEquipmentModal) editEquipmentModal.style.display = 'block';
        }
      }
    });
  }

  document.querySelectorAll('#processing-content .overview-card').forEach(card => {
    card.addEventListener('click', () => {
      const metric = card.dataset.metric;
      if (metric === 'dailyOutput') {
        const addLogBtn = document.getElementById('addLogBtn');
        if (addLogBtn) addLogBtn.click();
      } else if (metric === 'activeTasks') {
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) addTaskBtn.click();
      }
    });
  });

  // Initialize panels and setup toggles
  resetPanelStyles();
  initChart();
  updateOverview();
  renderProductionLogs();
  renderMaintenanceTasks();
  renderEquipmentStatus();
  setupPanelToggles(); // Run last to avoid interference from other errors
}

// Ensure initialization only after DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing processing plants.');
    initProcessingPlants();
  });
} else {
  console.log('DOM already loaded, initializing processing plants.');
  initProcessingPlants();
}
// Initialize Quality Control
(function initDashboard() {
  let testResults = [
    { id: 'TEST-001', stage: 'Reception', batch: 'BATCH-001', fat: 4.2, tpc: 5000 },
    { id: 'TEST-002', stage: 'Reception', batch: 'BATCH-002', fat: 3.8, tpc: 4500 },
    { id: 'TEST-003', stage: 'Reception', batch: 'BATCH-003', fat: 4.0, tpc: 5200 },
    { id: 'TEST-001', stage: 'Pasteurization', batch: 'BATCH-001', phosphatase: 'Pass', notes: 'CIP validated' },
    { id: 'TEST-002', stage: 'Pasteurization', batch: 'BATCH-002', phosphatase: 'Fail', notes: 'Retest required' },
    { id: 'TEST-003', stage: 'Pasteurization', batch: 'BATCH-003', phosphatase: 'Pass', notes: 'All clear' },
    { id: 'TEST-001', stage: 'Cleaning', batch: 'BATCH-001', tpc: 150, notes: 'Sanitation done' },
    { id: 'TEST-002', stage: 'Cleaning', batch: 'BATCH-002', tpc: 0, notes: 'Surface clean' },
    { id: 'TEST-003', stage: 'Cleaning', batch: 'BATCH-003', tpc: 250, notes: 'Equipment OK' },
    { id: 'TEST-001', stage: 'Packaging', batch: 'BATCH-001', status: 'Pass', notes: 'Label checked' },
    { id: 'TEST-002', stage: 'Packaging', batch: 'BATCH-002', status: 'Fail', notes: 'Seal issue' },
    { id: 'TEST-003', stage: 'Packaging', batch: 'BATCH-003', status: 'Pass', notes: 'All good' },
    { id: 'TEST-001', stage: 'Traceability', batch: 'BATCH-001', status: 'Tracked', notes: 'Batch OK' },
    { id: 'TEST-002', stage: 'Traceability', batch: 'BATCH-002', status: 'Recall', notes: 'Issue found' },
    { id: 'TEST-003', stage: 'Traceability', batch: 'BATCH-003', status: 'Tracked', notes: 'Trace complete' }
  ];

  function validateId(id) {
    if (!id) return 'Sample/Test ID is required.';
    return /^TEST-\d+$/.test(id) ? '' : 'Sample/Test ID must be in format TEST- followed by a number (e.g., TEST-001).';
  }

  function validateBatch(batch) {
    if (!batch) return 'Batch ID is required.';
    return /^BATCH-\d+$/.test(batch) ? '' : 'Batch ID must be in format BATCH- followed by a number (e.g., BATCH-001).';
  }

  function validateNotes(notes) {
    if (!notes) return 'Notes are required.';
    if (notes.length < 5 || notes.length > 19) return 'Notes must be 5–19 characters long.';
    if (/^\d+$/.test(notes)) return 'Notes must not contain only numbers.';
    return '';
  }

  function validateNumber(value, fieldName, stage) {
    if (!value) return `${fieldName} is required.`;
    const num = parseFloat(value);
    if (isNaN(num)) return `${fieldName} must be a valid number.`;
    if (stage === 'Reception' && fieldName === 'Total Plate Count') {
      if (num < 100) return 'TPC must be at least 100 CFU/mL.';
      if (num > 100000) return 'TPC must not exceed 100,000 CFU/mL.';
    } else if (stage === 'Cleaning' && fieldName === 'Total Plate Count') {
      if (num < 0) return 'TPC must be non-negative.';
      if (num > 200) return 'TPC must not exceed 200 CFU/mL.';
    } else if (fieldName === 'Milk Fat Content') {
      if (num <= 0) return 'Milk Fat Content must be a number greater than 0.';
    }
    return '';
  }

  function validateSelect(value, fieldName) {
    return value ? '' : `Please select a valid ${fieldName}.`;
  }

  function validateInputHeight(input, inputId) {
    const style = window.getComputedStyle(input);
    const minHeight = parseFloat(style.minHeight);
    const maxHeight = parseFloat(style.maxHeight);
    const actualHeight = input.offsetHeight;
   
    if (isNaN(minHeight) || isNaN(maxHeight)) {
      return `Height validation failed for ${inputId}: min-height or max-height not set.`;
    }
    if (actualHeight < minHeight) {
      return `Input height for ${inputId} is too small (min: ${minHeight}px).`;
    }
    if (actualHeight > maxHeight) {
      return `Input height for ${inputId} is too large (max: ${maxHeight}px).`;
    }
    return '';
  }

  function clearErrors(form) {
    if (!form) {
      console.error('Form element is null');
      return;
    }
    form.querySelectorAll('.error-message').forEach(span => {
      span.textContent = '';
    });
  }

  function displayError(inputId, errorMessage) {
    const input = document.getElementById(inputId);
    if (!input) {
      console.error(`Input element not found: ${inputId}`);
      return;
    }
    const errorSpan = input.parentElement.querySelector('.error-message');
    if (errorSpan) {
      errorSpan.textContent = errorMessage;
    } else {
      console.error(`Error span not found for input: ${inputId}`);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  document.querySelectorAll('#quality-content .nav-step').forEach(step => {
    step.addEventListener('click', () => {
      document.querySelectorAll('#quality-content .nav-step').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('#quality-content .stage-card').forEach(c => c.classList.remove('active'));
      step.classList.add('active');
      const stageCard = document.getElementById(`${step.dataset.stage.toLowerCase()}Card`);
      if (stageCard) {
        stageCard.classList.add('active');
      } else {
        console.error(`Stage card not found: ${step.dataset.stage.toLowerCase()}Card`);
      }
      const editModal = document.getElementById('editModal');
      if (editModal) {
        editModal.classList.remove('active');
      }
    });
  });

  function updateCardContent(stage) {
    const stageTests = testResults.filter(t => t.stage === stage);
    const tableContainer = document.getElementById(`${stage.toLowerCase()}Table`);
    const searchInput = document.getElementById(`${stage.toLowerCase()}Search`);
    const searchValue = searchInput ? searchInput.value.trim() : '';

    if (!tableContainer) {
      console.error(`Table container not found for stage: ${stage}`);
      return;
    }

    const wasFocused = document.activeElement === searchInput;

    const filteredTests = searchValue
      ? stageTests.filter(t =>
          t.id.toLowerCase().includes(searchValue.toLowerCase()) ||
          t.batch.toLowerCase().includes(searchValue.toLowerCase())
        )
      : stageTests;

    tableContainer.innerHTML = `
      <table class="records-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Batch</th>
            ${stage === 'Reception' ? '<th>Fat (%)</th><th>TPC (CFU/mL)</th>' : ''}
            ${stage === 'Pasteurization' ? '<th>Phosphatase</th><th>Notes</th>' : ''}
            ${stage === 'Cleaning' ? '<th>TPC (CFU/mL)</th><th>Notes</th>' : ''}
            ${stage === 'Packaging' ? '<th>Status</th><th>Notes</th>' : ''}
            ${stage === 'Traceability' ? '<th>Status</th><th>Notes</th>' : ''}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filteredTests.map(t => `
            <tr data-id="${t.id}">
              <td>${t.id}</td>
              <td>${t.batch}</td>
              ${stage === 'Reception' ? `
                <td>${t.fat ? t.fat.toFixed(1) : ''}</td>
                <td>${t.tpc || t.tpc === 0 ? t.tpc : ''}</td>
              ` : ''}
              ${stage === 'Pasteurization' ? `
                <td class="${t.phosphatase?.toLowerCase() || ''}">${t.phosphatase || ''}</td>
                <td>${t.notes || ''}</td>
              ` : ''}
              ${stage === 'Cleaning' ? `
                <td>${t.tpc || t.tpc === 0 ? t.tpc : ''}</td>
                <td>${t.notes || ''}</td>
              ` : ''}
              ${stage === 'Packaging' ? `
                <td class="${t.status?.toLowerCase() || ''}">${t.status || ''}</td>
                <td>${t.notes || ''}</td>
              ` : ''}
              ${stage === 'Traceability' ? `
                <td class="${t.status?.toLowerCase() || ''}">${t.status || ''}</td>
                <td>${t.notes || ''}</td>
              ` : ''}
              <td>
                <button class="edit" data-id="${t.id}" data-stage="${stage}">Edit</button>
                <button class="delete" data-id="${t.id}" data-stage="${stage}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    if (wasFocused && searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchValue.length, searchValue.length);
    }

    try {
      if (stage === 'Reception') {
        const samples = stageTests.length;
        document.getElementById('receptionSamples').textContent = samples;
        document.getElementById('receptionTPCIssues').textContent = stageTests.filter(t => t.tpc > 100000).length;
      } else if (stage === 'Pasteurization') {
        const samples = stageTests.length;
        document.getElementById('pasteurizationSamples').textContent = samples;
        document.getElementById('pasteurizationIssues').textContent = stageTests.filter(t => t.phosphatase === 'Fail').length;
      } else if (stage === 'Cleaning') {
        const samples = stageTests.length;
        document.getElementById('cleaningSamples').textContent = samples;
        document.getElementById('cleaningIssues').textContent = stageTests.filter(t => t.tpc > 200).length;
      } else if (stage === 'Packaging') {
        const samples = stageTests.length;
        document.getElementById('packagingSamples').textContent = samples;
        document.getElementById('packagingIssues').textContent = stageTests.filter(t => t.status === 'Fail').length;
      } else if (stage === 'Traceability') {
        const samples = [...new Set(stageTests.map(t => t.batch))].length;
        document.getElementById('traceabilitySamples').textContent = samples;
        document.getElementById('traceabilityIssues').textContent = stageTests.filter(t => t.status === 'Recall').length;
      }
    } catch (error) {
      console.error(`Error updating metrics for stage ${stage}:`, error);
    }

    document.querySelectorAll(`#${stage.toLowerCase()}Table .delete`).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const btnStage = btn.dataset.stage;
        console.log(`Delete clicked: ID=${id}, Stage=${btnStage}`);
        testResults = testResults.filter(t => t.id !== id || t.stage !== btnStage);
        updateCardContent(stage);
      });
    });

    document.querySelectorAll(`#${stage.toLowerCase()}Table .edit`).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const btnStage = btn.dataset.stage;
        console.log(`Edit clicked: ID=${id}, Stage=${btnStage}`);
        const test = testResults.find(t => t.id === id && t.stage === btnStage);
        if (!test) {
          console.error(`Test not found for id: ${id} in stage: ${btnStage}`);
          return;
        }
        const modal = document.getElementById('editModal');
        if (!modal) {
          console.error('Edit modal not found');
          return;
        }
        const editFormFields = document.getElementById('editFormFields');
        if (!editFormFields) {
          console.error('Edit form fields container not found');
          return;
        }
        editFormFields.innerHTML = `
          <div class="input-group">
            <label for="editId">Sample/Test ID:</label>
            <input type="text" id="editId" value="${test.id}" placeholder="Enter sample ID (e.g., TEST-001)" required>
            <span class="error-message"></span>
          </div>
          <div class="input-group">
            <label for="editBatch">Batch ID:</label>
            <input type="text" id="editBatch" value="${test.batch}" placeholder="Enter batch ID (e.g., BATCH-001)" required>
            <span class="error-message"></span>
          </div>
          ${stage === 'Reception' ? `
            <div class="input-group">
              <label for="editFat">Milk Fat Content (%):</label>
              <input type="number" id="editFat" step="0.1" value="${test.fat || ''}" placeholder="Enter fat % (e.g., 4.0)" required>
              <span class="error-message"></span>
            </div>
            <div class="input-group">
              <label for="editTPC">Total Plate Count (CFU/mL):</label>
              <input type="number" id="editTPC" value="${test.tpc || test.tpc === 0 ? test.tpc : ''}" placeholder="Enter TPC (e.g., 5000)" required>
              <span class="error-message"></span>
            </div>
          ` : ''}
          ${stage === 'Pasteurization' ? `
            <div class="input-group">
              <label for="editPhosphatase">Phosphatase Test Result:</label>
              <select id="editPhosphatase" required>
                <option value="" disabled>Select Pass or Fail</option>
                <option value="Pass"${test.phosphatase === 'Pass' ? ' selected' : ''}>Pass</option>
                <option value="Fail"${test.phosphatase === 'Fail' ? ' selected' : ''}>Fail</option>
              </select>
              <span class="error-message"></span>
            </div>
            <div class="input-group">
              <label for="editNotes">Additional Notes:</label>
              <input type="text" id="editNotes" value="${test.notes || ''}" placeholder="Enter notes (5-19 chars, required)" required>
              <span class="error-message"></span>
            </div>
          ` : ''}
          ${stage === 'Cleaning' ? `
            <div class="input-group">
              <label for="editTPC">Total Plate Count (CFU/mL):</label>
              <input type="number" id="editTPC" value="${test.tpc || test.tpc === 0 ? test.tpc : ''}" placeholder="Enter TPC (e.g., 100)" required>
              <span class="error-message"></span>
            </div>
            <div class="input-group">
              <label for="editNotes">Additional Notes:</label>
              <input type="text" id="editNotes" value="${test.notes || ''}" placeholder="Enter notes (5-19 chars, required)" required>
              <span class="error-message"></span>
            </div>
          ` : ''}
          ${stage === 'Packaging' ? `
            <div class="input-group">
              <label for="editStatus">Packaging Status:</label>
              <select id="editStatus" required>
                <option value="" disabled>Select Pass or Fail</option>
                <option value="Pass"${test.status === 'Pass' ? ' selected' : ''}>Pass</option>
                <option value="Fail"${test.status === 'Fail' ? ' selected' : ''}>Fail</option>
              </select>
              <span class="error-message"></span>
            </div>
            <div class="input-group">
              <label for="editNotes">Additional Notes:</label>
              <input type="text" id="editNotes" value="${test.notes || ''}" placeholder="Enter notes (5-19 chars, required)" required>
              <span class="error-message"></span>
            </div>
          ` : ''}
          ${stage === 'Traceability' ? `
            <div class="input-group">
              <label for="editStatus">Traceability Status:</label>
              <select id="editStatus" required>
                <option value="" disabled>Select Tracked or Recall</option>
                <option value="Tracked"${test.status === 'Tracked' ? ' selected' : ''}>Tracked</option>
                <option value="Recall"${test.status === 'Recall' ? ' selected' : ''}>Recall</option>
              </select>
              <span class="error-message"></span>
            </div>
            <div class="input-group">
              <label for="editNotes">Additional Notes:</label>
              <input type="text" id="editNotes" value="${test.notes || ''}" placeholder="Enter notes (5-19 chars, required)" required>
              <span class="error-message"></span>
            </div>
          ` : ''}
        `;
        modal.classList.add('active');
        modal.dataset.stage = stage;
        modal.dataset.id = id;
      });
    });
  }

  document.querySelectorAll('.stage-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const stage = form.dataset.stage;
      console.log(`Form submitted for stage: ${stage}`);
      const idInput = document.getElementById(`${stage.toLowerCase()}Id`);
      const batchInput = document.getElementById(`${stage.toLowerCase()}Batch`);
      if (!idInput || !batchInput) {
        console.error(`Input elements missing for stage ${stage}: idInput=${!!idInput}, batchInput=${!!batchInput}`);
        return;
      }
      const id = idInput.value.trim();
      const batch = batchInput.value.trim();

      clearErrors(form);

      let hasError = false;

      const idError = validateId(id);
      if (idError) {
        displayError(`${stage.toLowerCase()}Id`, idError);
        hasError = true;
      }

      const batchError = validateBatch(batch);
      if (batchError) {
        displayError(`${stage.toLowerCase()}Batch`, batchError);
        hasError = true;
      }

      if (!idError && testResults.some(t => t.id === id && t.stage === stage)) {
        displayError(`${stage.toLowerCase()}Id`, `Sample/Test ID ${id} already exists in ${stage}.`);
        hasError = true;
      }

      // Validate input heights
      const inputs = form.querySelectorAll('input, select');
      inputs.forEach(input => {
        const inputId = input.id;
        const heightError = validateInputHeight(input, inputId);
        if (heightError) {
          displayError(inputId, heightError);
          hasError = true;
        }
      });

      let testData = { id, stage, batch };

      if (stage === 'Reception') {
        const fatInput = document.getElementById('receptionFat');
        const tpcInput = document.getElementById('receptionTPC');
        if (!fatInput || !tpcInput) {
          console.error('Reception inputs missing: fatInput=', !!fatInput, 'tpcInput=', !!tpcInput);
          hasError = true;
        } else {
          const fat = fatInput.value;
          const tpc = tpcInput.value;
          const fatError = validateNumber(fat, 'Milk Fat Content', stage);
          const tpcError = validateNumber(tpc, 'Total Plate Count', stage);
          if (fatError) {
            displayError('receptionFat', fatError);
            hasError = true;
          }
          if (tpcError) {
            displayError('receptionTPC', tpcError);
            hasError = true;
          }
          if (!hasError) {
            testData.fat = parseFloat(fat);
            testData.tpc = parseFloat(tpc);
          }
        }
      } else if (stage === 'Pasteurization') {
        const phosphataseInput = document.getElementById('pasteurizationPhosphatase');
        const notesInput = document.getElementById('pasteurizationNotes');
        if (!phosphataseInput || !notesInput) {
          console.error('Pasteurization inputs missing: phosphataseInput=', !!phosphataseInput, 'notesInput=', !!notesInput);
          hasError = true;
        } else {
          const phosphatase = phosphataseInput.value;
          const notes = notesInput.value.trim();
          const phosphataseError = validateSelect(phosphatase, 'Phosphatase Test Result');
          const notesError = validateNotes(notes);
          if (phosphataseError) {
            displayError('pasteurizationPhosphatase', phosphataseError);
            hasError = true;
          }
          if (notesError) {
            displayError('pasteurizationNotes', notesError);
            hasError = true;
          }
          if (!hasError) {
            testData.phosphatase = phosphatase;
            testData.notes = notes;
          }
        }
      } else if (stage === 'Cleaning') {
        const tpcInput = document.getElementById('cleaningTPC');
        const notesInput = document.getElementById('cleaningNotes');
        if (!tpcInput || !notesInput) {
          console.error('Cleaning inputs missing: tpcInput=', !!tpcInput, 'notesInput=', !!notesInput);
          hasError = true;
        } else {
          const tpc = tpcInput.value;
          const notes = notesInput.value.trim();
          const tpcError = validateNumber(tpc, 'Total Plate Count', stage);
          const notesError = validateNotes(notes);
          if (tpcError) {
            displayError('cleaningTPC', tpcError);
            hasError = true;
          }
          if (notesError) {
            displayError('cleaningNotes', notesError);
            hasError = true;
          }
          if (!hasError) {
            testData.tpc = parseFloat(tpc);
            testData.notes = notes;
          }
        }
      } else if (stage === 'Packaging') {
        const statusInput = document.getElementById('packagingStatus');
        const notesInput = document.getElementById('packagingNotes');
        if (!statusInput || !notesInput) {
          console.error('Packaging inputs missing: statusInput=', !!statusInput, 'notesInput=', !!notesInput);
          hasError = true;
        } else {
          const status = statusInput.value;
          const notes = notesInput.value.trim();
          const statusError = validateSelect(status, 'Packaging Status');
          const notesError = validateNotes(notes);
          if (statusError) {
            displayError('packagingStatus', statusError);
            hasError = true;
          }
          if (notesError) {
            displayError('packagingNotes', notesError);
            hasError = true;
          }
          if (!hasError) {
            testData.status = status;
            testData.notes = notes;
          }
        }
      } else if (stage === 'Traceability') {
        const statusInput = document.getElementById('traceabilityStatus');
        const notesInput = document.getElementById('traceabilityNotes');
        if (!statusInput || !notesInput) {
          console.error('Traceability inputs missing: statusInput=', !!statusInput, 'notesInput=', !!notesInput);
          hasError = true;
        } else {
          const status = statusInput.value;
          const notes = notesInput.value.trim();
          const statusError = validateSelect(status, 'Traceability Status');
          const notesError = validateNotes(notes);
          if (statusError) {
            displayError('traceabilityStatus', statusError);
            hasError = true;
          }
          if (notesError) {
            displayError('traceabilityNotes', notesError);
            hasError = true;
          }
          if (!hasError) {
            testData.status = status;
            testData.notes = notes;
          }
        }
      }

      if (hasError) {
        console.log(`Form submission stopped due to errors in stage: ${stage}`);
        return;
      }

      testResults.push(testData);
      updateCardContent(stage);
      clearErrors(form);
      form.reset();
      console.log(`Form submitted successfully for stage: ${stage}, testData:`, testData);
    });
  });

  document.getElementById('editForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const modal = document.getElementById('editModal');
    if (!modal) {
      console.error('Edit modal not found');
      return;
    }
    const stage = modal.dataset.stage;
    const oldId = modal.dataset.id;
    const idInput = document.getElementById('editId');
    const batchInput = document.getElementById('editBatch');
    if (!idInput || !batchInput) {
      console.error('Edit form inputs missing: idInput=', !!idInput, 'batchInput=', !!batchInput);
      return;
    }
    const id = idInput.value.trim();
    const batch = batchInput.value.trim();

    const editForm = document.getElementById('editForm');
    if (editForm) {
      clearErrors(editForm);
    }

    let hasError = false;

    const idError = validateId(id);
    if (idError) {
      displayError('editId', idError);
      hasError = true;
    }

    const batchError = validateBatch(batch);
    if (batchError) {
      displayError('editBatch', batchError);
      hasError = true;
    }

    if (!idError && id !== oldId && testResults.some(t => t.id === id && t.stage === stage)) {
      displayError('editId', `Sample/Test ID ${id} already exists in ${stage}.`);
      hasError = true;
    }

    // Validate input heights
    const inputs = editForm.querySelectorAll('input, select');
    inputs.forEach(input => {
      const inputId = input.id;
      const heightError = validateInputHeight(input, inputId);
      if (heightError) {
        displayError(inputId, heightError);
        hasError = true;
      }
    });

    const newData = { id, stage, batch };

    if (stage === 'Reception') {
      const fatInput = document.getElementById('editFat');
      const tpcInput = document.getElementById('editTPC');
      if (!fatInput || !tpcInput) {
        console.error('Reception edit inputs missing: fatInput=', !!fatInput, 'tpcInput=', !!tpcInput);
        hasError = true;
      } else {
        const fat = fatInput.value;
        const tpc = tpcInput.value;
        const fatError = validateNumber(fat, 'Milk Fat Content', stage);
        const tpcError = validateNumber(tpc, 'Total Plate Count', stage);
        if (fatError) {
          displayError('editFat', fatError);
          hasError = true;
        }
        if (tpcError) {
          displayError('editTPC', tpcError);
          hasError = true;
        }
        if (!hasError) {
          newData.fat = parseFloat(fat);
          newData.tpc = parseFloat(tpc);
        }
      }
    } else if (stage === 'Pasteurization') {
      const phosphataseInput = document.getElementById('editPhosphatase');
      const notesInput = document.getElementById('editNotes');
      if (!phosphataseInput || !notesInput) {
        console.error('Pasteurization edit inputs missing: phosphataseInput=', !!phosphataseInput, 'notesInput=', !!notesInput);
        hasError = true;
      } else {
        const phosphatase = phosphataseInput.value;
        const notes = notesInput.value.trim();
        const phosphataseError = validateSelect(phosphatase, 'Phosphatase Test Result');
        const notesError = validateNotes(notes);
        if (phosphataseError) {
          displayError('editPhosphatase', phosphataseError);
          hasError = true;
        }
        if (notesError) {
          displayError('editNotes', notesError);
          hasError = true;
        }
        if (!hasError) {
          newData.phosphatase = phosphatase;
          newData.notes = notes;
        }
      }
    } else if (stage === 'Cleaning') {
      const tpcInput = document.getElementById('editTPC');
      const notesInput = document.getElementById('editNotes');
      if (!tpcInput || !notesInput) {
        console.error('Cleaning edit inputs missing: tpcInput=', !!tpcInput, 'notesInput=', !!notesInput);
        hasError = true;
      } else {
        const tpc = tpcInput.value;
        const notes = notesInput.value.trim();
        const tpcError = validateNumber(tpc, 'Total Plate Count', stage);
        const notesError = validateNotes(notes);
        if (tpcError) {
          displayError('editTPC', tpcError);
          hasError = true;
        }
        if (notesError) {
          displayError('editNotes', notesError);
          hasError = true;
        }
        if (!hasError) {
          newData.tpc = parseFloat(tpc);
          newData.notes = notes;
        }
      }
    } else if (stage === 'Packaging') {
      const statusInput = document.getElementById('editStatus');
      const notesInput = document.getElementById('editNotes');
      if (!statusInput || !notesInput) {
        console.error('Packaging edit inputs missing: statusInput=', !!statusInput, 'notesInput=', !!notesInput);
        hasError = true;
      } else {
        const status = statusInput.value;
        const notes = notesInput.value.trim();
        const statusError = validateSelect(status, 'Packaging Status');
        const notesError = validateNotes(notes);
        if (statusError) {
          displayError('editStatus', statusError);
          hasError = true;
        }
        if (notesError) {
          displayError('editNotes', notesError);
          hasError = true;
        }
        if (!hasError) {
          newData.status = status;
          newData.notes = notes;
        }
      }
    } else if (stage === 'Traceability') {
      const statusInput = document.getElementById('editStatus');
      const notesInput = document.getElementById('editNotes');
      if (!statusInput || !notesInput) {
        console.error('Traceability edit inputs missing: statusInput=', !!statusInput, 'notesInput=', !!notesInput);
        hasError = true;
      } else {
        const status = statusInput.value;
        const notes = notesInput.value.trim();
        const statusError = validateSelect(status, 'Traceability Status');
        const notesError = validateNotes(notes);
        if (statusError) {
          displayError('editStatus', statusError);
          hasError = true;
        }
        if (notesError) {
          displayError('editNotes', notesError);
          hasError = true;
        }
        if (!hasError) {
          newData.status = status;
          newData.notes = notes;
        }
      }
    }

    if (hasError) {
      console.log(`Edit form submission stopped due to errors in stage: ${stage}`);
      return;
    }

    testResults = testResults.filter(t => !(t.id === oldId && t.stage === stage));
    testResults.push(newData);
    updateCardContent(stage);
    modal.classList.remove('active');
    console.log(`Edit form submitted successfully for stage: ${stage}, newData:`, newData);
  });

  const cancelEditBtn = document.getElementById('cancelEdit');
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      const modal = document.getElementById('editModal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  } else {
    console.error('Cancel edit button not found');
  }

  ['Reception', 'Pasteurization', 'Cleaning', 'Packaging', 'Traceability'].forEach(stage => {
    const searchInput = document.getElementById(`${stage.toLowerCase()}Search`);
    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => updateCardContent(stage), 300));
    } else {
      console.error(`Search input not found for stage: ${stage}`);
    }
    try {
      updateCardContent(stage);
    } catch (error) {
      console.error(`Error updating card content for stage ${stage}:`, error);
    }
  });
})();
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
          <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
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
            <div class="action-buttons">
              <button onclick="reorderItem(${item.id})">Reorder</button>
              <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
            </div>
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
      const newQuantity = parseInt(value) || 1;
      if (newQuantity < 1) {
        alert("Quantity must be greater than 0");
        return;
      }
      item.quantity = newQuantity;
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
      document.getElementById("itemQuantity").value = "1";
      document.getElementById("itemUnit").value = "L";
      document.getElementById("itemLocation").value = "Unknown";
      document.getElementById("itemExpiration").value = "N/A";
      document.getElementById("itemStatus").value = "OK";
      document.getElementById("nameError").style.display = "none";
      document.getElementById("quantityError").style.display = "none";
      document.getElementById("locationError").style.display = "none";
      document.getElementById("expirationError").style.display = "none";
    } catch (e) {
      console.error('Error closing modal:', e);
    }
  };

  function addNewItem(event) {
    try {
      event.preventDefault();
      const name = document.getElementById("itemName").value.trim();
      const quantity = parseInt(document.getElementById("itemQuantity").value) || 0;
      const location = document.getElementById("itemLocation").value.trim();
      const expiration = document.getElementById("itemExpiration").value.trim();

      // Validation
      let isValid = true;
      const nameRegex = /^(?![0-9\s]*$)[a-zA-Z0-9\s]{6,}$/;
      const dateRegex = /^(\d{4}-\d{2}-\d{2}|N\/A)$/;

      if (!name || !nameRegex.test(name)) {
        document.getElementById("nameError").textContent = name ?
          (name.length < 6 ? "Item name must be at least 6 characters long" : "Item name cannot be only numbers") :
          "Item name is required";
        document.getElementById("nameError").style.display = "block";
        isValid = false;
      } else {
        document.getElementById("nameError").style.display = "none";
      }

      if (quantity < 1) {
        document.getElementById("quantityError").textContent = "Quantity must be greater than 0";
        document.getElementById("quantityError").style.display = "block";
        isValid = false;
      } else {
        document.getElementById("quantityError").style.display = "none";
      }

      if (!location) {
        document.getElementById("locationError").textContent = "Location is required";
        document.getElementById("locationError").style.display = "block";
        isValid = false;
      } else {
        document.getElementById("locationError").style.display = "none";
      }

      if (!expiration || (!dateRegex.test(expiration))) {
        document.getElementById("expirationError").textContent = "Expiration must be YYYY-MM-DD or N/A";
        document.getElementById("expirationError").style.display = "block";
        isValid = false;
      } else {
        document.getElementById("expirationError").style.display = "none";
      }

      if (!isValid) return;

      const newItem = {
        id: nextId++,
        name,
        category: document.getElementById("itemCategory").value,
        quantity,
        unit: document.getElementById("itemUnit").value,
        location,
        expiration,
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
    { id: 'COL-002', volume: 5000, fat: 3.4, date: '2025-05-26' },
    { id: 'COL-003', volume: 4500, fat: 3.6, date: '2025-05-27' }
  ],
  chilling: [
    { id: 'CHL-001', quantity: 9500, temperature: 3, center: 'Center A' },
    { id: 'CHL-002', quantity: 9200, temperature: 2.8, center: 'Center B' },
    { id: 'CHL-003', quantity: 9300, temperature: 3.2, center: 'Center C' }
  ],
  processing: [
    { id: 'PRC-001', type: 'Pasteurized Milk', quantity: 8000, efficiency: 95 },
    { id: 'PRC-002', type: 'Skimmed Milk', quantity: 7500, efficiency: 92 },
    { id: 'PRC-003', type: 'Whole Milk', quantity: 7800, efficiency: 94 }
  ],
  packaging: [
    { id: 'PKG-001', type: 'Bottle', quantity: 7500 },
    { id: 'PKG-002', type: 'Carton', quantity: 7000 },
    { id: 'PKG-003', type: 'Packet', quantity: 7200 }
  ],
  transportation: [
    { id: 'SHP-001', destination: 'Processing Plant A', quantity: 5000, unit: 'L', status: 'In Transit' },
    { id: 'SHP-002', destination: 'Distributor B', quantity: 3000, unit: 'L', status: 'Delivered' },
    { id: 'SHP-003', destination: 'Retailer C', quantity: 4000, unit: 'L', status: 'Scheduled' }
  ],
  sales: [
    { id: 'SAL-001', location: 'Distributor A', quantity: 5000, sales: 500000 },
    { id: 'SAL-002', location: 'Retailer Y', quantity: 3000, sales: 300000 },
    { id: 'SAL-003', location: 'Retailer Z', quantity: 3500, sales: 350000 }
  ]
};

let distributionNextIds = {
  collection: 4,
  chilling: 4,
  processing: 4,
  packaging: 4,
  transportation: 4,
  sales: 4
};

// Initialize Distribution Section
function initDistribution() {
  // Set up nav cards
  document.querySelectorAll('.distribution-nav-card').forEach(card => {
    card.addEventListener('click', () => distributionShowSection(card.dataset.section));
  });

  // Set up search for all sections
  ['collection', 'chilling', 'processing', 'packaging', 'transportation', 'sales'].forEach(section => {
    const searchBtn = document.getElementById(`distribution-${section}-searchBtn`);
    if (searchBtn) {
      searchBtn.addEventListener('click', () => distributionSearchRecords(section));
    }
  });

  // Set initial timestamp and update every second
  distributionSetTimestamp();
  setInterval(distributionSetTimestamp, 1000);

  // Show default section
  distributionShowSection('collection');
  console.log('Distribution section initialized at 02:08 PM IST, July 08, 2025');
}

// Toggle Distribution Subsection
function distributionShowSection(section) {
  document.querySelectorAll('.distribution-content-section').forEach(s => {
    s.classList.remove('active');
  });
  const sectionElement = document.getElementById(`distribution-content-${section}`);
  if (sectionElement) {
    sectionElement.classList.add('active');
  }
  document.querySelectorAll('.distribution-nav-card').forEach(card => {
    card.classList.remove('active');
  });
  const navCard = document.querySelector(`.distribution-nav-card[data-section="${section}"]`);
  if (navCard) {
    navCard.classList.add('active');
  }
  distributionRenderTiles(section);
  distributionRenderSummaryCard(section);
}

// Render Tiles
function distributionRenderTiles(section) {
  const addContainer = document.getElementById(`distribution-${section}-tiles`);
  const dataContainer = document.getElementById(`distribution-${section}-data-tiles`);
  if (!addContainer || !dataContainer) return;
 
  addContainer.innerHTML = '';
  dataContainer.innerHTML = '';
 
  // Add tile
  const addTile = document.createElement('div');
  addTile.className = 'distribution-tile add-tile';
  addTile.innerHTML = '<h3>Add Record</h3><i class="fas fa-plus"></i>';
  addTile.onclick = () => distributionOpenModal(section, 'add');
  addContainer.appendChild(addTile);

  // Data tiles
  distributionData[section].forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'distribution-tile';
    tile.innerHTML = distributionGetTileContent(section, item);
    dataContainer.appendChild(tile);
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
    default:
      return '';
  }
}

// Render Summary Card
function distributionRenderSummaryCard(section) {
  const container = document.getElementById(`distribution-${section}-summary`);
  if (!container) return;

  container.innerHTML = '';

  let summaryContent = '';
  switch (section) {
    case 'collection':
      const totalVolume = distributionData[section].reduce((sum, item) => sum + item.volume, 0);
      const avgFat = distributionData[section].length ? (distributionData[section].reduce((sum, item) => sum + item.fat, 0) / distributionData[section].length).toFixed(1) : 0;
      const collectionCount = distributionData[section].length;
      summaryContent = `
        <h3>Collection Summary</h3>
        <p><span class="label">Total Volume:</span> <span class="value">${totalVolume} L</span></p>
        <p><span class="label">Average Fat Content:</span> <span class="value">${avgFat}%</span></p>
        <p><span class="label">Collections:</span> <span class="value">${collectionCount}</span></p>`;
      break;
    case 'chilling':
      const totalChilled = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const avgTemp = distributionData[section].length ? (distributionData[section].reduce((sum, item) => sum + item.temperature, 0) / distributionData[section].length).toFixed(1) : 0;
      const centers = new Set(distributionData[section].map(item => item.center)).size;
      summaryContent = `
        <h3>Chilling Summary</h3>
        <p><span class="label">Total Quantity:</span> <span class="value">${totalChilled} L</span></p>
        <p><span class="label">Average Temperature:</span> <span class="value">${avgTemp}°C</span></p>
        <p><span class="label">Centers:</span> <span class="value">${centers}</span></p>`;
      break;
    case 'processing':
      const totalProcessed = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const avgEfficiency = distributionData[section].length ? (distributionData[section].reduce((sum, item) => sum + item.efficiency, 0) / distributionData[section].length).toFixed(1) : 0;
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
      const typeBreakdown = Object.entries(typeCounts).map(([type, qty]) => `${type}: ${qty} L`).join(', ') || 'None';
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
      const statusBreakdown = Object.entries(statusCounts).map(([status, count]) => `${status}: ${count}`).join(', ') || 'None';
      summaryContent = `
        <h3>Transportation Summary</h3>
        <p><span class="label">Total Shipments:</span> <span class="value">${totalShipments}</span></p>
        <p><span class="label">Status Breakdown:</span> <span class="value">${statusBreakdown}</span></p>`;
      break;
    case 'sales':
      const totalSales = distributionData[section].reduce((sum, item) => sum + item.sales, 0);
      const totalSold = distributionData[section].reduce((sum, item) => sum + item.quantity, 0);
      const avgSalesPerLocation = distributionData[section].length ? (totalSales / distributionData[section].length).toFixed(0) : 0;
      summaryContent = `
        <h3>Sales Summary</h3>
        <p><span class="label">Total Sales:</span> <span class="value">₹${totalSales}</span></p>
        <p><span class="label">Total Quantity Sold:</span> <span class="value">${totalSold} L</span></p>
        <p><span class="label">Avg Sales/Location:</span> <span class="value">₹${avgSalesPerLocation}</span></p>`;
      break;
    default:
      summaryContent = '';
  }

  container.innerHTML = summaryContent;
}

// Open Modal
function distributionOpenModal(section, action, id = null) {
  const modal = document.getElementById('distribution-modal');
  const title = document.getElementById('distribution-modal-title');
  const form = document.getElementById('distribution-modal-form');
  if (!modal || !title || !form) return;

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
        <div class="form-group">
          <label for="volume">Volume (L) *</label>
          <input type="number" id="volume" value="${item.volume || 1000}" min="1000" required>
          <span class="error" id="volumeError">Volume must be at least 1000L</span>
        </div>
        <div class="form-group">
          <label for="fat">Fat Content (%) *</label>
          <input type="number" id="fat" step="0.1" value="${item.fat || ''}" min="0" required>
          <span class="error" id="fatError">Fat content must be positive</span>
        </div>
        <div class="form-group">
          <label for="date">Date *</label>
          <input type="date" id="date" value="${item.date || '2025-05-26'}" required>
          <span class="error" id="dateError">Date is required</span>
        </div>
        <div class="modal-buttons">
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
          <button type="submit" class="submit">Save</button>
        </div>`;
    case 'chilling':
      return `
        <div class="form-group">
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || 1000}" min="1000" required>
          <span class="error center-error" id="quantityError">Quantity must be at least 1000L</span>
        </div>
        <div class="form-group">
          <label for="temperature">Temperature (°C) *</label>
          <input type="number" id="temperature" value="${item.temperature || ''}" min="0" max="5" step="0.1" required>
          <span class="error center-error" id="temperatureError">Temperature must be between 0 and 5°C</span>
        </div>
        <div class="form-group">
          <label for="center">Center *</label>
          <input type="text" id="center" value="${item.center || ''}" required minlength="6" pattern=".*[a-zA-Z].*">
          <span class="error center-error" id="centerError">Center must be at least 6 characters and contain letters</span>
        </div>
        <div class="modal-buttons">
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
          <button type="submit" class="submit">Save</button>
        </div>`;
    case 'processing':
      return `
        <div class="form-group">
          <label for="type">Type *</label>
          <input type="text" id="type" value="${item.type || ''}" required minlength="6" pattern=".*[a-zA-Z].*">
          <span class="error" id="typeError">Type must be at least 6 characters and contain letters</span>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || 1000}" min="1000" required>
          <span class="error" id="quantityError">Quantity must be at least 1000L</span>
        </div>
        <div class="form-group">
          <label for="efficiency">Efficiency (%) *</label>
          <input type="number" id="efficiency" value="${item.efficiency || ''}" min="0" max="100" required>
          <span class="error" id="efficiencyError">Efficiency must be between 0 and 100</span>
        </div>
        <div class="modal-buttons">
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
          <button type="submit" class="submit">Save</button>
        </div>`;
    case 'packaging':
      return `
        <div class="form-group">
          <label for="type">Type *</label>
          <select id="type" required>
            <option value="Bottle" ${item.type === 'Bottle' ? 'selected' : ''}>Bottle</option>
            <option value="Carton" ${item.type === 'Carton' ? 'selected' : ''}>Carton</option>
            <option value="Packet" ${item.type === 'Packet' ? 'selected' : ''}>Packet</option>
          </select>
          <span class="error" id="typeError">Type is required</span>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || 1000}" min="1000" required>
          <span class="error" id="quantityError">Quantity must be at least 1000L</span>
        </div>
        <div class="modal-buttons">
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
          <button type="submit" class="submit">Save</button>
        </div>`;
    case 'transportation':
      return `
        <div class="form-group">
          <label for="destination">Destination *</label>
          <input type="text" id="destination" value="${item.destination || ''}" required minlength="6" pattern=".*[a-zA-Z].*">
          <span class="error" id="destinationError">Destination must be at least 6 characters and contain letters</span>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity *</label>
          <input type="number" id="quantity" value="${item.quantity || 1000}" min="1000" required>
          <span class="error" id="quantityError">Quantity must be at least 1000</span>
        </div>
        <div class="form-group">
          <label for="unit">Unit *</label>
          <select id="unit" required>
            <option value="L" ${item.unit === 'L' ? 'selected' : ''}>L</option>
            <option value="kg" ${item.unit === 'kg' ? 'selected' : ''}>kg</option>
          </select>
          <span class="error" id="unitError">Unit is required</span>
        </div>
        <div class="form-group">
          <label for="status">Status *</label>
          <select id="status" required>
            <option value="Scheduled" ${item.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
            <option value="In Transit" ${item.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
            <option value="Delivered" ${item.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Delayed" ${item.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
          </select>
          <span class="error" id="statusError">Status is required</span>
        </div>
        <div class="modal-buttons">
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
          <button type="submit" class="submit">Save</button>
        </div>`;
    case 'sales':
      return `
        <div class="form-group">
          <label for="location">Location *</label>
          <input type="text" id="location" value="${item.location || ''}" required minlength="6" pattern=".*[a-zA-Z].*">
          <span class="error" id="locationError">Location must be at least 6 characters and contain letters</span>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity (L) *</label>
          <input type="number" id="quantity" value="${item.quantity || 1000}" min="1000" required>
          <span class="error" id="quantityError">Quantity must be at least 1000L</span>
        </div>
        <div class="form-group">
          <label for="sales">Sales (₹) *</label>
          <input type="number" id="sales" value="${item.sales || ''}" min="0" required>
          <span class="error" id="salesError">Sales must be positive</span>
        </div>
        <div class="modal-buttons">
          <button type="button" class="cancel" onclick="distributionCloseModal()">Cancel</button>
          <button type="submit" class="submit">Save</button>
        </div>`;
    default:
      return '';
  }
}

// Handle Form Submission
function distributionHandleFormSubmit(e, section, action, id) {
  e.preventDefault();
  let isValid = true;
  const form = e.target;
  const newItem = {};

  // Reset error messages
  document.querySelectorAll('.error').forEach(e => e.style.display = 'none');

  // Validation for text inputs
  const validateTextInput = (value, errorElementId) => {
    const hasLetters = /[a-zA-Z]/.test(value);
    const isLongEnough = value.length >= 6;
    if (!hasLetters || !isLongEnough) {
      const errorElement = document.getElementById(errorElementId);
      if (errorElement) errorElement.style.display = 'block';
      return false;
    }
    return true;
  };

  switch (section) {
    case 'collection':
      newItem.volume = parseInt(form.volume.value);
      newItem.fat = parseFloat(form.fat.value);
      newItem.date = form.date.value;
      if (newItem.volume < 1000) {
        document.getElementById('volumeError').style.display = 'block';
        isValid = false;
      }
      if (newItem.fat <= 0) {
        document.getElementById('fatError').style.display = 'block';
        isValid = false;
      }
      if (!newItem.date) {
        document.getElementById('dateError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'chilling':
      newItem.quantity = parseInt(form.quantity.value);
      newItem.temperature = parseFloat(form.temperature.value);
      newItem.center = form.center.value;
      if (newItem.quantity < 1000) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      if (newItem.temperature < 0 || newItem.temperature > 5) {
        document.getElementById('temperatureError').style.display = 'block';
        isValid = false;
      }
      if (!validateTextInput(newItem.center, 'centerError')) {
        isValid = false;
      }
      break;
    case 'processing':
      newItem.type = form.type.value;
      newItem.quantity = parseInt(form.quantity.value);
      newItem.efficiency = parseFloat(form.efficiency.value);
      if (!validateTextInput(newItem.type, 'typeError')) {
        isValid = false;
      }
      if (newItem.quantity < 1000) {
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
      if (!newItem.type) {
        document.getElementById('typeError').style.display = 'block';
        isValid = false;
      }
      if (newItem.quantity < 1000) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'transportation':
      newItem.destination = form.destination.value;
      newItem.quantity = parseInt(form.quantity.value);
      newItem.unit = form.unit.value;
      newItem.status = form.status.value;
      if (!validateTextInput(newItem.destination, 'destinationError')) {
        isValid = false;
      }
      if (newItem.quantity < 1000) {
        document.getElementById('quantityError').style.display = 'block';
        isValid = false;
      }
      if (!newItem.unit) {
        document.getElementById('unitError').style.display = 'block';
        isValid = false;
      }
      if (!newItem.status) {
        document.getElementById('statusError').style.display = 'block';
        isValid = false;
      }
      break;
    case 'sales':
      newItem.location = form.location.value;
      newItem.quantity = parseInt(form.quantity.value);
      newItem.sales = parseInt(form.sales.value);
      if (!validateTextInput(newItem.location, 'locationError')) {
        isValid = false;
      }
      if (newItem.quantity < 1000) {
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
    if (index !== -1) {
      distributionData[section][index] = { ...distributionData[section][index], ...newItem };
    }
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
  const modal = document.getElementById('distribution-modal');
  const form = document.getElementById('distribution-modal-form');
  if (modal && form) {
    modal.classList.remove('active');
    form.reset();
    document.querySelectorAll('.error').forEach(e => e.style.display = 'none');
  }
}

// Search Records
function distributionSearchRecords(section) {
  const query = document.getElementById(`distribution-${section}-search`).value.toLowerCase();
  const tiles = document.querySelectorAll(`#distribution-${section}-data-tiles .distribution-tile:not(.add-tile):not(.distribution-summary-tile)`);
  tiles.forEach(tile => {
    let matches = false;
    const id = tile.querySelector('h3').textContent.toLowerCase();
    switch (section) {
      case 'collection':
        const volume = tile.querySelector('p:nth-child(2)')?.textContent.toLowerCase() || '';
        const fat = tile.querySelector('p:nth-child(3)')?.textContent.toLowerCase() || '';
        const date = tile.querySelector('p:nth-child(4)')?.textContent.toLowerCase() || '';
        matches = id.includes(query) || volume.includes(query) || fat.includes(query) || date.includes(query);
        break;
      case 'chilling':
        const quantityChill = tile.querySelector('p:nth-child(2)')?.textContent.toLowerCase() || '';
        const temperature = tile.querySelector('p:nth-child(3)')?.textContent.toLowerCase() || '';
        const center = tile.querySelector('p:nth-child(4)')?.textContent.toLowerCase() || '';
        matches = id.includes(query) || quantityChill.includes(query) || temperature.includes(query) || center.includes(query);
        break;
      case 'processing':
        const type = tile.querySelector('p:nth-child(2)')?.textContent.toLowerCase() || '';
        const quantityProc = tile.querySelector('p:nth-child(3)')?.textContent.toLowerCase() || '';
        const efficiency = tile.querySelector('p:nth-child(4)')?.textContent.toLowerCase() || '';
        matches = id.includes(query) || type.includes(query) || quantityProc.includes(query) || efficiency.includes(query);
        break;
      case 'packaging':
        const packType = tile.querySelector('p:nth-child(2)')?.textContent.toLowerCase() || '';
        const quantityPack = tile.querySelector('p:nth-child(3)')?.textContent.toLowerCase() || '';
        matches = id.includes(query) || packType.includes(query) || quantityPack.includes(query);
        break;
      case 'transportation':
        const destination = tile.querySelector('p:nth-child(2)')?.textContent.toLowerCase() || '';
        const quantityTrans = tile.querySelector('p:nth-child(3)')?.textContent.toLowerCase() || '';
        const status = tile.querySelector('p:nth-child(4)')?.textContent.toLowerCase() || '';
        matches = id.includes(query) || destination.includes(query) || quantityTrans.includes(query) || status.includes(query);
        break;
      case 'sales':
        const location = tile.querySelector('p:nth-child(2)')?.textContent.toLowerCase() || '';
        const quantitySales = tile.querySelector('p:nth-child(3)')?.textContent.toLowerCase() || '';
        const sales = tile.querySelector('p:nth-child(4)')?.textContent.toLowerCase() || '';
        matches = id.includes(query) || location.includes(query) || quantitySales.includes(query) || sales.includes(query);
        break;
    }
    tile.style.display = matches ? '' : 'none';
  });
}

// Set Dynamic Timestamp
function distributionSetTimestamp() {
  const timestampElement = document.getElementById('distribution-timestamp');
  if (timestampElement) {
    timestampElement.textContent = 'Updated at ' + new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  }
}
function initSettings() {
  const settingsForm = document.getElementById('settingsForm');
  const themeSelect = document.getElementById('themeSelect');
  const languageSelect = document.getElementById('languageSelect');
  const timeFormat = document.getElementById('timeFormat');
  const milkBaseRate = document.getElementById('milkBaseRate');
  const fatBonus = document.getElementById('fatBonus');
  const gradeAFatThreshold = document.getElementById('gradeAFatThreshold');
  const gradeBFatThreshold = document.getElementById('gradeBFatThreshold');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const profilePic = document.getElementById('profilePic');
  const profilePicPreview = document.getElementById('profilePicPreview');
  const resetSettings = document.getElementById('resetSettings');
  const resetModal = document.getElementById('resetModal');
  const confirmReset = document.getElementById('confirmReset');
  const cancelReset = document.getElementById('cancelReset');

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function trapFocus(modal) {
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    modal.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    first.focus();
  }

  const validateTheme = () => ['light', 'dark', 'system'].includes(themeSelect.value);
  const validateLanguage = () => ['en', 'hi'].includes(languageSelect.value);
  const validateTimeFormat = () => ['12', '24'].includes(timeFormat.value);
  const validateMilkBaseRate = () => {
    const value = parseFloat(milkBaseRate.value);
    return !isNaN(value) && value > 0;
  };
  const validateFatBonus = () => {
    const value = parseFloat(fatBonus.value);
    return !isNaN(value) && value >= 0;
  };
  const validateQualityThresholds = () => {
    const a = parseFloat(gradeAFatThreshold.value);
    const b = parseFloat(gradeBFatThreshold.value);
    return !isNaN(a) && !isNaN(b) && a > b && b > 0;
  };
  const validateName = () => {
    const value = userName.value.trim();
    return /^[a-zA-Z\s]{2,}$/.test(value);
  };
  const validateEmail = () => {
    const value = userEmail.value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  const validateProfilePic = () => {
    if (!profilePic.files[0]) return true;
    const file = profilePic.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const validateField = (field, validateFn, errorId) => {
    const error = document.getElementById(errorId);
    const isValid = validateFn();
    field.classList.toggle('invalid', !isValid);
    error.style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  milkBaseRate.addEventListener('input', () => validateField(milkBaseRate, validateMilkBaseRate, 'milkBaseRateError'));
  fatBonus.addEventListener('input', () => validateField(fatBonus, validateFatBonus, 'fatBonusError'));
  gradeAFatThreshold.addEventListener('input', () => validateField(gradeAFatThreshold, validateQualityThresholds, 'gradeAFatThresholdError'));
  gradeBFatThreshold.addEventListener('input', () => {
    validateField(gradeBFatThreshold, validateQualityThresholds, 'gradeBFatThresholdError');
    validateField(gradeAFatThreshold, validateQualityThresholds, 'gradeAFatThresholdError');
  });
  userName.addEventListener('input', () => validateField(userName, validateName, 'userNameError'));
  userEmail.addEventListener('input', () => validateField(userEmail, validateEmail, 'userEmailError'));

  const savedSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
  const defaultSettings = {
    theme: 'light',
    language: 'en',
    timeFormat: '24',
    milkBaseRate: 0.50,
    fatBonus: 0.10,
    gradeAFatThreshold: 4.0,
    gradeBFatThreshold: 3.0,
    userName: '',
    userEmail: '',
    profilePic: ''
  };
  const settings = { ...defaultSettings, ...savedSettings };
  themeSelect.value = settings.theme;
  languageSelect.value = settings.language;
  timeFormat.value = settings.timeFormat;
  milkBaseRate.value = settings.milkBaseRate;
  fatBonus.value = settings.fatBonus;
  gradeAFatThreshold.value = settings.gradeAFatThreshold;
  gradeBFatThreshold.value = settings.gradeBFatThreshold;
  userName.value = settings.userName;
  userEmail.value = settings.userEmail;
  if (settings.profilePic) {
    profilePicPreview.src = settings.profilePic;
    profilePicPreview.style.display = 'block';
  }

  const applyTheme = () => {
    const theme = themeSelect.value;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('dark', prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    } else {
      document.body.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  };
  applyTheme();
  themeSelect.addEventListener('change', applyTheme);

  profilePic.addEventListener('change', () => {
    if (validateProfilePic()) {
      const file = profilePic.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          profilePicPreview.src = reader.result;
          profilePicPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    } else {
      profilePic.value = '';
      showToast('Invalid image file. Use JPEG, PNG, or GIF, max 5MB.', 'danger');
    }
  });

  settingsForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    if (!validateTheme()) {
      showToast('Please select a valid theme.', 'danger');
      valid = false;
    }
    if (!validateLanguage()) {
      showToast('Please select a valid language.', 'danger');
      valid = false;
    }
    if (!validateTimeFormat()) {
      showToast('Please select a valid time format.', 'danger');
      valid = false;
    }
    if (!validateMilkBaseRate()) {
      showToast('Milk base rate must be greater than 0.', 'danger');
      valid = false;
    }
    if (!validateFatBonus()) {
      showToast('Fat bonus must be non-negative.', 'danger');
      valid = false;
    }
    if (!validateQualityThresholds()) {
      showToast('Grade A threshold must be greater than Grade B, and both must be positive.', 'danger');
      valid = false;
    }
    if (!validateName()) {
      showToast('Name must be at least 2 characters, letters and spaces only.', 'danger');
      valid = false;
    }
    if (!validateEmail()) {
      showToast('Please enter a valid email address.', 'danger');
      valid = false;
    }
    if (!validateProfilePic()) {
      showToast('Please select a valid image file (JPEG, PNG, GIF, max 5MB).', 'danger');
      valid = false;
    }
    if (!valid) return;
    const newSettings = {
      theme: themeSelect.value,
      language: languageSelect.value,
      timeFormat: timeFormat.value,
      milkBaseRate: parseFloat(milkBaseRate.value),
      fatBonus: parseFloat(fatBonus.value),
      gradeAFatThreshold: parseFloat(gradeAFatThreshold.value),
      gradeBFatThreshold: parseFloat(gradeBFatThreshold.value),
      userName: userName.value.trim(),
      userEmail: userEmail.value.trim(),
      profilePic: profilePicPreview.src
    };
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    showToast('Settings saved successfully!');
  });

  resetSettings.addEventListener('click', () => {
    resetModal.style.display = 'flex';
    trapFocus(resetModal);
  });
  confirmReset.addEventListener('click', () => {
    localStorage.removeItem('userSettings');
    settingsForm.reset();
    themeSelect.value = defaultSettings.theme;
    languageSelect.value = defaultSettings.language;
    timeFormat.value = defaultSettings.timeFormat;
    milkBaseRate.value = defaultSettings.milkBaseRate;
    fatBonus.value = defaultSettings.fatBonus;
    gradeAFatThreshold.value = defaultSettings.gradeAFatThreshold;
    gradeBFatThreshold.value = defaultSettings.gradeBFatThreshold;
    profilePicPreview.src = '';
    profilePicPreview.style.display = 'none';
    applyTheme();
    resetModal.style.display = 'none';
    showToast('Settings reset to defaults.');
    document.querySelectorAll('.form-control').forEach(field => field.classList.remove('invalid'));
    document.querySelectorAll('.error-message').forEach(error => error.style.display = 'none');
  });
  cancelReset.addEventListener('click', () => {
    resetModal.style.display = 'none';
  });
  resetModal.addEventListener('click', e => {
    if (e.target === resetModal) {
      resetModal.style.display = 'none';
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('settings-content').style.display === 'block') {
    initSettings();
  }
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.menu li[data-section="home"]').click();
});