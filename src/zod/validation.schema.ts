import {z} from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, "username minimal 3 karakter").max(255),
  password: z.string().min(8, "password minimal 8 karakter").max(16),
});

export const recruitmentSchema = z.object({
  nama: z.string().nonempty("field nama tidak boleh kosong").min(3).max(255),
  nim: z.string().nonempty().min(10).max(10),
  email: z.email("email tidak valid"),
  no_telepon: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, {
    message: "Nomor telepon tidak valid.",
  }),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"]),
  alamat: z.string().nonempty(),
  motivasi: z.string().nonempty(),
  fakultas: z.enum([
    "FKIP",
    "FEB",
    "FH",
    "FT",
    "FF",
    "FP",
    "FG",
    "FAI",
    "FIK",
    "FK",
    "FKG",
    "FKI"
  ]),
  prodi: z.string().min(3),
});

export type RecruitmentSchema = z.infer<typeof recruitmentSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;