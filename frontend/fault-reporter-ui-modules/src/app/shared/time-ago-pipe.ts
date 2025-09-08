import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe to transform timestamps into human-readable relative time format
 * Used in fault report popups to show when faults were reported (e.g., "2 hours ago")
 */
@Pipe({
  name: 'timeAgo',
  standalone: false // Required for module-based architecture
})
export class TimeAgoPipe implements PipeTransform {

  /**
   * Transforms a date/timestamp into relative time string
   * @param value - Date string or Date object from backend
   * @returns Human-readable time difference (e.g., "2 hours ago", "Just now")
   */
  transform(value: string | Date): string {
    if (!value) return '';
    // Handle both string and Date inputs
    const now = new Date();
    const date = new Date(value);
    const diff = now.getTime() - date.getTime();

    // Calculate time differences in various units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Return appropriate relative time string
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}
