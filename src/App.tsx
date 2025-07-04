import { useState } from "react";
import "./App.css";
import Stats from "./components/Stats";
import VisitorCounter from "./components/VisitorCounter";

function App() {
  const [textInput, setTextInput] = useState<string>(""); // Entrada del texto
  const [jsonOutput, setJsonOutput] = useState<string>(""); // Salida en JSON
  const [copySuccess, setCopySuccess] = useState<string>(""); // Mensaje de copia

  const handleConvertToJson = () => {
    try {
      const cleanedJson = cleanJson(textInput);

      setJsonOutput(JSON.stringify(cleanedJson, null, 2));
      setCopySuccess("");

      // Incrementar estadísticas de conversión
      if (typeof window !== 'undefined' && (window as any).incrementConversions) {
        (window as any).incrementConversions();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setJsonOutput("Error converting to JSON");
    }
  };

  const handleClear = (): void => {
    setTextInput("");
    setJsonOutput("");
    setCopySuccess("");
  };

  // Función para copiar el resultado al portapapeles
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopySuccess("¡Copiado al portapapeles!");
  };

  function cleanJson(json: string): any {
    const inputJson: any = JSON.parse(json);
    const output = {
      Channel: inputJson.Input.Channel,
      FlowType: inputJson.Input.FlowType,
      NotificationSignedDocument: inputJson.Input.NotificationSignedDocument,
      DocumentDirectoryId: inputJson.Input.DocumentDirectoryId,
      DocumentOwnerComplete: inputJson.Input.DocumentOwnerComplete,
      Documents: inputJson.Input.Documents.$values.map((document: any) => ({
        DocumentId: document.DocumentId,
        DocumentType: document.DocumentType,
        SingSetting: {
          Signatories: document.SingSetting.Signatories.$values.map(
            (signatory: any) => ({
              UserNameSignatory: signatory.UserNameSignatory,
              SigningRepresentative: signatory.SigningRepresentative,
              SignatureFlow: signatory.SignatureFlow,
              ClientDirectoryId: signatory.ClientDirectoryId,
              ClientGuid: signatory.ClientGuid,
              InterviewId: signatory.InterviewId,
              VerifyOtp: signatory.VerifyOtp,
              PageSign: signatory.PageSign,
              UseDefaultDirectory: signatory.UseDefaultDirectory,
              Position: {
                LetfCoordinateX: signatory.Position.LetfCoordinateX,
                RightCoordinateX: signatory.Position.RightCoordinateX,
                CoordinateUpY: signatory.Position.CoordinateUpY,
                CoordinateDownY: signatory.Position.CoordinateDownY,
              },
            })
          ),
        },
        TopicName: document.TopicName,
      })),
    };
    return output;
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">🔄 Convert to JSON</h1>
        <p className="app-subtitle">
          Convierte y limpia tus datos JSON de forma rápida y sencilla
        </p>
        <div className="stats-badge">
          <img src="https://visitor-badge.laobi.icu/badge?page_id=convert-to-json" alt="visitors"/>
        </div>
        <Stats />
      </div>

      <button onClick={handleClear} className="button button-secondary">
        🗑️ Limpiar Todo
      </button>

      <div className="form-group">
        <label htmlFor="textInput" className="form-label">
          📝 Ingresa tu texto JSON:
        </label>
        <textarea
          id="textInput"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          rows={8}
          className="textarea"
          placeholder="Pega aquí tu JSON..."
        />
      </div>

      <button onClick={handleConvertToJson} className="button">
        🔄 Convertir a JSON
      </button>

      <div className="form-group">
        <label htmlFor="jsonOutput" className="form-label">
          📤 Resultado JSON:
        </label>
        <textarea
          id="jsonOutput"
          value={jsonOutput}
          readOnly
          rows={12}
          className="textarea textarea-output"
          placeholder="El JSON convertido aparecerá aquí..."
        />
      </div>

      <button onClick={handleCopyToClipboard} className="button">
        📋 Copiar al Portapapeles
      </button>

      {copySuccess && (
        <p className="success-message">{copySuccess}</p>
      )}

      <VisitorCounter />
    </div>
  );
}

export default App;
