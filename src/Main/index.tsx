import { Button } from "@consta/uikit/Button";
import { Informer } from "@consta/uikit/Informer";
import { Select } from "@consta/uikit/Select";
import { Text } from "@consta/uikit/Text";
import { TextField } from "@consta/uikit/TextField";
import { useMemo, useState } from "react";
import { useScreenDetector, VigenereCipher } from "../TS";
import { copyTextToClipboard } from "../TS/clipboard";
import DeveloperModal from "./Developer";

const Main = () => {
  const isDesktop = useScreenDetector();

  const [dataset, setDataset] =
    useState<keyof VigenereCipher["_datasets"]>("russian");
  const [value, setValue] = useState("");
  const [isValidValue, setIsValidValue] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [result, setResult] = useState("");
  const [isCopyProcess, setIsCopyProcess] = useState(false);

  const cryptor = useMemo(() => new VigenereCipher(), []);

  const encrypt = () => {
    const result = cryptor.encrypt(value, password, dataset);
    setResult(result);
  };

  const decrypt = () => {
    const result = cryptor.decrypt(value, password, dataset);
    setResult(result);
  };

  const isValid = useMemo(() => {
    const isValidValue = cryptor.isValidValue(value, dataset);
    const isValidPassword = cryptor.isValidValue(password, dataset);
    setIsValidValue(isValidValue);
    setIsValidPassword(isValidPassword);
    return isValidValue && isValidPassword;
  }, [cryptor, value, dataset, password]);

  return (
    <div
      style={{
        width: isDesktop ? "50vw" : "90vw",
        boxSizing: "border-box",
        padding: "15px",
      }}
    >
      <Text
        align="center"
        view="primary"
        size="3xl"
        lineHeight="m"
        display="block"
        weight="bold"
      >
        Шифр Виженера
      </Text>
      <div style={{ paddingTop: "10px" }} />
      <Select
        required
        placeholder="Выберите значение"
        caption="Выбранный набор"
        items={Object.keys(cryptor["_datasets"])}
        value={dataset}
        onChange={(dataset) =>
          setDataset(dataset as keyof VigenereCipher["_datasets"])
        }
        getItemLabel={(dataset) => dataset}
        getItemKey={(dataset) => dataset}
      />
      <div style={{ paddingTop: "10px" }} />
      <TextField
        size="l"
        required
        type="textarea"
        caption="Исходный текст"
        value={value}
        onChange={(value: string | null) => {
          setValue(value || "");
        }}
        status={isValidValue ? "success" : "alert"}
      />
      <div style={{ paddingTop: "10px" }} />
      <TextField
        size="l"
        required
        type="password"
        caption="Ключ шифрования"
        value={password}
        onChange={(value: string | null) => {
          setPassword(value || "");
        }}
        status={isValidPassword ? "success" : "alert"}
      />
      <div style={{ paddingTop: "10px" }} />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Button
          label="Зашифровать"
          size="l"
          onClick={encrypt}
          disabled={!isValid}
        />
        <div style={{ padding: "5px" }} />
        <Button
          label="Расшифровать"
          size="l"
          onClick={decrypt}
          disabled={!isValid}
        />
      </div>
      <div style={{ paddingTop: "30px" }} />
      <Informer
        status="system"
        view="outline"
        label={result}
        style={{ display: result === "" ? "none" : "" }}
      />
      <div style={{ padding: "5px" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          label="Скопировать"
          size="m"
          form="round"
          disabled={result === ""}
          loading={isCopyProcess}
          onClick={() => {
            setIsCopyProcess(true);
            copyTextToClipboard(result).then(() => {
              setIsCopyProcess(false);
            });
          }}
          style={{ display: result === "" ? "none" : "" }}
        />
        <DeveloperModal />
      </div>
    </div>
  );
};

export default Main;
