
export interface Order {
  id: string;
}


export interface SidebarProps {
  activeItem: string;
}


export interface PageTitleProps {
  title: string;
  subtitle: string;
}


export interface UserAvatarProps {
  name: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
}


export interface ProfileFieldProps {
  label: string;
  value: string;
  showEdit?: boolean;
  showNote?: string;
  customValueColor?: string;
}
