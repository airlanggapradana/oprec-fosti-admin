import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {Pendaftar} from "@/types/recruitment.type.ts";
import {useAddPendaftar, useUpdatePendaftar} from "@/utils/query.ts";
import Cookies from "js-cookie";
import {type SubmitHandler, useForm} from "react-hook-form";
import {recruitmentSchema, type RecruitmentSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface PendaftaranDialogProps {
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  pendaftar?: Pendaftar
}

const PendaftaranDialog = ({pendaftar, setIsAddDialogOpen, setIsEditDialogOpen}: PendaftaranDialogProps) => {
  const token = Cookies.get("token");
  const form = useForm<RecruitmentSchema | Partial<RecruitmentSchema>>({
    defaultValues: {
      email: pendaftar ? pendaftar.email : "",
      nim: pendaftar ? pendaftar.nim : "",
      nama: pendaftar ? pendaftar.nama : "",
      fakultas: pendaftar ? pendaftar.fakultas as "FKIP" | "FEB" | "FH" | "FT" | "FF" | "FP" | "FG" | "FAI" | "FIK" | "FK" | "FKG" | "FKI" : undefined,
      prodi: pendaftar ? pendaftar.prodi : "",
      link_video: pendaftar ? pendaftar.link_video : "",
      link_twibbon: pendaftar ? pendaftar.link_twibbon : "",
      alamat: pendaftar ? pendaftar.alamat : "",
      gender: pendaftar ? pendaftar.gender as "LAKI_LAKI" | "PEREMPUAN" : undefined,
      no_telepon: pendaftar ? pendaftar.no_telepon : "",
      status: pendaftar ? pendaftar.status : "PENDING",
      motivasi: pendaftar ? pendaftar.motivasi : "",
    },
    resolver: zodResolver(pendaftar ? recruitmentSchema.partial() : recruitmentSchema),
  })

  const {mutateAsync: handleAdd, isPending: isPendingAdd} = useAddPendaftar(token as string, setIsAddDialogOpen);
  const {
    mutateAsync: handleUpdate,
    isPending: isPendingUpdate
  } = useUpdatePendaftar(token as string, setIsEditDialogOpen);

  const onSubmit: SubmitHandler<RecruitmentSchema | Partial<RecruitmentSchema>> = async (data) => {
    if (pendaftar) {
      await handleUpdate({pendaftar: data as Partial<RecruitmentSchema>, id: pendaftar.id});
    } else {
      await handleAdd(data as RecruitmentSchema);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="nim"
            render={({field}) => (
              <FormItem>
                <FormLabel>NIM</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan NIM" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nama"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama lengkap" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Masukkan email" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fakultas"
            render={({field}) => (
              <FormItem>
                <FormLabel>Fakultas</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih fakultas"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FKIP">FKIP</SelectItem>
                    <SelectItem value="FEB">FEB</SelectItem>
                    <SelectItem value="FH">FH</SelectItem>
                    <SelectItem value="FT">FT</SelectItem>
                    <SelectItem value="FF">FF</SelectItem>
                    <SelectItem value="FP">FP</SelectItem>
                    <SelectItem value="FG">FG</SelectItem>
                    <SelectItem value="FAI">FAI</SelectItem>
                    <SelectItem value="FIK">FIK</SelectItem>
                    <SelectItem value="FK">FK</SelectItem>
                    <SelectItem value="FKG">FKG</SelectItem>
                    <SelectItem value="FKI">FKI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prodi"
            render={({field}) => (
              <FormItem>
                <FormLabel>Program Studi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan program studi" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alamat"
            render={({field}) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan alamat" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({field}) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih jenis kelamin"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                    <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({field}) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="ACCEPTED">Accepted</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_telepon"
            render={({field}) => (
              <FormItem>
                <FormLabel>No. Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan no. telepon" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

        </div>
        <FormField
          control={form.control}
          name="motivasi"
          render={({field}) => (
            <FormItem>
              <FormLabel>Motivasi</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan motivasi" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isPendingAdd || isPendingUpdate}>
            {pendaftar ? "Update" : "Add"} Mahasiswa
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PendaftaranDialog;
