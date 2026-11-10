export type Language = 'hi' | 'en';

export type SevaCategoryKey = 'bhoomi_daan' | 'mandir_nirman' | 'jal_seva' | 'bhagwat_katha';

export interface SevaOption {
  id: string;
  category: SevaCategoryKey;
  titleHi: string;
  titleEn: string;
  amount: number;
  unitHi: string;
  unitEn: string;
  descriptionHi: string;
  descriptionEn: string;
  popular?: boolean;
}

export interface TrustAccount {
  id: string;
  name: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
  bankName: string;
  qrImagePath: string;
  mid?: string;
  tid?: string;
  helpdesk?: string;
  upiId?: string;
  descriptionHi: string;
  descriptionEn: string;
}

export interface SankalpFormData {
  fullName: string;
  gotra: string;
  familyHead: string;
  cityState: string;
  phoneNumber: string;
  selectedCategory: SevaCategoryKey;
  selectedOptionId: string;
  customAmount?: number;
  nimitt: 'ancestors' | 'family' | 'custom';
  ancestorNames?: string;
  specialOccasion?: string;
  notes?: string;
  selectedTrustId: string;
  paymentMode: 'upi_qr' | 'bank_transfer' | 'custom_upi';
  transactionRef?: string;
}

export interface SankalpReceipt {
  receiptNumber: string;
  date: string;
  donorName: string;
  gotra: string;
  cityState: string;
  phone: string;
  sevaCategory: SevaCategoryKey;
  sevaTitle: string;
  amount: number;
  trustName: string;
  accountNumber: string;
  transactionRef: string;
  nimittType: string;
  nimittDetails?: string;
}
