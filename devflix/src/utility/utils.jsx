
// Function to truncate text to a specified length
export function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...'; // Subtract 3 for the ellipsis
    }
    return text;
  }