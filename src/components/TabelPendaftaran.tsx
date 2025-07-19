import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, Eye, Plus, Search, Trash2} from "lucide-react";
import {useDeletePendaftar, useFetchRecruitment} from "@/utils/query.ts";
import Cookies from "js-cookie";
import PendaftaranDialog from "@/components/PendaftaranDialog.tsx";
import {useState} from "react";
import type {Pendaftar} from "@/types/recruitment.type.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

const TabelPendaftaran = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Pendaftar | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const token = Cookies.get("token");
  if (!token) {
    return <div className="text-red-500">You must be logged in to view this page.</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: recruitment, error, isLoading} = useFetchRecruitment(token as string);

  const filteredMahasiswa = recruitment?.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.nim.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handleDelete, isPending} = useDeletePendaftar(token as string);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Pendaftaran</h2>
          <p className="text-muted-foreground">Kelola data pendaftar</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4"/>
              Tambah Pendaftar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Pendaftar Baru</DialogTitle>
              <DialogDescription>Masukkan informasi pendaftar baru</DialogDescription>
            </DialogHeader>
            <PendaftaranDialog/>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa</CardTitle>
          <CardDescription>Total {recruitment?.length} mahasiswa terdaftar</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground"/>
            <Input
              placeholder="Cari mahasiswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIM</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fakultas</TableHead>
                <TableHead>Program Studi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recruitment && filteredMahasiswa ? (
                filteredMahasiswa.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.nim}</TableCell>
                    <TableCell>{m.nama}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.fakultas}</TableCell>
                    <TableCell>{m.prodi}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedMahasiswa(m)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4"/>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedMahasiswa(m)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="sm" disabled={isPending} onClick={() => handleDelete(m.id)}>
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    {isLoading ? "Loading..." : error ? "Error loading data" : "No data found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Mahasiswa</DialogTitle>
            <DialogDescription>Ubah informasi mahasiswa</DialogDescription>
          </DialogHeader>
          {selectedMahasiswa && <PendaftaranDialog pendaftar={selectedMahasiswa}/>}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Mahasiswa</DialogTitle>
          </DialogHeader>
          {selectedMahasiswa && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">NIM</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.nim}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Nama</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.nama}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fakultas</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.fakultas}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Program Studi</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.prodi}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TabelPendaftaran;
