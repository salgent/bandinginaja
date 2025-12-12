export const EXECUTE_JAVASCRIPT_TOKOPEDIA = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    let stableCount = 0;
    const scrollStep = 200;
    const maxWaitTime = 30000;
    const startTime = Date.now();
    
    const scrollGradually = () => {
      if (Date.now() - startTime > maxWaitTime) {
        resolve(document.documentElement.innerHTML);
        return;
      }
      
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      const isAtBottom = (currentScroll + windowHeight) >= documentHeight - 100;
      
      if (!isAtBottom) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'auto'
        });
        requestAnimationFrame(scrollGradually);
      } else {
        if (currentHeight === lastHeight) {
          stableCount++;
          
          if (stableCount >= 2) {
            const images = document.querySelectorAll('img[alt="product-image"]');
            let placeholderCount = 0;
            
            images.forEach(img => {
              if (img.src.includes('85cc883d.svg')) {
                placeholderCount++;
              }
            });
            
            if (placeholderCount > images.length * 0.1 && stableCount < 3) {
              scrollGradually();
            } else {
              resolve(document.documentElement.innerHTML);
            }
          } else {
            scrollGradually();
          }
        } else {
          lastHeight = currentHeight;
          stableCount = 0;
          scrollGradually();
        }
      }
    };
    
    const waitForFirst = () => {
      const firstImage = document.querySelector('img[alt="product-image"]');
      if (firstImage) {
        scrollGradually();
      } else {
        requestAnimationFrame(waitForFirst);
      }
    };
    
    waitForFirst();
  });
})();
`;

export const EXECUTE_JAVASCRIPT_LAZADA = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    let stableCount = 0;
    const scrollStep = 200;
    const maxWaitTime = 30000;
    const startTime = Date.now();
    
    const scrollGradually = () => {
      if (Date.now() - startTime > maxWaitTime) {
        resolve(document.documentElement.innerHTML);
        return;
      }
      
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      const isAtBottom = (currentScroll + windowHeight) >= documentHeight - 100;
      
      if (!isAtBottom) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'auto'
        });
        requestAnimationFrame(scrollGradually);
      } else {
        if (currentHeight === lastHeight) {
          stableCount++;
          
          if (stableCount >= 2) {
            resolve(document.documentElement.innerHTML);
          } else {
            scrollGradually();
          }
        } else {
          lastHeight = currentHeight;
          stableCount = 0;
          scrollGradually();
        }
      }
    };
    
    const waitForFirst = () => {
      const firstImage = document.querySelector('img[type="product"]');
      if (firstImage) {
        scrollGradually();
      } else {
        requestAnimationFrame(waitForFirst);
      }
    };
    
    waitForFirst();
  });
})();
`;

export const EXECUTE_JAVASCRIPT_SHOPEE = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    let stableCount = 0;
    const scrollStep = 200;
    const maxWaitTime = 30000;
    const startTime = Date.now();
    
    const scrollGradually = () => {
      if (Date.now() - startTime > maxWaitTime) {
        resolve(document.documentElement.innerHTML);
        return;
      }
      
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      const isAtBottom = (currentScroll + windowHeight) >= documentHeight - 100;
      
      if (!isAtBottom) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'auto'
        });
        requestAnimationFrame(scrollGradually);
      } else {
        if (currentHeight === lastHeight) {
          stableCount++;
          
          if (stableCount >= 2) {
            resolve(document.documentElement.innerHTML);
          } else {
            scrollGradually();
          }
        } else {
          lastHeight = currentHeight;
          stableCount = 0;
          scrollGradually();
        }
      }
    };
    
    const waitForFirst = () => {
      const firstImage = document.querySelector('img.inset-y-0.w-full.h-full.pointer-events-none.object-contain.absolute');
      if (firstImage) {
        scrollGradually();
      } else {
        requestAnimationFrame(waitForFirst);
      }
    };
    
    waitForFirst();
  });
})();
`;

export const EXECUTE_JAVASCRIPT_BLIBLI = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    let stableCount = 0;
    const scrollStep = 200;
    const maxWaitTime = 30000;
    const startTime = Date.now();
    
    const scrollGradually = () => {
      if (Date.now() - startTime > maxWaitTime) {
        resolve(document.documentElement.innerHTML);
        return;
      }
      
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      const isAtBottom = (currentScroll + windowHeight) >= documentHeight - 100;
      
      if (!isAtBottom) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'auto'
        });
        requestAnimationFrame(scrollGradually);
      } else {
        if (currentHeight === lastHeight) {
          stableCount++;
          
          if (stableCount >= 2) {
            resolve(document.documentElement.innerHTML);
          } else {
            scrollGradually();
          }
        } else {
          lastHeight = currentHeight;
          stableCount = 0;
          scrollGradually();
        }
      }
    };
    
    const waitForFirst = () => {
      const firstImage = document.querySelector('div.product-list.product-list__container__side');
      if (firstImage) {
        scrollGradually();
      } else {
        requestAnimationFrame(waitForFirst);
      }
    };
    
    waitForFirst();
  });
})();
`;
