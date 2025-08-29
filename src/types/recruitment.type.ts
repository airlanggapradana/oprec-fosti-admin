export interface RecruitmentResponse {
  message: string;
  data: Pendaftar[];
  page: number | null;
  total: number;
}

export interface Pendaftar {
  id: string;
  nama: string;
  email: string;
  nim: string;
  no_telepon: string;
  gender: string;
  link_twibbon: string;
  link_video: string;
  alamat: string;
  motivasi: string;
  fakultas: string;
  prodi: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
  presensi: Presensi | null;
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
