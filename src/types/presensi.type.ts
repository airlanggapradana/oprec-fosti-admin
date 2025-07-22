export interface PresensiAPIResponse {
  message: string;
  data: Presensi[];
  total: number;
}

export interface Presensi {
  id: string;
  id_recruitment: string;
  nama: string;
  waktu_datang: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
