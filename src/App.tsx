import { useState } from "react";
import "./App.css";

function App() {
  const [textInput, setTextInput] = useState<string>(""); // Entrada del texto
  const [jsonOutput, setJsonOutput] = useState<string>(""); // Salida en JSON
  const [copySuccess, setCopySuccess] = useState<string>(""); // Mensaje de copia

  const handleConvertToJson = () => {
    try {
      const cleanedJson = cleanJson(textInput);

      setJsonOutput(JSON.stringify(cleanedJson, null, 2));
      setCopySuccess("");

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
    setCopySuccess("Copied to clipboard!");
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
    <div style={{ maxWidth: "50rem", margin: "0 auto", padding: "20px", width: "35%" }}>
      <h2>Text to JSON Converter</h2>
      <button
        onClick={handleClear}
        style={{ padding: "10px 10px", marginBottom: "20px" }}
      >
        Clear All
      </button>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="textInput"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Enter your text:
        </label>
        <textarea
          id="textInput"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          rows={8}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>
      <button
        onClick={handleConvertToJson}
        style={{ marginBottom: "20px", padding: "10px 20px" }}
      >
        Convert to JSON
      </button>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="jsonOutput"
          style={{ display: "block", marginBottom: "8px" }}
        >
          JSON Output:
        </label>
        <textarea
          id="jsonOutput"
          value={jsonOutput}
          readOnly
          rows={12}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            color: "#333",
            backgroundColor: "#f9f9f9",
          }}
        />
      </div>
      <button onClick={handleCopyToClipboard} style={{ padding: "10px 20px" }}>
        Copy to Clipboard
      </button>
      {copySuccess && (
        <p style={{ color: "green", marginTop: "10px" }}>{copySuccess}</p>
      )}

     
    </div>
  );
}

export default App;
