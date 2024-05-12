import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

type Carte = {
    titlu: string
    autor: string
    editura: string
    status: "imprumutata" | "returnata"
    data: string
  }
  
const carti: Carte[] = [
    {
      titlu: "Ferma Animalelor",
      autor: "George Orwell",
      editura: "Humanitas",
      status: "imprumutata",
      data: "09.10.2034",
    },
    {
      titlu: "1984",
      autor: "George Orwell",
      editura: "Paralela 45",
      status: "returnata",
      data: "24.12.2023",
    }
]

export function SituationTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Titlu</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Editura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {carti.map((carte: Carte) => (
                    <TableRow>
                        <TableCell className="p-[10px]">{carte.titlu}</TableCell>
                        <TableCell className="p-[10px]">{carte.autor}</TableCell>
                        <TableCell className="p-[10px]">{carte.editura}</TableCell>
                        <TableCell className="p-[10px]">{carte.status}</TableCell>
                        <TableCell className="p-[10px]">{carte.data}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
