document.addEventListener('DOMContentLoaded', () => {
    const jobTypeFilter = document.getElementById('jobType');
    const industryFilter = document.getElementById('industry');
    const jobCards = document.querySelectorAll('.job-card');
  
    function filterJobs() {
      const selectedType = jobTypeFilter.value;
      const selectedIndustry = industryFilter.value;
  
      jobCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const industry = card.getAttribute('data-industry');
  
        const matchesType = selectedType === 'All' || type === selectedType;
        const matchesIndustry = selectedIndustry === 'All' || industry === selectedIndustry;
  
        card.style.display = (matchesType && matchesIndustry) ? 'block' : 'none';
      });
    }
  
    jobTypeFilter.addEventListener('change', filterJobs);
    industryFilter.addEventListener('change', filterJobs);
  });
  