import { currentPageOptions } from '@/Interfaces/CurrentPath';
import { usePathname } from 'next/navigation';

export function GetPath() {
  const pathname = usePathname();
  const currentPath = pathname.substring(1) as currentPageOptions
  
  return currentPath;
}
export function GetInnerPath() {
  const pathname = usePathname();
  const checkInnerPath = pathname.split("/").length;
  
  return checkInnerPath;
}

export function GetInnerPathId() {
  const pathname = usePathname();
  const checkInnerPath = pathname.split("/");
  
  return checkInnerPath[2];
}