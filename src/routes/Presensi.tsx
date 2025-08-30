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
  const [loadingRow, setLoadingRow] = useState<{ [key: string]: string | null }>({});
  const [searchTermBelumPresensi, setSearchTermBelumPresensi] = useState("")
  const [searchTermSudahPresensi, setSearchTermSudahPresensi] = useState("")
  const token = Cookies.get("token");
  if (!token) {
    return <div className="text-red-500">You must be logged in to view this page.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data, error: errorPresensi, isLoading: isLoadingPresensi} = useFetchPresensi(token as string);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handlePresensiHadir} = usePresensi(token as string, "HADIR")

  const {
    mutateAsync: handlePresensiTidakHadir,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePresensi(token as string, "TIDAK_HADIR")
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handlePresensiIzin} = usePresensi(token as string, "IZIN")

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

  // filter mahasiswa yang sudah melakukan presensi
  const sudahPresensiMahasiswa = pendaftar?.filter(m => m.presensi !== null && m.presensi !== undefined);

  const filteredMahasiswa = noPresensiMahasiswa?.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchTermBelumPresensi.toLowerCase()) ||
      m.nim.includes(searchTermBelumPresensi) ||
      m.email.toLowerCase().includes(searchTermBelumPresensi.toLowerCase()) ||
      m.fakultas.toLowerCase().includes(searchTermBelumPresensi.toLowerCase()),
  )
  const filteredMahasiswaSudahPresensi = sudahPresensiMahasiswa?.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchTermSudahPresensi.toLowerCase()) ||
      m.nim.includes(searchTermSudahPresensi) ||
      m.email.toLowerCase().includes(searchTermSudahPresensi.toLowerCase()) ||
      m.fakultas.toLowerCase().includes(searchTermSudahPresensi.toLowerCase()),
  )

  const presensi = data?.data;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="col-span-1 sm:col-span-3 max-h-[490px] overflow-y-auto">
          <CardHeader>
            <CardTitle>Daftar Mahasiswa</CardTitle>
            <CardDescription>Menampilkan {filteredMahasiswa?.length} pendaftar yang belum melakukan
              presensi.</CardDescription>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground"/>
              <Input
                placeholder="Cari mahasiswa..."
                value={searchTermBelumPresensi}
                onChange={(e) => setSearchTermBelumPresensi(e.target.value)}
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
                            disabled={loadingRow[m.id] === "HADIR"}
                            onClick={async () => {
                              setLoadingRow({...loadingRow, [m.id]: "HADIR"});
                              await handlePresensiHadir(m.id);
                              setLoadingRow({...loadingRow, [m.id]: null});
                            }}
                          >
                            {loadingRow[m.id] === "HADIR" ? "Loading..." : "Hadir"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={loadingRow[m.id] === "TIDAK_HADIR"}
                            onClick={async () => {
                              setLoadingRow({...loadingRow, [m.id]: "TIDAK_HADIR"});
                              await handlePresensiTidakHadir(m.id);
                              setLoadingRow({...loadingRow, [m.id]: null});
                            }}
                          >
                            {loadingRow[m.id] === "TIDAK_HADIR" ? "Loading..." : "Tidak Hadir"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-sky-500 text-white"
                            disabled={loadingRow[m.id] === "IZIN"}
                            onClick={async () => {
                              setLoadingRow({...loadingRow, [m.id]: "IZIN"});
                              await handlePresensiIzin(m.id);
                              setLoadingRow({...loadingRow, [m.id]: null});
                            }}
                          >
                            {loadingRow[m.id] === "IZIN" ? "Loading..." : "Izin"}
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
        <div className="grid grid-cols-1 gap-5 w-full">
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
              ) : presensi && presensi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">{presensi.filter(d => d.status === "HADIR").length}</div>
                  <p className="text-xs text-muted-foreground">
                    {presensi.filter(d => d.status === "HADIR").length} mahasiswa telah melakukan presensi hari ini.
                  </p>
                </>
              ) : (
                <div className="text-base text-gray-500 font-semibold">Belum ada presensi...</div>
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
              ) : presensi && presensi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">{presensi.filter(d => d.status === "IZIN").length}</div>
                  <p className="text-xs text-muted-foreground">
                    {presensi.filter(d => d.status === "IZIN").length} mahasiswa izin presensi hari ini.
                  </p>
                </>
              ) : (
                <div className="text-base text-gray-500 font-semibold">Belum ada presensi...</div>
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
              ) : presensi && presensi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold">{presensi.filter(d => d.status === "TIDAK_HADIR").length}</div>
                  <p className="text-xs text-muted-foreground">
                    {presensi.filter(d => d.status === "TIDAK_HADIR").length} mahasiswa tidak hadir hari ini.
                  </p>
                </>
              ) : (
                <div className="text-base text-gray-500 font-semibold">Belum ada presensi...</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Presensi</CardTitle>
            <Button onClick={() => handleExport()} disabled={isPending}>
              <span><Newspaper/></span>{isPending ? "Exporting..." : "Export as Excel"}
            </Button>
          </div>
          <CardDescription>Menampilkan {filteredMahasiswaSudahPresensi?.length} peserta yang telah melakukan
            presensi.</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground"/>
            <Input
              placeholder="Cari mahasiswa..."
              value={searchTermSudahPresensi}
              onChange={(e) => setSearchTermSudahPresensi(e.target.value)}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(filteredMahasiswaSudahPresensi) && filteredMahasiswaSudahPresensi.length > 0 && pendaftar ? (
                filteredMahasiswaSudahPresensi
                  ?.sort((a, b) => {
                    const dateA = new Date(a.presensi?.updatedAt || a.presensi?.createdAt || 0).getTime();
                    const dateB = new Date(b.presensi?.updatedAt || b.presensi?.createdAt || 0).getTime();
                    return dateB - dateA;
                  })
                  .map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.nim}</TableCell>
                      <TableCell>{m.nama}</TableCell>
                      <TableCell>{m.email}</TableCell>
                      <TableCell>{m.fakultas}</TableCell>
                      <TableCell>{m.prodi}</TableCell>
                      <TableCell>
                        <Badge
                          variant={"outline"}
                          className={
                            m.presensi?.status === "HADIR"
                              ? "bg-blue-500 text-white"
                              : m.presensi?.status === "TIDAK_HADIR"
                                ? "bg-red-500 text-white"
                                : m.presensi?.status === "IZIN"
                                  ? "bg-gray-500 text-white"
                                  : "bg-lime-500 text-white"
                          }
                        >
                          {m.presensi?.status === "TIDAK_HADIR"
                            ? "Tidak Hadir"
                            : m.presensi?.status
                              ? m.presensi.status.charAt(0).toUpperCase() + m.presensi.status.slice(1).toLowerCase()
                              : ""}
                        </Badge>
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
                    Belum ada mahasiswa yang melakukan presensi.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Presensi;
