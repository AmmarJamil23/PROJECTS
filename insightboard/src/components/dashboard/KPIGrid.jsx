import { Card, CardContent} from "../ui/card";


function KPIGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((item) => (
                <Card key={item.label}> 
                    <CardContent className="p-6">

                        <p className="text-sm text-muted-foreground">
                            {item.label}
                        </p>
                        <p className="text-3xl font-bold">
                            {item.value}
                        </p>

                    </CardContent>

                </Card>
            ))}

        </div>
    )
}

export default KPIGrid;