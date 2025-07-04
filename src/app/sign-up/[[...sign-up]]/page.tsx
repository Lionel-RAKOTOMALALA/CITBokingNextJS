import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#18181b" }}>
      <div>
        <img src="/logo.png" alt="Logo" style={{ width: 80, margin: "0 auto 24px auto", display: "block" }} />
        <h1 style={{ textAlign: "center", color: "#6c47ff", marginBottom: 24 }}>Créer un compte</h1>
        <SignUp
          appearance={{
            elements: {
              card: "rounded-xl shadow-lg p-8 bg-white",
              headerTitle: "text-2xl font-bold text-[#6c47ff] mb-4",
              socialButtonsBlockButton: "bg-[#6c47ff] text-white",
            },
            variables: {
              colorPrimary: "#6c47ff",
              colorText: "#222",
              fontFamily: "Inter, sans-serif",
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
} 