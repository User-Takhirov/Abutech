export interface dataFormData {
  title?: string;
  courseId?: number;
}

export interface dataType {
  data: {
    fileName: string;
    path: string;
    size: number;
  }[];
}
export interface fileType {
  data: {
    fileName: string;
    path: string;
    size: number;
  }[];
  error: null;
  success: boolean;
}
export interface ReusableFormProps {
  submit?: (data: dataFormData) => void;
  handleFileUpload?: (file: any) => void;
  onCancel?: () => void;
}
export interface Contract {
  key: number;
  id: number;
  title: string;
  name: string;
}
export interface editDataType {
  title?: string;
  courseId: number;
  attachment: {
    size?: number;
    url?: string;
    origName?: string;
  };
}
