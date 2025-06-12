import { getFileData } from "../services/storage.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";

const FileContent = () => {
  const { token } = useAuth();
  const path = window.location.pathname;
  const id = path.split("/")[2];

  const [fileData, setFileData] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFileData(id, token);
        setFileData(data);
      } catch (err) {
        setErro("Erro ao carregar arquivo");
        console.error(err);
      }
    };

    if (token) fetchData();
  }, [token, id]);

  if (erro) return <p>{erro}</p>;
  if (!fileData) return <p>Carregando...</p>;

  const { mimeType, base64, name } = fileData;

  return (
    <div>
      <h2>{name}</h2>

      {mimeType.startsWith("image/") && (
        <img
          src={`data:${mimeType};base64,${base64}`}
          alt={name}
          style={{ maxWidth: "100%", maxHeight: "500px" }}
        />
      )}

      {mimeType === "text/plain" && (
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {atob(base64)}
        </pre>
      )}

      {!mimeType.startsWith("image/") && mimeType !== "text/plain" && (
        <p>Visualização para este tipo de arquivo ainda não é suportada.</p>
      )}
    </div>
  );
};

export default FileContent;
