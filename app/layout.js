import "./scss/main.scss";

export const metadata = {
  title: "vpd-app",
  description: "track temp and humidity via DHT22 sensor to calculate the vpd" ,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://kit.fontawesome.com/058434cd7c.js" crossorigin="anonymous"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
