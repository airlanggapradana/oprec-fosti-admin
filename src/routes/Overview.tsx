import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Building, Newspaper, Pen, Settings, Users} from "lucide-react";
import {useExportAsExcel, useFetchRecruitment} from "@/utils/query.ts";
import Cookies from "js-cookie";
import {ChartBarDefault} from "@/components/chart-bar-vertical.tsx";
import {Button} from "@/components/ui/button.tsx";
import TabelPendaftaran from "@/components/TabelPendaftaran.tsx";
import {useQuery} from "@tanstack/react-query";

const Overview = () => {
  const token = Cookies.get("token");
  if (!token) {
    return <div className="text-red-500">You must be logged in to view this page.</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data, error, isLoading} = useQuery(useFetchRecruitment(token as string));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {mutateAsync: handleExport, isPending} = useExportAsExcel(token as string, "Recruitment");

  const recruitment = data?.data;

  const dailyRegistrations = Array.from({length: 10}).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const tanggal = date.toLocaleDateString().slice(0, 10);
    const jumlah = recruitment
      ? recruitment.filter(d => new Date(d.createdAt).toLocaleDateString().slice(0, 10) === tanggal).length
      : 0;
    return {tanggal, jumlah};
  }).reverse();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Selamat Datang di Dashboard Admin Oprec
          Fosti {new Date().getFullYear()}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-2xl font-bold">Error loading data</div>
            ) : recruitment ? (
              <>
                <div className="text-2xl font-bold">{recruitment.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{recruitment.filter(d => {
                  const createdAt = new Date(d.createdAt);
                  const tenDaysAgo = new Date();
                  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                  return createdAt >= tenDaysAgo;
                }).length} pendaftar dalam 10 hari terakhir
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">Belum ada pendaftar...</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fakultas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-2xl font-bold">Error loading data</div>
            ) : recruitment ? (
              <>
                <div className="text-2xl font-bold">{[...new Set(recruitment.map(d => d.fakultas))].length}</div>
                <p className="text-xs text-muted-foreground">
                  +{recruitment.filter(d => {
                  const createdAt = new Date(d.createdAt);
                  const tenDaysAgo = new Date();
                  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                  return createdAt >= tenDaysAgo;
                }).length} pendaftar dalam 10 hari terakhir
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">Belum ada pendaftar...</div>
            )}
          </CardContent>
        </Card>

      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="col-span-1 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktivitas Terakhir</CardTitle>
            <Pen className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent className="h-[530px] overflow-y-auto">
            {isLoading ? (
              <div className="text-2xl font-bold animate-pulse">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-2xl font-bold">Error loading data</div>
            ) : Array.isArray(recruitment) && recruitment.length > 0 ? (
              recruitment
                .filter(d => {
                  const createdAt = new Date(d.createdAt);
                  const tenDaysAgo = new Date();
                  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                  return createdAt >= tenDaysAgo;
                })
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((d) => (
                  <div key={d.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {d.nama.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{d.nama} <span
                        className="font-normal italic">telah mendaftar</span></p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3"/> {d.fakultas} · {new Date(d.createdAt).toLocaleString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <h3 className="text-xl font-bold text-muted-foreground">
                  belum ada aktivitas...
                </h3>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="col-span-2">
          <ChartBarDefault chartData={dailyRegistrations}/>
        </div>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Buttons</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={() => handleExport()} disabled={isPending}>
              <span><Newspaper/></span>{isPending ? "Exporting..." : "Export as Excel"}
            </Button>
            <Button className="mt-2" variant={"outline"}>
              <span><Pen/></span>Manage Recruitment
            </Button>
          </CardContent>
        </Card>
      </div>

      <TabelPendaftaran/>
    </div>
  );
};

export default Overview;
