import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { companyAddress, companyContacts, companyName } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CompanyContactCard({
  showCompanyDetails = true,
  className,
}: {
  showCompanyDetails?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn("p-6", className)}>
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">企业联系方式</p>

      {showCompanyDetails ? (
        <div className="mt-5 flex gap-3">
          <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
          <div>
            <p className="text-sm text-slate-400">企业名称</p>
            <p className="mt-1 text-base font-semibold leading-7 text-white">{companyName}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-5 space-y-4">
        {companyContacts.map((contact) => (
          <div key={contact.email} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-base font-semibold text-white">{contact.name}</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-slate-200 transition-colors hover:text-cyan-200"
              >
                <Phone className="h-4 w-4 text-cyan-300" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 break-all text-cyan-300 transition-colors hover:text-cyan-200"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {contact.email}
              </a>
            </div>
          </div>
        ))}
      </div>

      {showCompanyDetails ? (
        <div className="mt-5 flex gap-3 border-t border-white/10 pt-5">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
          <div>
            <p className="text-sm text-slate-400">企业地址</p>
            <p className="mt-1 text-sm leading-7 text-slate-200">{companyAddress}</p>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
