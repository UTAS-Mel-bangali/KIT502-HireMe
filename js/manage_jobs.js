document.addEventListener("DOMContentLoaded", () => {
  let jobsData = [];
  let currentJobId = null;
  let isEditMode = false;

  // DOM elements
  const jobsTableBody = document.getElementById("jobsTableBody");
  const searchJobs = document.getElementById("searchJobs");
  const jobForm = document.getElementById("jobForm");
  const saveJobBtn = document.getElementById("saveJobBtn");
  const addJobModal = document.getElementById("addJobModal");
  const deleteJobModal = document.getElementById("deleteJobModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  // Initialize
  loadJobs();
  setupEventListeners();

  function setupEventListeners() {
      // Search functionality
      searchJobs.addEventListener("input", filterJobs);

      // Form submission
      saveJobBtn.addEventListener("click", saveJob);

      // Modal events
      addJobModal.addEventListener("hidden.bs.modal", resetForm);

      // Delete confirmation
      confirmDeleteBtn.addEventListener("click", confirmDeleteJob);
  }

  function loadJobs() {
      // First try to load from localStorage (for edited data)
      const savedJobs = localStorage.getItem('jobsData');
      
      if (savedJobs) {
          try {
              jobsData = JSON.parse(savedJobs);
              displayJobs(jobsData);
              updateDashboardStats();
              return;
          } catch (e) {
              console.warn("Error parsing saved jobs, loading from JSON file");
          }
      }
      
      // Load from jobs.json if no localStorage data
      fetch("data/jobs.json")
          .then(res => res.json())
          .then(data => {
              jobsData = data.map(job => ({
                  ...job,
                  status: job.status || "active",
                  created: job.created || new Date().toISOString().split('T')[0],
                  salary: job.salary || ""
              }));
              displayJobs(jobsData);
              updateDashboardStats();
              // Save to localStorage for future use
              localStorage.setItem('jobsData', JSON.stringify(jobsData));
          })
          .catch(err => {
              console.error("Error loading jobs:", err);
              jobsTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error loading jobs: ${err.message}</td></tr>`;
          });
  }

  function displayJobs(jobs) {
      jobsTableBody.innerHTML = "";
      
      if (jobs.length === 0) {
          jobsTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No jobs found.</td></tr>`;
          return;
      }

      jobs.forEach(job => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>
                  <div class="fw-bold">${job.title}</div>
                  <small class="text-muted">ID: ${job.id}</small>
              </td>
              <td>${job.company}</td>
              <td><span class="badge bg-secondary">${job.type}</span></td>
              <td>${job.industry}</td>
              <td>
                  <span class="badge ${getStatusBadgeClass(job.status)}">${job.status}</span>
              </td>
              <td>${formatDate(job.created)}</td>
              <td>
                  <div class="btn-group btn-group-sm" role="group">
                      <button class="btn btn-outline-primary" onclick="editJob(${job.id})" title="Edit">
                          <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-outline-${job.status === 'active' ? 'warning' : 'success'}" 
                              onclick="toggleJobStatus(${job.id})" title="${job.status === 'active' ? 'Close' : 'Activate'}">
                          <i class="bi bi-${job.status === 'active' ? 'pause-circle' : 'play-circle'}"></i>
                      </button>
                      <button class="btn btn-outline-danger" onclick="deleteJob(${job.id})" title="Delete">
                          <i class="bi bi-trash"></i>
                      </button>
                  </div>
              </td>
          `;
          jobsTableBody.appendChild(row);
      });
  }

  function getStatusBadgeClass(status) {
      switch (status) {
          case 'active': return 'bg-success';
          case 'closed': return 'bg-warning';
          case 'draft': return 'bg-secondary';
          default: return 'bg-primary';
      }
  }

  function formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString();
  }

  function filterJobs() {
      const searchTerm = searchJobs.value.toLowerCase();
      const filteredJobs = jobsData.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.industry.toLowerCase().includes(searchTerm)
      );
      displayJobs(filteredJobs);
  }

  function updateDashboardStats() {
      const totalJobs = jobsData.length;
      const activeJobs = jobsData.filter(job => job.status === 'active').length;
      const closedJobs = jobsData.filter(job => job.status === 'closed').length;
      
      // Count jobs created this month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyJobs = jobsData.filter(job => {
          if (!job.created) return false;
          const jobDate = new Date(job.created);
          return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
      }).length;

      document.getElementById("totalJobs").textContent = totalJobs;
      document.getElementById("activeJobs").textContent = activeJobs;
      document.getElementById("closedJobs").textContent = closedJobs;
      document.getElementById("monthlyJobs").textContent = monthlyJobs;
  }

  function resetForm() {
      jobForm.reset();
      currentJobId = null;
      isEditMode = false;
      document.getElementById("addJobModalLabel").textContent = "Add New Job";
      saveJobBtn.textContent = "Save Job";
  }

  function editJob(jobId) {
      const job = jobsData.find(j => j.id === jobId);
      if (!job) return;

      currentJobId = jobId;
      isEditMode = true;

      // Populate form
      document.getElementById("jobId").value = job.id;
      document.getElementById("jobTitle").value = job.title;
      document.getElementById("company").value = job.company;
      document.getElementById("jobType").value = job.type;
      document.getElementById("industry").value = job.industry;
      document.getElementById("jobDescription").value = job.description;
      document.getElementById("jobStatus").value = job.status || 'active';
      document.getElementById("salary").value = job.salary || '';

      // Update modal
      document.getElementById("addJobModalLabel").textContent = "Edit Job";
      saveJobBtn.textContent = "Update Job";

      // Show modal
      const modal = new bootstrap.Modal(addJobModal);
      modal.show();
  }

  function saveJob() {
      if (!jobForm.checkValidity()) {
          jobForm.reportValidity();
          return;
      }

      const formData = new FormData(jobForm);
      const jobData = {
          title: formData.get("jobTitle"),
          company: formData.get("company"),
          type: formData.get("jobType"),
          industry: formData.get("industry"),
          description: formData.get("jobDescription"),
          status: formData.get("jobStatus"),
          salary: formData.get("salary"),
          created: new Date().toISOString().split('T')[0]
      };

      if (isEditMode && currentJobId) {
          // Update existing job
          const jobIndex = jobsData.findIndex(j => j.id === currentJobId);
          if (jobIndex !== -1) {
              jobsData[jobIndex] = { ...jobsData[jobIndex], ...jobData };
          }
      } else {
          // Add new job
          const newId = Math.max(...jobsData.map(j => j.id), 0) + 1;
          jobData.id = newId;
          jobData.link = `job_details.html?id=${newId}`;
          jobsData.push(jobData);
      }

      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem('jobsData', JSON.stringify(jobsData));
      
      // Update display
      displayJobs(jobsData);
      updateDashboardStats();
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(addJobModal);
      modal.hide();
      
      // Show success message
      showAlert("Job saved successfully!", "success");
  }

  function toggleJobStatus(jobId) {
      const job = jobsData.find(j => j.id === jobId);
      if (!job) return;

      const newStatus = job.status === 'active' ? 'closed' : 'active';
      job.status = newStatus;

      // Update localStorage
      localStorage.setItem('jobsData', JSON.stringify(jobsData));
      
      // Update display
      displayJobs(jobsData);
      updateDashboardStats();
      
      // Show success message
      const action = newStatus === 'active' ? 'activated' : 'closed';
      showAlert(`Job ${action} successfully!`, "success");
  }

  function deleteJob(jobId) {
      const job = jobsData.find(j => j.id === jobId);
      if (!job) return;

      // Show confirmation modal
      document.getElementById("deleteJobMessage").textContent = `Are you sure you want to delete "${job.title}" at ${job.company}? This action cannot be undone.`;
      
      const modal = new bootstrap.Modal(deleteJobModal);
      modal.show();
      
      // Store job ID for deletion
      currentJobId = jobId;
  }

  function confirmDeleteJob() {
      if (!currentJobId) return;

      // Remove job from array
      jobsData = jobsData.filter(j => j.id !== currentJobId);
      
      // Update localStorage
      localStorage.setItem('jobsData', JSON.stringify(jobsData));
      
      // Update display
      displayJobs(jobsData);
      updateDashboardStats();
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(deleteJobModal);
      modal.hide();
      
      // Show success message
      showAlert("Job deleted successfully!", "success");
      
      currentJobId = null;
  }

  function showAlert(message, type = "info") {
      // Create alert element
      const alertDiv = document.createElement("div");
      alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
      alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
      alertDiv.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      document.body.appendChild(alertDiv);
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
          if (alertDiv.parentNode) {
              alertDiv.remove();
          }
      }, 3000);
  }

  // Export jobs data function (for demonstration)
  function exportJobsData() {
      const dataStr = JSON.stringify(jobsData, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'updated_jobs.json';
      link.click();
      URL.revokeObjectURL(url);
      showAlert("Jobs data exported successfully!", "info");
  }

  // Make functions globally accessible for onclick handlers
  window.editJob = editJob;
  window.toggleJobStatus = toggleJobStatus;
  window.deleteJob = deleteJob;
  window.exportJobsData = exportJobsData;
});