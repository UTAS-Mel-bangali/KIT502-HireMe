document.addEventListener('DOMContentLoaded', () => {
    // dummy data
    const applications = [
        { name: "John Smith", email: "john@example.com", phone: "0400 123 456", job: "IT Support", type: "Full-time", date: "2025-08-01", status: "Pending", cv: "#" },
        { name: "Jane Doe", email: "jane@example.com", phone: "0401 987 654", job: "Cleaner", type: "Casual", date: "2025-08-03", status: "Reviewed", cv: "#" },
        { name: "Michael Lee", email: "michael@example.com", phone: "0402 555 111", job: "Receptionist", type: "Part-time", date: "2025-08-05", status: "Rejected", cv: "#" }
    ];

    let selectedIndex = null;

    function getStatusClass(status) {
        return status === "Pending" ? "bg-warning text-dark" :
            status === "Reviewed" ? "bg-success" : "bg-danger";
    }

    function renderTable(data) {
        const tableBody = document.getElementById("AllApplicantTable");
        tableBody.innerHTML = "";
        data.forEach((app, index) => {
            tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${app.name}</td>
                <td>${app.job}</td>
                <td>${app.type}</td>
                <td>${app.date}</td>
                <td><span class="badge ${getStatusClass(app.status)} status-badge">${app.status}</span></td>
                <td><button class="btn btn-sm btn-primary view-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#viewModal">View</button></td>
            </tr>
        `;
        });

        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                selectedIndex = btn.dataset.index;
                const app = applications[selectedIndex];
                document.getElementById("modalName").innerText = app.name;
                document.getElementById("modalEmail").innerText = app.email;
                document.getElementById("modalPhone").innerText = app.phone;
                document.getElementById("modalJob").innerText = app.job;
                document.getElementById("modalType").innerText = app.type;
                document.getElementById("modalStatus").value = app.status;
                document.getElementById("modalCV").href = app.cv;
            });
        });
    }

    function applyFilters() {
        const jobValue = document.getElementById("jobFilter").value;
        const typeValue = document.getElementById("typeFilter").value;
        const statusValue = document.getElementById("statusFilter").value;

        const filtered = applications.filter(app => {
            return (
                (jobValue === "" || app.job === jobValue) &&
                (typeValue === "" || app.type === typeValue) &&
                (statusValue === "" || app.status === statusValue)
            );
        });
        renderTable(filtered);
    }

    document.getElementById("jobFilter").addEventListener("change", applyFilters);
    document.getElementById("typeFilter").addEventListener("change", applyFilters);
    document.getElementById("statusFilter").addEventListener("change", applyFilters);

    document.getElementById("saveStatus").addEventListener("click", () => {
        if (selectedIndex !== null) {
            applications[selectedIndex].status = document.getElementById("modalStatus").value;
            renderTable(applications);
            const modal = bootstrap.Modal.getInstance(document.getElementById("viewModal"));
            modal.hide();
        }
    });

    renderTable(applications);
});