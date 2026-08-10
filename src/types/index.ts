import { JNERow } from '../data/jneData';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface BuyerForm {
  name: string;
  whatsapp: string;
  address: string;
  city: string;
  village: string;
  district: string;
  province: string;
  postal: string;
  note: string;
}

export interface JNEDestination {
  raw: JNERow;
  province: string;
  regencyType: string;
  regencyName: string;
  district: string;
  village: string;
  postalCode: string;
  code: string;
  regFee: number;
  yesFee: number;
  spsFee: number;
  minEta: number | string;
  maxEta: number | string;
  searchKey: string;
}

export interface ShippingServiceOption {
  code: 'REG' | 'YES' | 'SPS';
  name: string;
  feePerKg: number;
  totalFee: number;
  eta: string;
}

export type PaymentMethodType = 'QRIS' | 'BSI' | 'BNI' | 'BRI';

export interface PaymentSession {
  orderNumber: string;
  paymentMethod: PaymentMethodType;
  productTotal: number;
  shippingTotal: number;
  grandTotal: number;
  createdAt: number;
  expiresAt: number;
  isExpired: boolean;
  isConfirmed: boolean;
}
