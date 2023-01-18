export interface Donor {
  id?: string;
  createdBy?: string;
  name: string;
  isGodFather: boolean;
  email: string | null;
  phone: string | null;
  mercadoPagoEmail: string | null;
  dni: string;
  owner?: DonorCreator;
}

export interface DonorCreator {
  email: string;
  id: string;
  isActive: boolean;
  name: string;
  phone: string;
}
