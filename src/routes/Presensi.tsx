import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Newspaper, Search, Users} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TableLoadingSkeleton} from "@/components/TableLoadingSkeleton.tsx";
import {useExportAsExcel, useFetchAcceptedPendaftar, useFetchPresensi, usePresensi} from "@/utils/query.ts";
import Cookies from "js-cookie";
import {useState} from "react";


const Presensi = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const token = Cookies.get("token");
  if (!token) {
    return <div className="text-red-500">You must be logged in to view this page.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data, error: errorPresensi, isLoading: isLoadingPresensi} = useFetchPresensi(token as string);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handlePresensiHadir, isPending: isPendingHadir} = usePresensi(token as string, "HADIR")

  const {
    mutateAsync: handlePresensiTidakHadir,
    isPending: isPendingTidakHadir
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePresensi(token as string, "TIDAK_HADIR")
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handlePresensiIzin, isPending: isPendingIzin} = usePresensi(token as string, "IZIN")

  const {
    data: pendaftar,
    error: errorPendaftar,
    isLoading: isLoadingPendaftar
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFetchAcceptedPendaftar(token as string)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handleExport, isPending} = useExportAsExcel(token as string, "Presensi");

  // filter mahasiswa yang belum melakukan presensi
  const noPresensiMahasiswa = pendaftar?.filter(m => m.presensi === null || m.presensi === undefined);

  const filteredMahasiswa = noPresensiMahasiswa?.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.nim.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.fakultas.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const presensi = data?.data;
  return (
    <div className="flex items-start gap-5 w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Presensi</CardTitle>
            <Button onClick={() => handleExport()} disabled={isPending}>
              <span><Newspaper/></span>{isPending ? "Exporting..." : "Export as Excel"}
            </Button>
          </div>
          <CardDescription>Menampilkan {pendaftar?.length} pendaftar.</CardDescription>
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
              {Array.isArray(filteredMahasiswa) && filteredMahasiswa.length > 0 && pendaftar ? (
                filteredMahasiswa?.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.nim}</TableCell>
                    <TableCell>{m.nama}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.fakultas}</TableCell>
                    <TableCell>{m.prodi}</TableCell>
                    <TableCell>
                      <Badge
                        variant={"secondary"}
                        className="bg-lime-500 text-white"
                      >
                        {m.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="default"
                          size="sm"
                          disabled={isPendingHadir}
                          onClick={async () => {
                            await handlePresensiHadir(m.id)
                          }}
                        >
                          {isPendingHadir ? "Loading..." : "Hadir"}
                        </Button>
                        <Button
                          variant={"destructive"}
                          size="sm"
                          disabled={isPendingTidakHadir}
                          onClick={async () => {
                            await handlePresensiTidakHadir(m.id)
                          }}
                        >
                          {isPendingTidakHadir ? "Loading..." : "Tidak Hadir"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-sky-500 text-white"
                          disabled={isPendingIzin}
                          onClick={async () => {
                            await handlePresensiIzin(m.id)
                          }}
                        >
                          {isPendingIzin ? "Loading..." : "Izin"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : errorPendaftar ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-red-500 text-center">
                    {errorPendaftar.message}
                  </TableCell>
                </TableRow>
              ) : isLoadingPendaftar ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <TableLoadingSkeleton rows={20} columns={7} showFilters={false} showHeader={false}
                                          variant={"compact"}/>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Belum ada mahasiswa yang diterima.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center w-full gap-5">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hadir</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            {isLoadingPresensi ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : errorPresensi ? (
              <div className="text-red-500 text-2xl font-bold">{errorPresensi.message}</div>
            ) : presensi ? (
              <>
                <div className="text-2xl font-bold">{presensi.filter(d => d.status === "HADIR").length}</div>
                <p className="text-xs text-muted-foreground">
                  {presensi.filter(d => d.status === "HADIR").length} mahasiswa telah melakukan presensi hari ini.
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">Belum ada presensi...</div>
            )}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Izin</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            {isLoadingPresensi ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : errorPresensi ? (
              <div className="text-red-500 text-2xl font-bold">{errorPresensi.message}</div>
            ) : presensi ? (
              <>
                <div className="text-2xl font-bold">{presensi.filter(d => d.status === "IZIN").length}</div>
                <p className="text-xs text-muted-foreground">
                  {presensi.filter(d => d.status === "IZIN").length} mahasiswa izin presensi hari ini.
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">Belum ada presensi...</div>
            )}
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tidak Hadir</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            {isLoadingPresensi ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : errorPresensi ? (
              <div className="text-red-500 text-2xl font-bold">{errorPresensi.message}</div>
            ) : presensi ? (
              <>
                <div className="text-2xl font-bold">{presensi.filter(d => d.status === "TIDAK_HADIR").length}</div>
                <p className="text-xs text-muted-foreground">
                  {presensi.filter(d => d.status === "TIDAK_HADIR").length} mahasiswa tidak hadir hari ini.
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">Belum ada presensi...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Presensi;
