import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { User, ShieldCheck, Building2, Receipt, FileText, HelpCircle, Headphones, Gift, LogOut, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
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
      <SheetContent side="left" className="w-[88%] sm:w-[400px] bg-[var(--nova-cream)] border-black/10 p-0">
        <SheetHeader className="p-6 pb-4 border-b border-black/10">
          <SheetTitle className="font-display text-xl tracking-tight">Profile</SheetTitle>
          <div className="flex items-center gap-3 pt-3" data-testid="profile-card">
            <img
              src={profile?.avatar || "https://i.pravatar.cc/100"}
              alt="avatar"
              className="w-14 h-14 rounded-2xl object-cover border border-black/10"
            />
            <div className="text-left">
              <p className="font-semibold leading-tight">{profile?.name || "Guest User"}</p>
              <p className="text-xs text-black/60">{profile?.handle}</p>
              <p className="text-xs text-black/60">{profile?.business}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="p-3" data-testid="profile-menu">
          {menu.map(({ label, icon: Icon, key }) => (
            <button
              key={key}
              data-testid={`menu-${key}`}
              onClick={() => toast(`${label} — coming soon`)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-black/5 transition-colors text-left"
            >
              <span className="w-9 h-9 rounded-lg bg-[var(--nova-peach-light)] grid place-items-center">
                <Icon size={16} />
              </span>
              <span className="flex-1 text-sm">{label}</span>
              <ChevronRight size={16} className="text-black/40" />
            </button>
          ))}

          <div className="nova-divider my-3" />

          <Button
            data-testid="menu-logout"
            variant="ghost"
            onClick={() => toast.success("Logged out")}
            className="w-full justify-start gap-3 px-3 py-3 h-auto rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <span className="w-9 h-9 rounded-lg bg-red-100 grid place-items-center">
              <LogOut size={16} />
            </span>
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
