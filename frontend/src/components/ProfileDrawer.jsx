import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { User, ShieldCheck, Building2, Receipt, FileText, HelpCircle, Headphones, Gift, LogOut, ChevronRight, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

const menu = [
  { label: "Edit profile", icon: User, key: "edit-profile" },
  { label: "Verification", icon: ShieldCheck, key: "verification" },
  { label: "My Business Details", icon: Building2, key: "business-details" },
  { label: "Payment history", icon: Receipt, key: "payment-history" },
  { label: "Invoices", icon: FileText, key: "invoices" },
  { label: "FAQ's", icon: HelpCircle, key: "faqs" },
  { label: "Customer Support", icon: Headphones, key: "support" },
  { label: "Refer & earn", icon: Gift, key: "refer" },
];

export default function ProfileDrawer({ profile, trigger }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="w-[88%] sm:w-[400px] bg-[#0a0a0e] border-r border-white/8 p-0 text-[#f4f1ea]">
        <SheetHeader className="p-6 pb-5 border-b border-white/8">
          <SheetTitle className="font-display text-xl tracking-tight text-white">profile.</SheetTitle>
          <div className="flex items-center gap-3 pt-3" data-testid="profile-card">
            <div className="relative">
              <img
                src={profile?.avatar || "https://i.pravatar.cc/100"}
                alt="avatar"
                className="w-14 h-14 rounded-2xl object-cover border border-white/10"
              />
              {profile?.verified && (
                <span className="absolute -bottom-1 -right-1 bg-[var(--cred-lime)] text-black w-5 h-5 rounded-full grid place-items-center">
                  <BadgeCheck size={12} />
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="font-semibold leading-tight text-white">{profile?.name || "Guest User"}</p>
              <p className="text-xs text-white/55 font-mono">{profile?.handle}</p>
              <p className="text-xs text-white/55">{profile?.business}</p>
            </div>
          </div>

          <div className="mt-4 surface rounded-2xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">CRED COINS</p>
              <p className="font-display text-2xl font-extrabold text-[var(--cred-lime)]">28,540</p>
            </div>
            <button onClick={() => toast("Redeem coming soon")} className="cta-lime rounded-full px-4 py-2 text-xs uppercase tracking-widest">
              Redeem
            </button>
          </div>
        </SheetHeader>

        <div className="p-3" data-testid="profile-menu">
          {menu.map(({ label, icon: Icon, key }) => (
            <button
              key={key}
              data-testid={`menu-${key}`}
              onClick={() => toast(`${label} — coming soon`)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
            >
              <span className="w-9 h-9 rounded-lg surface grid place-items-center">
                <Icon size={16} className="text-white/80" />
              </span>
              <span className="flex-1 text-sm text-white/85">{label}</span>
              <ChevronRight size={16} className="text-white/35" />
            </button>
          ))}

          <div className="divider-shine my-3" />

          <button
            data-testid="menu-logout"
            onClick={() => toast.success("Logged out")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            <span className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 grid place-items-center">
              <LogOut size={16} />
            </span>
            <span className="flex-1 text-sm">Logout</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
