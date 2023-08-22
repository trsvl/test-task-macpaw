import { currentPageOptions } from '@/Interfaces/SelectedPageInterface';
import { usePathname } from 'next/navigation';

export function GetPath() {
  const pathname = usePathname();
  const currentPath = pathname.substring(1) as currentPageOptions
  
  return currentPath;
}