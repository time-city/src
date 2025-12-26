/**
 * Include Partials - Loads HTML partials and injects them into placeholders
 */
export async function includePartials() {
  const includes = document.querySelectorAll('[data-include]');
  const promises = [];

  includes.forEach(async (element) => {
    const file = element.getAttribute('data-include');
    const promise = fetch(`partials/${file}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return response.text();
      })
      .then(html => {
        element.innerHTML = html;
      })
      .catch(error => {
        console.error(`Error loading ${file}:`, error);
        element.innerHTML = `<p style="color: #ef4444;">Error loading ${file}</p>`;
      });
    
    promises.push(promise);
  });

  await Promise.all(promises);
  return true;
}

