import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight, CheckIcon, Edit, Eye, Plus, Search, Trash2, XIcon} from "lucide-react";
import {
  useDeletePendaftar,
  useFetchRecruitment,
  useSeleksiPendaftar,
} from "@/utils/query.ts";
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
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useQuery} from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {TableLoadingSkeleton} from "@/components/TableLoadingSkeleton.tsx";

const TabelPendaftaran = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Pendaftar | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [page, setPage] = useState(1);
  const token = Cookies.get("token");
  if (!token) {
    return <div className="text-red-500">You must be logged in to view this page.</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data, error, isLoading} = useQuery(useFetchRecruitment(token as string, page, 20));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: data2} = useQuery(useFetchRecruitment(token as string));

  const recruitment = data?.data;

  const filteredMahasiswa = recruitment?.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.nim.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.fakultas.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handleDelete, isPending} = useDeletePendaftar(token as string);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handleSeleksiDiterima, isPending: isPendingAccepted} = useSeleksiPendaftar(token as string, true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handleSeleksiDitolak, isPending: isPendingRejected} = useSeleksiPendaftar(token as string, false);
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
            <PendaftaranDialog setIsAddDialogOpen={setIsAddDialogOpen}/>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa</CardTitle>
          <CardDescription>Menampilkan {recruitment?.length} dari {data2?.total} pendaftar.</CardDescription>
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
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(filteredMahasiswa) && filteredMahasiswa.length > 0 && recruitment ? (
                filteredMahasiswa?.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.nim}</TableCell>
                    <TableCell>{m.nama}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.fakultas}</TableCell>
                    <TableCell>{m.prodi}</TableCell>
                    <TableCell>
                      <Badge
                        variant={m.status === 'ACCEPTED' ? 'default' : m.status === 'REJECTED' ? 'destructive' : 'secondary'}
                      >
                        {m.status}
                      </Badge>
                    </TableCell>
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
                          variant={"ghost"}
                          size="sm"
                          disabled={m.status === 'ACCEPTED' || m.status === 'REJECTED' || isPendingAccepted}
                          onClick={() => handleSeleksiDiterima(m.id)}
                        >
                          <CheckIcon className="h-4 w-4"/>
                        </Button>
                        <Button
                          variant={"ghost"}
                          size="sm"
                          disabled={m.status === 'ACCEPTED' || m.status === 'REJECTED' || isPendingRejected}
                          onClick={() => handleSeleksiDitolak(m.id)}
                        >
                          <XIcon className="h-4 w-4"/>
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
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-red-500 text-center">
                    {error.message}
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <TableLoadingSkeleton rows={20} columns={7} showFilters={false} showHeader={false}
                                          variant={"compact"}/>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="secondary"
                  onClick={() => setPage(page - 1)}
                  className="flex items-center"
                  disabled={page === 1}
                >
                  <span>
                    <ArrowLeft className="h-4 w-4"/>
                  </span>
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="secondary"
                  onClick={() => setPage(page + 1)}
                  className="flex items-center"
                >
                  Next
                  <span>
                    <ArrowRight className="h-4 w-4"/>
                  </span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Mahasiswa</DialogTitle>
            <DialogDescription>Ubah informasi mahasiswa</DialogDescription>
          </DialogHeader>
          {selectedMahasiswa &&
              <PendaftaranDialog pendaftar={selectedMahasiswa} setIsAddDialogOpen={setIsAddDialogOpen}/>}
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
                <div>
                  <Label className="text-sm font-medium">Motivasi</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.motivasi}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <p className="text-sm text-muted-foreground">{selectedMahasiswa.status}</p>
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
