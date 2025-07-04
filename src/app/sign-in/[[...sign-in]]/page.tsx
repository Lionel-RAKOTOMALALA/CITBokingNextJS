import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6c47ff 0%, #3b82f6 100%)",
      }}
    >
      <div>
        <img
          src="/logo-cit.png"
          alt="Logo CIT"
          style={{
            width: 120,
            margin: "0 auto 24px auto",
            display: "block",
            borderRadius: "16px",
            boxShadow: "0 4px 24px #0002",
          }}
        />
        <h1
          style={{
            textAlign: "center",
            color: "#fff",
            marginBottom: 8,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Connecte-toi à CIT
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#e0e7ff",
            marginBottom: 24,
            fontSize: 18,
          }}
        >
          Accède à ton espace personnel et découvre toutes nos fonctionnalités.
        </p>
        <SignIn
          appearance={{
            elements: {
              card: "rounded-xl shadow-lg p-8 bg-white",
              headerTitle: "hidden",
              logoBox: "hidden",
              footer: "hidden",
              socialButtonsBlockButton: "bg-green-600 hover:bg-green-700 text-white",
            },
            variables: {
              colorPrimary: "#22c55e",
              colorText: "#222",
              fontFamily: "Inter, sanimage.pngs-serif",
            },
          }}
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "underline" }}>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
} 