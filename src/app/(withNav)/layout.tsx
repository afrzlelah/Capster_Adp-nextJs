import "../globals.css";
import NavbarComponent from "@/Views/Fragments/Content/NavbarComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
}
