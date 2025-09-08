import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const now = new Date();
    const date = new Date(value);
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}
