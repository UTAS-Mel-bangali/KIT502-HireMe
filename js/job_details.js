document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("jobDetailsContainer");

  // Get job ID from URL (?id=1)
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get("id");

  fetch("jobs.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load jobs.json");
      return res.json();
    })
    .then(jobs => {
      const job = jobs.find(j => j.id == jobId);

      if (!job) {
        container.innerHTML = `<p class="text-danger">Job not found.</p>`;
        return;
      }

      container.innerHTML = `
        <div class="card shadow-sm p-4">
          <h2 class="mb-3">${job.title}</h2>
          <p><strong>Company:</strong> ${job.company}</p>
          <p><strong>Type:</strong> ${job.type}</p>
          <p><strong>Industry:</strong> ${job.industry}</p>
          <p class="mt-3">${job.description}</p>
          <a href="job_listing.html" class="btn btn-outline-primary mt-3">← Back to Jobs</a>
        </div>
      `;
    })
    .catch(err => {
      container.innerHTML = `<p class="text-danger">Error: ${err.message}</p>`;
    });
});
