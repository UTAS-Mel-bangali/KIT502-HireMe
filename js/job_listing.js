document.addEventListener("DOMContentLoaded", () => {
    const jobCardsContainer = document.getElementById("jobCardsContainer");
    const jobTypeFilter = document.getElementById("jobType");
    const industryFilter = document.getElementById("industry");

    let jobsData = [];

    fetch("./data/jobs.json")
        .then(res => res.json())
        .then(data => {
            jobsData = data;
            displayJobs(jobsData);
        })
        .catch(err => {
            jobCardsContainer.innerHTML = `<p class="text-danger">Error loading jobs: ${err.message}</p>`;
        });

    // Render jobs
    function displayJobs(jobs) {
        jobCardsContainer.innerHTML = "";
        if (jobs.length === 0) {
            jobCardsContainer.innerHTML = `<p class="text-muted">No jobs found.</p>`;
            return;
        }

        jobs.forEach(job => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${job.title}</h5>
                        <p><strong>Company:</strong> ${job.company}</p>
                        <p><strong>Type:</strong> ${job.type}</p>
                        <p><strong>Industry:</strong> ${job.industry}</p>
                        <a href="${job.link}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            jobCardsContainer.appendChild(col);
        });
    }

    // Filtering
    function filterJobs() {
        const typeValue = jobTypeFilter.value;
        const industryValue = industryFilter.value;

        const filteredJobs = jobsData.filter(job => {
            const matchType = (typeValue === "All" || job.type === typeValue);
            const matchIndustry = (industryValue === "All" || job.industry === industryValue);
            return matchType && matchIndustry;
        });

        displayJobs(filteredJobs);
    }

    // Add event listeners
    jobTypeFilter.addEventListener("change", filterJobs);
    industryFilter.addEventListener("change", filterJobs);
});
