import { Card } from "@consta/uikit/Card";
import { Theme, presetGpnDark } from "@consta/uikit/Theme";
import Main from "./Main";
import { useScreenDetector } from "./TS";

const App = () => {
  const isDesktop = useScreenDetector();

  return (
    <Theme preset={presetGpnDark}>
      <div
        style={{
          display: isDesktop ? "flex" : undefined,
          justifyContent: isDesktop ? "center" : undefined,
          alignItems: isDesktop ? "center" : undefined,
          width: isDesktop ? "100vw" : "90vw",
          height: isDesktop ? "100vh" : "90vh",
        }}
      >
        <Card>
          <Main />
        </Card>
      </div>
    </Theme>
  );
};

export default App;
