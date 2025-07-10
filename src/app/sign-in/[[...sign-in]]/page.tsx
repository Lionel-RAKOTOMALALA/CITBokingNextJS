import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Users, MapPin } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative w-full max-w-md">
        {/* Logo et Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-2xl mb-6 relative">
            <Image
              src="/images/logo.png"
              alt="Centre d'Information Touristique"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl blur opacity-30" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Bienvenue</h1>
          <p className="text-slate-400 text-sm">Connectez-vous à votre espace Centre Touristique</p>
        </div>

        {/* Carte de connexion */}
        <Card className="backdrop-blur-sm bg-slate-800/50 border-slate-700 shadow-2xl">
          <CardContent className="p-8">
            <SignIn
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none p-0",
                  headerTitle: "text-white text-xl font-semibold mb-6",
                  headerSubtitle: "text-slate-400 text-sm",
                  socialButtonsBlockButton:
                    "bg-slate-700 hover:bg-slate-600 text-white border-slate-600 hover:border-slate-500 transition-all duration-200 rounded-lg",
                  socialButtonsBlockButtonText: "text-white font-medium",
                  dividerLine: "bg-slate-600",
                  dividerText: "text-slate-400",
                  formFieldLabel: "text-slate-300 font-medium",
                  formFieldInput:
                    "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 rounded-lg",
                  formButtonPrimary:
                    "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200",
                  footerActionLink: "text-orange-400 hover:text-orange-300",
                  identityPreviewText: "text-slate-300",
                  identityPreviewEditButton: "text-orange-400 hover:text-orange-300",
                  formFieldErrorText: "text-red-400",
                  alertClerkError: "text-red-400 bg-red-900/20 border-red-800",
                  formFieldSuccessText: "text-green-400",
                  otpCodeFieldInput: "bg-slate-700 border-slate-600 text-white",
                  formFieldInputShowPasswordButton: "text-slate-400 hover:text-white",
                },
                variables: {
                  colorPrimary: "#f97316",
                  colorText: "#ffffff",
                  colorTextSecondary: "#94a3b8",
                  colorBackground: "transparent",
                  colorInputBackground: "#374151",
                  colorInputText: "#ffffff",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "0.5rem",
                },
              }}
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              afterSignInUrl="/dashboard/hebergements"
            />
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-xs text-slate-400">Sécurisé</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-xs text-slate-400">Collaboratif</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-slate-400">Touristique</p>
          </div>
        </div>

        {/* Lien retour */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>

     </div>
  )
}
