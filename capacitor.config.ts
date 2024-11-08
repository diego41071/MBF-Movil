import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "MBF-Movil",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      backgroundColor: "#000000",
      launchShowDuration: 0, // Desactiva la pantalla de espera
    },
  },
};

export default config;
