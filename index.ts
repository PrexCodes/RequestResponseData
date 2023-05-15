import http from "http";

const food = ["rice", "beans", "Yam", "Eba", "fufu", "tea", "Bread"]
const data: any =[]

Array.from({length:5},()=>{
    let numb=Math.floor(Math.random() * food.length);
    let cost=Math.floor(Math.random() * 1000);
    data.push({ item: food[numb],cost});
})


const port: number = 5544
const server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
> = http.createServer(
    (
        req: http.IncomingMessage,
        res: http.ServerResponse<http.IncomingMessage>,
    ) => {
        // const { method, url } = req;
        // if (method === "GET" && url === "/") {
        //     res.writeHead(200,{"content-type":"application/JSON"});
        //     res.write("we are good...!\n");
        //     res.write(JSON.stringify(data))
        //     res.end();
        // }

             let body ="";
             let newData: {}[] =[];

             req.on("data",(chunk: Buffer) =>{
             body += chunk;
             console.log(chunk)
            });

            req.on("data",()=>{
                let result:{} =JSON.parse(body);
                newData.push(result);
                console.log("result:", result);
                res.write(JSON.stringify(newData));
                res.end();
            })
            },
            )

server.listen(port,()=>{
    console.log("server is listening");
})


