/**
 * Theme colors matching the Flutter QR Snap app
 * Provides semantic colors that adapt to light and dark themes
 */

export const themeColors = {
  // Success colors (green)
  success: {
    light: '#4CAF50', // Material Green 500
    dark: '#81C784', // Material Green 300
    container: {
      light: 'rgba(76, 175, 80, 0.1)',
      dark: 'rgba(129, 199, 132, 0.1)',
    },
    border: {
      light: 'rgba(76, 175, 80, 0.3)',
      dark: 'rgba(129, 199, 132, 0.3)',
    },
  },

  // Error colors (red)
  error: {
    light: '#E57373', // Material Red 300
    dark: '#EF5350', // Material Red 400
    container: {
      light: 'rgba(229, 115, 115, 0.1)',
      dark: 'rgba(239, 83, 80, 0.1)',
    },
    border: {
      light: 'rgba(229, 115, 115, 0.3)',
      dark: 'rgba(239, 83, 80, 0.3)',
    },
  },

  // Warning colors (orange)
  warning: {
    light: '#FF9800', // Material Orange 500
    dark: '#FFB74D', // Material Orange 300
    container: {
      light: 'rgba(255, 152, 0, 0.1)',
      dark: 'rgba(255, 183, 77, 0.1)',
    },
    border: {
      light: 'rgba(255, 152, 0, 0.3)',
      dark: 'rgba(255, 183, 77, 0.3)',
    },
  },

  // Info colors (blue)
  info: {
    light: '#2196F3', // Material Blue 500
    dark: '#64B5F6', // Material Blue 300
    container: {
      light: 'rgba(33, 150, 243, 0.1)',
      dark: 'rgba(100, 181, 246, 0.1)',
    },
    border: {
      light: 'rgba(33, 150, 243, 0.3)',
      dark: 'rgba(100, 181, 246, 0.3)',
    },
  },

  // Premium colors (gold)
  premium: {
    light: '#FFC107', // Material Amber 500
    dark: '#FFD700', // Gold
    container: {
      light: 'rgba(255, 193, 7, 0.1)',
      dark: 'rgba(255, 215, 0, 0.1)',
    },
    border: {
      light: 'rgba(255, 193, 7, 0.3)',
      dark: 'rgba(255, 215, 0, 0.3)',
    },
    on: '#000000', // Black text on premium background
  },
}

// CSS variable helpers
export function getThemeCSSVariables(isDark: boolean = false) {
  const mode = isDark ? 'dark' : 'light'
  
  return {
    '--color-success': themeColors.success[mode],
    '--color-success-container': themeColors.success.container[mode],
    '--color-success-border': themeColors.success.border[mode],
    '--color-error': themeColors.error[mode],
    '--color-error-container': themeColors.error.container[mode],
    '--color-error-border': themeColors.error.border[mode],
    '--color-warning': themeColors.warning[mode],
    '--color-warning-container': themeColors.warning.container[mode],
    '--color-warning-border': themeColors.warning.border[mode],
    '--color-info': themeColors.info[mode],
    '--color-info-container': themeColors.info.container[mode],
    '--color-info-border': themeColors.info.border[mode],
    '--color-premium': themeColors.premium[mode],
    '--color-premium-container': themeColors.premium.container[mode],
    '--color-premium-border': themeColors.premium.border[mode],
    '--color-premium-on': themeColors.premium.on,
  }
}

