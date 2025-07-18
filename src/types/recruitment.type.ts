export interface RecruitmentResponse {
  message: string;
  data: Pendaftar[];
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
  createdAt: Date;
  updatedAt: Date;
}
