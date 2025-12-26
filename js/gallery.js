/**
 * Gallery - Filter and load more functionality
 */

let currentFilter = 'all';
let displayedCount = 9;
const itemsPerLoad = 9;

function filterGallery(filter) {
  currentFilter = filter;
  displayedCount = itemsPerLoad;
  
  const items = document.querySelectorAll('.gallery-item');
  const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
  
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.classList.remove('active');
  });
  if (activeBtn) activeBtn.classList.add('active');
  
  items.forEach((item, index) => {
    const category = item.getAttribute('data-category');
    const shouldShow = filter === 'all' || category === filter;
    
    if (shouldShow && index < displayedCount) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  
  const loadMoreBtn = document.querySelector('.gallery-load-more');
  const totalVisible = Array.from(items).filter(item => {
    const category = item.getAttribute('data-category');
    return filter === 'all' || category === filter;
  }).length;
  
  if (loadMoreBtn) {
    if (displayedCount >= totalVisible) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }
}

function loadMore() {
  displayedCount += itemsPerLoad;
  filterGallery(currentFilter);
}

export function initGallery() {
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterGallery(filter);
    });
  });
  
  const loadMoreBtn = document.querySelector('.gallery-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMore);
  }
  
  filterGallery('all');
}

