import createServer from "./server";
import { setupSwaggerDocs } from "./swagger";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3333;

const app = createServer();

setupSwaggerDocs(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
