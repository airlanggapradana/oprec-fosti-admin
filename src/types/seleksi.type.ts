export interface SeleksiResponse {
  message: string;
  data: Pendaftar;
}

interface Pendaftar {
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
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
