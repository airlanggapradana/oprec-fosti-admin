export interface RecruitmentResponse {
  message: string;
  data: Pendaftar[];
  page: number;
  total: number;
}

export interface Pendaftar {
  id: string;
  nama: string;
  email: string;
  nim: string;
  no_telepon: string;
  gender: string;
  alamat: string;
  motivasi: string;
  fakultas: string;
  prodi: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}
