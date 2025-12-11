export const EXECUTE_JAVASCRIPT_TOKOPEDIA = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    const scrollStep = 150;
    
    const waitForImages = (callback) => {
      const checkImages = () => {
        const productImages = document.querySelector('img[alt="product-image"]');
        
        if (productImages) {
          callback();
        } else {
          setTimeout(checkImages, 500);
        }
      };
      
      checkImages();
    };
    
    const scrollGradually = () => {
      const currentScroll = window.scrollY;
      const targetScroll = document.body.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      if (currentScroll < targetScroll - 100) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'smooth'
        });
        setTimeout(scrollGradually, 200);
      } else {
        if (currentHeight === lastHeight) {
          setTimeout(() => {
            resolve(document.documentElement.innerHTML);
          }, 2000);
        } else {
          lastHeight = currentHeight;
          setTimeout(scrollGradually, 1000);
        }
      }
    };
    
    waitForImages(scrollGradually);
    
    setTimeout(() => {
      resolve(document.documentElement.innerHTML);
    }, 10000);
  });
})();
`;

export const EXECUTE_JAVASCRIPT_LAZADA = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    const scrollStep = 150;
    
    const waitForImages = (callback) => {
      const checkImages = () => {
        const productImages = document.querySelector('img[type="product"]');
        
        if (productImages) {
          callback();
        } else {
          setTimeout(checkImages, 500);
        }
      };
      
      checkImages();
    };
    
    const scrollGradually = () => {
      const currentScroll = window.scrollY;
      const targetScroll = document.body.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      if (currentScroll < targetScroll - 100) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'smooth'
        });
        setTimeout(scrollGradually, 200);
      } else {
        if (currentHeight === lastHeight) {
          setTimeout(() => {
            resolve(document.documentElement.innerHTML);
          }, 2000);
        } else {
          lastHeight = currentHeight;
          setTimeout(scrollGradually, 1000);
        }
      }
    };
    
    waitForImages(scrollGradually);
    
    setTimeout(() => {
      resolve(document.documentElement.innerHTML);
    }, 10000);
  });
})();
`;

export const EXECUTE_JAVASCRIPT_SHOPEE = `
(() => { 
  return new Promise((resolve) => { 
    let lastHeight = 0;
    const scrollStep = 150;
    
    const waitForImages = (callback) => {
      const checkImages = () => {
        const productImages = document.querySelector('img.inset-y-0.w-full.h-full.pointer-events-none.object-contain.absolute');
        
        if (productImages) {
          callback();
        } else {
          setTimeout(checkImages, 500);
        }
      };
      
      checkImages();
    };
    
    const scrollGradually = () => {
      const currentScroll = window.scrollY;
      const targetScroll = document.body.scrollHeight;
      const currentHeight = document.body.scrollHeight;
      
      if (currentScroll < targetScroll - 100) {
        window.scrollTo({
          top: currentScroll + scrollStep,
          behavior: 'smooth'
        });
        setTimeout(scrollGradually, 200);
      } else {
        if (currentHeight === lastHeight) {
          setTimeout(() => {
            resolve(document.documentElement.innerHTML);
          }, 2000);
        } else {
          lastHeight = currentHeight;
          setTimeout(scrollGradually, 1000);
        }
      }
    };
    
    waitForImages(scrollGradually);
    
    setTimeout(() => {
      resolve(document.documentElement.innerHTML);
    }, 10000);
  });
})();
`;

// (() => {
//   return new Promise((resolve) => {
//     const checkForElement = () => {
//       const productImages = document.querySelectorAll('img[alt="product-image"]');
//       if (productImages.length > 0) {
//         const base64Images = Array.from(productImages)

//         if (base64Images.length > 0) {
//           base64Images[base64Images.length - 10].scrollIntoView({ behavior: 'smooth', block: 'center' });
//           setTimeout(checkForElement, base64Images.length + 2000);
//         } else {
//           resolve(document.documentElement.innerHTML);
//         }
//       } else {
//         setTimeout(checkForElement, 100);
//       }
//     };

//     checkForElement();
//     setTimeout(() => {
//       resolve(document.documentElement.innerHTML);
//     }, 10000);
//   });
// })();
