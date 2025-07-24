import { spoilerShieldService } from '../../shared/utils/api/spoilerShieldService';

// Periodic cache cleanup
setInterval(() => {
  spoilerShieldService.clearCache();
  console.log('Cache cleared by background script');
}, 30 * 60 * 1000); // Clear cache every 30 minutes

// Handle extension uninstall to clean up data
chrome.runtime.setUninstallURL('https://spoilershield.com/uninstall', () => {
  console.log('Uninstall URL set');
});

console.log('SpoilerShield background script loaded'); 